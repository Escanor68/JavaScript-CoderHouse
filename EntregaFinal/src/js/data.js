/**
 * TechStore - Datos del Simulador
 * Archivo JSON con todos los datos estáticos del e-commerce
 */

// Datos simulados del e-commerce (base de datos local)
const ecommerceData = {
    // Información del usuario
    user: {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan.perez@email.com",
        phone: "+54 11 1234-5678",
        address: "Av. Corrientes 1234",
        city: "Buenos Aires",
        zipCode: "1043"
    },

    // Categorías de productos
    categories: [
        {
            id: 1,
            name: "Laptops",
            icon: "fas fa-laptop",
            description: "Computadoras portátiles de última generación"
        },
        {
            id: 2,
            name: "Smartphones",
            icon: "fas fa-mobile-alt",
            description: "Teléfonos inteligentes con las mejores características"
        },
        {
            id: 3,
            name: "Tablets",
            icon: "fas fa-tablet-alt",
            description: "Tablets para trabajo y entretenimiento"
        },
        {
            id: 4,
            name: "Accesorios",
            icon: "fas fa-headphones",
            description: "Accesorios y periféricos para tus dispositivos"
        },
        {
            id: 5,
            name: "Gaming",
            icon: "fas fa-gamepad",
            description: "Productos especializados para gaming"
        },
        {
            id: 6,
            name: "Audio",
            icon: "fas fa-music",
            description: "Sistemas de audio y sonido profesional"
        }
    ],

    // Productos del catálogo
    products: [
        {
            id: 1,
            name: "MacBook Pro 14\"",
            category: 1,
            price: 2499.99,
            description: "MacBook Pro con chip M2 Pro, 16GB RAM, 512GB SSD",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
            stock: 15,
            featured: true,
            rating: 4.8
        },
        {
            id: 2,
            name: "Dell XPS 13",
            category: 1,
            price: 1299.99,
            description: "Laptop ultrabook con pantalla InfinityEdge, Intel i7, 16GB RAM",
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop",
            stock: 8,
            featured: true,
            rating: 4.6
        },
        {
            id: 3,
            name: "iPhone 15 Pro",
            category: 2,
            price: 999.99,
            description: "iPhone 15 Pro con chip A17 Pro, cámara triple, 128GB",
            image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
            stock: 25,
            featured: true,
            rating: 4.9
        },
        {
            id: 4,
            name: "Samsung Galaxy S24",
            category: 2,
            price: 899.99,
            description: "Galaxy S24 con pantalla AMOLED, cámara de 200MP, 256GB",
            image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
            stock: 20,
            featured: false,
            rating: 4.7
        },
        {
            id: 5,
            name: "iPad Pro 12.9\"",
            category: 3,
            price: 1099.99,
            description: "iPad Pro con chip M2, pantalla Liquid Retina XDR, 128GB",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
            stock: 12,
            featured: true,
            rating: 4.8
        },
        {
            id: 6,
            name: "Samsung Galaxy Tab S9",
            category: 3,
            price: 799.99,
            description: "Tablet Android con pantalla AMOLED, S Pen incluido, 128GB",
            image: "https://images.unsplash.com/photo-1585790050235-15e4b4c4b1b1?w=400&h=300&fit=crop",
            stock: 18,
            featured: false,
            rating: 4.5
        },
        {
            id: 7,
            name: "AirPods Pro",
            category: 4,
            price: 249.99,
            description: "Auriculares inalámbricos con cancelación de ruido activa",
            image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
            stock: 30,
            featured: false,
            rating: 4.7
        },
        {
            id: 8,
            name: "Magic Keyboard",
            category: 4,
            price: 99.99,
            description: "Teclado inalámbrico con diseño minimalista y teclas mecánicas",
            image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
            stock: 45,
            featured: false,
            rating: 4.4
        },
        {
            id: 9,
            name: "PlayStation 5",
            category: 5,
            price: 499.99,
            description: "Consola de videojuegos de nueva generación con SSD ultrarrápido",
            image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop",
            stock: 10,
            featured: true,
            rating: 4.9
        },
        {
            id: 10,
            name: "Nintendo Switch OLED",
            category: 5,
            price: 349.99,
            description: "Nintendo Switch con pantalla OLED de 7 pulgadas",
            image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop",
            stock: 22,
            featured: false,
            rating: 4.6
        },
        {
            id: 11,
            name: "Sony WH-1000XM5",
            category: 6,
            price: 399.99,
            description: "Auriculares over-ear con cancelación de ruido líder en la industria",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
            stock: 15,
            featured: false,
            rating: 4.8
        },
        {
            id: 12,
            name: "Bose SoundLink Revolve",
            category: 6,
            price: 199.99,
            description: "Altavoz Bluetooth portátil con sonido 360° y 16 horas de batería",
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
            stock: 28,
            featured: false,
            rating: 4.5
        }
    ],

    // Pedidos del usuario
    orders: [
        {
            id: 1,
            date: "2024-01-15",
            status: "completed",
            items: [
                { productId: 3, quantity: 1, price: 999.99 },
                { productId: 7, quantity: 1, price: 249.99 }
            ],
            total: 1249.98,
            shippingAddress: "Av. Corrientes 1234, Buenos Aires"
        },
        {
            id: 2,
            date: "2024-02-20",
            status: "pending",
            items: [
                { productId: 1, quantity: 1, price: 2499.99 }
            ],
            total: 2499.99,
            shippingAddress: "Av. Corrientes 1234, Buenos Aires"
        }
    ]
};

// Exportar datos para que los otros módulos los puedan usar
export { ecommerceData }; 