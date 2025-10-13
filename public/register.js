// const API = 'http://localhost:8000/api/auth';
 const API = "https://inventario-repuestos.vercel.app/api/auth"; //es para utilizar con versel
const out = document.getElementById('out');

document.getElementById('registerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
  };

  try {
    const res = await fetch(API + '/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    // leer JSON y actuar según status
    const json = await res.json();

    if (res.status === 201) {
      // Registro correcto
      // Opción A (simple): redirigir a la página de login
      out.textContent = 'Usuario creado correctamente. Redirigiendo a login...';
      // corta la espera mínima para que el usuario lea
      setTimeout(() => { location.href = '/login.html'; }, 500);

      // --- Opción B (auto-login) ---
      // Si prefieres auto-logear al usuario tras registrarse:
      // 1) llamar al endpoint de login automáticamente,
      // 2) guardar token y redirigir a profile.
      //
      // Descomenta si quieres auto-login:
      //
      const loginRes = await fetch(API + '/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      const loginJson = await loginRes.json();
      if (loginJson.token) {
        localStorage.setItem('token', loginJson.token);
        location.href = '/profile.html';
      }

    } else {
      // mostrar error devuelto por el servidor
      out.textContent = json.message || JSON.stringify(json);
    }
  } catch (err) {
    out.textContent = 'Error de red: ' + err.message;
  }
});
