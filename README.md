# School Management Backend API

A Node.js/Express backend application for managing students and their marks with PostgreSQL database.

## Installation

### 1. Clone/Setup the Project

```bash
cd Backend
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Configure Environment Variables

Create `.env` with your database credentials:

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