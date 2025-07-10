# 🌿 Plantiva
An AI-powered Progressive Web App (PWA) for plant disease detection and health assessment.
## Table of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

## Introduction

Plantiva is a full-stack web application designed to help farmers, gardeners, and plant enthusiasts identify plant diseases by analyzing images. It uses a custom Convolutional Neural Network (CNN) model trained on plant disease datasets, and also integrates the Plant.id API to provide health assessments, confidence levels, and treatment suggestions.This combined approach delivers accurate and informative results, helping users take better care of their plants.

## Live Demo

🌐 Visit the website:
[Plantive](https://plantiva.vercel.app/)

It can also be installed on mobile or desktop by clicking "Install Plantiva" from your browser or "Add to Home Screen" in mobile.

## Prerequisites

- Node.js(v18+)
- Python 3.10
- virtualenv (recommended)
- Plant.id API key (sign up at https://web.plant.id)

## Installation

## Backend:
```
cd backend
```
```
python -m venv env
```
```
source env/bin/activate  # Windows: env\Scripts\activate
```
```
pip install -r requirements.txt
```
Create ```.env``` file:
```
NEXT_PUBLIC_PLANT_ID_API_KEY=Your_API_KEY
```

## Frontend:
```
git clone https://github.com/ruthvik-mt/plantiva.git
```
```
cd frontend
```
```
npm install
```
Create ```.env.local``` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_PLANT_ID_API_KEY=Your_API_KEY
```
Run the project:
```
cd frontend
```
```
npm run dev
```
Now u can view the project running at [https//:localhost:3000](http://localhost:3000/).

## Production: Build and Run
```
npm run build
npm start
```

