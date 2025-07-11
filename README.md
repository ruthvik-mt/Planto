# 🌿 Plantiva
An AI-powered Progressive Web App (PWA) for plant disease detection and health assessment.
## Table of Contents

- [Introduction](#introduction)
- [Live Demo](#live-demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Plantiva is a full-stack web application designed to help farmers, gardeners, and plant enthusiasts identify plant diseases by analyzing images. It uses a custom Convolutional Neural Network (CNN) model trained on plant disease datasets, and also integrates the Plant.id API to provide health assessments, confidence levels, and treatment suggestions.This combined approach delivers accurate and informative results, helping users take better care of their plants.

## Live Demo

🌐 Visit the website:
[Plantive](https://plantiva.vercel.app/)

The PWA version can be installed on desktop by clicking "Install Plantiva" from your browser or on mobile by clicking "Add to Home Screen". 

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
pip install --upgrade pip
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
## Deployment:

- Frontend Deployment: Vercel, Netlify, or any static hosting that supports Next.js.
- Backend Deployment: Railway, Render, or Heroku.

## Contributing:

1. Fork the repository
2. Clone the repository:
   
```
git clone https://github.com/ruthvik-mt/Plantiva.git
````
```
cd Plantive
```
```
git remote add upstream https://github.com/ruthvik-mt/Plantive.git
```
3. Now, if you run ```git remote -v``` you should see two remote repositories named:
- `origin` (forked repository)
- `upstream` (Plantive repository)

## License

This project is licensed under the MIT License - see the [LICENSE](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) file for more details.

##

<div align="center">
  <strong>Made with ❤️ using ML</strong>
</div>



