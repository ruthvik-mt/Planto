from PIL import Image
import torch
from torchvision import transforms
import torch.nn as nn
import torch.nn.functional as F
import pickle
import io
import json

class Network(nn.Module):
    def __init__(self, num_classes):
        super(Network, self).__init__()
        self.conv1 = nn.Conv2d(3, 6, kernel_size=5)
        self.conv2 = nn.Conv2d(6, 12, kernel_size=5)
        self.conv3 = nn.Conv2d(12, 24, kernel_size=5)
        self.conv4 = nn.Conv2d(24, 48, kernel_size=5)

        self.fc1 = nn.Linear(48 * 12 * 12, 240)
        self.fc2 = nn.Linear(240, 120)
        self.out = nn.Linear(120, num_classes)

    def forward(self, t):
        t = F.relu(self.conv1(t))
        t = F.max_pool2d(t, 2, 2)
        t = F.relu(self.conv2(t))
        t = F.max_pool2d(t, 2, 2)
        t = F.relu(self.conv3(t))
        t = F.max_pool2d(t, 2, 2)
        t = F.relu(self.conv4(t))
        t = F.max_pool2d(t, 2, 2)
        t = t.view(-1, 48 * 12 * 12)
        t = F.relu(self.fc1(t))
        t = F.relu(self.fc2(t))
        return self.out(t)

def get_remedy(plant_disease):
    with open("model_files/data.json", 'r') as f:
        remedies = json.load(f)
    return remedies.get(plant_disease, "Remedy not found.")

@torch.no_grad()
def predict_plant(model, imgdata):
    with open('model_files/labels.json', 'rb') as f:
        labels = pickle.load(f)

    num_classes = len(labels)
    model = Network(num_classes)
    model.load_state_dict(torch.load("model_files/model.pth"))
    model.eval()

    image = Image.open(io.BytesIO(imgdata)).convert("RGB")
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor()
    ])
    image = transform(image).unsqueeze(0)

    output = model(image)
    pred_idx = output.argmax(dim=1).item()
    predicted_class = labels[pred_idx]

    if "healthy" not in predicted_class:
        remedy = get_remedy(predicted_class)
    else:
        remedy = "Plant is healthy."

    return predicted_class, remedy
