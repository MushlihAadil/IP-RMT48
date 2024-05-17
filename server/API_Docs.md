# My News Portal App Server
Harry Potter Website API DOCS is an application to show you the Harry Potter's world. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## Endpoints :

List of available endpoints:

### User :
- `POST /registe`
- `POST /login`
- `PATCH /profile-picture`

### Book (Main Entity) :
- `GET /books/`
- `GET /books/:id`

### Favourite (Secondary Entity) :
- `GET /favpurites/`
- `POST /favpurites/:bookId`
- `PUT /favpurites/:id`
- `DELETE /favpurites/:id`

&nbsp;

## Detailed Endpoint :
- ## User 
### POST /register

> Register new user

_Request Headers_
```
Not Needed
```

_Request Body_
```
{
  "username" : "string" (required)
  "email" : "string" (unique, required)
  "password" : "string" (hashed, required)
  "phoneNumber" : "string"
}
```

_Response (201 - Created)_
```
{
    "username" : "useruser" (required)
    "email" : "useruser@mail.com" (unique, required)
    "password" : "useruser" (hashed, required)
    "role" : "User" (defaultValue = "User")
    "phoneNumber" : "111-111-111"
    "profilePicture" : "https://res.cloudinary.com/d3711111/image/upload/v1621069111/default-profile_p1j42o.png" (defaultValue)
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Username is required"
},
{
  "message": "Email is required"
},
{
  "message": "Email is already Exists"
},
{
  "message": "Invalid Email format"
},
{
  "message": "Password is required"
}
```

&nbsp;

---
### POST /login

> Login using user account

_Request Headers_
```
Not Needed
```

_Request Body_
```
{
  "username" : "string" (required)
  "email" : "string" (unique, required)
  "password" : "string" (hashed, required)
}
```

_Response (200 - OK)_
```
{
    "accsess_token": "string"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Username is required"
},
{
  "message": "Email is required"
},
{
  "message": "Password is required"
}
```

&nbsp;

---
### PATCH /profile-picture

> Update image with multer

_Request Header_
```
{
  "access_token": "string"
}
```

_Request User_
```
Not Needed
```

_Request Params_
```
Not Needed
```

_Request Body_
```
Not Needed
```

_Request File_
```
{
  "File" : "Any images file"
}
```

_Response (200 - OK)_
```
{
  "profilePicture": "https://res.cloudinary.com/dsfbntcwf/image/upload/v1715887106/profilePictures/bpkgqhv6ugu1cwlhkmyw.jpg",
    "message": "Your profile picture success to update"
}
```

_Response (404 - Bad Request)_
```
{
  "message": "Please upload an image file!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "User you're looking for doesn't exist"
}
```

Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

---

- ## Books
### GET /books

> Get all Books

_Request Headers_
```
Not Needed
```

_Request Body_
```
Not Needed
```

_Response (200 - OK)_
```
[
    {
        "id": 1,
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J. K. Rowling",
        "releaseDate": "Jun 26, 1997",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/1.png",
        "description": "On his birthday, Harry Potter discovers that he is the son of two well-known wizards, from whom he has inherited magical powers. He must attend a famous school of magic and sorcery, where he establishes a friendship with two young men who will become his companions on his adventure. During his first year at Hogwarts, he discovers that a malevolent and powerful wizard named Voldemort is in search of a philosopher's stone that prolongs the life of its owner.",
        "price": 227000,
        "pages": 223,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 2,
        "title": "Harry Potter and the chamber of secrets",
        "author": "J. K. Rowling",
        "releaseDate": "Jul 2, 1998",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/2.png",
        "description": "Harry Potter and the sophomores investigate a malevolent threat to their Hogwarts classmates, a menacing beast that hides within the castle.",
        "price": 227000,
        "pages": 251,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 3,
        "title": "Harry Potter and the Prisoner of Azkaban",
        "author": "J. K. Rowling",
        "releaseDate": "Jul 8, 1999",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/3.png",
        "description": "Harry's third year of studies at Hogwarts is threatened by Sirius Black's escape from Azkaban prison. Apparently, it is a dangerous wizard who was an accomplice of Lord Voldemort and who will try to take revenge on Harry Potter.",
        "price": 136000,
        "pages": 317,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 4,
        "title": "Harry Potter and the Goblet of Fire",
        "author": "J. K. Rowling",
        "releaseDate": "Jul 8, 2000",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/4.png",
        "description": "Hogwarts prepares for the Triwizard Tournament, in which three schools of wizardry will compete. To everyone's surprise, Harry Potter is chosen to participate in the competition, in which he must fight dragons, enter the water and face his greatest fears.",
        "price": 205000,
        "pages": 636,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 5,
        "title": "Harry Potter and the Order of the Phoenix",
        "author": "J. K. Rowling",
        "releaseDate": "Jun 21, 2003",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/5.png",
        "description": "In his fifth year at Hogwarts, Harry discovers that many members of the wizarding community do not know the truth about his encounter with Lord Voldemort. Cornelius Fudge, Minister of Magic, appoints Dolores Umbridge as Defense Against the Dark Arts teacher because he believes that Professor Dumbledore plans to take over his job. But his teachings are inadequate, so Harry prepares the students to defend the school against evil.",
        "price": 260000,
        "pages": 766,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 6,
        "title": "Harry Potter and the Half-Blood Prince",
        "author": "J. K. Rowling",
        "releaseDate": "Jul 16, 2005",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/6.png",
        "description": "Harry discovers a powerful book and, while trying to discover its origins, collaborates with Dumbledore in the search for a series of magical objects that will aid in the destruction of Lord Voldemort.",
        "price": 245000,
        "pages": 607,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 7,
        "title": "Harry Potter and the Deathly Hallows",
        "author": "J. K. Rowling",
        "releaseDate": "Jul 21, 2007",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/7.png",
        "description": "Harry, Ron and Hermione go on a dangerous mission to locate and destroy the secret of Voldemort's immortality and destruction - the Horcruces. Alone, without the guidance of their teachers or the protection of Professor Dumbledore, the three friends must lean on each other more than ever. But there are Dark Forces in between that threaten to tear them apart. Harry Potter is getting closer and closer to the task for which he has been preparing since the first day he set foot in Hogwarts: the last battle with Voldemort.",
        "price": 296000,
        "pages": 607,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    },
    {
        "id": 8,
        "title": "Harry Potter and the Cursed Child",
        "author": "J. K. Rowling",
        "releaseDate": "Jul 30, 2016",
        "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/8.png",
        "description": "Harry's second son entered Hogwarts, but in Slytherin. His relationship with Harry is getting worse and he became close friends with Draco's son, Scorpius Malfoy who is said to be Lord Voldemort's son.",
        "price": 168000,
        "pages": 336,
        "createdAt": "2024-05-15T23:44:21.174Z",
        "updatedAt": "2024-05-15T23:44:21.174Z"
    }
]
```

