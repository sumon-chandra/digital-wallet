

````markdown
# 💳 Digital Wallet Management System - Frontend

> A modern, responsive, and user-friendly frontend application for managing digital wallet operations. Built with React, TypeScript, and a powerful stack of UI libraries.

---

## ✨ Features

- **👥 Role-Based Dashboard:** Tailored experiences for Users, Agents, and Admins.
- **💼 Wallet Management:** View balance, add funds, withdraw, and transfer money.
- **📊 Transaction History:** Interactive charts and data tables for all financial activities.
- **🎨 Modern UI:** Built with shadcn/ui (Radix + Tailwind CSS) for a beautiful, accessible experience.
- **🎭 Smooth Animations:** Powered by Framer Motion for engaging user interactions.
- **🌓 Dark/Light Mode:** Full theme support using `next-themes`.
- **🔒 State Management:** Robust state handling with Redux Toolkit.
- **📝 Form Management:** Complex forms made easy with React Hook Form and Zod validation.
- **🍪 Authentication:** JWT-based auth with secure cookie storage.

---

## 🛠️ Tech Stack

- **⚛️ Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **🚀 Build Tool:** [Vite](https://vitejs.dev/)
- **🎨 Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **🛡️ State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
- **📊 Charts:** [Chart.js](https://www.chartjs.org/) + [React ChartJS 2](https://react-chartjs-2.js.org/)
- **📝 Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) Validation
- **🔄 Routing:** [React Router DOM](https://reactrouter.com/)
- **⌨️ UI Primitives:** [Radix UI](https://www.radix-ui.com/) Components
- **✨ Animations:** [Framer Motion](https://www.framer.com/motion/)
- **🌓 Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **📢 Notifications:** [Sonner](https://sonner.emilkowal.ski/) (Toasts)
- **🛠️ Utilities:** `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` icons

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)  
- **npm**, **yarn**, or **pnpm**  
- The corresponding **Backend API** should be running.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arman-miaa/Digital-Wallet-System-Frontend.git
cd Digital-Wallet-System-Frontend
````

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Environment Variables
   Create a `.env` file based on `.env.example` and set the backend API URL:

```env
VITE_API_BASE_URL=https://digital-wallet-management-system-nine.vercel.app/api
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 🔌 API Integration

This frontend works seamlessly with the backend API. Key integrated endpoints include:

* **Auth:** Login, Logout, Token Refresh
* **User:** Registration, Profile Management, User & Agent Listing
* **Wallet:** Check Balance, Add Funds, Withdraw, Transfer
* **Transactions:** Personal and System-wide transaction history
* **Commissions:** Agent earnings and admin reports

Ensure the backend is running and the `VITE_API_BASE_URL` is correct.

---

## 🌐 Live & Repository Links

* **Frontend Repo:** [GitHub](https://github.com/arman-miaa/Digital-Wallet-System-Frontend)
* **Frontend Live:** [Netlify](https://digitalwallet3.netlify.app)
* **Backend Repo:** [GitHub](https://github.com/arman-miaa/Digital-Wallet-Management-System-Server)
* **Backend Live:** [Vercel](https://digital-wallet-management-system-nine.vercel.app)

---

## 🧪 Test Credentials

| Role  | Email                                         | Password   |
| ----- | --------------------------------------------- | ---------- |
| Admin | [admin@example.com](mailto:admin@example.com) | 123456     |
| Agent | [agent@example.com](mailto:agent@example.com) | @Agent1234 |
| User  | [user@example.com](mailto:user@example.com)   | @User1234  |

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

* [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
* [Vite](https://vitejs.dev/) for fast build tooling
* The creators of all other open-source libraries used in this project




