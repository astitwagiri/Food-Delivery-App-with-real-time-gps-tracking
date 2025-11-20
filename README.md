Food Delivery & Real-Time Tracking App
A full-stack food delivery platform built with Next.js 15 (App Router). It handles the complete order lifecycle—customer ordering, restaurant management, and driver delivery—synced with real-time GPS tracking via Socket.IO.

 👨‍💻 Demo & Login Credentials

Important:To test the real-time features (like live order status and GPS tracking), you should run **3 separate browsers** (or Incognito windows) to simulate the Customer, Restaurant, and Driver simultaneously.

| Role | Email / Login | Password | Description |
| :--- | :--- | :--- | :--- |
| **Customer** | **Google** or **GitHub** | *(OAuth)* | Use the social login buttons on the sign-in page. |
| **Restaurant** | `restaurant@gmail.com` | `admin2424` | Manage menu items, incoming orders, and dockets. |
| **Driver** | `driver@gmail.com` | `admin2424` | View active jobs and broadcast GPS location. |

## Key Features

  * **Live GPS Tracking:** Customers can watch driver location in real-time (powered by Socket.IO, Leaflet, and Leaflet Routing Machine).
  * **Role-Based Access:** Separate dashboards and auth flows for Customers, Restaurants, and Drivers (NextAuth.js v5).
  * **Restaurant Dashboard:** CMS for managing profiles, menu items, and active order queues.
  * **Stripe Integration:** Secure payment processing at checkout.
  * **Order Flow:** Complete state management from "Placed" -\> "Preparing" -\> "Out for Delivery" -\> "Delivered".

## Tech Stack

  * **Framework:** Next.js 15.3.4 (App Router)
  * **Database:** PostgreSQL (via Prisma ORM)
  * **Auth:** NextAuth.js (v5 Beta)
  * **Real-time:** Socket.IO (server & client)
  * **Maps:** Leaflet, React-Leaflet, Leaflet Routing Machine
  * **UI/Style:** Tailwind CSS, Radix UI, Lucide React
  * **Payments:** Stripe SDK

## Setup & Installation

### Prerequisites

  * Node.js (LTS)
  * PostgreSQL database URL
  * Stripe API Keys (Publishable & Secret)
  * Google Maps API Key (optional, if using specific geolocation features)
  * Vercel Blob (for image storage)

### 1\. Clone and Install

```bash
git clone [your-repo-link]
cd foodapp
npm install
```

### 2\. Environment Variables

Create a `.env` file in the root directory and add your keys:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
# Add other keys as needed
```

### 3\. Database Setup

Generate the Prisma client and push the schema to your DB:

```bash
npx prisma migrate dev --name init
```

### 4\. Run Locally

Start the development server (uses Turbopack by default):

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.
