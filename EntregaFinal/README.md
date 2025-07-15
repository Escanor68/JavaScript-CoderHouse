# TechStore - Simulador de E-commerce
## Proyecto Final JavaScript CoderHouse

### 📋 Descripción del Proyecto

TechStore es un simulador completo de e-commerce desarrollado en JavaScript puro que demuestra las capacidades avanzadas del lenguaje y las mejores prácticas de desarrollo web. El proyecto simula una tienda online de tecnología con funcionalidades completas de compra y gestión de pedidos.

### 🎯 Objetivos Cumplidos

#### ✅ Objetivos Generales
- [x] Crear un simulador interactivo funcional
- [x] Implementar lógica de negocio completa
- [x] Desarrollar interfaz de usuario moderna y responsiva

#### ✅ Objetivos Específicos
- [x] **Utilizar datos remotos simulados con JSON**: Catálogo completo de productos, categorías y pedidos
- [x] **HTML interactivo generado desde JS**: Toda la interfaz se construye dinámicamente
- [x] **Uso de librerías externas**: Bootstrap 5, SweetAlert2, Font Awesome
- [x] **100% funcional**: Proceso completo de compra implementado
- [x] **Lógica de negocio completa**: Carrito, checkout, gestión de pedidos, perfil de usuario

### 🚀 Funcionalidades Implementadas

#### 🛍️ Catálogo de Productos
- **6 categorías** de productos (Laptops, Smartphones, Tablets, Accesorios, Gaming, Audio)
- **12 productos** con información detallada (precio, descripción, stock, rating)
- **Filtros avanzados** por precio y categoría
- **Búsqueda y navegación** intuitiva

#### 🛒 Sistema de Carrito
- **Agregar/eliminar productos** con controles de cantidad
- **Persistencia local** usando localStorage
- **Cálculo automático** de subtotal, envío e IVA
- **Resumen de compra** en tiempo real

#### 💳 Proceso de Checkout
- **Formulario de envío** con datos precargados
- **Múltiples métodos de pago** (Tarjeta de crédito, débito, transferencia)
- **Validación de datos** y confirmación de pedido
- **Simulación de procesamiento** de pago

#### 📦 Gestión de Pedidos
- **Historial completo** de pedidos realizados
- **Estados de pedido** (Pendiente, Completado, Cancelado)
- **Detalles de envío** y productos incluidos
- **Estadísticas de compra**

#### 👤 Perfil de Usuario
- **Información personal** editable
- **Estadísticas de compra** (total de pedidos, monto gastado)
- **Gestión de sesión** con logout

### 🛠️ Tecnologías Utilizadas

#### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y animaciones
- **JavaScript ES6+**: Programación orientada a objetos y funcional

#### Librerías Externas
- **Bootstrap 5.3.0**: Framework CSS para diseño responsivo
- **SweetAlert2**: Librería de alertas modernas (reemplaza alert/prompt/confirm)
- **Font Awesome 6.4.0**: Iconografía profesional

#### Características Técnicas
- **Programación Orientada a Objetos**: Clases AppState, TechStoreApp y Utils
- **Arquitectura Modular**: Separación de responsabilidades en archivos específicos
- **Manejo de Estado**: Gestión centralizada del estado de la aplicación
- **Eventos DOM**: Captura y manejo de eventos de usuario
- **LocalStorage**: Persistencia de datos del carrito
- **JSON**: Datos simulados estructurados
- **Funciones Utilitarias**: Reutilización de código común

### 📁 Estructura del Proyecto

```
EntregaFinal/
├── index.html          # Página principal (389 líneas)
├── css/
│   └── styles.css      # Estilos personalizados (392 líneas)
├── js/
│   ├── data.js         # Datos JSON del simulador (200+ líneas)
│   ├── utils.js        # Funciones auxiliares y utilidades (300+ líneas)
│   └── app.js          # Lógica principal de la aplicación (400+ líneas)
└── README.md           # Documentación del proyecto (190 líneas)
```

### 🎨 Diseño y UX

