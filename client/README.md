# Sky Dental Hospital - React App

## 📁 Folder Structure

```
sky-dental/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutSection.jsx
│   │   ├── CEOSection.jsx
│   │   ├── VideoSection.jsx
│   │   ├── ProvidersGrid.jsx
│   │   ├── Services.jsx
│   │   ├── FacilitiesSection.jsx
│   │   ├── Testimonials.jsx
│   │   ├── ContactSection.jsx
│   │   └── ContactForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── App.css          ← Global styles & CSS variables
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── hero.css
│   │   ├── AboutUs.css
│   │   ├── Services.css
│   │   ├── ProvidersGrid.css
│   │   ├── Testimonials.css
│   │   ├── VideoSection.css
│   │   ├── MobileMenu.css
│   │   ├── Contact.css
│   │   └── PropertyDetails.css
│   ├── App.js
│   └── index.js
└── package.json
```

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```
Opens at **http://localhost:3000**

### 3. Build for production
```bash
npm run build
```

## 📄 Pages
- `/` → Home page (Hero, About, CEO, Tour, Team, Services, Facilities, Reviews, Contact)
- `/about` → About page (Story, Why Choose Us, Process, Locations)
- `/contact` → Contact page (Map + Contact Form)

## 🎥 Adding Your Video
Place your hospital video file at:
```
public/hospital-video.mp4
```
Then in `VideoSection.jsx`, uncomment the `<video>` tag and remove the placeholder.

## 🖼️ Adding Your Images / Logo
Place your files in the `public/` folder and reference them as:
```jsx
<img src="/logo.png" />
<img src="/photos/doctor.png" />
```

## 🎨 Changing Colors
All brand colors are defined in `src/styles/App.css`:
```css
:root {
  --primary: #0A3D5C;
  --secondary: #088395;
  --accent: #05BFDB;
}
```
