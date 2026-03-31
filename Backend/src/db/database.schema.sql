-- Standard Enums
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'standard_enum'
    ) THEN
        CREATE TYPE standard_enum AS ENUM (
            '1st','2nd','3rd','4th','5th',
            '6th','7th','8th','9th','10th'
        );
    END IF;
END
$$;

-- Suject Enums
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'subject_enum'
    ) THEN
        CREATE TYPE subject_enum AS ENUM (
            'Hindi', 'English', 'Marathi', 'Maths', 'Science',
            'Social Science','General Knowledge'
        );
    END IF;
END
$$;

-- Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roll_no INT NOT NULL,
    standard standard_enum NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_roll_per_standard UNIQUE(standard, roll_no)
);

-- Student Marks Table
CREATE TABLE IF NOT EXISTS student_marks (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject subject_enum NOT NULL,
  score INT NOT NULL CHECK (score >=0 AND score <=100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on student_id
CREATE INDEX IF NOT EXISTS idx_student_marks_student_id
ON student_marks (student_id);