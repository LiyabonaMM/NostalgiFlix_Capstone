# 🎬 **NostalgiFlix Capstone API**

Welcome to the NostalgiFlix API. This document provides you with details on how to access and utilize the various endpoints available.

---
## Live API - https://backendnost.onrender.com

## 🎥 **Movies Endpoint**

### 1. Get All Movies
- **Endpoint:** [https://backendnost.onrender.com/api/movies/movies](https://backendnost.onrender.com/api/movies/movies)
- **Method:** GET

### 2. Get Movie by ID
- **Endpoint:** [https://backendnost.onrender.com/api/movies/movie/:id](https://backendnost.onrender.com/api/movies/movie/:id) 
   > Replace `:id` with the actual movie ID.
- **Method:** GET

### 3. Create a New Movie
- **Endpoint:** [https://backendnost.onrender.com/api/movies/movie](https://backendnost.onrender.com/api/movies/movie)
- **Method:** POST
- **Headers:** `{ "Content-Type": "application/json" }`
- **Body:**
```json
{
  "title": "Your Movie Title",
  "description": "Your Movie Description",
  "releaseDate": "YYYY-MM-DD",
  "rating": "Your Movie Rating",
  "imageUrl": "URL to the Movie Image",
  "price": "Movie Price"
}
```

### 4. Update an Existing Movie
- **Endpoint:** [https://backendnost.onrender.com/api/movies/movie/:id](https://backendnost.onrender.com/api/movies/movie/:id) 
   > Replace `:id` with the actual movie ID.
- **Method:** PUT
- **Headers:** `{ "Content-Type": "application/json" }`
- **Body:**
```json
{
  "title": "Updated Movie Title",
  "description": "Updated Movie Description",
  "releaseDate": "Updated YYYY-MM-DD",
  "rating": "Updated Movie Rating",
  "imageUrl": "Updated URL to the Movie Image",
  "price": "Updated Movie Price"
}
```

### 5. Delete a Movie
- **Endpoint:** [https://backendnost.onrender.com/api/movies/movie/:id](https://backendnost.onrender.com/api/movies/movie/:id) 
   > Replace `:id` with the actual movie ID.
- **Method:** DELETE

---

## 👥 **Users Endpoint**

### 1. Registration
- **Endpoint:** `/api/users/register`
- **Method:** POST
- **Payload:**
```json
{
  "firstName": "YourName",
  "lastName": "Doe",
  "email": "youremail@example.com",
  "password": "password123",
  "adminCode": "liyaAdmin123"
}
```
🛠 **Test in Postman:** Set method to POST, provide the URL, and ensure the payload is set to JSON type under the Body tab.

### 2. Login
- **Endpoint:** `/api/users/login`
- **Method:** POST
- **Payload:**
```json
{
  "email": "youremail@example.com",
  "password": "password123"
}
```
🛠 **Test in Postman:** Set method to POST, provide the URL, and use the above payload in the Body.

### 3. Get All Users
- **Endpoint:** `/api/users/all`
- **Method:** GET
🛠 **Test in Postman:** Set method to GET and provide the URL.

### 4. Private Route (Sample)
- **Endpoint:** `/api/users/private`
- **Method:** GET
🛠 **Test in Postman:** Set method to GET, provide the URL, and in the Headers tab, add key Authorization with value `Bearer YOUR_JWT_TOKEN`.

### 5. View Profile
- **Endpoint:** `/api/users/profile`
- **Method:** GET
🛠 **Test in Postman:** As explained in the Private Route testing above.

### 6. Update Profile
- **Endpoint:** `/api/users/profile/update/:userId`
- **Method:** PUT
- **Payload:**
```json
{
  "firstName": "Updateyourname",
  "lastName": "UpdatedName",
  "email": "updated@example.com",
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```
🛠 **Test in Postman:** Set method to PUT, provide the URL, use the above payload in the Body, and add Authorization.

### 7. Delete User
- **Endpoint:** `/api/users/delete`
- **Method:** DELETE
🛠 **Test in Postman:** Set method to DELETE, provide the URL, and add Authorization.

---

# 🙏 THANK YOU !!!

