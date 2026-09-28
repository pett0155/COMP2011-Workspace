import express from 'express';

const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Ada Lovelace", major: "Mathematics" },
  { id: 2, name: "Alan Turing", major: "Computer Science" }
];

// Task 2.1 & 2.2 - GET all students / filter by major
app.get('/api/students', (req, res) => {
  const { major } = req.query;

  if (major) {
    const filteredStudents = students.filter(
      student => student.major === major
    );

    return res.status(200).json(filteredStudents);
  }

  res.status(200).json(students);
});

// Task 2.3 - GET single student by ID
app.get('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(student => student.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.status(200).json(student);
});

// Task 3.1 - POST (Create) a new student
app.post('/api/students', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    major: req.body.major
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// Task 3.2 - PUT (Update) an existing student
app.put('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find(student => student.id === id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  if (req.body.name !== undefined) {
    student.name = req.body.name;
  }

  if (req.body.major !== undefined) {
    student.major = req.body.major;
  }

  res.status(200).json(student);
});

// Task 4.1 - Test error route
app.get('/api/test-error', (req, res, next) => {
  const error = new Error("Something went wrong!");
  next(error);
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Task 5.1 & 5.2 - Authentication middleware
const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth !== "admin123") {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  next();
};

// Task 5 - DELETE a student
app.delete('/api/students/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  students.splice(studentIndex, 1);

  res.status(204).send();
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server actively running on port ${PORT}`);
});