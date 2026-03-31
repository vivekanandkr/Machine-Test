# School Management Backend API

A Node.js/Express backend application for managing students and their marks with PostgreSQL database.

## Project Structure

```
Backend/
├── src/
│   ├── app.js                 # Express app setup
│   ├── controllers/           # Request handlers
│   ├── routes/                # API routes
│   ├── repositories/          # Database operations
│   ├── validations/           # Input validation schemas
│   ├── middlewares/           # Custom middleware
│   ├── utils/                 # Utility functions
│   └── db/                    # Database configuration
├── package.json
├── .env.example              # Environment variables template
└── README.md
```

## Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (comes with Node.js)

## Installation

### 1. Clone/Setup the Project

```bash
cd Backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- `express` - Web framework
- `pg` - PostgreSQL client
- `knex` - Query builder
- `joi` - Input validation
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `morgan` - HTTP request logger

### 3. Configure Environment Variables

Create a `.env` file in the project root by copying `.env.example`:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=school_db
PORT=3000
NODE_ENV=development
```

### 4. Create PostgreSQL Database

Open PostgreSQL CLI and create the database:

```sql
CREATE DATABASE school_db;
```

### 5. Initialize Database Schema

Run the SQL schema file to create tables and enums:

```bash
# Using psql (replace credentials as needed)
psql -U postgres -d school_db -f src/db/database.schema.sql
```

Or manually:

```bash
# Connect to PostgreSQL
psql -U postgres -d school_db

# Then paste the contents of src/db/database.schema.sql
```

**What the schema creates:**
- `standard_enum` - Valid student standards (1st-10th)
- `subject_enum` - Valid subjects (Hindi, English, Marathi, Maths, Science, Social Science, General Knowledge)
- `students` table - Stores student information
- `student_marks` table - Stores student marks with foreign key to students
- Index on `student_marks.student_id` for performance

## Running the Server

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
Server running on port 3000
```

## API Endpoints

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students (with pagination & filtering) |
| GET | `/students/:id` | Get student by ID |
| POST | `/students` | Create a new student |
| PUT | `/students/:id` | Update student |
| DELETE | `/students/:id` | Delete student |

### Marks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/marks/student/:student_id` | Get marks for a student |
| GET | `/marks/:id` | Get specific mark by ID |
| POST | `/marks/student/:student_id` | Create mark for a student |
| PUT | `/marks/:id` | Update mark |
| DELETE | `/marks/:id` | Delete mark |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## Example Requests

### Create a Student

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "roll_no": 1,
    "standard": "10th",
    "date_of_birth": "2008-03-15"
  }'
```

### Create a Mark

```bash
curl -X POST http://localhost:3000/marks/student/1 \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Maths",
    "score": 85
  }'
```

### Get All Students

```bash
curl "http://localhost:3000/students?page=1&limit=10&sortBy=name&order=asc"
```

## Validation Rules

### Student Creation
- `name` - String, 3-100 characters (required)
- `roll_no` - Positive integer (required)
- `standard` - One of: 1st-10th (required)
- `date_of_birth` - Valid date, not in future, format: YYYY-MM-DD (required)

### Mark Creation
- `subject` - One of: Hindi, English, Marathi, Maths, Science, Social Science, General Knowledge (required)
- `score` - Integer, 0-100 (required)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_USER` | PostgreSQL user | - |
| `DB_PASSWORD` | PostgreSQL password | - |
| `DB_NAME` | Database name | - |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:** Ensure PostgreSQL is running and credentials in `.env` are correct.

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:** Change PORT in `.env` or kill the process using port 3000.

### SQL Schema Error

**Solution:** Ensure you're connected to the correct database:
```bash
psql -U postgres -d school_db -f src/db/database.schema.sql
```

## Features

✅ **RESTful API** - Clean, standardized endpoints  
✅ **Input Validation** - Joi validation schemas  
✅ **Error Handling** - Global error handler with PostgreSQL error mapping  
✅ **Security** - Helmet, CORS, environment variables  
✅ **Logging** - Morgan request logging  
✅ **Database Constraints** - UNIQUE, FOREIGN KEY, CHECK constraints  
✅ **Pagination** - Offset-based pagination for students list  

## License

ISC
