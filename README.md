# 🧭 React User Dashboard

A clean and responsive **React-based User Dashboard** that fetches and displays user data from a public API with **search**, **filter**, and **detail view** functionalities.  
Built using **React + Redux Toolkit + Axios + Vite**.

---

## 🚀 Live Demo  

👉 https://assignment-18-10-2025.onrender.com

---

## 🧱 Tech Stack

- ⚛️ **React (Vite)**
- 🧭 **React Router DOM**
- ⚙️ **Redux Toolkit** for state management
- 🌐 **Axios** for API requests
- 🎨 **Tailwind CSS / Material UI** for styling and responsiveness

---

## 🎯 Objective

Create a small user dashboard that:
- Fetches users from a public API.
- Displays user data in a responsive layout.
- Allows searching and filtering.
- Provides a detailed view of each user.

---

## 🧩 Features

### 🖥️ Dashboard Page (`/`)
- Fetches all users from  
  👉 [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
- Displays:
  - Name
  - Email
  - Company Name
  - “View Details” button
- Responsive grid/table layout
- Search users by **name** or **email**
- Filter users by **company name**

---

### 📄 User Details Page (`/user/:id`)
- Fetches single user details from  
  👉 [https://jsonplaceholder.typicode.com/users/:id](https://jsonplaceholder.typicode.com/users/:id)
- Displays:
  - Name  
  - Email  
  - Phone  
  - Website  
  - Address  
  - Company details
- Includes a “Back to Dashboard” button

---

## ⚙️ Bonus Features

✅ Loading spinner during data fetch  
✅ Error handling for failed network requests  
✅ Last visited user stored in `localStorage`  
✅ Modular Redux slices for cleaner code  

---

---

## ⚡ API Used

**Base URL:** [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)

**Endpoints:**
- `/users` → Fetch all users  
- `/users/:id` → Fetch single user details

---

🧠 Folder Structure
```bash

my-project/
┣ public/
┣ src/
┃ ┣ assets/
┃ ┣ Components/
┃ ┃ ┗ Navbar/
┃ ┃   ┗ Navbar.jsx
┃ ┣ redux/
┃ ┃ ┗ userSlices/
┃ ┃   ┣ getAllUsers.js
┃ ┃   ┣ getOneUser.js
┃ ┃   ┗ store.js
┃ ┣ ContactDetailsCard.jsx
┃ ┣ Dashboard.jsx
┃ ┣ App.jsx
┃ ┣ App.css
┃ ┣ main.jsx
┃ ┣ index.css
┗ ┗ vite.config.js

```

## 🧰 Setup Instructions

### 1️ Clone Repository

git clone https://github.com/ashmanjre3-prog/assignment-18-10-2025.git
cd assignment-18-10-2025/my-project

### 2 Clone Repository

npm install

### 3 Clone Repository

npm run dev

### 1️⃣ open with

👉 http://localhost:5173


🕒 Time Taken

Approx. 5–6 hours, including setup, UI design, Redux integration, and testing.

👩‍💻 Author

Ashwarya
💼 frontend Developer
