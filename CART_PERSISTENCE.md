# Cart Persistence Feature

## Overview

This feature implements user-specific cart persistence, allowing users to maintain their cart items across login sessions. When a user logs out and logs back in, their cart items will be restored.

## How It Works

### 1. User Authentication Integration

- The `useUserCart` hook monitors Clerk authentication state
- When a user logs in, their cart is loaded from the stored data
- When a user logs out, their current cart is saved before clearing

### 2. Cart Storage Structure

- Each user's cart is stored separately in Redux state under `userCarts[userId]`
- Cart data includes: `cartItems`, `amount`, and `total`
- Data is persisted to localStorage for persistence across browser sessions

### 3. Key Components

#### Redux Slices

- **userSlice.js**: Manages current user state
- **cartSlice.js**: Enhanced with user-specific cart management actions

#### Hooks

- **useUserCart.js**: Custom hook that handles user authentication and cart persistence

#### Utilities

- **cartPersistence.js**: Handles localStorage operations for cart data

### 4. Cart Actions

- `loadUserCart(userId)`: Loads a specific user's cart
- `saveUserCart(userId)`: Saves current cart for a specific user
- `clearUserCart(userId)`: Clears cart for a specific user
- `loadStoredCarts()`: Loads all stored carts from localStorage

### 5. User Experience

1. User logs in → Their previous cart is automatically loaded
2. User adds/removes items → Cart is automatically saved
3. User logs out → Cart is saved for future sessions
4. User logs back in → Their cart is restored exactly as they left it

## Technical Implementation

### Data Flow

1. User authentication state changes (via Clerk)
2. `useUserCart` hook detects the change
3. If logging in: Load user's cart from Redux store
4. If logging out: Save current cart to Redux store
5. Cart changes trigger automatic saving for logged-in users
6. All cart data is persisted to localStorage

### Storage Format

```javascript
{
  "user_123": {
    "cartItems": [...],
    "amount": 5,
    "total": 99.99
  },
  "user_456": {
    "cartItems": [...],
    "amount": 3,
    "total": 49.99
  }
}
```

## Benefits

- Seamless user experience across sessions
- No data loss when users log out
- Multiple users can have separate carts on the same device
- Automatic persistence without user intervention
