/**
 * TechStore - Utilidades y Funciones Auxiliares
 * Funciones de utilidad para el simulador de E-commerce
 */

// Clase con todas las funciones que necesitamos para el simulador
class Utils {
    /**
     * Arma el HTML para mostrar las estrellas del rating
     * @param {number} rating - Rating del producto (0-5)
     * @returns {string} HTML de las estrellas
     */
    static generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHTML = '';
        
        // Estrellas llenas
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // Media estrella
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }

        return starsHTML;
    }

    /**
     * Le da formato de moneda a un precio
     * @param {number} price - Precio a formatear
     * @returns {string} Precio formateado
     */
    static formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    /**
     * Calcula el total de todos los productos en el carrito
     * @param {Array} cart - Array de items del carrito
     * @returns {number} Total calculado
     */
    static calculateCartTotal(cart) {
        return cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    /**
     * Cuenta cuántos productos hay en total en el carrito
     * @param {Array} cart - Array de items del carrito
     * @returns {number} Total de items
     */
    static calculateCartItemCount(cart) {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    /**
     * Calcula el envío y los impuestos de la compra
     * @param {number} subtotal - Subtotal de la compra
     * @returns {Object} Objeto con shipping y tax
     */
    static calculateCosts(subtotal) {
        const shipping = subtotal > 1000 ? 0 : 15.99;
        const tax = subtotal * 0.21;
        const total = subtotal + shipping + tax;

        return {
            shipping,
            tax,
            total
        };
    }

    /**
     * Busca una categoría por su ID
     * @param {number} categoryId - ID de la categoría
     * @returns {Object|null} Categoría encontrada o null
     */
    static getCategoryById(categoryId) {
        return ecommerceData.categories.find(cat => cat.id === categoryId) || null;
    }

    /**
     * Busca un producto por su ID
     * @param {number} productId - ID del producto
     * @returns {Object|null} Producto encontrado o null
     */
    static getProductById(productId) {
        return ecommerceData.products.find(product => product.id === productId) || null;
    }

    /**
     * Filtra los productos según los criterios que le pasemos
     * @param {Array} products - Array de productos
     * @param {Object} filters - Objeto con filtros
     * @returns {Array} Productos filtrados
     */
    static filterProducts(products, filters) {
        return products.filter(product => {
            // Si el precio es más alto que el filtro, no lo incluimos
            if (product.price > filters.priceRange) {
                return false;
            }

            // Si hay categorías seleccionadas y el producto no está en ninguna, no lo incluimos
            if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
                return false;
            }

            return true;
        });
    }

    /**
     * Trae todos los productos que están marcados como destacados
     * @returns {Array} Array de productos destacados
     */
    static getFeaturedProducts() {
        return ecommerceData.products.filter(product => product.featured);
    }

    /**
     * Trae todos los productos de una categoría específica
     * @param {number} categoryId - ID de la categoría
     * @returns {Array} Array de productos de la categoría
     */
    static getProductsByCategory(categoryId) {
        return ecommerceData.products.filter(product => product.category === categoryId);
    }

    /**
     * Verifica si un email tiene el formato correcto
     * @param {string} email - Email a validar
     * @returns {boolean} True si es válido
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Verifica si un teléfono tiene el formato correcto
     * @param {string} phone - Teléfono a validar
     * @returns {boolean} True si es válido
     */
    static isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Crea un ID nuevo para un pedido
     * @returns {number} Nuevo ID
     */
    static generateOrderId() {
        return ecommerceData.orders.length + 1;
    }

    /**
     * Trae la fecha de hoy en formato YYYY-MM-DD
     * @returns {string} Fecha formateada
     */
    static getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    /**
     * Arma un pedido nuevo con los productos del carrito
     * @param {Array} cart - Carrito de compras
     * @param {string} shippingAddress - Dirección de envío
     * @returns {Object} Nuevo pedido
     */
    static createOrder(cart, shippingAddress) {
        const subtotal = this.calculateCartTotal(cart);
        const { total } = this.calculateCosts(subtotal);

        return {
            id: this.generateOrderId(),
            date: this.getCurrentDate(),
            status: 'pending',
            items: cart.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price
            })),
            total: total,
            shippingAddress: shippingAddress
        };
    }

    /**
     * Actualiza el número que aparece en el ícono del carrito
     * @param {number} count - Cantidad de items
     */
    static updateCartBadge(count) {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            badge.textContent = count;
        }
    }

    /**
     * Muestra un mensaje de éxito con SweetAlert2
     * @param {string} message - Mensaje a mostrar
     */
    static showSuccessMessage(message) {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            timer: 2000,
            showConfirmButton: false
        });
    }

    /**
     * Muestra un mensaje de error con SweetAlert2
     * @param {string} message - Mensaje a mostrar
     */
    static showErrorMessage(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    }

    /**
     * Muestra un mensaje de carga con SweetAlert2
     * @param {string} message - Mensaje a mostrar
     */
    static showLoadingMessage(message) {
        Swal.fire({
            title: message,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    /**
     * Muestra un diálogo para confirmar una acción
     * @param {string} title - Título del diálogo
     * @param {string} text - Texto del diálogo
     * @param {Function} onConfirm - Función a ejecutar si confirma
     */
    static showConfirmationDialog(title, text, onConfirm) {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed && onConfirm) {
                onConfirm();
            }
        });
    }

    /**
     * Verifica que los datos del formulario de checkout estén bien
     * @param {Object} formData - Datos del formulario
     * @returns {Object} Resultado de validación
     */
    static validateCheckoutForm(formData) {
        const errors = [];

        if (!formData.firstName || formData.firstName.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!formData.lastName || formData.lastName.trim().length < 2) {
            errors.push('El apellido debe tener al menos 2 caracteres');
        }

        if (!this.isValidEmail(formData.email)) {
            errors.push('El email no tiene un formato válido');
        }

        if (!formData.address || formData.address.trim().length < 10) {
            errors.push('La dirección debe tener al menos 10 caracteres');
        }

        if (!formData.city || formData.city.trim().length < 2) {
            errors.push('La ciudad debe tener al menos 2 caracteres');
        }

        if (!formData.zipCode || formData.zipCode.trim().length < 3) {
            errors.push('El código postal debe tener al menos 3 caracteres');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Trae todos los datos que el usuario puso en el formulario de checkout
     * @returns {Object} Datos del formulario
     */
    static getCheckoutFormData() {
        return {
            firstName: document.getElementById('firstName')?.value || '',
            lastName: document.getElementById('lastName')?.value || '',
            email: document.getElementById('email')?.value || '',
            address: document.getElementById('address')?.value || '',
            city: document.getElementById('city')?.value || '',
            zipCode: document.getElementById('zipCode')?.value || '',
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked')?.id || 'creditCard'
        };
    }

    /**
     * Trae todos los datos que el usuario puso en el formulario de perfil
     * @returns {Object} Datos del formulario
     */
    static getProfileFormData() {
        return {
            firstName: document.getElementById('profileFirstName')?.value || '',
            lastName: document.getElementById('profileLastName')?.value || '',
            email: document.getElementById('profileEmail')?.value || '',
            phone: document.getElementById('profilePhone')?.value || ''
        };
    }
}

// Exportar para que los otros módulos lo puedan usar
export { Utils }; 