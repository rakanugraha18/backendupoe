# English Upoe Learning API

## Overview

English Learning API is a RESTful API built with Express.js and MongoDB to help users learn English through topics, words, lessons, and quizzes.

## Base URL

```
http://localhost:5000/api
```

## Authentication

This API uses **session-based authentication with token caching**. Users must include the session token in requests after logging in.

Additionally, users can log in using **Google OAuth**.

---

## **Authentication API**

### **1. Register User**

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "johndoe@gmail.com",
    "password": "password123"
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User berhasil terdaftar dan login",
    "data": {
      "id": "67e2d9dbbb62dca2e27d7157",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "email": "johndoe@gmail.com"
    }
  }
  ```

### **2. Login User**

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "johndoe@gmail.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Login berhasil",
    "data": {
      "id": "67e03bf6b5da7efbd6c15dc2",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "email": "johndoe@gmail.com"
    }
  }
  ```
- **Notes:** The session token is stored in **Redis cache** and must be included in the `Authorization` header for authenticated requests.

---

### **3. Login with Google OAuth**

- **Endpoint:** `GET /api/auth/google`
- **Description:** Open your browser to run the Endpoint, then follow the google login.

---

### **4. Check Status login with Google OAuth**

- **Response:**
  ```json
  {
    "id": "67de72ea56eee7b05a4063f0",
    "firstName": "Recsy",
    "lastName": "LR",
    "email": "recsylr@gmail.com"
  }
  ```

---

### **5. Logout User**

- **Endpoint:** `POST /api/auth/logout`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

## **Topics API**

### **6. Get All Topics**

- **Endpoint:** `GET /api/topics`
- **Response:**
  ```json
  [
    {
      "_id": "65aefabcdef1234567890",
      "name": "Food & Drinks"
    },
    {
      "_id": "65aef123456789abcdef0",
      "name": "Travel & Places"
    }
  ]
  ```

---

## **Words API**

### **7. Get Words by Topic**

- **Endpoint:** `GET /api/words?topic_id=65aefabcdef1234567890`
- **Response:**
  ```json
  [
    {
      "_id": "65aef0987654321abcdef",
      "word": "Apple",
      "translation": "Apel",
      "example_sentence": "I eat an apple every day.",
      "difficulty": "Beginner"
    },
    {
      "_id": "65aef1234abcd5678ef90",
      "word": "Banana",
      "translation": "Pisang",
      "example_sentence": "Bananas are yellow.",
      "difficulty": "Beginner"
    }
  ]
  ```

---

## **User API**

### **8. Get User Profile**

- **Endpoint:** `GET /api/users/profile`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User berhasil diambil",
    "data": {
      "_id": "67e03bf6b5da7efbd6c15dc2",
      "email": "johndoe@gmail.com",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "level": "Intermediate",
      "selected_topics": ["65aefabcdef1234567890"],
      "daily_words": ["65aef0987654321abcdef"],
      "createdAt": "2025-03-23T16:51:02.113Z",
      "updatedAt": "2025-03-23T16:51:02.113Z",
      "__v": 0
    }
  }
  ```

### **9. Get User by ID**

- **Endpoint:** `GET /api/users/:id`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Response:**

  ```json
  {
    "_id": "65aef12345abcdef67890",
    "name": "John Doe",
    "level": "Intermediate",
    "selected_topics": ["65aefabcdef1234567890"],
    "daily_words": ["65aef0987654321abcdef"],
    "created_at": "2025-03-25T12:00:00.000Z"
  }
  ```

- **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.

---

## **Error Handling**

This API follows standard HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Successfully created resource
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Invalid or missing session token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server Error

## **License**

This project is licensed under the MIT License.