&nbsp;

---
### GET /books/:id

> Get Books by Id

_Request Headers_
```
Not Needed
```

_Request Params_
```
{
  "id": "integer"
}
```

_Request Body_
```
Not Needed
```

_Response (200)_
```
{
    "id": 1,
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J. K. Rowling",
    "releaseDate": "Jun 26, 1997",
    "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/1.png",
    "description": "On his birthday, Harry Potter discovers that he is the son of two well-known wizards, from whom he has inherited magical powers. He must attend a famous school of magic and sorcery, where he establishes a friendship with two young men who will become his companions on his adventure. During his first year at Hogwarts, he discovers that a malevolent and powerful wizard named Voldemort is in search of a philosopher's stone that prolongs the life of its owner.",
    "price": 227000,
    "pages": 223,
    "createdAt": "2024-05-15T23:44:21.174Z",
    "updatedAt": "2024-05-15T23:44:21.174Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Book you're looking for doesn't exist"
}
```

&nbsp;

---

Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

---

- ## Favourite
### GET /favourites

> Get all favourites

_Request Header_
```
{
  "access_token": "Bearer token"
}
```

_Request Body_
```
Not Needed
```

_Response (200 OK)_
```
[
    {
        "userId": 3,
        "bookId": 2,
        "quantity": 1,
        "totalPrice": 227000,
        "createdAt": "2024-05-16T19:21:17.973Z",
        "updatedAt": "2024-05-16T19:21:17.973Z",
        "Book": {
            "id": 2,
            "title": "Harry Potter and the chamber of secrets",
            "author": "J. K. Rowling",
            "releaseDate": "Jul 2, 1998",
            "imageUrl": "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/2.png",
            "description": "Harry Potter and the sophomores investigate a malevolent threat to their Hogwarts classmates, a menacing beast that hides within the castle.",
            "price": 227000,
            "pages": 251
        }
    }
]
```

&nbsp;

---
### POST /favourites/:bookId

> Add book to favourites by bookId

_Request Header_
```
{
  "access_token": "Bearer token"
}
```

_Request Params_
```
{
  "bookId": "integer"
}
```

_Response (201 - Created)_
```
{
    "userId": 3,
    "bookId": 2,
    "quantity": 1,
    "totalPrice": 227000,
    "updatedAt": "2024-05-16T19:21:17.973Z",
    "createdAt": "2024-05-16T19:21:17.973Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "This book is already in your favourites"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Book you're looking for doesn't exist"
}
```

&nbsp;

---
### PUT /favourites/:id

> Update favourites attribute by id

_Request Header_
```
{
  "access_token": "string" (User only can update his own)
}
```

_Request Params_
```
{
  "id": "integer"
}
```

_Request Body_
```
{
    "quantity" : 3
}
```

_Response (200 - OK)_
```
{
  "message" : "Favourite with id ${id} has been Updated"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "Unauthorized User"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Favourite you're looking for doesn't exist"
}
```

&nbsp;

---
### DELETE /favourites/:id

> Delete asset by Id

_Request Header_
```
{
  "access_token": "string" (User only can update his own)
}
```

_Request Params_
```
{
  "id": "integer"
}
```

_Request Body_
```
Not Needed
```

_Response (200 - OK)_
```
{
  "message" : "Favourite with id ${id} has been Deleted"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "Unauthorized User"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Favourite you're looking for doesn't exist"
}
```

Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

---

