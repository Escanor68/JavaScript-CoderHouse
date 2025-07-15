# TechStore - Simulador de E-commerce

## 📋 Descripción

**TechStore** es un simulador interactivo de e-commerce desarrollado completamente en JavaScript vanilla como proyecto final para el curso de JavaScript en CoderHouse. El proyecto demuestra el uso de módulos ES6, librerías externas, y una arquitectura modular bien estructurada.

## ✨ Características

### 🛍️ Funcionalidades del E-commerce
- **Catálogo de productos** con categorías y filtros
- **Carrito de compras** con persistencia en localStorage
- **Proceso de checkout** completo con validaciones
- **Gestión de pedidos** con historial
- **Perfil de usuario** con estadísticas
- **Sistema de filtros** por precio y categoría
- **Productos destacados** en la página principal

### 🛠️ Tecnologías y Librerías
- **JavaScript ES6+** con módulos nativos
- **Bootstrap 5** para el diseño responsive
- **SweetAlert2** para alertas modernas
- **Font Awesome** para iconografía
- **Vite** como bundler y servidor de desarrollo
- **npm** para gestión de dependencias

### 📁 Estructura Modular
```
EntregaFinal/
├── src/
│   ├── js/
│   │   ├── data.js      # Datos JSON del simulador
│   │   ├── utils.js     # Funciones auxiliares
│   │   └── app.js       # Lógica principal de la aplicación
│   ├── css/
│   │   └── styles.css   # Estilos personalizados
│   └── main.js          # Punto de entrada principal
├── index.html           # Página principal
├── package.json         # Configuración de npm
├── vite.config.js       # Configuración de Vite
└── README.md           # Documentación
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd EntregaFinal
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - El servidor se iniciará en `http://localhost:5173`
   - Se abrirá automáticamente en tu navegador predeterminado

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la versión de producción
npm run preview  # Previsualiza la versión de producción
```

## 📊 Datos del Simulador

### Productos Incluidos
- **Laptops**: MacBook Pro, Dell XPS 13
- **Smartphones**: iPhone 15 Pro, Samsung Galaxy S24
- **Tablets**: iPad Pro, Samsung Galaxy Tab S9
- **Accesorios**: AirPods Pro, Magic Keyboard
- **Gaming**: PlayStation 5, Nintendo Switch OLED
- **Audio**: Sony WH-1000XM5, Bose SoundLink Revolve

### Categorías
- 6 categorías principales con iconos y descripciones
- Sistema de filtrado por categoría y precio
- Productos destacados para la página principal

## 🎯 Funcionalidades Destacadas

### Carrito de Compras
- ✅ Agregar/eliminar productos
- ✅ Modificar cantidades
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de totales
- ✅ Aplicación de impuestos (IVA 21%)
- ✅ Cálculo de envío (gratis en compras >$1000)

### Proceso de Checkout
- ✅ Formulario de datos personales
- ✅ Validación de campos obligatorios
- ✅ Múltiples métodos de pago
- ✅ Resumen detallado de la compra
- ✅ Confirmación con SweetAlert2

### Gestión de Pedidos
- ✅ Historial completo de pedidos
- ✅ Estados de pedido (pendiente, completado)
- ✅ Detalles de productos y totales
- ✅ Direcciones de envío

### Perfil de Usuario
- ✅ Información personal editable
- ✅ Estadísticas de compras
- ✅ Validación de datos
- ✅ Persistencia de cambios

## 🔧 Arquitectura del Código

### Módulos JavaScript

#### `data.js`
- Contiene todos los datos estáticos del simulador
- Estructura JSON con productos, categorías, pedidos y usuario
- Datos simulados realistas para demostración

#### `utils.js`
- Clase `Utils` con métodos estáticos
- Funciones de formateo, validación y cálculos
- Integración con SweetAlert2 para alertas
- Funciones auxiliares para el manejo de datos

#### `app.js`
- Clase principal `TechStoreApp`
- Gestión del estado global de la aplicación
- Renderizado dinámico de todas las secciones
- Manejo de eventos y navegación

#### `main.js`
- Punto de entrada de la aplicación
- Importación de módulos y estilos
- Inicialización de la aplicación

### Características Técnicas

#### Modularidad
- Código organizado en módulos ES6
- Separación clara de responsabilidades
- Fácil mantenimiento y escalabilidad

#### Persistencia
- Uso de localStorage para el carrito
- Datos del usuario persistentes
- Estado de la aplicación mantenido

#### Responsive Design
- Diseño completamente responsive
- Optimizado para móviles y tablets
- Uso de Bootstrap 5 para grid system

#### UX/UI
- Interfaz moderna y intuitiva
- Animaciones y transiciones suaves
- Feedback visual para todas las acciones
- Estados de carga y error manejados

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móviles

## 🎓 Criterios de Evaluación CoderHouse

### ✅ Requisitos Cumplidos

1. **Uso de datos JSON simulados**
   - Datos completos en `data.js`
   - Estructura JSON bien organizada

2. **HTML generado dinámicamente desde JS**
   - Todo el contenido se genera desde JavaScript
   - Uso de template literals y DOM manipulation

3. **Uso de librerías externas**
   - Bootstrap 5 (CSS framework)
   - SweetAlert2 (alertas)
   - Font Awesome (iconos)

4. **Lógica de negocio completa**
   - Carrito de compras funcional
   - Proceso de checkout completo
   - Gestión de pedidos
   - Sistema de filtros

5. **Estructura y legibilidad**
   - Código modular y bien organizado
   - Comentarios en español argentino
   - Nombres descriptivos de variables y funciones

6. **Funcionalidades adicionales**
   - Persistencia de datos
   - Validaciones de formularios
   - Diseño responsive
   - Animaciones y efectos visuales

## 🚀 Despliegue

### Para Producción
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `dist/`.

### Para GitHub Pages
1. Ejecutar `npm run build`
2. Subir el contenido de `dist/` a la rama `gh-pages`
3. Configurar GitHub Pages en el repositorio

## 📝 Notas del Desarrollador

- **Comentarios**: Todos los comentarios están en español argentino para mayor naturalidad
- **Estructura**: El proyecto sigue las mejores prácticas de desarrollo moderno
- **Modularidad**: Cada archivo tiene una responsabilidad específica
- **Escalabilidad**: Fácil de extender con nuevas funcionalidades

## 🤝 Contribuciones

Este proyecto fue desarrollado como trabajo final para CoderHouse. Las contribuciones son bienvenidas para mejorar la funcionalidad o corregir errores.

## 📄 Licencia

Este proyecto es de uso educativo y fue desarrollado para el curso de JavaScript en CoderHouse.

---

**Desarrollado con ❤️ para CoderHouse** 