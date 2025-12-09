```markdown
# Personal Website & Admin Panel

A modern personal portfolio website built with **React + TypeScript + Vite**, styled using **TailwindCSS** and **shadcn/ui**, and powered by **Firebase Authentication, Firestore, and Storage** for dynamic content management.

This project contains:
* A public personal website (profile card, CV, projects, contact)
* A protected admin panel for managing all content
* Firebase-based dynamic CMS functionality
* Dark/Light theme toggle via ThemeContext
* Full routing with protected admin routes

---

## 🚀 Features

### 🌐 Public Website
* Dynamic profile card (name, title, LinkedIn, GitHub)
* CV view & download
* Smooth navigation between sections/pages
* Dark/Light mode toggle
* UI powered by shadcn/ui components

### 🔐 Admin Panel
* Firebase email/password login
* Protected routes (only allowed admin emails can access)
* Admin dashboard
* **Settings page:** Update personal info dynamically (name, title, links, about text)
* **CV upload page** (Firebase Storage)
* Future: Projects CRUD panel

### 🛠 Dynamic Content (Firestore)
The Admin can manage: Name, Title, Social links, About text, and CV file. The public website reads all of this dynamically.

---

## 🧰 Tech Stack

| Category | Technology |
| :--- | :--- |
| Framework | React 18 + TypeScript + Vite |
| Styling | TailwindCSS + shadcn/ui |
| State Mgmt | React Context API (Auth & Theme) |
| Backend | Firebase |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Routing | React Router v6 |

---

## 📂 Project Structure

```

src/
├── components/
│ ├── ui/ \# shadcn components
│ └── UserCard.tsx \# dynamic public user card
│
├── context/
│ ├── AuthContext.tsx \# login/logout/user state
│ └── ThemeContext.tsx \# dark/light mode
│
├── lib/
│ └── firebase.ts \# firebase initialization
│
├── pages/
│ ├── HomePage.tsx
│ ├── CvPage.tsx
│ ├── admin/
│ │ ├── AdminDashboardPage.tsx
│ │ ├── AdminSettingsPage.tsx
│ │ └── AdminCvPage.tsx
│
├── routes/
│ └── ProtectedRoute.tsx
│
└── App.tsx

````

---

## 🔧 Installation & Setup

### 1) Clone the repo

```bash
git clone [https://github.com/basaktepe/personal-website.git](https://github.com/basaktepe/personal-website.git)
cd personal-website
````

### 2\) Install dependencies

```bash
npm install
```

### 3\) Create .env.local in project root

Set up environment variables for Firebase configuration:

```ini
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4\) Start development server

```bash
npm run dev
```

-----

## 🔒 Authentication Logic

Admin panel pages are protected using a custom `ProtectedRoute` component. Only allowed admin emails can access `/admin`.

```typescript
if (!user) return <Navigate to="/admin/login" replace />;
if (!allowedAdmins.includes(user.email || "")) return <Navigate to="/" replace />;
return <Outlet />;
```

-----

## 📄 Dynamic Content System

### Profile Data (Firestore)

Profile information is stored at the following path:

```bash
settings/profile
```

**Example Document:**

```json
{
  "name": "Başak Tepe",
  "title": "Fullstack Developer",
  "linkedinUrl": "[https://linkedin.com/in/](https://linkedin.com/in/)...",
  "githubUrl": "[https://github.com/](https://github.com/)...",
  "about": "..."
}
```

### CV File (Storage)

CV files are uploaded to Firebase Storage:

```
cv/<filename>.pdf
```

The related Firestore document holds the download link:
`settings/cv` → `{ "url": "download_link" }`

The Public CV page reads the download link directly from this Firestore document.

-----

## 🌙 Dark Mode System

Dark/Light mode control is achieved by:

  * Management via `ThemeContext`.
  * Persistence using `localStorage`.
  * Automatically follows system preference on the first load.
  * Uses Tailwind’s class-based dark mode (`darkMode: "class"`).

-----

## 🧱 Future Enhancements

  * Projects admin panel (CRUD)
  * Contact form (Formspree / Firebase Functions)
  * Uploadable profile image
  * Detailed admin layout with sidebar
  * Tech stack badges for projects

-----

## 🤝 Contributions

Suggestions and improvements are welcome\!
Feel free to open an issue or submit a PR.

-----

## 📜 License

MIT License © 2025 Başak Tepe

```
```