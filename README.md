## School APIs (Node.js + Express + MySQL)

Two APIs:
- `POST /addSchool` — add a school (name, address, latitude, longitude)
- `GET  /listSchools?latitude=..&longitude=..&limit=...` — list schools sorted by distance (km)


## 1) Prerequisites
- Node.js 18+
- MySQL 8+ (local )


## 2) Setup
```bash
cp .env.example .env
# edit .env with your DB credentials
#like
    #PORT=3000
    #DB_HOST=localhost
    #DB_PORT=3306
    #DB_USER=root
    #DB_PASSWORD=******
    #DB_NAME=schooldb

  #On REnder port = 10000                  //for information

npm install
# create DB/table
# in MySQL shell:
#   CREATE DATABASE schooldb;
#   USE schooldb;
# then run the schema file:
#   SOURCE /absolute/path/to/db/schema.sql;
npm run dev
```
Server will start at `http://localhost:3000`


## 3) Postman
Import `postman/SchoolAPIs.postman_collection.json` and use the two ready requests:
- Add School (POST)
- List Schools (GET)


## 4) Endpoints

### POST /addSchool
**Body (JSON)**
```json
{
  "name": "St. Mary Convent School",
  "address": "Bankhedi, Hoshangabad, MP",
  "latitude": 22.493,
  "longitude": 77.773
}
```
**Response 201**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "St. Mary Convent School",
    "address": "Bankhedi, Hoshangabad, MP",
    "latitude": 22.493,
    "longitude": 77.773
  }
}
```

### GET /listSchools?latitude=23.2599&longitude=77.4126&limit=50
**Response 200**
```json
{
  "success": true,
  "message": "Schools sorted by proximity",
  "data": [
    {
      "id": 1,
      "name": "St. Mary Convent School",
      "address": "Bankhedi, Hoshangabad, MP",
      "latitude": 22.493,
      "longitude": 77.773,
      "distance_km": 151.23
    }
  ]
}
```


## 5) Deployment (one easy combo)

###  — PlanetScale (MySQL) + Render (Node server)
**Render**
   - New Web Service → connect this repo.
   - Runtime: Node, Build command: `npm install`, Start command: `npm start`.
   - Set Environment variables in Render:
     - `PORT` → `10000` (Render provides) or leave blank
     - `DB_HOST`, `DB_PORT` (usually 3306), `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
   - Deploy and copy the live URL.



## 6) Useful Notes
- Distance formula uses Haversine (approximate great-circle distance) with Earth radius ~6371 km.
- Inputs are validated with Joi.
- Rate limiting + Helmet are enabled.
- MySQL connections are pooled via `mysql2/promise`.


## folder Stracture

school_B/
├── db/                                                   # Database related files
│ └── schema.sql                                          # SQL script to create schools table
│
├── src/                                                   # Source code
│ ├── controllers/                                        # Controller logic (business logic)
│ │ └── school.controller.js
│ │
│ ├── routes/                                             # API route definitions
│ │ └── school.routes.js
│ │
│ ├── validators/                                         # Input validation schemas
│ │ └── school.validator.js
│ │
│ ├── app.js                                             # Express app setup (middlewares, routes)
│ ├── server.js                                           # Entry point (starts server, DB check)
│ ├── db.js                                               # MySQL connection pool
│ └── dbTest.js                                           # Simple script to test DB connection
│
|---School_APIs.postman_collection.json                   # for postman import and use to test api
├── .env                                                 # Environment variables (DB config, port)
├── .gitignore                                            # Ignore node_modules, .env, etc.
├── package.json                                          # Project metadata & dependencies
├── package-lock.json                                     #  Dependency lock file
└── README.md                                             # Project documentation



<div align="center">

**Star this repo if you find it helpful! **

Built with ❤️ by [ SAM ](https://github.com/sameer2210)

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://portfolio-coral-two-16.vercel.app)

</div>

**Happy coding!**