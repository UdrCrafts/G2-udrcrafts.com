## System Architecture

```mermaid
flowchart LR

%% CLIENTS
A1([Customer Browser]) --> F[Next.js Frontend]
A2([Vendor Dashboard Browser]) --> F
A3([Admin Panel Browser]) --> F

%% FRONTEND → BACKEND
F --> B[(Backend API Layer)]

%% BACKEND SERVICES
subgraph Backend Services
S1[Auth Service]
S2[Vendor / Tenant Service]
S3[Product Service]
S4[Order & Checkout Service]
S5[Payment Service]
S6[Customer Library Service]
S7[Reviews & Ratings Service]
S8[Notification Service]
S9[Admin Control Service]
end

B --> S1
B --> S2
B --> S3
B --> S4
B --> S5
B --> S6
B --> S7
B --> S8
B --> S9

%% DATABASE
S1 --> D[(MongoDB)]
S2 --> D
S3 --> D
S4 --> D
S5 --> D
S6 --> D
S7 --> D
S8 --> D
S9 --> D

%% PAYMENT + CDN + EMAIL INTEGRATIONS
S5 --> P((Stripe Payments))
S3 --> C1((CDN / Media Storage))
S7 --> C1
S8 --> E((Email / Notification Provider))

%% DEPLOYMENT + CI/CD
subgraph CI/CD Pipeline
G[GitHub Repo] --> CR[Automated PR Reviews]
CR --> CD[CI/CD Build & Test]
CD --> V[Vercel Deployment]
end

````

---

## Architecture Explanation

### 1) **Clients**

* **Customers** browse the storefront, explore products, add items to cart, and checkout.
* **Vendors** manage products, inventory, pricing, and track orders through their dashboard.
* **Admins** have full access for platform governance and monitoring.

### 2) **Frontend**

* Built with **Next.js** (supports SSR + CSR for performance and SEO).
* TailwindCSS is used for UI styling.
* The frontend communicates with the backend through secure HTTPS API calls.

### 3) **Backend API Layer**

* Built using **Node.js + Express**.
* Handles authentication, vendor logic, product management, checkout, and admin controls.
* Uses service-based architecture for maintainability and scalability.

### 4) **Core Backend Services**

| Service               | Responsibility                                     |
| --------------------- | -------------------------------------------------- |
| Auth Service          | Login, Sign-up, JWT, Role-based access             |
| Vendor/Tenant Service | Vendor onboarding & store configuration            |
| Product Service       | Product CRUD, categories, media uploads            |
| Order Service         | Cart, checkout, order tracking                     |
| Payment Service       | Stripe integration, payout splitting               |
| Customer Library      | View purchased items (digital goods if applicable) |
| Reviews Service       | Ratings and review submission                      |
| Notification Service  | Sends email alerts & confirmations                 |
| Admin Service         | System-wide dashboard & moderation tools           |

### 5) **Database**

* **MongoDB** stores users, vendors, products, orders, payments, inventory, reviews, etc.

### 6) **External Integrations**

| System        | Usage                                           |
| ------------- | ----------------------------------------------- |
| Stripe        | Payment processing & vendor payout              |
| CDN           | Media asset storage (product images, documents) |
| Email Service | Order confirmations, verification emails        |

### 7) **CI/CD Pipeline**

* Team works using **feature branches** → pull requests → code review → merge.
* **Automated tests and build checks** ensure production stability.
* Deployment is done via **Vercel** (Frontend) and **Railway/Render** (Backend).

---

## Branching Workflow (Team Standard)

| Branch      | Purpose                            |
| ----------- | ---------------------------------- |
| `main`      | Production-ready code only         |
| `develop`   | Integrated staging branch          |
| `feature/*` | Work branches for individual tasks |
