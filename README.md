# GGSTORE

Proyecto personal de e-commerce creado como práctica y pieza de portfolio.

El objetivo es construir una **V1 funcional**, enfocada en arquitectura clara, integración real de servicios y control de scope.

---

## Stack

**Frontend**

- Next.js (App Router)
- TypeScript
- Tailwind CSS

**Backend / CMS**

- Strapi Cloud
- SQLite
- Media Library (imágenes)

**Pagos**

- Stripe Checkout (test mode)

---

## Funcionalidades (V1)

- Catálogo de productos desde Strapi
- Filtros básicos
- Carrito de compras
- Checkout con Stripe
- Registro de pedidos

---

## Arquitectura

```text
Next.js (Frontend)
 ├─ UI catálogo / carrito / checkout
 └─ Consumo API Strapi

Strapi (Backend)
 ├─ Products
 ├─ Orders
 └─ Media (imágenes)
```

---

## Setup

```bash
git clone <repo-url>
cd ggstore
npm install
npm run dev
```

### Variables de entorno

```env
NEXT_PUBLIC_STRAPI_API_URL=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```

---

## Roadmap

- Sprint 1: Base técnica + catálogo
- Sprint 2: Carrito y filtros
- Sprint 3: Checkout y pagos
- Sprint 4: UX y pulido visual

---

## Notas

Proyecto en desarrollo.
El repositorio se irá actualizando conforme avance el proyecto.
