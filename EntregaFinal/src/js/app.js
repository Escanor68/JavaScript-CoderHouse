/**
 * TechStore - Aplicación Principal
 * Simulador de E-commerce - Proyecto Final JavaScript CoderHouse
 * 
 * Este archivo usa los módulos:
 * - data.js: Datos del simulador
 * - utils.js: Funciones auxiliares
 */

// Importar dependencias
import { loadEcommerceData } from './data.js';
import { Utils } from './utils.js';

// Estado global de la aplicación (donde guardamos todo lo que pasa)
class AppState {
    constructor() {
        this.currentSection = 'home';
        this.cart = [];
        this.currentCategory = null;
        this.filters = {
            priceRange: 5000,
            categories: []
        };
        this.user = null;
    }

    // Métodos para manejar el carrito de compras
    addToCart(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                product: product,
                quantity: quantity
            });
        }
        
        Utils.updateCartBadge(Utils.calculateCartItemCount(this.cart));
        this.saveCartToStorage();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.product.id !== productId);
        Utils.updateCartBadge(Utils.calculateCartItemCount(this.cart));
        this.saveCartToStorage();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.product.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCartToStorage();
            }
        }
    }

    getCartTotal() {
        return Utils.calculateCartTotal(this.cart);
    }

    getCartItemCount() {
        return Utils.calculateCartItemCount(this.cart);
    }

    saveCartToStorage() {
        localStorage.setItem('techstore_cart', JSON.stringify(this.cart));
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('techstore_cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            Utils.updateCartBadge(this.getCartItemCount());
        }
    }

    // Métodos para mostrar y ocultar las diferentes secciones
    showSection(sectionName) {
        // Ocultar todas las secciones primero
        const sections = ['home', 'products', 'cart', 'checkout', 'orders', 'profile'];
        sections.forEach(section => {
            const element = document.getElementById(section + 'Section');
            if (element) {
                element.classList.add('d-none');
            }
        });

        // Ahora mostrar la sección que queremos
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.remove('d-none');
            this.currentSection = sectionName;
        }
    }

    // Métodos para manejar los filtros de productos
    applyFilters() {
        return Utils.filterProducts(app.data.products, this.filters);
    }
}

// Instancia global del estado (la que vamos a usar en toda la app)
const appState = new AppState();

// Clase principal de la aplicación (acá está toda la lógica)
class TechStoreApp {
    constructor() {
        this.init();
    }

    init() {
        this.loadCartFromStorage();
        this.setupEventListeners();
        this.bootstrapAsync();
    }

    async bootstrapAsync() {
        try {
            // Mostrar una carga breve
            Utils.showLoadingMessage('Cargando catálogo...');
            this.data = await loadEcommerceData();
            // Asignar usuario al estado
            appState.user = this.data.user;
            // Render inicial
            this.renderHome();
            this.updateUserInfo();
        } catch (err) {
            Utils.showErrorMessage('No pudimos cargar los datos. Reintentá más tarde.');
            console.error(err);
        } finally {
            // Cerrar loader con un pequeño delay para UX
            setTimeout(() => Swal.close(), 400);
        }
    }

    loadCartFromStorage() {
        appState.loadCartFromStorage();
    }

