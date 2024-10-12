// server/index.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Basic CRUD operations using a JSON file
const dataFile = 'employees.json';

// Get all employees
app.get('/employees', (req, res) => {
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    res.send(JSON.parse(data || '[]'));
  });
});

// Add a new employee
app.post('/employees', (req, res) => {
  const newEmployee = req.body;
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    const employees = JSON.parse(data || '[]');
    employees.push(newEmployee);
    fs.writeFile(dataFile, JSON.stringify(employees), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.status(201).send(newEmployee);
    });
  });
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    let employees = JSON.parse(data || '[]');
    employees = employees.map(emp => (emp.id === id ? { ...emp, ...req.body } : emp));
    fs.writeFile(dataFile, JSON.stringify(employees), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.send(req.body);
    });
  });
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data');
    let employees = JSON.parse(data || '[]');
    employees = employees.filter(emp => emp.id !== id);
    fs.writeFile(dataFile, JSON.stringify(employees), (err) => {
      if (err) return res.status(500).send('Error saving data');
      res.status(204).send();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
