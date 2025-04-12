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

### **Register User**

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

### **Login User**

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

### **Login with Google OAuth**

- **Endpoint:** `GET /api/auth/google`
- **Description:** Open your browser to run the Endpoint, then follow the google login.

---

### **Check Status login with Google OAuth**

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

### **Logout User**

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

## **User API**

### **Get User Profile**

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

### **Get User by ID**

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

### **Add Topics**

- **Endpoint:** `POST /api/topics`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Request Body:**

  ```json
  {
    "name": "Education"
  }
  ```

- **Response:**

  ```json
  {
    "name": "Education",
    "_id": "67fa3ee963cd5a1d9a5ccaac",
    "createdAt": "2025-04-12T10:22:33.280Z",
    "updatedAt": "2025-04-12T10:22:33.280Z",
    "__v": 0
  }
  ```

  - **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.

### **Get Topics**

- **Endpoint:** `GET /api/topics`

- **Response:**

  ```json
  [
    {
      "_id": "67fa3ee963cd5a1d9a5ccaac",
      "name": "Education",
      "createdAt": "2025-04-12T10:22:33.280Z",
      "updatedAt": "2025-04-12T10:22:33.280Z",
      "__v": 0
    }
  ]
  ```

---

## **User Selected**

### **Add User selected Topics**

- **Endpoint:** `POST /users/select-topics`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Request Body:**

  ```json
  {
    "user_id": "67fa345193d81b9a3765b024",
    "topics": ["67fa3ee963cd5a1d9a5ccaac"]
  }
  ```

- **Response:**

  ```json
  {
    "message": "Topics saved for user",
    "user_topics": [
      {
        "user_id": "67fa345193d81b9a3765b024",
        "topic_id": "67fa3ee963cd5a1d9a5ccaac",
        "_id": "67fa403d63cd5a1d9a5ccab1",
        "__v": 0,
        "createdAt": "2025-04-12T10:28:13.760Z",
        "updatedAt": "2025-04-12T10:28:13.760Z"
      }
    ]
  }
  ```

  - **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.

### **Add User selected Word by Topics**

- **Endpoint:** `POST /users/select-words`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Request Body:**

  ```json
  {
    "user_id": "67fa345193d81b9a3765b024",
    "words": [
      { "word": "software", "translated_word": "program" },
      { "word": "capabilities", "translated_word": "kemampuan" }
    ]
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "message": "Words saved for learning",
    "data": [
      {
        "user_id": "67fa345193d81b9a3765b024",
        "word": "software",
        "translated_word": "program",
        "status": "learning",
        "_id": "67fa437f63cd5a1d9a5ccac4",
        "__v": 0,
        "createdAt": "2025-04-12T10:42:07.950Z",
        "updatedAt": "2025-04-12T10:42:07.950Z"
      },
      {
        "user_id": "67fa345193d81b9a3765b024",
        "word": "capabilities",
        "translated_word": "kemampuan",
        "status": "learning",
        "_id": "67fa437f63cd5a1d9a5ccac5",
        "__v": 0,
        "createdAt": "2025-04-12T10:42:07.950Z",
        "updatedAt": "2025-04-12T10:42:07.950Z"
      }
    ]
  }
  ```

  - **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.

---

## **Quizz API**

### **User Generate Quiz**

- **Endpoint:** `POST /quiz/generate`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Request Body:**

  ```json
  {
    "userId": "67fa345193d81b9a3765b024",
    "limit": 5
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "quizzes": [
      {
        "user_id": "67fa345193d81b9a3765b024",
        "word": "software",
        "translated_word": "program",
        "options": ["program", "kemampuan", "gadget", "peningkatan"],
        "correct_answer": "program",
        "status": "pending",
        "_id": "67fa442963cd5a1d9a5ccacc",
        "createdAt": "2025-04-12T10:44:57.223Z",
        "__v": 0
      },
      {
        "user_id": "67fa345193d81b9a3765b024",
        "word": "capabilities",
        "translated_word": "kemampuan",
        "options": ["kemampuan", "program", "infrastruktur", "gadget"],
        "correct_answer": "kemampuan",
        "status": "pending",
        "_id": "67fa442963cd5a1d9a5ccacd",
        "createdAt": "2025-04-12T10:44:57.224Z",
        "__v": 0
      }
    ]
  }
  ```

  - **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.

### **User Submit Quiz**

- **Endpoint:** `POST /quiz/submit`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Request Body:**

  ```json
  {
    "userId": "67fa345193d81b9a3765b024",
    "quizId": "67fa442963cd5a1d9a5ccacc",
    "selectedAnswer": "program"
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "result": {
      "isCorrect": true,
      "correct_answer": "program"
    }
  }
  ```

  - **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.

### **Get Score by User**

- **Endpoint:** `GET /quiz/score/:userId`
- **Headers:**
  ```
  Authorization: Session <session_token>
  ```
- **Response:**

  ```json
  {
    "total": 2,
    "correct": 2,
    "score": 100
  }
  ```

- **Notes:**
  - This endpoint can only be accessed by authenticated users.
  - It does not return the user's email for privacy reasons.
  - Only user id that metch will show

---

<!-- ---

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

--- -->

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
