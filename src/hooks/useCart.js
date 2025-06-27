"use client"
import { useState, useCallback } from "react"

export function useCart() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = useCallback(
    (
      foodItem,
      quantity = 1,
      selectedVariant,
      selectedAddOns = [],
      specialInstructions
    ) => {
      setCartItems(prev => {
        const existingItemIndex = prev.findIndex(
          item =>
            item.foodItem.id === foodItem.id &&
            item.selectedVariant?.id === selectedVariant?.id &&
            JSON.stringify(item.selectedAddOns) ===
              JSON.stringify(selectedAddOns)
        )

        if (existingItemIndex >= 0) {
          const updated = [...prev]
          updated[existingItemIndex].quantity += quantity
          return updated
        }

        return [
          ...prev,
          {
            id: Date.now(),
            foodItem,
            quantity,
            selectedVariant,
            selectedAddOns,
            specialInstructions
          }
        ]
      })
    },
    []
  )

  const removeFromCart = useCallback(cartItemId => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId))
  }, [])

  const updateQuantity = useCallback(
    (cartItemId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId)
        return
      }

      setCartItems(prev =>
        prev.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      )
    },
    [removeFromCart]
  )

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const basePrice = item.selectedVariant?.price || item.foodItem.price
      const addOnsPrice = item.selectedAddOns.reduce(
        (sum, addon) => sum + addon.price,
        0
      )
      return total + (basePrice + addOnsPrice) * item.quantity
    }, 0)
  }, [cartItems])

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }, [cartItems])

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  }
}
