// client/script.js
const employeeList = document.getElementById('employee-list');
const employeeForm = document.getElementById('employee-form');

const fetchEmployees = async () => {
    const response = await fetch('http://localhost:5000/employees');
    const employees = await response.json();
    employeeList.innerHTML = '';
    employees.forEach(emp => {
        const li = document.createElement('li');
        li.textContent = `${emp.name} - ${emp.email}`;
        li.appendChild(createDeleteButton(emp.id));
        employeeList.appendChild(li);
    });
};

const createDeleteButton = (id) => {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = async () => {
        await fetch(`http://localhost:5000/employees/${id}`, { method: 'DELETE' });
        fetchEmployees();
    };
    return button;
};

employeeForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: Date.now().toString(), name, email }),
    });
    fetchEmployees();
    employeeForm.reset();
};

fetchEmployees(); // Initial fetch
