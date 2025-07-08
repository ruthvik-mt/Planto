from PIL import Image
import torch
from torchvision import transforms
import torch.nn as nn
import torch.nn.functional as F
import pickle
import io
import json
import os

# ✅ CNN Architecture (matches training code)
class NetworkBase(nn.Module):
    def __init__(self):
        super(NetworkBase, self).__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.conv2 = nn.Conv2d(6, 12, 5)
        self.conv3 = nn.Conv2d(12, 24, 5)
        self.conv4 = nn.Conv2d(24, 48, 5)

    def forward_features(self, x):
        x = F.relu(self.conv1(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv2(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv3(x))
        x = F.max_pool2d(x, 2)
        x = F.relu(self.conv4(x))
        x = F.max_pool2d(x, 2)
        return x

class Network(nn.Module):
    def __init__(self, num_classes):
        super(Network, self).__init__()
        self.base = NetworkBase()

        # Dynamically determine output size for FC layer
        with torch.no_grad():
            dummy = torch.randn(1, 3, 256, 256)
            dummy_out = self.base.forward_features(dummy)
            self._to_linear = dummy_out.view(1, -1).size(1)

        self.fc1 = nn.Linear(self._to_linear, 240)
        self.fc2 = nn.Linear(240, 120)
        self.out = nn.Linear(120, num_classes)

    def forward(self, x):
        x = self.base.forward_features(x)
        x = x.view(-1, self._to_linear)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return self.out(x)

# ✅ Remedy Lookup
def get_remedy(plant_disease):
    try:
        with open("model_files/data.json", 'r') as f:
            remedies = json.load(f)
        return remedies.get(plant_disease, "Remedy not found.")
    except Exception as e:
        print("Error loading remedies:", e)
        return "Remedy not available."

# ✅ Inference Function
@torch.no_grad()
def predict_plant(model, imgdata):
    try:
        # Load labels
        with open('model_files/labels.json', 'rb') as f:
            labels = pickle.load(f)

        num_classes = len(labels)

        # Load trained model
        model = Network(num_classes)
        model.load_state_dict(torch.load("model_files/model.pth", map_location=torch.device('cpu')))
        model.eval()

        # Process input image
        image = Image.open(io.BytesIO(imgdata)).convert("RGB")
        transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor()
        ])
        image = transform(image).unsqueeze(0)

        # Predict
        output = model(image)
        probabilities = torch.softmax(output, dim=1)
        pred_idx = probabilities.argmax(dim=1).item()
        predicted_class = labels[pred_idx]
        accuracy = probabilities[0][pred_idx].item()

        print(f"Predicted: {predicted_class} | Accuracy: {accuracy*100:.2f}%")

        # Remedy
        if "healthy" not in predicted_class.lower():
            remedy = get_remedy(predicted_class)
        else:
            remedy = "Plant is healthy."

        return predicted_class, remedy, accuracy

    except Exception as e:
        print("Prediction error:", e)
        return "Unknown", "Error occurred during prediction", 0.0
