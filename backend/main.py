# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from model_files.ml_predict import predict_plant  # ⛔ no need to import Network
# import base64

# app = Flask("Plant Disease Detector")
# CORS(app)

# # ✅ Add health route to stop 404 spam
# @app.route('/health', methods=['GET', 'HEAD'])
# def health_check():
#     return '', 200

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

load_dotenv()
app = Flask("Plant Disease Detector")
CORS(app)

PLANT_ID_API_KEY = os.getenv("NEXT_PUBLIC_PLANT_ID_API_KEY")

@app.route("/health", methods=["GET", "HEAD"])
def health():
    return "OK", 200

@app.route("/", methods=["POST"])
def predict():
    data = request.get_json()
    image = data.get("image")
    mime = data.get("mime", "image/jpeg")

    if not image:
        return jsonify({"error": "No image received"}), 400

    imgdata = base64.b64decode(image)

    # Custom Model Result
    result, remedy, confidence = predict_plant(None, imgdata)
    plant = result.split("___")[0]
    disease = " ".join(result.split("___")[1].split("_"))

    # Plant.id Result
    suggestions = []
    try:
        response = requests.post(
            "https://plant.id/api/v3/health_assessment?language=en&details=local_name,description,url,treatment,classification,common_names,cause,similar_images",
            headers={
                "Api-Key": PLANT_ID_API_KEY,
                "Content-Type": "application/json"
            },
            json={
                "images": [f"data:{mime};base64,{image}"],
                "similar_images": True
            }
        )
        json_data = response.json()
        suggestions = json_data.get("result", {}).get("disease", {}).get("suggestions", [])
    except Exception as e:
        print("Plant.id API Error:", e)

    return jsonify({
        "custom": {
            "plant": plant,
            "disease": disease,
            "confidence": f"{confidence * 100:.2f}%",
            "remedy": remedy,
            "source": "custom_model"
        },
        "plantid": {
            "suggestions": suggestions
        }
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
