//const API_URL = "https://aplicacion-autenticacion-e-inventario.vercel.app/repuestos"; //es para utilizar con versel
//const API_URL = 'http://localhost:8000/repuestos';
//const API_URL = '/repuestos';


const baseURL = window.location.hostname.includes("localhost")
  ? "http://localhost:8000"
  : "";

const API_URL = `${baseURL}/repuestos`;


const form = document.getElementById("form-repuesto");
const tabla = document.getElementById("tabla-repuestos");

async function cargarRepuestos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    tabla.innerHTML = "";

    data.forEach(rep => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${rep.nombre}</td>
        <td>${rep.codigo}</td>
        <td>$${rep.precio}</td>
        <td>${rep.cantidad}</td>
        <td class="actions">
          <button onclick="editarRepuesto('${rep._id}')">✏️</button>
          <button class="delete" onclick="eliminarRepuesto('${rep._id}')">🗑️</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar repuestos:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevo = {
    nombre: document.getElementById("nombre").value,
    codigo: document.getElementById("codigo").value,
    precio: document.getElementById("precio").value,
    cantidad: document.getElementById("cantidad").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });

    if (res.ok) {
      alert("Repuesto agregado correctamente ✅");
      form.reset();
      cargarRepuestos();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  } catch (error) {
    alert("No se pudo conectar con el servidor.");
  }
});

async function eliminarRepuesto(id) {
  if (!confirm("¿Seguro que quieres eliminar este repuesto?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Repuesto eliminado 🗑️");
      cargarRepuestos();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  } catch (error) {
    alert("Error al eliminar repuesto.");
  }
}

async function editarRepuesto(id) {
  const nuevoPrecio = prompt("Nuevo precio:");
  const nuevaCantidad = prompt("Nueva cantidad:");

  if (!nuevoPrecio || !nuevaCantidad) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ precio: nuevoPrecio, cantidad: nuevaCantidad }),
    });
    if (res.ok) {
      alert("Repuesto actualizado ✅");
      cargarRepuestos();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  } catch (error) {
    alert("Error al actualizar repuesto.");
  }
}

cargarRepuestos();
