# DB Schema (In Progress)

## User Schema

- 3 Types of Users, Student, Teacher and Entrepreneur

### Student Schema (Can be added onto later)

- Name (String)
- Email (String, UNIQUE FIELD)
- Current Courses (Array, filled with document IDs of Courses enrolled)
- Passowrd (String, Hashed)
- StudentID (String, Hashed based on email)

### Student Endpoints (Can be added onto later)

- [ ] /getEnrolledCourses - Receives Student ID and returns list of all courses student is enrolled in
- [ ] /submitAssignment - Receives upload informations and posts it to DB, more to details to follow

### Teacher Schema (Can be added onto later)

- Name (String)
- Email (String, UNIQUE FIELD)
- Passowrd (String, Hashed)
- TeacherID (String, Hashed based on email)
- Courses Taught (Array, filled with document IDs of courses being taught by teacher)

### Teacher Endpoints (Can be added onto later)

- [ ] /getCurrentCourses - Receives TeacherID ID and returns list of all courses teacher is teaching
- [ ] /createAssignment - Receives Assignment and posts it to DB (More details to follow)

### Entrprepreneur Schema 

- Name (String)
- Email (String, UNIQUE FIELD)
- Passowrd (String, Hashed)
- Associated Startups (Array, Contains Document IDs of associated Startups)
- EntrepreneurID (String, Hashed based on email)

### Entrepreneur Endpoints

- [ ] /getCompany

### General User Schema

- Name (String)
- Email (String, UNIQUE FIELD)
- Current Courses (Array, filled with document IDs of Courses enrolled)
- Passowrd (String, Hashed)
- Type (String, has a value of either Student, Teacher, Entrepreneur)
- ID (String, corresponds to the ID of their document)

