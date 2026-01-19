# Billify - Invoice Management App

Welcome to **Billify**, a modern web application to **manage invoices efficiently**. This app allows users to create, edit, and filter invoices, upload invoice images, and track their billing process seamlessly.

---

## Live Demo

Check out the deployed app here: [Live Demo](#)  
*(Replace `#` with your deployed URL when available)*

---

## Features

- **User Authentication:** Secure signup, login, and logout using JWT tokens.
- **Profile Management:** Update profile picture and user details.
- **Add Invoice:** Create invoices with bill number, date, product name, customer/doctor name, amount, and optional invoice image.
- **Edit Invoice:** Modify existing invoices whenever needed.
- **Filter Invoices:** Quickly search invoices by bill number or date.
- **Responsive UI:** Works perfectly on desktop and mobile using `React`, `Tailwind CSS`, and `Daisy UI`.
- **Media Uploads:** Upload invoice and profile images using `Cloudinary`.
- **Backend API:** Powered by `Node.js`, `Express`, and `MongoDB` for reliable performance.
- **Scalable Architecture:** Clean and maintainable codebase for future enhancements.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Zustand, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time Features:** Socket.io (optional, for online user tracking)
- **File Uploads:** Cloudinary

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Billify.git
cd Billify
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

