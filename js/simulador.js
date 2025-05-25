const TASA_INTERES = 0.1;
let nombreUsuario;
let prestamos = [];

function solicitarNombre() {
  nombreUsuario = prompt("¡Bienvenido! ¿Cuál es tu nombre?");
  alert(`Hola ${nombreUsuario}, vamos a simular tu préstamo.`);
}

function simularPrestamo() {
  let monto = parseFloat(prompt("¿Cuánto dinero necesitas?"));
  let cuotas = parseInt(prompt("¿En cuántas cuotas querés pagarlo?"));

  if (isNaN(monto) || isNaN(cuotas) || monto <= 0 || cuotas <= 0) {
    alert("Ingresaste valores inválidos. Intenta nuevamente.");
    return;
  }

  let totalConInteres = monto * Math.pow(1 + TASA_INTERES, cuotas);
  let cuotaMensual = totalConInteres / cuotas;

  prestamos.push({
    monto: monto,
    cuotas: cuotas,
    total: totalConInteres.toFixed(2),
    cuotaMensual: cuotaMensual.toFixed(2),
  });

  alert(
    `Simulación para ${nombreUsuario}:\n\n` +
    `Monto solicitado: $${monto}\n` +
    `Cuotas: ${cuotas}\n` +
    `Total a pagar: $${totalConInteres.toFixed(2)}\n` +
    `Valor de cada cuota: $${cuotaMensual.toFixed(2)}`
  );
}

function mostrarHistorial() {
  if (prestamos.length === 0) {
    console.log("No hay simulaciones realizadas.");
    return;
  }

  console.log("Historial de simulaciones:");
  prestamos.forEach((prestamo, index) => {
    console.log(
      `#${index + 1} - Monto: $${prestamo.monto}, Cuotas: ${prestamo.cuotas}, ` +
      `Total: $${prestamo.total}, Cuota mensual: $${prestamo.cuotaMensual}`
    );
  });
}

function ejecutarSimulador() {
  solicitarNombre();

  do {
    simularPrestamo();
  } while (confirm("¿Querés realizar otra simulación?"));

  mostrarHistorial();
  alert("Gracias por usar el simulador. ¡Hasta luego!");
}

ejecutarSimulador();
