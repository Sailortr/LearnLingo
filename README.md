# LearnLingo - Language Tutor Platform

LearnLingo is a modern web application designed to connect students with the best language tutors from around the world. Users can browse, filter, and select tutors that fit their learning needs, book trial lessons, and maintain a list of their favorite instructors.

[![Deploy with Vercel](https://vercel.com/button)](https://learn-lingo-hazel-sigma.vercel.app/)

**Live Demo:** [https://learn-lingo-hazel-sigma.vercel.app/](https://learn-lingo-hazel-sigma.vercel.app/)

![LearnLingo Home Page](https://i.imgur.com/uR1k3oM.png)

---

## Features

- **User Authentication**: Secure user registration, login, and logout functionality powered by Firebase Authentication.
- **Browse Tutors**: View a comprehensive list of language tutors.
- **"Load More"**: Efficiently paginate through the list of tutors to ensure a smooth user experience.
- **Favorites System**: Authenticated users can add tutors to a personal "Favorites" list and view them on a dedicated, protected page. The favorite status is persistent and synced with Firestore.
- **Detailed Tutor Profiles**: Expandable teacher cards to view more details, including experience and student reviews.
- **Book Trial Lessons**: A seamless booking process through a modal form for scheduling a trial lesson.
- **Protected Routes**: The "Favorites" page is only accessible to logged-in users, redirecting others to the home page.
- **Responsive Design**: A clean, modern, and fully responsive UI that works across all devices, built with Tailwind CSS.

---

## Technologies Used

This project is built with a modern and robust tech stack:

- **Frontend:**
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
- **Backend & Database:**
  - [Firebase](https://firebase.google.com/)
    - **Authentication** for user management.
    - **Firestore** as the primary database for storing tutor and user data.
- **Styling:**
  - [Tailwind CSS](https://tailwindcss.com/)
- **Routing:**
  - [React Router DOM](https://reactrouter.com/)
- **Form Management & Validation:**
  - [React Hook Form](https://react-hook-form.com/)
  - [Yup](https://github.com/jquense/yup)
- **Deployment:**
  - [Vercel](https://vercel.com/)

---

## Project Structure

The project follows a modular and scalable component-based architecture to ensure maintainability and clean code.

## /├── public/├── src/│ ├── assets/│ ├── components/│ │ ├── Auth/│ │ ├── Booking/│ │ ├── Filters/│ │ ├── Layout/│ │ ├── Teachers/│ │ └── UI/│ ├── contexts/│ ├── data/│ │ └── teachers.json│ ├── hooks/│ ├── pages/│ ├── routes/│ └── services/├── firebase/│ └── firebaseConfig.js├── .env├── .gitignore├── index.html├── package.json└── README.md

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**

    ```sh
    git clone [https://github.com/Sailortr/LearnLingo.git](https://github.com/Sailortr/LearnLingo.git)
    cd LearnLingo
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    # or
    # yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of your project and add your Firebase project configuration keys. You can get these from your Firebase project settings.

    ```
    VITE_API_KEY=your_firebase_api_key
    VITE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_PROJECT_ID=your_firebase_project_id
    VITE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_APP_ID=your_firebase_app_id
    ```

    **Note:** Make sure your `.gitignore` file includes `.env` to keep your keys secure.

4.  **Set up Firebase:**

    - Ensure you have a Firebase project created.
    - Enable **Authentication** with the "Email/Password" sign-in method.
    - Create a **Firestore Database** and ensure your Security Rules allow authenticated users to read and write their own data (especially for the `/users/{userId}` path).

5.  **Run the development server:**
    ```sh
    npm run dev
    # or
    # yarn dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or the port specified in your terminal) to view it in the browser.

---

## Contact

Sailortr - [GitHub Profile](https://github.com/Sailortr)

Project Link: [https://github.com/Sailortr/LearnLingo.git](https://github.com/Sailortr/LearnLingo.git)
