# NostalgiFlix_Capstone Api

# How to test my Endpoints?

API Endpoints:
1.	Get all movies:
•	Endpoint: https://backendnost.onrender.com/api/movies/movies
•	Method: GET
2.	Get movie by ID:
•	Endpoint: https://backendnost.onrender.com/api/movies/movie/:id (Replace :id with the actual movie ID)
•	Method: GET
3.	Create a new movie:
•	Endpoint: https://backendnost.onrender.com/api/movies/movie
•	Method: POST
•	Headers: { "Content-Type": "application/json" }
•	Body:
{
  "title": "Your Movie Title",
  "description": "Your Movie Description",
  "releaseDate": "YYYY-MM-DD",
  "rating": "Your Movie Rating",
  "imageUrl": "URL to the Movie Image",
  "price": "Movie Price"
}
Update an existing movie:
•	Endpoint: https://backendnost.onrender.com/api/movies/movie/:id (Replace :id with the actual movie ID)
•	Method: PUT
•	Headers: { "Content-Type": "application/json" }
•	Body:{ "title": "Updated Movie Title", "description": "Updated Movie Description", "releaseDate": "Updated YYYY-MM-DD", "rating": "Updated Movie Rating", "imageUrl": "Updated URL to the Movie Image", "price": "Updated Movie Price" }
Delete a movie:

Endpoint: https://backendnost.onrender.com/api/movies/movie/:id
(Replace :id with the actual movie ID)
Method: DELETE
# USERS ENDPOINT

. Registration
•	Endpoint: /api/users/register
•	Method: POST
•	Payload:
jsonCopy code
{ "firstName": "YourName", "lastName": "Doe", "email": "ypuremail@example.com", "password": "password123", "adminCode": "liyaAdmin123" // Optional, but if provided and matches, will make the user an admin. } 
Test in Postman:
•	Set method to POST.
•	URL: https://backendnost.onrender.com/api/users/register
•	Under the Body tab, select raw and type the above payload. Ensure you have set JSON as the content type.
2. Login
•	Endpoint: /api/users/login
•	Method: POST
•	Payload:
jsonCopy code
{ "email": "youremail@example.com", "password": "password123" } 
Test in Postman:
•	Set method to POST.
•	URL: https://backendnost.onrender.com/api/users/login
•	In the body, type the above payload.
3. Get All Users
•	Endpoint: /api/users/all
•	Method: GET
Test in Postman:
•	Set method to GET.
•	URL: https://backendnost.onrender.com/api/users/all
________________________________________
4. Private Route (Sample)
•	Endpoint: /api/users/private
•	Method: GET
Test in Postman:
•	Set method to GET.
•	URL: https://backendnost.onrender.com/api/users/private
•	Add Authorization: In the Headers tab, add a key Authorization with value Bearer YOUR_JWT_TOKEN (replace YOUR_JWT_TOKEN with the token received after login).
________________________________________
5. View Profile
•	Endpoint: /api/users/profile
•	Method: GET
Test in Postman:
•	Set method to GET.
•	URL: https://backendnost.onrender.com/api/users/profile
•	Add Authorization as explained in the Private Route testing above.
________________________________________
6. Update Profile
•	Endpoint: /api/users/profile/update/:userId
•	Method: PUT
•	Payload:
jsonCopy code
{ "firstName": "Updateyourname", "lastName": "UpdatedDname", "email": "updated@example.com", "oldPassword": "password123", "newPassword": "newpassword123" } 
Test in Postman:
•	Set method to PUT.
•	URL: https://backendnost.onrender.com/api/users/profile/update
•	In the body, type the above payload.
•	Add Authorization.
________________________________________
7. Delete User
•	Endpoint: /api/users/delete
•	Method: DELETE
Test in Postman:
•	Set method to DELETE.
•	URL: https://backendnost.onrender.com/api/users/delete
•	Add Authorization.
________________________________________
# THANK YOU !!!!
