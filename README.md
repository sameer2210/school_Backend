# School APIs (Node.js + Express + MySQL)

A RESTful API service for managing schools with location-based proximity search functionality.

## Features
- **Add Schools**: Store school information with name, address, and GPS coordinates
- **Proximity Search**: Find schools sorted by distance from a given location
- **Input Validation**: Robust validation using Joi schema validation
- **Security**: Rate limiting, CORS, and security headers with Helmet
- **Database**: MySQL with connection pooling for optimal performance

## API Endpoints
- `POST /addSchool` — Add a new school with location data
- `GET /listSchools` — List schools sorted by proximity to given coordinates

## Prerequisites
- **Node.js** 18+
- **MySQL** 8+ (local or cloud)
- **Git** (for cloning the repository)

## Quick Setup

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd school_B
npm install
```

### 2. Environment Configuration
```bash
# Copy the environment template
cp env.example .env

# Edit .env with your database credentials
# Example:
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=schooldb
```

### 3. Database Setup
```sql
-- Create database and tables
CREATE DATABASE IF NOT EXISTS schooldb;
USE schooldb;

-- Run the schema file
SOURCE /absolute/path/to/db/schema.sql;
```

### 4. Start Development Server
```bash
npm run dev
```

Server will start at `http://localhost:3000`

## API Documentation

### POST /addSchool
Add a new school to the database.

**Request Body (JSON):**
```json
{
  "name": "St. Mary Convent School",
  "address": "Bankhedi, Hoshangabad, MP",
  "latitude": 22.493,
  "longitude": 77.773
}
```

**Response (201 Created):**
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

### GET /listSchools
Get schools sorted by proximity to specified coordinates.

**Query Parameters:**
- `latitude` (required): Your latitude (-90 to 90)
- `longitude` (required): Your longitude (-180 to 180)
- `limit` (optional): Maximum number of schools to return (1-1000, default: 100)

**Example Request:**
```
GET /listSchools?latitude=23.2599&longitude=77.4126&limit=50
```

**Response (200 OK):**
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
      "distance": 151.23
    }
  ]
}
```

## Testing with Postman

1. Import the provided Postman collection: `School_APIs.postman_collection.json`
2. Update the base URL in the collection variables
3. Use the pre-configured requests for testing both endpoints

## Deployment

### Render + PlanetScale (Recommended)
1. **PlanetScale**: Create a MySQL database and get connection details
2. **Render**: Deploy as a Web Service
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set environment variables (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
   - Set PORT to 10000 (Render's default)

### Environment Variables for Production
```bash
PORT=10000
DB_HOST=your_planetscale_host
DB_PORT=3306
DB_USER=your_planetscale_user
DB_PASSWORD=your_planetscale_password
DB_NAME=your_planetscale_database
```

## Project Structure
```
school_B/
├── db/                          # Database schema
│   └── schema.sql              # MySQL table creation script
├── src/                         # Source code
│   ├── controllers/            # Business logic
│   │   └── school.controller.js
│   ├── routes/                 # API route definitions
│   │   └── school.routes.js
│   ├── validators/             # Input validation schemas
│   │   └── school.validator.js
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point
│   └── db.js                   # Database connection pool
├── env.example                  # Environment variables template
├── eslint.config.js            # ESLint configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Technical Details

### Distance Calculation
Uses the Haversine formula to calculate great-circle distances between coordinates:
- Earth radius: ~6371 km
- Accurate for most practical applications
- Results in kilometers

### Security Features
- **Rate Limiting**: 120 requests per minute per IP
- **CORS**: Configurable cross-origin requests
- **Helmet**: Security headers protection
- **Input Validation**: Joi schema validation for all inputs
- **SQL Injection Protection**: Parameterized queries

### Database
- **Connection Pooling**: Efficient connection management
- **Keep-alive**: Periodic connection health checks
- **Error Handling**: Graceful connection failure handling

## Development

### Available Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run lint     # Run ESLint for code quality
```

### Code Quality
- ESLint v9+ configuration included
- Modern ES modules syntax
- Async/await pattern for database operations
- Comprehensive error handling

## Troubleshooting

### Common Issues
1. **Database Connection Failed**: Check your `.env` file and MySQL service
2. **Port Already in Use**: Change PORT in `.env` or kill existing process
3. **Validation Errors**: Ensure all required fields are provided with correct types

### Logs
- Server logs show connection status and errors
- Database connection logs are displayed on startup
- Keep-alive pings every 5 minutes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check code quality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

<div align="center">

**Built with ❤️ by [Sameer Khan](https://github.com/sameer2210)**

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://portfolio-coral-two-16.vercel.app)

**Star this repo if you find it helpful! **

</div>