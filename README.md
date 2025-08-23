
# TanStack Todo App  

A simple **Todo application** built with **Next.js 15, TypeScript, TanStack Query, MongoDB, and Mongoose**.  
This project demonstrates a fullstack CRUD implementation with modern tools.  

---

## 🚀 Tech Stack
- **Next.js 15** – Fullstack React framework  
- **TypeScript** – Type safety  
- **TanStack Query** – Server state management & data fetching  
- **MongoDB + Mongoose** – Database & ODM  

---

## ✨ Features
- Add, update, delete todos  
- Mark todos as completed  
- Persistent storage with MongoDB  
- API routes handled in Next.js  
- Data fetching & caching with TanStack Query  

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone git@github.com:zainashraf005/tanstack-todo.git
cd tanstack-todo
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the development server
```bash
pnpm dev
```

The app should now be running on [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure
```
.
├── app/                # Next.js app router
├── models/             # Mongoose models
├── app/api/            # API routes
├── components/         # UI components
└── README.md
```

---

## 🤝 Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the MIT License.
