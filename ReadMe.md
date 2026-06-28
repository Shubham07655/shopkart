<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-3.4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Cookie_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
</p>

<h1 align="center">🛒 ShopKart</h1>
<h3 align="center">Full-Stack E-Commerce Application</h3>

<p align="center">
A production-ready, full-stack e-commerce platform with <b>JWT cookie-based authentication</b>, <b>role-based access control</b>, <b>product management</b>, <b>shopping cart</b>, <b>multi-step checkout</b>, <b>order tracking</b>, and a <b>premium dark-themed UI</b>.
</p>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Authentication & Security](#-authentication--security)
- [Role-Based Access Control](#-role-based-access-control)
- [API Documentation](#-api-documentation)
  - [Auth API](#1--auth-controller----apiauth)
  - [Product API](#2--product-controller----api)
  - [Category API](#3--category-controller----api)
  - [Cart API](#4--cart-controller----api)
  - [Order API](#5--order-controller----api)
  - [Address API](#6--address-controller----api)
- [Data Models](#-data-models)
- [Error Handling](#-error-handling)
- [Frontend Pages](#-frontend-pages)
- [Environment Variables](#-environment-variables)
- [Default Accounts](#-default-accounts)

---

## ✨ Features

### 👤 Customer Features
- **User Registration & Login** — Secure JWT cookie-based authentication
- **Product Browsing** — Search, filter by category, sort, and paginate
- **Product Detail View** — Full product information with quantity selector
- **Shopping Cart** — Add, update quantity, remove items with live total
- **Multi-Step Checkout** — Address selection → Payment method → Order review
- **Order History** — View all past orders with expandable item details
- **Address Management** — Full CRUD for delivery addresses

### 🏪 Seller Features
- **Seller Dashboard** — Product statistics and overview table
- **Product Management** — Create, update, delete products with image upload
- **Inventory Control** — Stock quantity management

### 🔑 Admin Features
- **Admin Dashboard** — Store-wide statistics (orders, products, categories, deliveries)
- **Order Management** — View all orders, update order status (Accepted → Processing → Shipped → Delivered)
- **Category Management** — Create, edit, and delete product categories

### 🛡️ Security Features
- **JWT in HTTP-Only Cookies** — XSS-proof token storage
- **Role-Based Access Control** — Endpoint-level protection with `@PreAuthorize`
- **Admin Registration Blocked** — No one can self-register as admin
- **CORS Protection** — Configured for trusted frontend origins only
- **BCrypt Password Hashing** — Industry-standard password security
- **Input Validation** — Jakarta Bean Validation on all entities
- **Global Exception Handling** — Consistent error responses via `@ControllerAdvice`

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17+ | Programming Language |
| Spring Boot | 3.4.x | Application Framework |
| Spring Security | 7.0.x | Authentication & Authorization |
| Spring Data JPA | 3.4.x | ORM & Data Access |
| PostgreSQL | 13+ | Relational Database |
| JWT (jjwt) | 0.12.x | Token-based Authentication |
| ModelMapper | 3.x | Entity ↔ DTO Mapping |
| Lombok | 1.18.x | Boilerplate Code Reduction |
| Maven | 3.8+ | Build & Dependency Management |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Library |
| Vite | 8.x | Build Tool & Dev Server |
| React Router | 7.x | Client-Side Routing |
| Axios | 1.x | HTTP Client with Cookie Support |
| React Icons | 5.x | Icon Library (Feather Icons) |

### Design System
- **Theme:** Premium dark glassmorphism
- **Fonts:** Inter (body), Outfit (headings) via Google Fonts
- **Animations:** Fade-in, slide-up, shimmer loading, hover transforms
- **Responsive:** Mobile-first design with CSS custom properties

---

## 📁 Project Structure

```
ShopKart/
│
├── backend/                          # ☕ Spring Boot REST API
│   ├── pom.xml                       # Maven configuration & dependencies
│   ├── mvnw / mvnw.cmd              # Maven wrapper scripts
│   ├── images/                       # Uploaded product images directory
│   └── src/
│       └── main/
│           ├── java/com/Shopkart/Application/
│           │   ├── Application.java           # Main entry point
│           │   ├── controller/                # REST API Controllers
│           │   │   ├── AuthController.java     # Authentication endpoints
│           │   │   ├── ProductController.java  # Product CRUD endpoints
│           │   │   ├── CategoryController.java # Category CRUD endpoints
│           │   │   ├── CartController.java     # Shopping cart endpoints
│           │   │   ├── OrderController.java    # Order management endpoints
│           │   │   └── AddressController.java  # Address CRUD endpoints
│           │   ├── model/                     # JPA Entity Classes
│           │   │   ├── User.java, Role.java, AppRole.java
│           │   │   ├── Product.java, Category.java
│           │   │   ├── Cart.java, CartItem.java
│           │   │   ├── Order.java, OrderItem.java
│           │   │   ├── Payment.java
│           │   │   └── Address.java
│           │   ├── payload/                   # DTOs & Response Objects
│           │   │   ├── ProductDTO.java, ProductResponse.java
│           │   │   ├── CategoryDTO.java, CategoryResponse.java
│           │   │   ├── CartDTO.java, CartItemDTO.java
│           │   │   ├── OrderDTO.java, OrderItemDTO.java
│           │   │   ├── OrderRequestDTO.java, PaymentDTO.java
│           │   │   ├── AddressDTO.java
│           │   │   └── APIResponse.java
│           │   ├── repository/                # Spring Data JPA Repositories
│           │   ├── service/                   # Business Logic Layer
│           │   │   ├── ProductService[Impl].java
│           │   │   ├── CategoryService[Impl].java
│           │   │   ├── CartService[Impl].java
│           │   │   ├── OrderService[Impl].java
│           │   │   ├── AddressService[Impl].java
│           │   │   └── FileService[Impl].java
│           │   ├── security/                  # Security Configuration
│           │   │   ├── WebSecurityConfig.java  # Security filter chain
│           │   │   ├── jwt/
│           │   │   │   ├── JwtUtils.java       # JWT generation & validation
│           │   │   │   ├── AuthTokenFilter.java # Request filter for JWT
│           │   │   │   └── AuthEntryPointJwt.java
│           │   │   ├── request/               # Login & Signup DTOs
│           │   │   ├── response/              # Auth response DTOs
│           │   │   └── services/              # UserDetailsService
│           │   ├── config/                    # App config & constants
│           │   ├── exceptions/                # Global exception handlers
│           │   └── utils/                     # Utility classes
│           └── resources/
│               ├── application.properties     # Server & DB configuration
│               └── data.sql                   # Seed data (roles, admin user)
│
├── frontend/                         # ⚛️ React + Vite SPA
│   ├── package.json                  # NPM dependencies
│   ├── vite.config.js                # Vite config (proxy, port 3000)
│   ├── index.html                    # HTML entry point
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx                   # Root component with all routes
│       ├── index.css                 # Complete design system (~400 lines)
│       ├── api/
│       │   └── axios.js              # Axios instance with cookie support
│       ├── context/
│       │   ├── AuthContext.jsx        # Authentication state & actions
│       │   ├── CartContext.jsx        # Cart state & actions
│       │   └── ToastContext.jsx       # Toast notification system
│       ├── components/
│       │   ├── Layout.jsx             # Page wrapper (Navbar + Footer)
│       │   ├── Navbar.jsx             # Navigation with role-based links
│       │   ├── Footer.jsx             # Site footer
│       │   ├── ProductCard.jsx        # Reusable product card
│       │   ├── ProtectedRoute.jsx     # Auth & role guard HOC
│       │   └── LoadingSpinner.jsx     # Spinner & skeleton loaders
│       └── pages/
│           ├── Home.jsx               # Landing page with hero & featured
│           ├── Login.jsx              # Login form
│           ├── Register.jsx           # Registration (Buyer/Seller only)
│           ├── Products.jsx           # Product listing with filters
│           ├── ProductDetail.jsx      # Single product view
│           ├── Cart.jsx               # Shopping cart
│           ├── Checkout.jsx           # 3-step checkout flow
│           ├── Orders.jsx             # Order history
│           ├── Addresses.jsx          # Address management
│           ├── seller/
│           │   ├── SellerDashboard.jsx # Product management table
│           │   ├── AddProduct.jsx      # Create product form
│           │   └── EditProduct.jsx     # Edit product form
│           └── admin/
│               ├── AdminDashboard.jsx  # Store statistics
│               ├── ManageOrders.jsx    # Order status management
│               └── ManageCategories.jsx # Category CRUD
│
└── ReadMe.md                         # This documentation file
```

---

## 🚀 Getting Started

### Prerequisites

| Software | Version | Required |
|----------|---------|----------|
| Java JDK | 17 or higher | ✅ |
| Maven | 3.8 or higher | ✅ |
| Node.js | 18 or higher | ✅ |
| npm | 9 or higher | ✅ |
| PostgreSQL | 13 or higher | ✅ |

### Step 1 — Database Setup

Create a PostgreSQL database named `ecommerce`:

```sql
CREATE DATABASE ecommerce;
```

> The application auto-creates all tables on startup via `spring.jpa.hibernate.ddl-auto=update`.

### Step 2 — Backend Setup

```bash
# Navigate to backend directory
cd backend

# (Optional) Set environment variables for production
# On Linux/Mac:
export JWT_SECRET=your-256-bit-secret-key-here
export DB_PASSWORD=your-database-password

# On Windows PowerShell:
$env:JWT_SECRET="your-256-bit-secret-key-here"
$env:DB_PASSWORD="your-database-password"

# Run with Maven Wrapper
./mvnw spring-boot:run       # Linux/Mac
.\mvnw.cmd spring-boot:run   # Windows
```

The backend will start on **http://localhost:8081**

### Step 3 — Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:3000** and automatically proxies all `/api` requests to the backend.

### Step 4 — Open in Browser

Navigate to **http://localhost:3000** to use the application.

### Production Build (Frontend)

```bash
cd frontend
npm run build      # Output in dist/
npm run preview    # Preview production build locally
```

---

## 🔐 Authentication & Security

### How Authentication Works

ShopKart uses **stateless JWT authentication** with tokens stored in **HTTP-only cookies**:

```
┌──────────┐         POST /api/auth/signin           ┌──────────┐
│          │  ──────────────────────────────────────▶  │          │
│  Client  │         { username, password }           │  Server  │
│ (Browser)│  ◀──────────────────────────────────────  │ (Spring) │
│          │    Set-Cookie: springBootEcommerce=JWT    │          │
└──────────┘                                          └──────────┘
      │                                                     │
      │    Subsequent requests automatically include         │
      │    the cookie (browser handles this)                 │
      │                                                     │
      │         GET /api/carts/user/cart                     │
      │  ───────────────────────────────────────────▶       │
      │    Cookie: springBootEcommerce=eyJhbG...            │
      │  ◀───────────────────────────────────────────       │
      │         { cartId: 1, totalPrice: 500 }              │
```

### Cookie Properties

| Property | Value | Security Purpose |
|----------|-------|-----------------|
| `name` | `springBootEcommerce` | Cookie identifier |
| `httpOnly` | `true` | JavaScript **cannot** access the token (XSS protection) |
| `sameSite` | `Lax` | Browser won't send cookie on cross-site POST requests (CSRF protection) |
| `path` | `/api` | Cookie is only sent to API endpoints |
| `maxAge` | `86400` seconds (24h) | Token auto-expires after 24 hours |

### CORS Configuration

The backend only accepts requests from these origins:
- `http://localhost:3000` (Vite dev server)
- `http://localhost:5173` (Vite default port)

---

## 👥 Role-Based Access Control

### Available Roles

| Role | Code | Description |
|------|------|-------------|
| Buyer | `ROLE_USER` | Default role. Can browse, buy, and manage own orders |
| Seller | `ROLE_SELLER` | Can create, update, and delete products |
| Admin | `ROLE_ADMIN` | Full access. Can manage orders, categories, and all data |

### Permission Matrix

| Action | Guest | `ROLE_USER` | `ROLE_SELLER` | `ROLE_ADMIN` |
|--------|:-----:|:-----------:|:-------------:|:------------:|
| Browse products & categories | ✅ | ✅ | ✅ | ✅ |
| Search products | ✅ | ✅ | ✅ | ✅ |
| View product details | ✅ | ✅ | ✅ | ✅ |
| Register / Login / Logout | ✅ | ✅ | ✅ | ✅ |
| Add to cart | ❌ | ✅ | ✅ | ✅ |
| Place orders | ❌ | ✅ | ✅ | ✅ |
| View own orders | ❌ | ✅ | ✅ | ✅ |
| Manage addresses | ❌ | ✅ | ✅ | ✅ |
| Create / Edit products | ❌ | ❌ | ✅ | ✅ |
| Delete products | ❌ | ❌ | ✅ | ✅ |
| Upload product images | ❌ | ❌ | ✅ | ✅ |
| View all orders | ❌ | ❌ | ❌ | ✅ |
| Update order status | ❌ | ❌ | ❌ | ✅ |
| Create / Edit categories | ❌ | ❌ | ❌ | ✅ |
| Delete categories | ❌ | ❌ | ❌ | ✅ |
| View all carts | ❌ | ❌ | ❌ | ✅ |

> ⚠️ **Important:** Admin accounts **cannot** be created through self-registration. The `admin` role is blocked in the signup endpoint. Only the database-seeded admin account or another admin can create new admins.

---

## 📡 API Documentation

**Base URL:** `http://localhost:8081`

All protected endpoints require a valid JWT cookie (obtained via `POST /api/auth/signin`).

### Authentication Legend

| Symbol | Meaning |
|--------|---------|
| 🌐 | Public — No authentication required |
| 🔒 | Authenticated — Any logged-in user |
| 🔑 SELLER | Requires `ROLE_SELLER` |
| 🔑 ADMIN | Requires `ROLE_ADMIN` |

---

### 1. 🔑 Auth Controller — `/api/auth`

Handles user registration, login, logout, and session management.

---

#### `POST /api/auth/signin` 🌐

Authenticate a user and receive a JWT cookie.

**Request Body:**
```json
{
  "username": "user1",
  "password": "password1"
}
```

**Success Response:** `200 OK`
```json
{
  "id": 1,
  "username": "user1",
  "jwtToken": "springBootEcommerce=eyJhbGci...; Path=/api; Max-Age=86400; HttpOnly; SameSite=Lax",
  "roles": ["ROLE_USER"]
}
```

> The response includes a `Set-Cookie` header. Browsers automatically store and send this cookie with subsequent requests.

**Error Response:** `401 Unauthorized`
```json
{
  "message": "Bad Credentials",
  "status": false
}
```

---

#### `POST /api/auth/signup` 🌐

Register a new user account.

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securePassword123",
  "roles": ["user"]
}
```

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `username` | String | ✅ | 3–20 chars | Unique username |
| `email` | String | ✅ | Valid email, max 50 | Unique email address |
| `password` | String | ✅ | 6–40 chars | User password |
| `roles` | Set\<String\> | ❌ | `"user"` or `"seller"` | Defaults to `"user"` if omitted. **`"admin"` is blocked.** |

**Success Response:** `200 OK`
```json
{
  "message": "User registered succuessfully!"
}
```

**Error Responses:**

| Status | Body | Cause |
|--------|------|-------|
| `400` | `{ "message": "Error : Username is already taken!" }` | Duplicate username |
| `400` | `{ "message": "Error : Email is already taken!" }` | Duplicate email |

---

#### `GET /api/auth/user` 🔒

Get the currently authenticated user's details.

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "user1",
  "jwtToken": null,
  "roles": ["ROLE_USER"]
}
```

---

#### `GET /api/auth/username` 🔒

Get the currently authenticated user's username as plain text.

**Response:** `200 OK`
```
user1
```

---

#### `POST /api/auth/signout` 🔒

Logout the current user by clearing the JWT cookie.

**Response:** `200 OK`
```json
{
  "message": "You have been signed out!!"
}
```

> The response includes a `Set-Cookie` header that expires the JWT cookie.

---

### 2. 📦 Product Controller — `/api`

Manages product CRUD operations. Public endpoints for browsing, protected endpoints for management.

---

#### `GET /api/public/products` 🌐

Get all products with pagination and sorting.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pageNumber` | Integer | `0` | Page index (0-based) |
| `pageSize` | Integer | `10` | Number of items per page |
| `sortBy` | String | `productId` | Sort field: `productId`, `productName`, `price`, `quantity` |
| `sortOrder` | String | `asc` | Sort direction: `asc` or `desc` |

**Example:** `GET /api/public/products?pageNumber=0&pageSize=5&sortBy=price&sortOrder=desc`

**Response:** `200 OK`
```json
{
  "content": [
    {
      "productId": 1,
      "productName": "Wireless Headphones",
      "description": "Premium noise-cancelling headphones with 40hr battery",
      "image": "headphones.jpg",
      "price": 2999.00,
      "discount": 10.0,
      "specialPrice": 2699.10,
      "quantity": 50
    }
  ],
  "pageNumber": 0,
  "pageSize": 5,
  "totalElements": 25,
  "totalPages": 5,
  "lastPage": false
}
```

> `specialPrice` is auto-calculated as `price - (price × discount / 100)`.

---

#### `GET /api/public/categories/{categoryId}/products` 🌐

Get products filtered by category ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `categoryId` | Long | ID of the category to filter by |

**Query Parameters:** Same as `GET /api/public/products`

**Response:** `200 OK` — Same format as products listing.

---

#### `GET /api/public/products/keyword/{keyword}` 🌐

Search products by keyword (matches product name).

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | String | Search term (case-insensitive, partial match) |

**Query Parameters:** Same as `GET /api/public/products`

**Example:** `GET /api/public/products/keyword/headphone?sortBy=price&sortOrder=asc`

---

#### `POST /api/admin/categories/{categoryId}/products` 🔑 SELLER

Create a new product in a specific category.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `categoryId` | Long | Category to assign the product to |

**Request Body:**
```json
{
  "productName": "Wireless Headphones",
  "description": "Premium noise-cancelling headphones with 40hr battery life",
  "price": 2999.00,
  "discount": 10.0,
  "quantity": 50
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `productName` | String | ✅ | Min 3 characters |
| `description` | String | ✅ | Min 6 characters |
| `price` | Double | ✅ | — |
| `discount` | Double | ❌ | 0–100 (percentage) |
| `quantity` | Integer | ✅ | — |

**Response:** `201 Created` — Returns the created `ProductDTO` with generated `productId` and computed `specialPrice`.

---

#### `PUT /api/admin/products/{productId}` 🔑 SELLER

Update an existing product.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `productId` | Long | ID of the product to update |

**Request Body:** Same as create product.

**Response:** `200 OK` — Returns the updated `ProductDTO`.

---

#### `DELETE /api/admin/products/{productId}` 🔑 SELLER

Delete a product.

**Response:** `200 OK` — Returns the deleted `ProductDTO`.

---

#### `PUT /api/admin/products/{productId}/image` 🔑 SELLER

Upload or update a product's image.

**Content-Type:** `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `image` | File | Image file (JPEG, PNG, WebP, etc.) |

**Example (curl):**
```bash
curl -X PUT http://localhost:8081/api/admin/products/1/image \
  -F "image=@product_photo.jpg" \
  -b cookies.txt
```

**Response:** `200 OK` — Returns updated `ProductDTO` with new `image` filename.

> Images are stored in the `backend/images/` directory and served at `http://localhost:8081/images/{filename}`.

---

### 3. 📂 Category Controller — `/api`

Manages product categories. Public read access, admin-only write access.

---

#### `GET /api/public/category` 🌐

Get all categories with pagination.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `pageNumber` | Integer | `0` | Page index |
| `pageSize` | Integer | `10` | Items per page |
| `sortBy` | String | `categoryId` | Sort field |
| `sortOrder` | String | `asc` | `asc` or `desc` |

**Response:** `200 OK`
```json
{
  "content": [
    {
      "categoryId": 1,
      "categoryName": "Electronics"
    },
    {
      "categoryId": 2,
      "categoryName": "SmartPhones"
    }
  ],
  "pageNumber": 0,
  "pageSize": 10,
  "totalElements": 2,
  "totalPages": 1,
  "lastPage": true
}
```

---

#### `POST /api/public/category` 🔑 ADMIN

Create a new category.

**Request Body:**
```json
{
  "categoryName": "Electronics"
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `categoryName` | String | ✅ | Min 5 characters |

**Response:** `201 Created`
```json
{
  "categoryId": 3,
  "categoryName": "Electronics"
}
```

---

#### `PUT /api/public/category/{categoryId}` 🔑 ADMIN

Update a category's name.

**Request Body:**
```json
{
  "categoryName": "Updated Category Name"
}
```

**Response:** `200 OK` — Returns updated `CategoryDTO`.

---

#### `DELETE /api/admin/category/{categoryId}` 🔑 ADMIN

Delete a category.

**Response:** `200 OK` — Returns deleted `CategoryDTO`.

> ⚠️ Deleting a category may affect products assigned to it.

---

### 4. 🛒 Cart Controller — `/api`

Manages the user's shopping cart. Each user has one cart.

---

#### `POST /api/carts/products/{productId}/quantity/{quantity}` 🔒

Add a product to the authenticated user's cart.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `productId` | Long | Product to add |
| `quantity` | Integer | Number of items to add |

**Response:** `201 Created`
```json
{
  "cartId": 1,
  "totalPrice": 5398.20,
  "products": [
    {
      "productId": 1,
      "productName": "Wireless Headphones",
      "image": "headphones.jpg",
      "description": "Premium noise-cancelling headphones",
      "quantity": 2,
      "price": 2999.00,
      "discount": 10.0,
      "specialPrice": 2699.10
    }
  ]
}
```

**Error:** `400 Bad Request` — If product already exists in cart.

---

#### `GET /api/carts/user/cart` 🔒

Get the authenticated user's cart.

**Response:** `200 OK` — Returns `CartDTO` (see above format).

**Error:** `400 Bad Request` — If cart is empty.

---

#### `PUT /api/cart/products/{productId}/quantity/{operation}` 🔒

Update the quantity of a product in the cart.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `productId` | Long | Product to update |
| `operation` | String | `increase` (+1) or `delete` (-1) |

**Response:** `200 OK` — Returns updated `CartDTO`.

---

#### `DELETE /api/carts/{cartId}/product/{productId}` 🔒

Remove a product from the cart entirely.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `cartId` | Long | Cart ID |
| `productId` | Long | Product to remove |

**Response:** `200 OK` — Returns success message string.

---

#### `GET /api/carts` 🔑 ADMIN

Get all carts in the system (admin only).

**Response:** `302 Found` — Returns `List<CartDTO>`.

---

### 5. 📋 Order Controller — `/api`

Handles order placement, history, and status management.

---

#### `POST /api/order/users/payments/{paymentMethod}` 🔒

Place a new order from the current user's cart.

**Path Parameters:**

| Parameter | Type | Validation | Description |
|-----------|------|------------|-------------|
| `paymentMethod` | String | Min 4 characters | Payment method name (e.g., `"Cash On Delivery"`) |

> ⚠️ The `paymentMethod` value must be **at least 4 characters** due to backend validation. Use `"Cash On Delivery"` instead of `"COD"`.

**Request Body:**
```json
{
  "addressId": 102,
  "pgName": "Cash On Delivery",
  "pgPaymentId": "COD_1719520000000",
  "pgStatus": "Pending",
  "pgResponseMessage": "Cash on Delivery"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `addressId` | Long | ✅ | Delivery address ID |
| `pgName` | String | ❌ | Payment gateway name |
| `pgPaymentId` | String | ❌ | Payment gateway transaction ID |
| `pgStatus` | String | ❌ | Payment status |
| `pgResponseMessage` | String | ❌ | Payment gateway response |

**Response:** `201 Created`
```json
{
  "orderId": 3,
  "email": "user1@example.com",
  "orderDate": "2026-06-28",
  "totalAmount": 97500.00,
  "orderStatus": "Order Accepted!",
  "addressId": 102,
  "orderItems": [
    {
      "orderItemId": 5,
      "productDTO": {
        "productId": 1,
        "productName": "Motorola G34",
        "description": "8GB Ram and 128GB Storage",
        "image": "default.png",
        "quantity": 2,
        "price": 15000.00,
        "discount": 15.0,
        "specialPrice": 12750.00
      },
      "quantity": 2,
      "price": 12750.00,
      "orderedProductPrice": 12750.00
    }
  ],
  "payment": {
    "paymentId": 3,
    "paymentMethod": "Cash On Delivery",
    "pgPaymentId": "COD_1719520000000",
    "pgStatus": "Pending",
    "pgResponseMessage": "Cash on Delivery",
    "pgName": "Cash On Delivery"
  }
}
```

**What happens on order placement:**
1. Cart items are converted to order items
2. Product stock quantities are decremented
3. Cart is cleared
4. Payment record is created

---

#### `GET /api/user/orders` 🔒

Get all orders for the authenticated user.

**Response:** `200 OK`
```json
[
  {
    "orderId": 1,
    "email": "user1@example.com",
    "orderDate": "2026-06-28",
    "totalAmount": 97500.00,
    "orderStatus": "Order Accepted!",
    "addressId": 102,
    "orderItems": [ ... ],
    "payment": { ... }
  }
]
```

---

#### `GET /api/admin/orders` 🔑 ADMIN

Get all orders in the system.

**Response:** `200 OK` — Returns `List<OrderDTO>` for all users.

---

#### `PUT /api/admin/orders/{orderId}/status` 🔑 ADMIN

Update an order's status.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `orderId` | Long | Order to update |

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | String | ✅ | New status value |

**Valid Status Values:**

| Status | Description |
|--------|-------------|
| `Order Accepted!` | Order has been placed and accepted |
| `Processing` | Order is being prepared |
| `Shipped` | Order has been shipped |
| `Delivered` | Order has been delivered |
| `Cancelled` | Order has been cancelled |

**Example:**
```
PUT /api/admin/orders/3/status?status=Shipped
```

**Response:** `200 OK` — Returns updated `OrderDTO`.

---

### 6. 📍 Address Controller — `/api`

Manages delivery addresses for authenticated users.

---

#### `POST /api/address` 🔒

Create a new address for the authenticated user.

**Request Body:**
```json
{
  "street": "123 MG Road",
  "buildingName": "Sunshine Apartments, B-404",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "pincode": "400001"
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `street` | String | ✅ | Min 5 characters |
| `buildingName` | String | ✅ | Min 5 characters |
| `city` | String | ✅ | Min 3 characters |
| `state` | String | ✅ | Min 2 characters |
| `country` | String | ✅ | Min 2 characters |
| `pincode` | String | ✅ | Min 6 characters |

**Response:** `201 Created`
```json
{
  "addressId": 152,
  "street": "123 MG Road",
  "buildingName": "Sunshine Apartments, B-404",
  "city": "Mumbai",
  "state": "Maharashtra",
  "country": "India",
  "pincode": "400001"
}
```

---

#### `GET /api/address` 🔒

Get all addresses in the system.

**Response:** `200 OK` — Returns `List<AddressDTO>`.

---

#### `GET /api/address/{addressId}` 🔒

Get a specific address by ID.

**Response:** `200 OK` — Returns `AddressDTO`.

---

#### `GET /api/address/user` 🔒

Get all addresses belonging to the authenticated user.

**Response:** `200 OK`
```json
[
  {
    "addressId": 102,
    "street": "Pipe Road",
    "buildingName": "Vikrant CHS",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "pincode": "400070"
  }
]
```

---

#### `PUT /api/address/{addressId}` 🔒

Update an existing address.

**Request Body:** Same as create address.

**Response:** `200 OK` — Returns updated `AddressDTO`.

---

#### `DELETE /api/address/{addressId}` 🔒

Delete an address.

**Response:** `200 OK` — Returns success message string.

---

## 🗃️ Data Models

### ProductDTO

```json
{
  "productId": "Long (auto-generated)",
  "productName": "String (min 3 chars, required)",
  "description": "String (min 6 chars, required)",
  "image": "String (filename, defaults to 'default.png')",
  "price": "Double (original price)",
  "discount": "Double (percentage, 0–100)",
  "specialPrice": "Double (auto-calculated: price - price × discount / 100)",
  "quantity": "Integer (stock count)"
}
```

### CategoryDTO

```json
{
  "categoryId": "Long (auto-generated)",
  "categoryName": "String (min 5 chars, required)"
}
```

### CartDTO

```json
{
  "cartId": "Long",
  "totalPrice": "Double (sum of all items × quantity at special price)",
  "products": "List<ProductDTO> (items in cart, quantity = cart quantity)"
}
```

### OrderDTO

```json
{
  "orderId": "Long (auto-generated)",
  "email": "String (buyer's email)",
  "orderDate": "LocalDate (yyyy-MM-dd)",
  "totalAmount": "Double",
  "orderStatus": "String (Order Accepted! | Processing | Shipped | Delivered | Cancelled)",
  "addressId": "Long (delivery address)",
  "orderItems": "List<OrderItemDTO>",
  "payment": "PaymentDTO"
}
```

### OrderItemDTO

```json
{
  "orderItemId": "Long",
  "productDTO": "ProductDTO",
  "quantity": "Integer (ordered quantity)",
  "price": "Double (unit price at time of order)",
  "orderedProductPrice": "Double (special price at time of order)"
}
```

### PaymentDTO

```json
{
  "paymentId": "Long (auto-generated)",
  "paymentMethod": "String (min 4 chars, e.g., 'Cash On Delivery')",
  "pgPaymentId": "String (payment gateway transaction ID)",
  "pgStatus": "String (e.g., 'Pending', 'Completed')",
  "pgResponseMessage": "String",
  "pgName": "String (e.g., 'Cash On Delivery', 'Stripe')"
}
```

### AddressDTO

```json
{
  "addressId": "Long (auto-generated)",
  "street": "String (min 5 chars)",
  "buildingName": "String (min 5 chars)",
  "city": "String (min 3 chars)",
  "state": "String (min 2 chars)",
  "country": "String (min 2 chars)",
  "pincode": "String (min 6 chars)"
}
```

### Paginated Response Format

All paginated endpoints return this wrapper:

```json
{
  "content": [ ... ],
  "pageNumber": 0,
  "pageSize": 10,
  "totalElements": 25,
  "totalPages": 3,
  "lastPage": false
}
```

---

## ⚠️ Error Handling

The application uses a global exception handler (`@ControllerAdvice`) to provide consistent error responses.

### Standard Error Response

```json
{
  "message": "Description of what went wrong",
  "status": false
}
```

### Common Error Codes

| HTTP Status | Meaning | Example |
|-------------|---------|---------|
| `400` | Bad Request | Validation error, duplicate entry, product already in cart |
| `401` | Unauthorized | Missing or expired JWT cookie |
| `403` | Forbidden | User doesn't have the required role |
| `404` | Not Found | Resource doesn't exist (product, category, address, order) |
| `500` | Internal Server Error | Unexpected server error |

### Validation Error Response

When request body validation fails:

```json
{
  "productName": "Product Name must be atleast 3 characters long",
  "description": "Product Desc must be atleast 6 characters long"
}
```

### Resource Not Found Response

```json
{
  "message": "Product not found with productId: 999",
  "status": false
}
```

---

## 🖥️ Frontend Pages

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero banner, featured products grid, category cards |
| **Products** | `/products` | Full product catalog with search bar, category filter, sort dropdown, pagination |
| **Product Detail** | `/products/:id` | Large product image, pricing, stock status, quantity selector, add to cart |
| **Login** | `/login` | Glassmorphism login card with animated background orbs |
| **Register** | `/register` | Registration form with Buyer/Seller role toggle (no Admin option) |

### Authenticated User Pages

| Page | Route | Description |
|------|-------|-------------|
| **Cart** | `/cart` | Cart items with image, quantity +/- controls, remove button, order summary sidebar |
| **Checkout** | `/checkout` | 3-step wizard: Select/Add Address → Payment Method (COD) → Order Review & Place |
| **Orders** | `/orders` | Order history cards with status badges, expandable to show items and payment info |
| **Addresses** | `/addresses` | Address cards grid with Edit/Delete, add new address form |

### Seller Pages (ROLE_SELLER)

| Page | Route | Description |
|------|-------|-------------|
| **Seller Dashboard** | `/seller/dashboard` | Stats cards, full product table with image, price, stock, Edit/Delete actions |
| **Add Product** | `/seller/products/add` | Form with name, description, price, discount, stock, category dropdown, image upload |
| **Edit Product** | `/seller/products/edit/:id` | Pre-filled form with current product data, optional image update |

### Admin Pages (ROLE_ADMIN)

| Page | Route | Description |
|------|-------|-------------|
| **Admin Dashboard** | `/admin/dashboard` | 4 stat cards (Orders, Products, Categories, Delivered), quick action cards, recent orders table |
| **Manage Orders** | `/admin/orders` | Full order table with status filter, inline status update dropdown, expandable order details |
| **Manage Categories** | `/admin/categories` | Category table with inline edit, add new form at top, delete with confirmation |

---

## 🔧 Environment Variables

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `JWT_SECRET` | `mySecretKey123ShopKart...` (built-in) | Secret key for JWT token signing. **Must be ≥256 bits for production.** |
| `DB_PASSWORD` | `admin123` | PostgreSQL database password |

### Setting Environment Variables

**Linux / macOS:**
```bash
export JWT_SECRET="your-production-secret-key-at-least-256-bits-long"
export DB_PASSWORD="your-secure-db-password"
```

**Windows PowerShell:**
```powershell
$env:JWT_SECRET="your-production-secret-key-at-least-256-bits-long"
$env:DB_PASSWORD="your-secure-db-password"
```

**Windows CMD:**
```cmd
set JWT_SECRET=your-production-secret-key-at-least-256-bits-long
set DB_PASSWORD=your-secure-db-password
```

---

## 🧪 Default Accounts

The database is seeded with the following accounts on first startup:

| Username | Password | Roles | Description |
|----------|----------|-------|-------------|
| `user1` | `password1` | `ROLE_USER` | Regular buyer account |
| `seller1` | `password2` | `ROLE_SELLER` | Seller with product management |
| `admin` | `adminPass` | `ROLE_ADMIN`, `ROLE_SELLER`, `ROLE_USER` | Full admin access |

> These accounts are created by `data.sql` during the initial database setup.

---

## 📊 API Quick Reference

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | `POST` | `/api/auth/signin` | 🌐 | Login |
| 2 | `POST` | `/api/auth/signup` | 🌐 | Register |
| 3 | `GET` | `/api/auth/user` | 🔒 | Current user info |
| 4 | `GET` | `/api/auth/username` | 🔒 | Current username |
| 5 | `POST` | `/api/auth/signout` | 🔒 | Logout |
| 6 | `GET` | `/api/public/products` | 🌐 | List products (paginated) |
| 7 | `GET` | `/api/public/categories/{id}/products` | 🌐 | Products by category |
| 8 | `GET` | `/api/public/products/keyword/{kw}` | 🌐 | Search products |
| 9 | `POST` | `/api/admin/categories/{id}/products` | 🔑 SELLER | Create product |
| 10 | `PUT` | `/api/admin/products/{id}` | 🔑 SELLER | Update product |
| 11 | `DELETE` | `/api/admin/products/{id}` | 🔑 SELLER | Delete product |
| 12 | `PUT` | `/api/admin/products/{id}/image` | 🔑 SELLER | Upload image |
| 13 | `GET` | `/api/public/category` | 🌐 | List categories |
| 14 | `POST` | `/api/public/category` | 🔑 ADMIN | Create category |
| 15 | `PUT` | `/api/public/category/{id}` | 🔑 ADMIN | Update category |
| 16 | `DELETE` | `/api/admin/category/{id}` | 🔑 ADMIN | Delete category |
| 17 | `POST` | `/api/carts/products/{id}/quantity/{qty}` | 🔒 | Add to cart |
| 18 | `GET` | `/api/carts/user/cart` | 🔒 | Get my cart |
| 19 | `PUT` | `/api/cart/products/{id}/quantity/{op}` | 🔒 | Update cart qty |
| 20 | `DELETE` | `/api/carts/{cartId}/product/{prodId}` | 🔒 | Remove from cart |
| 21 | `GET` | `/api/carts` | 🔑 ADMIN | All carts |
| 22 | `POST` | `/api/order/users/payments/{method}` | 🔒 | Place order |
| 23 | `GET` | `/api/user/orders` | 🔒 | My orders |
| 24 | `GET` | `/api/admin/orders` | 🔑 ADMIN | All orders |
| 25 | `PUT` | `/api/admin/orders/{id}/status` | 🔑 ADMIN | Update order status |
| 26 | `POST` | `/api/address` | 🔒 | Create address |
| 27 | `GET` | `/api/address` | 🔒 | All addresses |
| 28 | `GET` | `/api/address/{id}` | 🔒 | Get address |
| 29 | `GET` | `/api/address/user` | 🔒 | My addresses |
| 30 | `PUT` | `/api/address/{id}` | 🔒 | Update address |
| 31 | `DELETE` | `/api/address/{id}` | 🔒 | Delete address |

---

<p align="center">
  Built by Aman,Shubham & Mayank using <b>Spring Boot</b> & <b>React</b>
</p>