    setupEventListeners() {
        // Configurar todos los eventos de navegación
        document.getElementById('homeBreadcrumb')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.renderHome();
        });

        document.getElementById('cartIcon')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.renderCart();
        });

        document.getElementById('profileLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.renderProfile();
        });

        document.getElementById('ordersLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.renderOrders();
        });

        document.getElementById('logoutLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Configurar eventos de filtros
        document.getElementById('priceRange')?.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            document.getElementById('maxPrice').textContent = Utils.formatPrice(value);
            appState.filters.priceRange = value;
        });

        document.getElementById('applyFilters')?.addEventListener('click', () => {
            const filteredProducts = appState.applyFilters();
            this.renderProductsGrid(filteredProducts);
        });

        // Configurar eventos de checkout
        document.getElementById('checkoutBtn')?.addEventListener('click', () => {
            this.renderCheckout();
        });

        document.getElementById('confirmOrderBtn')?.addEventListener('click', () => {
            this.confirmOrder();
        });

        // Configurar eventos de perfil
        document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
            this.saveProfile();
        });
    }

    // Armar la página de inicio
    renderHome() {
        appState.showSection('home');
        this.renderCategories();
        this.renderFeaturedProducts();
    }

    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        const categoriesHTML = this.data.categories.map(category => `
            <div class="col-md-4 col-lg-2 mb-3">
                <div class="card category-card h-100" onclick="app.renderProductsByCategory(${category.id})">
                    <div class="card-body">
                        <i class="${category.icon} category-icon"></i>
                        <h6 class="card-title">${category.name}</h6>
                        <p class="card-text small">${category.description}</p>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = categoriesHTML;
    }

    renderFeaturedProducts() {
        const container = document.getElementById('featuredProductsContainer');
        if (!container) return;

        const featuredProducts = this.data.products.filter(p => p.featured);
        const productsHTML = featuredProducts.map(product => this.createProductCard(product)).join('');

        container.innerHTML = productsHTML;
        this.setupProductEventListeners();
    }

    // Armar la página de productos
    renderProductsByCategory(categoryId) {
        appState.currentCategory = categoryId;
        this.renderProducts();
    }

    renderProducts() {
        appState.showSection('products');
        
        // Si venimos desde una categoría, sincronizar filtro exclusivo
        if (appState.currentCategory) {
            appState.filters.categories = [appState.currentCategory];
        }

        // Actualizar la navegación (breadcrumb)
        this.updateBreadcrumb();
        
        // Armar los filtros de categorías
        this.renderCategoryFilters();

        // Sincronizar el slider con el estado actual
        const priceInput = document.getElementById('priceRange');
        const maxPriceLabel = document.getElementById('maxPrice');
        if (priceInput && maxPriceLabel) {
            priceInput.value = String(appState.filters.priceRange);
            maxPriceLabel.textContent = Utils.formatPrice(appState.filters.priceRange);
        }
        
        // Aplicar filtros y armar la grilla de productos
        const filteredProducts = appState.applyFilters();
        this.renderProductsGrid(filteredProducts);
    }

    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        if (!breadcrumb) return;

        let breadcrumbHTML = '<li class="breadcrumb-item"><a href="#" id="homeBreadcrumb">Inicio</a></li>';
        
        if (appState.currentCategory) {
            const category = this.data.categories.find(cat => cat.id === appState.currentCategory);
            if (category) {
                breadcrumbHTML += `<li class="breadcrumb-item active">${category.name}</li>`;
            }
        }

        breadcrumb.innerHTML = breadcrumbHTML;
        
        // Reconfigurar evento del breadcrumb
        document.getElementById('homeBreadcrumb')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.renderHome();
        });
    }

    renderCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        if (!container) return;

        const filtersHTML = this.data.categories.map(category => `
            <div class="category-filter-item">
                <input type="checkbox" class="category-checkbox" id="cat-${category.id}" value="${category.id}">
                <label for="cat-${category.id}">${category.name}</label>
            </div>
        `).join('');

        container.innerHTML = filtersHTML;

        // Marcar checkboxes según estado actual
        this.data.categories.forEach(category => {
            const checkbox = document.getElementById(`cat-${category.id}`);
            if (checkbox) {
                checkbox.checked = appState.filters.categories.includes(category.id);
            }
        });

        // Permitir selección exclusiva de categorías (si el docente espera filtro intersección)
        const checkboxes = container.querySelectorAll('.category-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const id = parseInt(e.target.value);
                if (e.target.checked) {
                    // Dejar solo esa categoría seleccionada
                    appState.filters.categories = [id];
                    // Desmarcar el resto visualmente
                    checkboxes.forEach(other => {
                        if (other !== e.target) other.checked = false;
                    });
                } else {
                    appState.filters.categories = [];
                }
            });
        });
    }

    renderProductsGrid(products) {
        const container = document.getElementById('productsContainer');
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <h4>No se encontraron productos</h4>
                        <p>Intenta ajustar los filtros de búsqueda</p>
                    </div>
                </div>
            `;
            return;
        }

        const productsHTML = products.map(product => this.createProductCard(product)).join('');
        container.innerHTML = productsHTML;
        this.setupProductEventListeners();
    }

    createProductCard(product) {
        const category = this.data.categories.find(cat => cat.id === product.category);
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="product-description">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="product-price">${Utils.formatPrice(product.price)}</span>
                            <span class="badge bg-secondary">${category?.name || 'Sin categoría'}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <small class="text-muted">Stock: ${product.stock}</small>
                            <div class="text-warning">
                                ${Utils.generateStarRating(product.rating)}
                            </div>
                        </div>
                        <button class="btn btn-primary w-100 add-to-cart-btn" data-product-id="${product.id}">
                            <i class="fas fa-shopping-cart me-2"></i>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupProductEventListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                const product = this.data.products.find(p => p.id === productId);
                
                if (product) {
                    appState.addToCart(product, 1);
                    Utils.showSuccessMessage('Producto agregado al carrito');
                }
            });
        });
    }

    // Armar la página del carrito
    renderCart() {
        appState.showSection('cart');
        this.renderCartItems();
        this.updateCartSummary();
    }

    renderCartItems() {
        const container = document.getElementById('cartItemsContainer');
        if (!container) return;

        if (appState.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h4>Tu carrito está vacío</h4>
                    <p>Agrega algunos productos para comenzar</p>
                    <button class="btn btn-primary" onclick="app.renderHome()">
                        Continuar Comprando
                    </button>
                </div>
            `;
            return;
        }

        const cartItemsHTML = appState.cart.map(item => `
            <div class="cart-item d-flex align-items-center">
                <img src="${item.product.image}" class="cart-item-image me-3" alt="${item.product.name}">
                <div class="cart-item-details flex-grow-1">
                    <h6 class="cart-item-title">${item.product.name}</h6>
                    <p class="cart-item-price mb-0">${Utils.formatPrice(item.product.price)}</p>
                </div>
                <div class="quantity-controls me-3">
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${item.product.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="app.updateCartQuantity(${item.product.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="app.updateCartQuantity(${item.product.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="text-end">
                    <div class="fw-bold">${Utils.formatPrice(item.product.price * item.quantity)}</div>
                    <button class="btn btn-sm btn-outline-danger" onclick="app.removeFromCart(${item.product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = cartItemsHTML;
    }

    updateCartSummary() {
        const subtotal = appState.getCartTotal();
        const { shipping, tax, total } = Utils.calculateCosts(subtotal);

        document.getElementById('subtotal').textContent = Utils.formatPrice(subtotal);
        document.getElementById('shipping').textContent = Utils.formatPrice(shipping);
        document.getElementById('tax').textContent = Utils.formatPrice(tax);
        document.getElementById('total').textContent = Utils.formatPrice(total);
    }

    updateCartQuantity(productId, quantity) {
        appState.updateQuantity(productId, quantity);
        this.renderCartItems();
        this.updateCartSummary();
    }

    removeFromCart(productId) {
        appState.removeFromCart(productId);
        this.renderCartItems();
        this.updateCartSummary();
    }

    // Armar la página de checkout
    renderCheckout() {
        appState.showSection('checkout');
        this.renderCheckoutItems();
        this.updateCheckoutSummary();
    }

    renderCheckoutItems() {
        const container = document.getElementById('checkoutItemsContainer');
        if (!container) return;

        const checkoutItemsHTML = appState.cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${item.product.name}</strong>
                    <br>
                    <small class="text-muted">Cantidad: ${item.quantity}</small>
                </div>
                <span>${Utils.formatPrice(item.product.price * item.quantity)}</span>
            </div>
        `).join('');

        container.innerHTML = checkoutItemsHTML;
    }

    updateCheckoutSummary() {
        const subtotal = appState.getCartTotal();
        const { shipping, tax, total } = Utils.calculateCosts(subtotal);

        document.getElementById('checkoutSubtotal').textContent = Utils.formatPrice(subtotal);
        document.getElementById('checkoutShipping').textContent = Utils.formatPrice(shipping);
        document.getElementById('checkoutTax').textContent = Utils.formatPrice(tax);
        document.getElementById('checkoutTotal').textContent = Utils.formatPrice(total);
    }

    confirmOrder() {
        if (appState.cart.length === 0) {
            Utils.showErrorMessage('El carrito está vacío');
            return;
        }

        // Verificar que el formulario esté bien completado
        const formData = Utils.getCheckoutFormData();
        const validation = Utils.validateCheckoutForm(formData);
        
        if (!validation.isValid) {
            Utils.showErrorMessage(validation.errors.join('\n'));
            return;
        }

        // Simular el procesamiento del pago
        Utils.showLoadingMessage('Procesando pago...');

        setTimeout(() => {
            // Armar el pedido nuevo
            const shippingAddress = `${formData.address}, ${formData.city}`;
            const newOrder = Utils.createOrder(appState.cart, shippingAddress);

            if (!this.data.orders) this.data.orders = [];
            this.data.orders.push(newOrder);

            // Vaciar el carrito
            appState.cart = [];
            appState.saveCartToStorage();
            Utils.updateCartBadge(0);

            // Mostrar la confirmación del pedido
            Swal.fire({
                icon: 'success',
                title: '¡Pedido Confirmado!',
                text: `Tu pedido #${newOrder.id} ha sido procesado exitosamente.`,
                confirmButtonText: 'Ver Mis Pedidos'
            }).then(() => {
                this.renderOrders();
            });
        }, 2000);
    }

    // Armar la página de pedidos
    renderOrders() {
        appState.showSection('orders');
        this.renderOrdersList();
    }

    renderOrdersList() {
        const container = document.getElementById('ordersContainer');
        if (!container) return;

        if (!this.data.orders || this.data.orders.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <i class="fas fa-box"></i>
                        <h4>No tienes pedidos</h4>
                        <p>Realiza tu primera compra para ver tus pedidos aquí</p>
                        <button class="btn btn-primary" onclick="app.renderHome()">
                            Comenzar a Comprar
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const ordersHTML = (this.data.orders || []).map(order => this.createOrderCard(order)).join('');
        container.innerHTML = ordersHTML;
    }

    createOrderCard(order) {
        const orderItems = order.items.map(item => {
            const product = this.data.products.find(p => p.id === item.productId);
            return `${product?.name || 'Producto no encontrado'} (x${item.quantity})`;
        }).join(', ');

        return `
            <div class="col-12">
                <div class="card order-card">
                    <div class="card-header order-header d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-0">Pedido #${order.id}</h5>
                            <small>Fecha: ${order.date}</small>
                        </div>
                        <span class="order-status ${order.status}">${order.status}</span>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <h6>Productos:</h6>
                                <p class="text-muted">${orderItems}</p>
                                <h6>Dirección de Envío:</h6>
                                <p class="text-muted">${order.shippingAddress}</p>
                            </div>
                            <div class="col-md-4 text-end">
                                <h5 class="text-primary">${Utils.formatPrice(order.total)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Armar la página del perfil
    renderProfile() {
        appState.showSection('profile');
        this.updateProfileStats();
    }

    updateProfileStats() {
        const totalOrders = (this.data.orders || []).length;
        const totalSpent = (this.data.orders || []).reduce((total, order) => total + order.total, 0);

        document.getElementById('totalOrders').textContent = totalOrders;
        document.getElementById('totalSpent').textContent = Utils.formatPrice(totalSpent);
    }

    saveProfile() {
        // Verificar datos del formulario
        const formData = Utils.getProfileFormData();
        
        if (!formData.firstName || formData.firstName.trim().length < 2) {
            Utils.showErrorMessage('El nombre debe tener al menos 2 caracteres');
            return;
        }

        if (!formData.lastName || formData.lastName.trim().length < 2) {
            Utils.showErrorMessage('El apellido debe tener al menos 2 caracteres');
            return;
        }

        if (!Utils.isValidEmail(formData.email)) {
            Utils.showErrorMessage('El email no tiene un formato válido');
            return;
        }

        if (!Utils.isValidPhone(formData.phone)) {
            Utils.showErrorMessage('El teléfono no tiene un formato válido');
            return;
        }

        // Actualizar la información del usuario
        appState.user.firstName = formData.firstName;
        appState.user.lastName = formData.lastName;
        appState.user.email = formData.email;
        appState.user.phone = formData.phone;

        this.updateUserInfo();
        Utils.showSuccessMessage('Perfil actualizado correctamente');
    }

    updateUserInfo() {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = `${appState.user.firstName} ${appState.user.lastName}`;
        }
    }

    logout() {
        Utils.showConfirmationDialog(
            '¿Estás seguro?',
            '¿Deseas cerrar sesión?',
            () => {
                // Vaciar el carrito
                appState.cart = [];
                appState.saveCartToStorage();
                
                // Volver a la página de inicio
                this.renderHome();
                
                Utils.showSuccessMessage('Sesión cerrada exitosamente');
            }
        );
    }
}

// Inicializar la app de inmediato para que esté disponible en window
window.app = new TechStoreApp(); 