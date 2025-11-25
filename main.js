// Vendimarket - Enhanced Main JavaScript File
// Sistema con marche, gusti e localizzazione nelle macchinette

class VendimarketApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('vendimarket-cart')) || [];
        this.products = [];
        this.brands = [];
        this.filteredProducts = [];
        this.currentFilters = {
            category: 'all',
            brand: 'all',
            temperature: 'all',
            dietary: 'all',
            priceRange: 50,
            search: ''
        };
        
        this.init();
    }

    init() {
        this.generateProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.initAnimations();
        this.initializePage();
    }

    // Generate comprehensive product catalog with brands and flavors
    generateProducts() {
        // Complete y definition with brands and flavors
        const categoryData = {
            'Chips & Snacks': {
                brands: {
                    'Lay\'s': {
                        flavors: ['Classic', 'Paprika', 'BBQ', 'Salt & Vinegar', 'Cheese & Onion'],
                        locations: ['Totem A1', 'Totem B2', 'Totem C1']
                    },
                    'Pringles': {
                        flavors: ['Original', 'Sour Cream', 'BBQ', 'Paprika', 'Salt & Vinegar', 'Pizza'],
                        locations: ['Totem A1', 'Totem B1', 'Totem D2']
                    },
                    'Doritos': {
                        flavors: ['Nacho Cheese', 'Cool Ranch', 'Spicy Sweet Chili', 'Flamin\' Hot'],
                        locations: ['Totem A2', 'Totem C1']
                    }
                },
                temp: 'ambient',
                image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop'
            },
            'Pasta': {
              brands: {
                'Barilla': {
                  flavors: ['Spaghetti', 'Penne Rigate', 'Fusilli', 'Farfalle'],
                  locations: ['Totem A2', 'Totem C2']
                },
                'De Cecco': {
                  flavors: ['Spaghetti No.12', 'Rigatoni', 'Orecchiette'],
                  locations: ['Totem B1']
                },
                'Rummo': {
                  flavors: ['Linguine', 'Mezze Penne', 'Conchiglie'],
                  locations: ['Totem D2']
                }
              },
              temp: 'ambient',
              image: 'https://images.unsplash.com/photo-1598720290281-9f26ae6d6f81?w=400&h=300&fit=crop'
            },
            
            'Fruits & Vegetables': {
              brands: {
                'Fresh Farm': {
                  flavors: ['Gala Apples', 'Bananas', 'Navel Oranges', 'Baby Carrots'],
                  locations: ['Totem A3', 'Totem B3']
                },
                'Green Valley': {
                  flavors: ['Cherry Tomatoes', 'Cucumbers', 'Mixed Salad'],
                  locations: ['Totem C3']
                },
                'Daily Fresh': {
                  flavors: ['Strawberries', 'Blueberries', 'Lemons'],
                  locations: ['Totem D3']
                }
              },
              temp: 'cold',
              image: 'https://images.unsplash.com/photo-1610415958681-7aabb05711f5?w=400&h=300&fit=crop'
            },
            
            'Bread': {
              brands: {
                "La Brea Bakery": {
                  flavors: ['Sourdough Loaf', 'Baguette', 'Ciabatta'],
                  locations: ['Totem A4']
                },
                "Nature's Own": {
                  flavors: ['White Bread', 'Whole Wheat', 'Honey Wheat', 'Multigrain'],
                  locations: ['Totem B4']
                },
                "Pepperidge Farm": {
                  flavors: ['Rye', 'Whole Grain', 'Oatmeal'],
                  locations: ['Totem D4']
                }
              },
              temp: 'ambient',
              image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=300&fit=crop'
            },

            'Soft Drinks': {
                brands: {
                    'Coca-Cola': {
                        flavors: ['Classic', 'Zero Sugar', 'Diet', 'Cherry', 'Vanilla'],
                        locations: ['Totem A1', 'Totem B1', 'Totem C1', 'Totem D1']
                    },
                    'Pepsi': {
                        flavors: ['Original', 'Zero Sugar', 'Diet', 'Cherry'],
                        locations: ['Totem A2', 'Totem C2']
                    },
                    'Sprite': {
                        flavors: ['Original', 'Zero Sugar', 'Cranberry', 'Tropical Mix'],
                        locations: ['Totem A1', 'Totem B2', 'Totem D2']
                    },
                    'Dr Pepper': {
                        flavors: ['Original', 'Zero Sugar', 'Cherry', 'Cream Soda'],
                        locations: ['Totem B1', 'Totem C1', 'Totem D1']
                    }
                },
                temp: 'cold',
                image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop'
            },
            'Ice Cream': {
                brands: {
                    'Ben & Jerry\'s': {
                        flavors: ['Chocolate Chip Cookie Dough', 'Half Baked', 'Cherry Garcia', 'Phish Food', 'Chunky Monkey'],
                        locations: ['Totem A1', 'Totem B1', 'Totem C1', 'Totem D1']
                    },
                    'Häagen-Dazs': {
                        flavors: ['Vanilla', 'Chocolate', 'Strawberry', 'Caramel Cone'],
                        locations: ['Totem A2', 'Totem C2']
                    },
                    'Magnum': {
                        flavors: ['Classic', 'Almond', 'Double Caramel', 'White Chocolate'],
                        locations: ['Totem B2', 'Totem D2']
                    }
                },
                temp: 'frozen',
                image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'
            },
            'Cookies': {
                brands: {
                    'Oreo': {
                        flavors: ['Original', 'Golden', 'Double Stuf', 'Mega Stuf'],
                        locations: ['Totem A1', 'Totem B2', 'Totem C1']
                    },
                    'Chips Ahoy': {
                        flavors: ['Original', 'Chewy', 'Chunky', 'Reese\'s'],
                        locations: ['Totem A2', 'Totem B1', 'Totem D1']
                    },
                    'Famous Amos': {
                        flavors: ['Chocolate Chip', 'Bite Size', 'Double Chocolate', 'Oatmeal Raisin'],
                        locations: ['Totem C2', 'Totem D2']
                    }
                },
                temp: 'ambient',
                image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop'
            }
        };

        const dietaryOptions = ['vegan', 'gluten-free', 'keto', 'low-sugar', 'none'];
        let productId = 1;

        // Genera prodotti da tutti i dati
        Object.entries(categoryData).forEach(([category, data]) => {
            Object.entries(data.brands).forEach(([brand, brandData]) => {
                brandData.flavors.forEach(flavor => {
                    const price = (Math.random() * 10 + 2).toFixed(2);
                    const stock = Math.floor(Math.random() * 50) + 10;
                    const dietary = dietaryOptions[Math.floor(Math.random() * dietaryOptions.length)];
                    
                    // Seleziona posizioni random per questo prodotto (1-3 totem)
                    const numLocations = Math.floor(Math.random() * 3) + 1;
                    const shuffledLocations = [...brandData.locations].sort(() => Math.random() - 0.5);
                    const productLocations = shuffledLocations.slice(0, numLocations);

                    this.products.push({
                        id: productId++,
                        name: `${brand} ${flavor}`,
                        brand: brand,
                        flavor: flavor,
                        category: category,
                        price: parseFloat(price),
                        temperature: data.temp,
                        dietary: dietary,
                        image: data.image,
                        description: `${flavor} - ${brand}`,
                        stock: stock,
                        popularity: Math.floor(Math.random() * 100) + 1,
                        locations: productLocations,
                        slot: this.generateSlotNumber()
                    });
                });
            });
        });

        this.filteredProducts = [...this.products];
        this.brands = [...new Set(this.products.map(p => p.brand))].sort();
    }

    // Genera numero slot casuale per la posizione nel totem
    generateSlotNumber() {
        const row = String.fromCharCode(65 + Math.floor(Math.random() * 6)); // A-F
        const col = Math.floor(Math.random() * 8) + 1; // 1-8
        return `${row}${col}`;
    }

    // Initialize page-specific functionality
    initializePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch(currentPage) {
            case 'index.html':
            case '':
                this.initIndexPage();
                break;
            case 'products.html':
                this.initProductsPage();
                break;
            case 'cart.html':
                this.initCartPage();
                break;
            case 'about.html':
                this.initAboutPage();
                break;
        }
    }

    // Index page initialization
    initIndexPage() {
        this.initTypedText();
        this.initParticles();
        this.loadFeaturedProducts();
        this.initStoreMap();
        this.animateStats();
    }

    // Products page initialization
    initProductsPage() {
        this.loadCategoryFilters();
        this.loadBrandFilters();
        this.setupProductFilters();
        this.loadProducts();
        this.loadRecipeBundles();
    }

    // Cart page initialization
    initCartPage() {
        this.loadCartItems();
        this.loadSuggestedProducts();
        this.setupCheckoutModal();
    }

    // About page initialization
    initAboutPage() {
        this.animateStats();
    }

    // Initialize typed text animation
    initTypedText() {
        const typedElement = document.getElementById('typed-tagline');
        if (!typedElement) return;

        const strings = ['Grab. Pay. Go.', '24/7 Convenience', 'Zero Wait Time', 'Smart Shopping'];
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let charIndex = 0;

        const type = () => {
            const fullText = strings[currentIndex];
            
            if (!isDeleting) {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            } else {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            }

            typedElement.textContent = currentText;

            let typeSpeed = 100;

            if (isDeleting) {
                typeSpeed = 50;
            }

            if (!isDeleting && charIndex === fullText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % strings.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    // Initialize floating particles
    initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Load featured products on index page
    loadFeaturedProducts() {
        const container = document.getElementById('featuredProducts');
        if (!container) return;

        const featured = this.products
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 8);

        container.innerHTML = featured.map(product => this.createProductCard(product, true)).join('');
        this.addProductEventListeners(container);
    }

    // Initialize store map
    initStoreMap() {
        const mapContainer = document.getElementById('storeMap');
        if (!mapContainer || typeof L === 'undefined') return;

        // Milano coordinates - Piazza del Duomo
        const map = L.map('storeMap').setView([45.4502, 9.1872], 17);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Vendimarket locations in Milano
        const stores = [
            { name: 'Bocconi Vendimarket', lat: 45.4502, lng: 9.1872, status: 'Open 24/7' }
        ];

        stores.forEach(store => {
            L.marker([store.lat, store.lng])
                .addTo(map)
                .bindPopup(`<b>${store.name}</b><br>${store.status}`);
        });
    }

    // Animate statistics counters
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseFloat(entry.target.dataset.target);
                    this.animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Counter animation
    animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target < 10) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Load category filters
    loadCategoryFilters() {
        const container = document.getElementById('categoryFilters');
        if (!container) return;

        const categories = [...new Set(this.products.map(p => p.category))].sort();
        
        container.innerHTML = `
            <div class="filter-tag active" data-category="all">All Products</div>
            ${categories.map(category => `<div class="filter-tag" data-category="${category}">${category}</div>`).join('')}
        `;
    }

    // Load brand filters - NEW
    loadBrandFilters() {
        const container = document.getElementById('brandFilters');
        if (!container) return;

        container.innerHTML = `
            <div class="filter-tag active" data-brand="all">All Brands</div>
            ${this.brands.map(brand => `<div class="filter-tag" data-brand="${brand}">${brand}</div>`).join('')}
        `;
    }

    // Setup product filtering
    setupProductFilters() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                const filterType = e.target.dataset.category ? 'category' : 
                                 e.target.dataset.brand ? 'brand' :
                                 e.target.dataset.temp ? 'temperature' : 
                                 e.target.dataset.diet ? 'dietary' : null;
                
                if (!filterType) return;

                if (filterType === 'temperature' || filterType === 'dietary') {
                    const filterValue = e.target.dataset.temp || e.target.dataset.diet;
                    const currentValue = this.currentFilters[filterType];

                    if (currentValue === filterValue) {
                        e.target.classList.remove('active');
                        this.currentFilters[filterType] = 'all';
                    } else {
                        e.target.parentNode.querySelectorAll('.filter-tag').forEach(tag => {
                            tag.classList.remove('active');
                        });
                        
                        e.target.classList.add('active');
                        this.currentFilters[filterType] = filterValue;
                    }
                } else {
                    e.target.parentNode.querySelectorAll('.filter-tag').forEach(tag => {
                        tag.classList.remove('active');
                    });
                    
                    e.target.classList.add('active');
                    
                    if (filterType === 'category') {
                        this.currentFilters.category = e.target.dataset.category;
                        // Reset brand filter quando cambia categoria
                        this.currentFilters.brand = 'all';
                        this.updateBrandFiltersForCategory();
                    } else if (filterType === 'brand') {
                        this.currentFilters.brand = e.target.dataset.brand;
                    }
                }
                
                this.filterProducts();
            }
        });

        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.filterProducts();
            });
        }

        const priceSlider = document.getElementById('priceSlider');
        if (priceSlider) {
            priceSlider.addEventListener('input', (e) => {
                this.currentFilters.priceRange = parseFloat(e.target.value);
                document.getElementById('maxPrice').textContent = `€${e.target.value}+`;
                this.filterProducts();
            });
        }

        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortProducts(e.target.value);
            });
        }
    }

    // Update brand filters based on selected category
    updateBrandFiltersForCategory() {
        const container = document.getElementById('brandFilters');
        if (!container) return;

        let availableBrands;
        
        if (this.currentFilters.category === 'all') {
            availableBrands = this.brands;
        } else {
            availableBrands = [...new Set(
                this.products
                    .filter(p => p.category === this.currentFilters.category)
                    .map(p => p.brand)
            )].sort();
        }

        container.innerHTML = `
            <div class="filter-tag active" data-brand="all">All Brands</div>
            ${availableBrands.map(brand => `<div class="filter-tag" data-brand="${brand}">${brand}</div>`).join('')}
        `;
    }

    // Filter products based on current filters
    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            if (this.currentFilters.category !== 'all' && product.category !== this.currentFilters.category) {
                return false;
            }

            if (this.currentFilters.brand !== 'all' && product.brand !== this.currentFilters.brand) {
                return false;
            }

            if (this.currentFilters.temperature !== 'all' && product.temperature !== this.currentFilters.temperature) {
                return false;
            }

            if (this.currentFilters.dietary !== 'all' && product.dietary !== this.currentFilters.dietary) {
                return false;
            }

            if (product.price > this.currentFilters.priceRange) {
                return false;
            }

            if (this.currentFilters.search && 
                !product.name.toLowerCase().includes(this.currentFilters.search) &&
                !product.category.toLowerCase().includes(this.currentFilters.search) &&
                !product.brand.toLowerCase().includes(this.currentFilters.search)) {
                return false;
            }

            return true;
        });

        this.loadProducts();
        this.updateResultsCount();
    }

    // Sort products
    sortProducts(sortBy) {
        switch(sortBy) {
            case 'popularity':
                this.filteredProducts.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'brand':
                this.filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case 'freshness':
                this.filteredProducts.sort((a, b) => b.id - a.id);
                break;
        }
        
        this.loadProducts();
    }

    // Load products grid
    loadProducts() {
        const container = document.getElementById('productsGrid');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');
        
        if (!container) return;

        if (loadingState) loadingState.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';
        container.style.display = 'none';

        setTimeout(() => {
            if (loadingState) loadingState.style.display = 'none';
            
            if (this.filteredProducts.length === 0) {
                if (emptyState) emptyState.style.display = 'block';
                container.style.display = 'none';
            } else {
                container.style.display = 'grid';
                container.innerHTML = this.filteredProducts
                    .slice(0, 48)
                    .map(product => this.createProductCard(product))
                    .join('');
                
                this.addProductEventListeners(container);
            }
        }, 500);
    }

    // Create product card HTML - ENHANCED con location
    createProductCard(product, isFeatured = false) {
        const dietaryBadge = product.dietary !== 'none' ? 
            `<div class="dietary-badge badge-${product.dietary}">${product.dietary.replace('-', ' ')}</div>` : '';
        
        const temperatureBadge = `<div class="temperature-badge temp-${product.temperature}">${product.temperature}</div>`;
        
        // Badge per le location
        const locationBadges = product.locations.map(loc => 
            `<span class="location-badge">📍 ${loc}</span>`
        ).join('');

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    ${temperatureBadge}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-brand">🏷️ ${product.brand}</div>
                    <div class="product-category">📦 ${product.category}</div>
                    <div class="product-flavor">✨ ${product.flavor}</div>
                    <div class="product-locations">
                        <div class="locations-title">Available at:</div>
                        ${locationBadges}
                        <div class="slot-info">Slot: ${product.slot}</div>
                    </div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-meta">
                        <span>Stock: ${product.stock}</span>
                    </div>
                    <div class="dietary-badges">
                        ${dietaryBadge}
                    </div>
                    <div class="product-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-action="decrease">-</button>
                            <span class="quantity-display">1</span>
                            <button class="quantity-btn" data-action="increase">+</button>
                        </div>
                        <button class="add-to-cart" data-product-id="${product.id}">
                            ${isFeatured ? 'Add' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Add event listeners to product cards
    addProductEventListeners(container) {
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.dataset.productId);
                const productCard = e.target.closest('.product-card');
                const quantityDisplay = productCard.querySelector('.quantity-display');
                const quantity = parseInt(quantityDisplay.textContent);
                
                this.addToCart(productId, quantity);
                this.showAddToCartAnimation(e.target);
            }
        });

        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('quantity-btn')) {
                const action = e.target.dataset.action;
                const display = e.target.parentNode.querySelector('.quantity-display');
                let quantity = parseInt(display.textContent);
                
                if (action === 'increase' && quantity < 10) {
                    quantity++;
                } else if (action === 'decrease' && quantity > 1) {
                    quantity--;
                }
                
                display.textContent = quantity;
            }
        });
    }

    // Show add to cart animation
    showAddToCartAnimation(button) {
        const originalText = button.textContent;
        button.textContent = '✓ Added!';
        button.style.background = 'var(--success-green)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }

    // Update results count
    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const categoryText = this.currentFilters.category !== 'all' ? ` in ${this.currentFilters.category}` : '';
            const brandText = this.currentFilters.brand !== 'all' ? ` - Brand: ${this.currentFilters.brand}` : '';
            resultsCount.textContent = `${this.filteredProducts.length} products found${categoryText}${brandText}`;
        }
    }

    // Load recipe bundles
    loadRecipeBundles() {
        const container = document.getElementById('bundlesGrid');
        if (!container) return;

        const bundles = [
            {
                id: 1,
                name: 'Movie Night Bundle',
                items: ['Classic Chips', 'Chocolate Bar', 'Coca-Cola'],
                originalPrice: 12.97,
                bundlePrice: 10.99,
                savings: 1.98
            },
            {
                id: 2,
                name: 'Healthy Lunch Bundle',
                items: ['Fresh Sandwich', 'Water', 'Protein Bar'],
                originalPrice: 18.97,
                bundlePrice: 15.99,
                savings: 2.98
            },
            {
                id: 3,
                name: 'Energy Boost Bundle',
                items: ['Energy Drink', 'Protein Bar', 'Gum'],
                originalPrice: 14.97,
                bundlePrice: 12.99,
                savings: 1.98
            },
            {
                id: 4,
                name: 'Sweet Treat Bundle',
                items: ['Ice Cream', 'Chocolate', 'Cookies'],
                originalPrice: 16.97,
                bundlePrice: 13.99,
                savings: 2.98
            }
        ];

        container.innerHTML = bundles.map(bundle => `
            <div class="bundle-card" data-bundle-id="${bundle.id}">
                <div class="bundle-header">
                    <div class="bundle-name">${bundle.name}</div>
                    <div class="bundle-savings">Save $${bundle.savings.toFixed(2)}</div>
                </div>
                <div class="bundle-items">
                    ${bundle.items.map(item => `<div class="bundle-item"><span>${item}</span></div>`).join('')}
                </div>
                <div class="bundle-price">
                    <div>
                        <div style="text-decoration: line-through; color: var(--warm-gray); font-size: 0.9rem;">$${bundle.originalPrice.toFixed(2)}</div>
                        <div class="bundle-total">$${bundle.bundlePrice.toFixed(2)}</div>
                    </div>
                    <button class="add-bundle">Add Bundle</button>
                </div>
            </div>
        `).join('');

        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-bundle')) {
                const bundleId = parseInt(e.target.closest('.bundle-card').dataset.bundleId);
                this.addBundleToCart(bundleId);
            }
        });
    }

    // Add bundle to cart
    addBundleToCart(bundleId) {
        const bundleProducts = this.products.slice(0, 3);
        
        bundleProducts.forEach(product => {
            this.addToCart(product.id, 1);
        });
        
        this.showNotification('Bundle added to cart!');
    }

    // Shopping cart functionality
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartCount();
    }

    // Remove from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        
        if (window.location.pathname.includes('cart.html')) {
            this.loadCartItems();
        }
    }

    // Update cart item quantity
    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartCount();
                
                if (window.location.pathname.includes('cart.html')) {
                    this.loadCartItems();
                }
            }
        }
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('vendimarket-cart', JSON.stringify(this.cart));
    }

    // Update cart count display
    updateCartCount() {
        const cartCounts = document.querySelectorAll('#cartCount, .cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCounts.forEach(element => {
            element.textContent = totalItems;
            element.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }

    // Load cart items on cart page
    loadCartItems() {
        const container = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartContent = document.getElementById('cartContent');
        
        if (!container) return;

        if (this.cart.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartContent) cartContent.style.display = 'none';
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';
        if (cartContent) cartContent.style.display = 'block';

        const groupedItems = this.cart.reduce((groups, item) => {
            const temp = item.temperature;
            if (!groups[temp]) groups[temp] = [];
            groups[temp].push(item);
            return groups;
        }, {});

        container.innerHTML = '';

        Object.keys(groupedItems).forEach(temperature => {
            const section = document.createElement('div');
            section.className = 'temperature-section';
            section.innerHTML = `
                <div class="temp-header">
                    <span>${this.getTemperatureIcon(temperature)} ${temperature.charAt(0).toUpperCase() + temperature.slice(1)} Zone</span>
                    <span class="temp-pickup-time">Ready in 2-3 min</span>
                </div>
            `;

            const itemsContainer = document.createElement('div');
            itemsContainer.innerHTML = groupedItems[temperature]
                .map(item => this.createCartItemHTML(item))
                .join('');

            section.appendChild(itemsContainer);
            container.appendChild(section);
        });

        this.updateCartSummary();
        this.addCartEventListeners();
    }

    // Create cart item HTML - ENHANCED con location
    createCartItemHTML(item) {
        const locationsList = item.locations.map(loc => `<span class="cart-location">📍 ${loc}</span>`).join(' ');
        
        return `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5SSPC90ZXh0Pjwvc3ZnPg=='">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-brand">🏷️ ${item.brand} - ${item.flavor}</div>
                    <div class="item-price">$${item.price.toFixed(2)} ea.</div>
                    <div class="item-locations">${locationsList}</div>
                    <div class="item-slot">Slot: ${item.slot}</div>
                </div>
                <div class="item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" data-action="decrease">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" data-action="increase">+</button>
                    </div>
                    <button class="remove-item" title="Remove">×</button>
                </div>
            </div>
        `;
    }

    // Add cart event listeners
    addCartEventListeners() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.cart-item')?.dataset.productId);
            
            if (e.target.classList.contains('quantity-btn')) {
                const action = e.target.dataset.action;
                const item = this.cart.find(item => item.id === productId);
                if (item) {
                    const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                    this.updateCartQuantity(productId, newQuantity);
                }
            }
            
            if (e.target.classList.contains('remove-item')) {
                this.removeFromCart(productId);
            }
        });
    }

    // Update cart summary
    updateCartSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal;

        const elements = {
            subtotal: document.getElementById('subtotal'),
            total: document.getElementById('total')
        };

        if (elements.subtotal) elements.subtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (elements.total) elements.total.textContent = `$${total.toFixed(2)}`;
        this.updateTemperatureSummary();
    }

    // Update temperature zone summary
    updateTemperatureSummary() {
        const tempSummary = document.getElementById('tempSummary');
        if (!tempSummary) return;

        const tempGroups = this.cart.reduce((groups, item) => {
            const temp = item.temperature;
            if (!groups[temp]) groups[temp] = [];
            groups[temp].push(item);
            return groups;
        }, {});

        tempSummary.innerHTML = Object.keys(tempGroups)
            .map(temp => {
                const items = tempGroups[temp];
                const count = items.reduce((sum, item) => sum + item.quantity, 0);
                return `<div class="temp-item">${temp.charAt(0).toUpperCase() + temp.slice(1)}: ${count} items</div>`;
            })
            .join('');
    }

    // Load suggested products
    loadSuggestedProducts() {
        const container = document.getElementById('suggestedGrid');
        if (!container) return;

        const suggested = this.products
            .filter(p => !this.cart.some(item => item.id === p.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        container.innerHTML = suggested.map(product => `
            <div class="suggested-item" data-product-id="${product.id}">
                <div class="suggested-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5SSPC90ZXh0Pjwvc3ZnPg=='">
                </div>
                <div class="suggested-info">
                    <div class="suggested-name">${product.name}</div>
                    <div class="suggested-price">$${product.price.toFixed(2)}</div>
                </div>
                <button class="add-suggested" title="Add to cart">+</button>
            </div>
        `).join('');

        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-suggested')) {
                const productId = parseInt(e.target.closest('.suggested-item').dataset.productId);
                this.addToCart(productId, 1);
                this.showNotification('Added to cart!');
            }
        });
    }

    // Setup checkout modal
    setupCheckoutModal() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const closeModal = document.getElementById('closeModal');
        const confirmPayment = document.getElementById('confirmPayment');
        const continueShopping = document.getElementById('continueShopping');

        if (!checkoutBtn || !checkoutModal) return;

        checkoutBtn.addEventListener('click', () => {
            if (this.cart.length === 0) return;
            checkoutModal.style.display = 'flex';
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                checkoutModal.style.display = 'none';
            });
        }

        if (confirmPayment) {
            confirmPayment.addEventListener('click', () => {
                this.processPayment();
            });
        }

        if (continueShopping) {
            continueShopping.addEventListener('click', () => {
                checkoutModal.style.display = 'none';
                window.location.href = 'products.html';
            });
        }

        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('selected'));
                method.classList.add('selected');
                method.querySelector('input[type="radio"]').checked = true;
            });
        });

        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                checkoutModal.style.display = 'none';
            }
        });
    }

    // Process payment
    processPayment() {
        const selectedMethod = document.querySelector('input[name="payment"]:checked');
        if (!selectedMethod) {
            this.showNotification('Please select a payment method');
            return;
        }

        const checkoutContent = document.getElementById('checkoutContent');
        const successMessage = document.getElementById('successMessage');
        
        checkoutContent.style.display = 'none';
        successMessage.style.display = 'block';

        setTimeout(() => {
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
        }, 2000);
    }

    // Initialize animations
    initAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        const slideLeftElements = document.querySelectorAll('.slide-in-left');
        const slideRightElements = document.querySelectorAll('.slide-in-right');
        const slideUpElements = document.querySelectorAll('.slide-up');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: entry.target.classList.contains('slide-up') ? [50, 0] : [30, 0],
                        translateX: entry.target.classList.contains('slide-in-left') ? [-50, 0] : 
                                   entry.target.classList.contains('slide-in-right') ? [50, 0] : [0, 0],
                        duration: 800,
                        easing: 'easeOutQuart',
                        delay: Math.random() * 200
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        [...fadeElements, ...slideLeftElements, ...slideRightElements, ...slideUpElements]
            .forEach(el => observer.observe(el));
    }

    // Setup event listeners
    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.background = 'rgba(44, 62, 80, 0.98)';
                } else {
                    navbar.style.background = 'rgba(44, 62, 80, 0.95)';
                }
            }
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            });
        }
    }

    // Utility functions
    getTemperatureIcon(temperature) {
        const icons = {
            ambient: '🌡️',
            cold: '🧊',
            frozen: '❄️',
            hot: '🔥'
        };
        return icons[temperature] || '📦';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.vendimarket = new VendimarketApp();
});

// Handle page visibility changes for cart updates
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.vendimarket) {
        window.vendimarket.updateCartCount();
    }
});
