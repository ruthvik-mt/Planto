# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from model_files.ml_predict import predict_plant  # ⛔ no need to import Network
# import base64

# app = Flask("Plant Disease Detector")
# CORS(app)

# @app.route('/', methods=['POST'])
# def predict():
#     key_dict = request.get_json()
#     image = key_dict["image"]
#     imgdata = base64.b64decode(image)

#     # ✅ No model created here
#     result, remedy = predict_plant(None, imgdata)

#     try:
#         plant = result.split("___")[0]
#         disease = " ".join((result.split("___")[1]).split("_"))
#     except:
#         plant = result
#         disease = "N/A"

#     response = {
#         "plant": plant,
#         "disease": disease,
#         "remedy": remedy,
#     }

#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=8080)


from flask import Flask, jsonify, request
from flask_cors import CORS
from model_files.ml_predict import predict_plant
import base64
import requests
import os
from dotenv import load_dotenv
from difflib import SequenceMatcher

# ✅ Load environment variables (for Plant.id API key)
load_dotenv()

app = Flask("Plant Disease Detector")
CORS(app)

# ✅ Load Plant.id API key from .env if available
PLANT_ID_API_KEY = os.getenv("NEXT_PUBLIC_PLANT_ID_API_KEY")

def similarity(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "backend alive"}), 200

@app.route('/', methods=['POST'])
def predict():
    key_dict = request.get_json()
    image = key_dict.get("image")

    if not image:
        return jsonify({"error": "No image received"}), 400

    try:
        imgdata = base64.b64decode(image)
    except Exception as e:
        return jsonify({"error": f"Image decoding failed: {str(e)}"}), 400

    # ✅ Custom model prediction
    local_result, local_remedy, local_confidence = predict_plant(None, imgdata)

    try:
        plant_local = local_result.split("___")[0]
        disease_local = " ".join(local_result.split("___")[1].split("_"))
    except Exception:
        plant_local = local_result
        disease_local = "N/A"

    print("Local model:", disease_local, f"({local_confidence:.2f})")

    # ✅ Optional: Plant.id API prediction
    plantid_disease = None
    plantid_confidence = 0
    plantid_description = None
    plantid_treatment = None

    if PLANT_ID_API_KEY:
        try:
            response = requests.post(
                "https://plant.id/api/v3/health_assessment?language=en&details=local_name,description,url,treatment,classification,common_names,cause",
                headers={
                    "Api-Key": PLANT_ID_API_KEY,
                    "Content-Type": "application/json"
                },
                json={
                    "images": [f"data:image/jpeg;base64,{image}"],
                    "similar_images": False
                }
            )

            if response.status_code == 200:
                result = response.json().get("result", {})
                suggestions = result.get("disease", {}).get("suggestions", [])
                if suggestions:
                    top = suggestions[0]
                    plantid_disease = top.get("name", "Unknown")
                    plantid_confidence = top.get("probability", 0)
                    plantid_description = top.get("details", {}).get("description", "")
                    plantid_treatment = top.get("details", {}).get("treatment", {})
            else:
                print("Plant.id API error:", response.text)
        except Exception as e:
            print("Plant.id request failed:", e)

    print("Plant.id:", plantid_disease, f"({plantid_confidence:.2f})")

    # ✅ Combine both models if possible
    sim_score = similarity(disease_local, plantid_disease or "")
    print(f"Similarity Score: {sim_score:.2f}")

    if sim_score > 0.6 and plantid_confidence > 0.2:
        avg_confidence = round((local_confidence + plantid_confidence) / 2, 4)
        response_data = {
            "source": "hybrid_combined",
            "plant": plant_local,
            "disease": disease_local,
            "confidence": f"{avg_confidence * 100:.2f}%",
            "description": plantid_description,
            "treatment": plantid_treatment,
            "remedy": local_remedy
        }
    elif plantid_confidence > local_confidence:
        response_data = {
            "source": "plant.id",
            "plant": plant_local,
            "disease": plantid_disease or "Unknown",
            "confidence": f"{plantid_confidence * 100:.2f}%",
            "description": plantid_description,
            "treatment": plantid_treatment,
            "remedy": "Based on Plant.id API"
        }
    else:
        response_data = {
            "source": "custom_model",
            "plant": plant_local,
            "disease": disease_local,
            "confidence": f"{local_confidence * 100:.2f}%",
            "remedy": local_remedy
        }

    return jsonify(response_data)


if __name__ == '__main__':
    # ✅ Run on local network (for testing on phone or other devices)
    app.run(debug=True, host='0.0.0.0', port=8080)

