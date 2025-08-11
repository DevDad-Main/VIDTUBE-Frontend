const data = {
    "statusCode": 200,
    "data": [
        {
            "_id": "684c262f65aca515a5307b2a",
            "content": "This is my first tweet",
            "owner": {
                "_id": "6842704634e9849734a13084",
                "username": "viraj12",
                "email": "viraj.12@gmail.com",
                "fullname": "Viraj Sheth",
                "avatar": "http://res.cloudinary.com/ddwgvjj4a/image/upload/v1749184573/dri7hfr4avaepwevkqcm.jpg"
            },
            "createdAt": "2025-06-13T13:22:55.502Z",
            "updatedAt": "2025-06-13T13:22:55.502Z",
            "__v": 0,
            "likes": 1
        },
        {
            "_id": "684c2a820a1ce6b419a3f68d",
            "content": "finally i did",
            "owner": {
                "_id": "683fb400693ad3ffa8de637e",
                "username": "rohan12",
                "email": "rohan.12@gmail.com",
                "fullname": "Rohan Nayak",
                "avatar": "http://res.cloudinary.com/ddwgvjj4a/image/upload/v1749005307/rrtzkbnxlvyqoqxw7nuy.jpg"
            },
            "createdAt": "2025-06-13T13:41:22.470Z",
            "updatedAt": "2025-06-13T13:41:22.470Z",
            "__v": 0,
            "likes": 1
        },
        {
            "_id": "684c2aaf0a1ce6b419a3f690",
            "content": "This is my first tweet",
            "owner": {
                "_id": "6842704634e9849734a13084",
                "username": "viraj12",
                "email": "viraj.12@gmail.com",
                "fullname": "Viraj Sheth",
                "avatar": "http://res.cloudinary.com/ddwgvjj4a/image/upload/v1749184573/dri7hfr4avaepwevkqcm.jpg"
            },
            "createdAt": "2025-06-13T13:42:07.010Z",
            "updatedAt": "2025-06-13T13:42:07.010Z",
            "__v": 0,
            "likes": 0
        },
        {
            "_id": "684c2adb0a1ce6b419a3f693",
            "content": "finallly",
            "owner": {
                "_id": "683fb400693ad3ffa8de637e",
                "username": "rohan12",
                "email": "rohan.12@gmail.com",
                "fullname": "Rohan Nayak",
                "avatar": "http://res.cloudinary.com/ddwgvjj4a/image/upload/v1749005307/rrtzkbnxlvyqoqxw7nuy.jpg"
            },
            "createdAt": "2025-06-13T13:42:51.020Z",
            "updatedAt": "2025-06-13T13:42:51.020Z",
            "__v": 0,
            "likes": 1
        }
    ],
    "message": "Tweet fetched successfully.",
    "success": true
}

let likes = [];
likes.push(...data.data.map(comment => comment.likes));
console.log(likes);


if (data.statusCode === 201 || data.statusCode === 200) {
    console.log("data in response : ", data.message);
    //   return data.data;
}