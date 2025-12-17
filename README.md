
---

# 🌐 Personal Website & Admin Panel

A modern personal portfolio website built with **React 19.2.3 + TypeScript + Vite**, styled using **TailwindCSS** and **shadcn/ui**, and powered by **Firebase Authentication, Firestore, and Storage** for dynamic content management.

This project consists of:

* A **public personal website** (profile, CV, projects, contact)
* A **protected admin panel** for managing all content
* Firebase-based **dynamic CMS functionality**
* **Dark / Light theme** support
* Fully protected routing for admin pages

---

##  Features

###  Public Website

* Dynamic profile card (name, title, LinkedIn, GitHub)
* CV view & download
* Projects listing (Firestore-driven)
* Smooth navigation between pages
* Dark / Light mode toggle
* UI powered by **shadcn/ui** components

###  Admin Panel

* Firebase email/password authentication
* Protected admin routes (email-based authorization)
* Admin dashboard
* Settings page:

  * Update personal info dynamically (name, title, social links, about text)
* CV upload & update (Firebase Storage)
* Projects management via **ProjectContext**

  * Add / edit / delete projects (Firestore)

---

##  Dynamic Content (Firebase)

All public content is managed dynamically through Firebase and controlled from the admin panel.

### Managed Content

* Profile information
* About text
* Social links
* CV file
* Projects list

---

##  Tech Stack

| Category         | Technology                                                    |
| ---------------- | ------------------------------------------------------------- |
| Framework        | **React 19.2.3 + TypeScript + Vite**                          |
| Styling          | TailwindCSS + shadcn/ui                                       |
| State Management | React Context API                                             |
| Contexts         | AuthContext, ThemeContext, **ProfileContext, ProjectContext** |
| Backend          | Firebase                                                      |
| Database         | Firebase Firestore                                            |
| Storage          | Firebase Storage                                              |
| Authentication   | Firebase Auth                                                 |
| Routing          | React Router v6                                               |

---

##  Project Structure

```
src/
├── components/
│   ├── ui/                # shadcn/ui components
│   └── UserCard.tsx       # dynamic public profile card
│
├── context/
│   ├── AuthContext.tsx    # authentication & user state
│   ├── ThemeContext.tsx   # dark / light theme
│   ├── ProfileContext.tsx# profile & CV data
│   └── ProjectContext.tsx# projects CRUD logic
│
├── lib/
│   └── firebase.ts        # firebase initialization
│
├── pages/
│   ├── HomePage.tsx
│   ├── CvPage.tsx
│   ├── ProjectsPage.tsx
│   ├── admin/
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AdminSettingsPage.tsx
│   │   ├── AdminProjectsPage.tsx
│   │   └── AdminCvPage.tsx
│
├── routes/
│   └── ProtectedRoute.tsx
│
└── App.tsx
```

---

##  Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/basaktepe/personal-website.git
cd personal-website
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env.local`

Create a `.env.local` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the development server

```bash
npm run dev
```

---

## 🔒 Authentication & Route Protection

Admin routes are protected using a custom `ProtectedRoute` component.
Only authenticated users with allowed admin emails can access `/admin` routes.

```tsx
if (!user) return <Navigate to="/admin/login" replace />;
if (!allowedAdmins.includes(user.email || "")) return <Navigate to="/" replace />;
return <Outlet />;
```

---

## 📄 Dynamic Content System

### 👤 Profile Data (Firestore)

Stored at:

```
settings/profile
```

Example document:

```json
{
  "name": "Başak Tepe",
  "title": "Fullstack Developer",
  "linkedinUrl": "https://linkedin.com/in/...",
  "githubUrl": "https://github.com/...",
  "about": "..."
}
```

### 📑 CV File (Firebase Storage)

* Uploaded to:

```
cv/<filename>.pdf
```

* Firestore reference:

```
settings/cv → { "url": "download_link" }
```

The public CV page reads the download URL dynamically from Firestore.

---

##  Dark / Light Mode System

* Managed via **ThemeContext**
* Persisted with `localStorage`
* Defaults to system preference on first load
* Implemented using Tailwind’s class-based dark mode:

```js
darkMode: "class"
```

---

##  Contributions

Suggestions and improvements are welcome.
Feel free to open an issue or submit a pull request.

---

##  License

MIT License © 2025 **Başak Tepe**

---


