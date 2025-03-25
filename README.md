# English Learning API

## Overview

English Learning API is a RESTful API built with Express.js and MongoDB to help users learn English through topics, words, lessons, and quizzes.

## Base URL

```
https://englishupoeapi.com
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
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "level": "Intermediate"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "65aef12345abcdef67890",
      "name": "John Doe",
      "email": "john@example.com",
      "level": "Intermediate"
    }
  }
  ```

### **2. Login User**

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "session_token": "session_token_here"
  }
  ```
- **Notes:** The session token is stored in **Redis cache** and must be included in the `Authorization` header for authenticated requests.

### **3. Login with Google OAuth**

- **Endpoint:** `GET /api/auth/google`
- **Description:** Redirects the user to Google for authentication.

- **Endpoint:** `GET /api/auth/google/callback`
- **Response:**
  ```json
  {
    "message": "Login successful",
    "session_token": "session_token_here",
    "user": {
      "_id": "65aef12345abcdef67890",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

### **4. Logout User**

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

## **User API**

### **5. Get User Profile**

- **Endpoint:** `GET /api/users/me`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Response:**
  ```json
  {
    "_id": "65aef12345abcdef67890",
    "name": "John Doe",
    "email": "john@example.com",
    "level": "Intermediate",
    "selected_topics": ["65aefabcdef1234567890"],
    "daily_words": ["65aef0987654321abcdef"],
    "created_at": "2025-03-25T12:00:00.000Z"
  }
  ```

### **6. Get User by ID**

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

## **Topics API**

### **7. Get All Topics**

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

### **8. Get Words by Topic**

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

## **Error Handling**

This API follows standard HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Successfully created resource
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Invalid or missing session token
- `404 Not Found` - Resource not found

## **License**

This project is licensed under the MIT License.
