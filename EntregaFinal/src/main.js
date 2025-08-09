/**
 * TechStore - Archivo Principal
 * Punto de entrada de la aplicación con npm
 */

// Importar estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Importar estilos de Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Importar estilos personalizados
import './css/styles.css'

// Importar módulos de la aplicación
import { Utils } from './js/utils.js'
import './js/app.js'

// (Opcional) Exponer Utils globalmente si se necesita en el HTML
window.Utils = Utils

// Mensaje de confirmación de carga
console.log('🚀 TechStore cargado exitosamente con npm!') 