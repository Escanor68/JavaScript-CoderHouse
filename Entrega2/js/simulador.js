const TASA_INTERES = 0.1;
const btnSimular = document.getElementById("simularBtn");
const btnBorrar = document.getElementById("borrarHistorial");
const resultadoDiv = document.getElementById("resultado");
const historialLista = document.getElementById("historialLista");

let historial = JSON.parse(localStorage.getItem("simulaciones")) || [];

btnSimular.addEventListener("click", simularPrestamo);
btnBorrar.addEventListener("click", borrarHistorial);
mostrarHistorial();

function simularPrestamo() {
  const nombre = document.getElementById("nombre").value.trim();
  const monto = parseFloat(document.getElementById("monto").value);
  const cuotas = parseInt(document.getElementById("cuotas").value);

  if (!nombre || isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
    resultadoDiv.innerHTML = `<p style="color:red">Por favor, completá todos los campos correctamente.</p>`;
    return;
  }

  const total = monto * Math.pow(1 + TASA_INTERES, cuotas);
  const cuotaMensual = total / cuotas;

  const simulacion = {
    nombre,
    monto,
    cuotas,
    total: total.toFixed(2),
    cuotaMensual: cuotaMensual.toFixed(2)
  };

  historial.push(simulacion);
  localStorage.setItem("simulaciones", JSON.stringify(historial));

  resultadoDiv.innerHTML = `
    <p>Hola <strong>${nombre}</strong>, este es el detalle de tu préstamo:</p>
    <ul>
      <li>Monto solicitado: $${monto}</li>
      <li>Cuotas: ${cuotas}</li>
      <li>Total a pagar: $${simulacion.total}</li>
      <li>Valor de cada cuota: $${simulacion.cuotaMensual}</li>
    </ul>
  `;

  mostrarHistorial();
}

function mostrarHistorial() {
  historialLista.innerHTML = "";

  if (historial.length === 0) {
    historialLista.innerHTML = "<li>No hay simulaciones previas.</li>";
    return;
  }

  historial.forEach((sim, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}) ${sim.nombre} - $${sim.monto} en ${sim.cuotas} cuotas ($${sim.cuotaMensual}/mes)`;
    historialLista.appendChild(li);
  });
}

function borrarHistorial() {
  localStorage.removeItem("simulaciones");
  historial = [];
  mostrarHistorial();
  resultadoDiv.innerHTML = "";
}