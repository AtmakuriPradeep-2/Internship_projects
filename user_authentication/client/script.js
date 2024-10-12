// client/script.js
document.getElementById('register-form').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    alert('User registered!');
    document.getElementById('register-form').reset();
};

document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
    document.getElementById('login-form').reset();
};

document.getElementById('protected-route').onclick = async () => {
    const response = await fetch('http://localhost:5000/api/auth/protected', {
        method: 'GET',
        credentials: 'include',
    });

    const message = await response.text();
    document.getElementById('protected-message').innerText = message;
};
