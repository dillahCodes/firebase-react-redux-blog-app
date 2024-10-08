# **Firebase React Redux Blog App**

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [License](#license)
8. [Contact](#contact)

---

## **Introduction**
> This project serves as a learning tool for gaining a deeper understanding of React.js, focusing on concepts such as Higher-Order Components (HOC), and exploring state management using Redux Toolkit (RTK). It also offers an opportunity to implement Firebase Firestore for database management, Firebase Storage for file handling, and Firebase Authentication for user management.
Additionally, I have implemented middleware concepts in Redux Toolkit (RTK) within this project to enhance the state management workflow and handle side effects.


## **Features**
This project includes several key features that enhance the user experience and functionality:

- **CRUD Operations for Blog Posts**: Users can create, read, update, and delete blog posts seamlessly, allowing for dynamic content management.
- **User Authentication and Authorization**: Implemented secure login and registration processes, ensuring that only authorized users can access certain features.
- **Admin Dashboard**: An intuitive admin dashboard that allows administrators to manage users, blog posts, and site settings effectively.
- **Like Blog Posts**: Users can like blog posts, fostering engagement and interaction within the community.
- **Infinite Scrolling**: Users can scroll through blog posts without interruptions, as more content loads automatically as they reach the bottom of the page.
- **Pagination**: For better navigation, blog posts can be displayed in pages, allowing users to browse through content efficiently.


## **Tech Stack**
List the technologies and tools used in this project.  

![Static Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=black) ![Static Badge](https://img.shields.io/badge/Node.js-8CC84B?style=for-the-badge&logo=nodedotjs&logoColor=8CC84B&labelColor=black) ![Static Badge](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=764ABC&labelColor=black)
 ![Static Badge](https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=firebase&logoColor=%23DD2C00&labelColor=black) ![Ant Design Badge](https://img.shields.io/badge/Ant%20Design-0170FE?style=for-the-badge&logo=antdesign&logoColor=white) ![Static Badge](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=CA4245&labelColor=black) ![Static Badge](https://img.shields.io/badge/tailwind%20css-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=%2306B6D4&labelColor=black) ![Static Badge](https://img.shields.io/badge/vite-%23F16728?style=for-the-badge&logo=vite&logoColor=%23F16728&labelColor=black) ![Static Badge](https://img.shields.io/badge/javascript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E&labelColor=black)












## **Installation**
Step-by-step guide on how to set up and run the project locally.

### Prerequisites
- Node.js
- Git

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/dillahCodes/firebase-react-redux-blog-app.git
    cd firebase-react-redux-blog-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory (provide an example if needed):
    ```bash
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
    VITE_USE_FIREBASE_EMULATOR=true # set to true to use firebase emulators or false to use in production
    ```

4. Start the development FrontEnd server:
    ```bash
    npm run dev
    ```
4. Start the development Database Server:
    ```bash
    npm run db
    ```

5. Local FrontEnd Server `http://localhost:5173`
6. Local Firebase Server `http://127.0.0.1:4000`
7. Available Script:
    ```bash
    npm run dev
    npm run db
    npm run build
    npm run preview
    npm run release
    npm run lint
    ```


## **Usage**
Instructions on how to use the project after installation.

1. **Create an Account:**
   - Navigate to the registration page.
   - Fill in the required details to create your account.

2. **Login:**
   - Use your registered email and password to log in to the application.

3. **Set Admin Role:**
   - After logging in, check your Firebase Firestore data and change the user role to either `admin` or `super_admin` as needed.
   - After changing the user's role, users with the `admin` or `super_admin` role will be able to unlock and access the `Admin Dashboard` menu.

| ![Task Manager](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/Screenshot%202024-10-08%20233759.png) | ![Edit User Role](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/Screenshot%202024-10-08%20232152.png) |
|:--:|:--:|





## **Screenshots**
Include screenshots or GIFs of your application to showcase its appearance and features.

**Example:**

| ![Home Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/home-page.png) | ![Create Blog Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/create-blog-page.png) |
|:--:|:--:|
| *Home Page* | *Create Blog Page* |
| ![Dashboard Admin Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/dashboard-admin-page.png) | ![Edit Profile Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/edit-profile-page.png) |
| *Dashboard Admin Page* | *Edit Profile Page* |
| ![My Article Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/my-article-page.png) | ![Detail Article Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/detail-article-page.png) |
| *My Article Page* | *Detail Article Page* |
| ![Detail Topic Page](https://raw.githubusercontent.com/dillahCodes/github-projects-images/main/firebase-react-redux-blog-app/detail-topic-page.png) | |
| *Detail Topic Page* | |




## **License**
State the license under which the project is distributed.

**Example:**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## **Contact**
Provide contact information or links to other resources such as the project website.

**Example:**
- **Email**: abdillahjuniansyah93@gmail.com
- **GitHub**: [dillahCodes](https://github.com/dillahCodes)

