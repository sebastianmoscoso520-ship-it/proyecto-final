const baseURL = window.location.hostname.includes("localhost")
  ? "http://localhost:8000"
  : "";
const API = `${baseURL}/api/auth`;
const out = document.getElementById('out');
const errorMessage = document.getElementById('errorMessage');

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = { email: form.email.value, password: form.password.value };

  // Ocultar mensajes de error previos
  errorMessage.style.display = 'none';
  errorMessage.textContent = '';

  try {
    const res = await fetch(API + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();

    if (res.ok && json.token) {
      // Guardar token y redirigir
      localStorage.setItem('token', json.token);
      location.href = '/profile.html';
    } else {
      // Mostrar mensaje de error
      errorMessage.textContent = json.message || 'Email o contraseña incorrectos';
      errorMessage.style.display = 'block';
      out.textContent = JSON.stringify(json);
    }
  } catch (err) {
    errorMessage.textContent = 'Error de red: ' + err.message;
    errorMessage.style.display = 'block';
    out.textContent = 'Error: ' + err.message;
  }
});
