# Cart system

## Overview

This project contains a secure cart flow for a modern online shop.

### What it includes
- Persistent cart state using localStorage for guests and server-side session storage for backend requests.
- Automatic cleanup of stale carts after 7 days.
- Server-side recalculation of totals using product IDs.
- Quantity validation, XSS sanitization and rate limiting.
- CSRF protection and graceful error handling.
- React cart UI with add, remove, update and clear actions.

## Architecture

- Frontend: React + Vite
- Backend: Node.js + Express
- Storage: in-memory session cart store for demo purposes
- Validation: server-side sanitization and product catalog lookup

## Run locally

```bash
npm install
npm run dev:all
```

This starts:
- Vite frontend at http://localhost:3000
- Express API at http://localhost:4000

## API

### GET /api/products
Returns the allowed product catalog.

### GET /api/cart
Returns item list and totals for the current session.

### POST /api/cart/items
Add an item to the cart.

### PATCH /api/cart/items/:productId
Update quantity.

### DELETE /api/cart/items/:productId
Remove item from the cart.

### DELETE /api/cart
Clear the whole cart.

### GET /api/cart/csrf
Create a CSRF token for protected writes.

## Security notes

- Product prices are never trusted from browser input.
- All totals are recalculated on the backend using catalog data.
- Invalid quantities are rejected.
- XSS payloads are stripped before storage.
- Cart endpoints are protected with rate limiting and CSRF tokens.
