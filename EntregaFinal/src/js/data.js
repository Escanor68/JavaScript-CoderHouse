/**
 * TechStore - Datos del Simulador
 * Carga asíncrona de datos desde JSON local
 */

let ecommerceData = null;

async function loadEcommerceData() {
    if (ecommerceData) return ecommerceData;
    const response = await fetch('./src/data/ecommerceData.json');
    if (!response.ok) throw new Error('No se pudo cargar ecommerceData.json');
    ecommerceData = await response.json();
    return ecommerceData;
}

export { loadEcommerceData }; 