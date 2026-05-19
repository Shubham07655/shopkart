# ShopKart - E-Commerce Platform

ShopKart is a full-stack E-Commerce web application built using **React.js, Spring Boot, Spring Security, JWT, and PostgreSQL**. The platform provides secure authentication, product management, cart functionality, and order handling through a clean, responsive, and user-friendly interface.

---

## 🚀 Features

### 👤 Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Role-Based Access Control (Admin/User)
- Secure Protected Routes

### 🛍️ Product Management
- Add, Update, Delete Products
- Product Listing & Search
- Category-wise Product Filtering
- Product Details View

### 🛒 Cart & Orders
- Add to Cart Functionality
- Update Cart Quantity
- Remove Products from Cart
- Place Orders
- Order History Management

### 📊 Admin Functionalities
- Manage Products
- Manage Users
- Manage Orders
- Dashboard Overview

### 🎨 Frontend
- Responsive UI
- Modern React Components
- Dynamic State Management
- User-Friendly Navigation

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Axios
- Tailwind CSS / CSS

## Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate

## Database
- PostgreSQL

---

# 📂 Project Structure

```bash
ShopKart/
│
├── frontend/                 # React Frontend
│   ├── src/
│   ├── public/
│
├── backend/                  # Spring Boot Backend
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── security/
│
├── README.md
```

---

# 🔐 Authentication Flow

1. User Registers/Login
2. Backend validates credentials
3. JWT Token generated
4. Token stored on client side
5. Protected APIs accessed using JWT Token

---

# ⚙️ Backend Features

- RESTful APIs
- JWT Authentication
- Spring Security Integration
- Role-Based Authorization
- Exception Handling
- Validation
- CRUD Operations
- PostgreSQL Integration

---

# 🎨 Frontend Features

- Responsive Layout
- Product Pages
- Shopping Cart UI
- Authentication Pages
- Admin Dashboard
- Dynamic Product Rendering

---

# 🗄️ Database Entities

- Users
- Roles
- Products
- Categories
- Cart
- Orders
- Order Items

---

# 📌 API Endpoints

## Authentication APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Product APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get All Products |
| GET | `/api/products/{id}` | Get Product By ID |
| POST | `/api/products` | Add Product |
| PUT | `/api/products/{id}` | Update Product |
| DELETE | `/api/products/{id}` | Delete Product |

---

## Cart APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart/add` | Add Product to Cart |
| GET | `/api/cart` | Get User Cart |
| DELETE | `/api/cart/remove/{id}` | Remove Product From Cart |

---

## Order APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place Order |
| GET | `/api/orders` | Get Order History |

---

# 💻 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/shopkart.git
cd shopkart
```

---

# 🔧 Backend Setup

## Configure PostgreSQL Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/shopkart
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 📸 Screenshots

> Add screenshots of:
- Home Page
- Login Page
- Product Page
- Cart Page
- Admin Dashboard

---

# 🧪 Future Improvements

- Payment Gateway Integration
- Wishlist Feature
- Product Reviews & Ratings
- Order Tracking
- Email Notifications
- Docker Deployment
- Microservices Architecture

---

# 👨‍💻 Author

## Aman Varma

- GitHub: https://github.com/itsaman45

---

# 📄 License

This project is developed for educational and learning purposes.