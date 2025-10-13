// const API = 'http://localhost:8000/api/auth';
const API= "https://aplicacionAutenticacionEinventario.vercel.app/api/auth"; // es para utilizar con versel
const out = document.getElementById('out');

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = { email: form.email.value, password: form.password.value };

  try {
    const res = await fetch(API + '/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (res.ok && json.token) {
      // guardar token y redirigir a la página protegida
      localStorage.setItem('token', json.token);
      // redirige a profile
      location.href = '/profile.html';
    } else {
      out.textContent = json.message || JSON.stringify(json);
    }
  } catch (err) {
    out.textContent = 'Error de red: ' + err.message;
  }
});