#### Características de Diseño
- **Diseño responsivo** que se adapta a todos los dispositivos
- **Paleta de colores** profesional y accesible
- **Tipografía** clara y legible
- **Iconografía** consistente con Font Awesome
- **Animaciones** suaves y profesionales

#### Experiencia de Usuario
- **Navegación intuitiva** con breadcrumbs
- **Feedback visual** inmediato en todas las acciones
- **Estados de carga** y confirmaciones
- **Mensajes de error** informativos
- **Interfaz limpia** y moderna

### 🔧 Criterios de Evaluación Cumplidos

#### ✅ Funcionalidad
- **Flujo completo** de entrada-procesamiento-salida
- **Sin errores de cómputo** en cálculos de precios
- **Validaciones** en formularios y datos

#### ✅ Interactividad
- **Inputs y eventos** adecuados en toda la aplicación
- **Salidas coherentes** basadas en datos ingresados
- **Visualización asíncrona** en HTML

#### ✅ Escalabilidad
- **Funciones con parámetros** para tareas específicas
- **Objetos con propiedades y métodos** relevantes
- **Arrays para agrupar valores** de forma dinámica
- **Recorrido óptimo** de colecciones

#### ✅ Integridad
- **Múltiples archivos JavaScript** (data.js, utils.js, app.js)
- **Referenciados correctamente** desde HTML
- **Información JSON** utilizada adecuadamente
- **Carga asíncrona** de datos
- **Arquitectura modular** con separación de responsabilidades

#### ✅ Legibilidad
- **Nombres significativos** para variables, funciones y objetos
- **Instrucciones legibles** y bien estructuradas
- **Comentarios oportunos** explicando la lógica
- **Código ordenado** en declaración y secuencia

### 🚀 Cómo Ejecutar el Proyecto

1. **Clonar o descargar** el proyecto
2. **Abrir** `index.html` en un navegador web moderno
3. **Explorar** las funcionalidades del simulador

### 📱 Compatibilidad

- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, móvil
- **JavaScript ES6+** requerido

### 🎯 Funcionalidades Destacadas

#### Simulación Realista
- **Proceso de compra completo** desde catálogo hasta confirmación
- **Gestión de inventario** con stock de productos
- **Cálculo de impuestos** (IVA 21%) y envío
- **Historial de transacciones** persistente

#### Interfaz Avanzada
- **Generación dinámica** de contenido HTML
- **Filtros interactivos** en tiempo real
- **Carrito persistente** entre sesiones
- **Alertas modernas** con SweetAlert2

#### Experiencia Completa
- **6 secciones principales** (Inicio, Productos, Carrito, Checkout, Pedidos, Perfil)
- **Navegación fluida** entre secciones
- **Datos precargados** en formularios
- **Validaciones** y confirmaciones

### 📊 Datos del Simulador

#### Productos Incluidos
- **MacBook Pro 14"** - $2,499.99
- **Dell XPS 13** - $1,299.99
- **iPhone 15 Pro** - $999.99
- **Samsung Galaxy S24** - $899.99
- **iPad Pro 12.9"** - $1,099.99
- **Samsung Galaxy Tab S9** - $799.99
- **AirPods Pro** - $249.99
- **Magic Keyboard** - $99.99
- **PlayStation 5** - $499.99
- **Nintendo Switch OLED** - $349.99
- **Sony WH-1000XM5** - $399.99
- **Bose SoundLink Revolve** - $199.99

#### Categorías
- **Laptops**: Computadoras portátiles
- **Smartphones**: Teléfonos inteligentes
- **Tablets**: Dispositivos táctiles
- **Accesorios**: Periféricos y complementos
- **Gaming**: Productos para videojuegos
- **Audio**: Sistemas de sonido

### 🏆 Conclusión

Este proyecto demuestra un dominio completo de JavaScript moderno, implementando todas las funcionalidades requeridas para un simulador de e-commerce funcional. La aplicación es escalable, mantenible y proporciona una experiencia de usuario profesional.

**Desarrollado para CoderHouse - Curso de JavaScript** 