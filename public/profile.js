    // Comprueba token y pide /api/profile
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Si no hay token, vuelve al login
        location.href = '/login.html';
        return;
      }

      try {
        const res = await fetch('/api/profile', {
          headers: { 'Authorization': 'Bearer ' + token }
        });
        if (res.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem('token');
          location.href = '/login.html';
          return;
        }
        const json = await res.json();
        // document.getElementById('content').textContent = JSON.stringify(json, null, 2);
        console.log('Perfil:', json); // solo muestra en consola
      } catch (err) {
        // document.getElementById('content').textContent = 'Error al obtener perfil.';
        console.error('Error al obtener perfil:', err);

      }
    })();

    document.getElementById('btnLogout').addEventListener('click', () => {
      localStorage.removeItem('token');
      location.href = '/login.html';
    });