# Blog Project

## Overview
The **Blog Project** is a full-stack application that allows users to register, log in, and manage blogs with CRUD (Create, Read, Update, Delete) functionality. The application is built using **Angular** for the frontend, **Node.js** for the backend, and **MySQL** as the database.

## Features

### 1. User Authentication
- **Sign Up Page**
  - Users can register with an email, password, and profile image.
  - Input validation ensures data accuracy.
  - User details are stored securely in the database.

- **Login Page**
  - Users can log in using their registered email and password.
  - If credentials are valid, a **JWT token** is generated for authentication.
  - Users are redirected to the **dashboard** upon successful login.

### 2. Dashboard
- Displays the logged-in user's profile image and basic details.
- Provides access to blog management features.

### 3. Blog Management (CRUD Functionality)
- **Create (Add Blog)**
  - Users can add a new blog with the following fields:
    - Blog Title
    - Blog Image
    - Blog Description
  - Input validation ensures proper data entry.
  - The blog data is stored in the database.

- **Read (View Blogs)**
  - Users can view a list of blogs retrieved from the database.
  - Each blog entry displays the title, image, and a brief description.

- **Update (Edit Blog)**
  - Users can edit existing blogs by modifying any field.
  - Updates are saved in the database upon submission.

- **Delete (Remove Blog)**
  - Users can delete blogs.
  - A confirmation prompt ensures accidental deletions are avoided.

### 4. Blog Display & View Feature
- Each blog entry has a **View** button to open and read the full content of the blog.

## Installation & Setup

### 1. Clone the Repository
```sh
 git clone https://github.com/shivamaracd/Blog-Project.git
```

### 2. Backend Setup (Node.js & MySQL)
```sh
cd backend
npm install   # Install dependencies
cp .env.example .env  # Configure environment variables
node server.js  # Start the backend server
```

### 3. Frontend Setup (Angular)
```sh
cd frontend
npm install  # Install dependencies
ng serve  # Start the Angular application
```

## API Endpoints
| Endpoint         | Method | Description        |
|-----------------|--------|--------------------|
| `/register`     | POST   | Register a new user |
| `/login`        | POST   | Authenticate user |
| `/blogs`        | GET    | Get all blogs |
| `/blogs/:id`    | GET    | Get a single blog by ID |
| `/blogs`        | POST   | Create a new blog |
| `/blogs/:id`    | PUT    | Update an existing blog |
| `/blogs/:id`    | DELETE | Delete a blog |

## Technologies Used
- **Frontend:** Angular, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Token)

## Contributing
If you’d like to contribute, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the **MIT License**.

---
**Author:** Shivam Agrahari
