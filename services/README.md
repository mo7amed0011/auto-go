# 🚗 auto-go – Mobile Auto Garage

**AutoGo** is a high-end, production-ready web application designed for a startup that provides mobile auto repair services directly on highways and remote roads. Instead of traditional towing, AutoGo dispatches a fully equipped mobile garage to fix cars on the spot.

## 🌟 Key Features
- **AI-Powered Diagnostics:** Uses Gemini API to analyze car problems from user descriptions.
- **Role-Based Access Control:** Distinct dashboards for **Admins**, **Technicians**, and **Customers**.
- **Real-time Status Tracking:** Customers can track their repair requests from "Pending" to "Completed".
- **AutoGo PRO:** Subscription system for priority routing and parts discounts.
- **Smart Operations Center:** Admin panel with visual analytics using Recharts.
- **Modern UI/UX:** Built with Tailwind CSS, featuring a dark automotive theme and glassmorphism effects.

## 🛠️ Tech Stack
- **Frontend:** React 19 (ESM), Tailwind CSS, Framer Motion (animations).
- **Backend/DB:** Local Storage Engine (Simulated MySQL structure) with a REST-like service layer.
- **AI Integration:** Google Gemini SDK (@google/genai).
- **Icons:** Font Awesome 6.

## 🚀 How to Launch
1. **Direct View:** Since this is built using ES modules, you can serve it via any local web server (like Live Server in VS Code or XAMPP).
2. **GitHub Deployment:**
   - Create a new repository on GitHub named `auto-go`.
   - Push these files to the `main` branch.
   - Connect your repo to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for a live URL.

## 📂 Project Structure
- `/pages`: Contains all main application views (Home, Dashboard, Careers, etc.).
- `/components`: Reusable UI elements (Navbar, Footer, LoadingScreen).
- `/services`: Core logic (Database simulation, AI integration, Notifications).
- `/constants`: Global configuration and static data.

## 👨‍💻 Developer
Built by **mo7amed0011** – Senior Full-stack Engineer & Startup Product Designer.

---
*This project was generated with a focus on Highway-Priority Logic and Scalability.*