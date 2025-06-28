"use client"
import { useState, useMemo } from "react"
import { Search, MapPin, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ItemDetailsModal } from "../components/ItemDetailsModal"
import { CartSidebar } from "../components/CartSidebar"
import { AuthModal } from "../components/AuthModal"
import { OrderPage } from "../components/OrderPage"
import { FilterPanel } from "../components/FilterPanel"
import { foodItems } from "../data/foodItems"
import { useSelector, useDispatch } from "react-redux"
import { OrderConfirmation } from "../components/OrderConfirmation"
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setIsOpen
} from "../redux/store"
import { DeliverySelector } from "@/components/DeliverySelector "

export default function Menuu() {
  const [vegOnly, setVegOnly] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [showOrderPage, setShowOrderPage] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("Recommended")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [orderConfirmation, setOrderConfirmation] = useState(null)

  const [filters, setFilters] = useState({
    category: "",
    isVeg: null,
    priceRange: [0, 1000],
    rating: 0,
    searchQuery: ""
  })
const dispatch = useDispatch()
const cartItems = useSelector((state) => state.cart.items)
const isCartOpen = useSelector((state) => state.cart.isOpen)


  const menuCategories = [
    "Menu",
    "Recommended",
    "Extra",
    "Veg Starter",
    "Veg Biriyani",
    "Sea Food Starter",
    "Non-Veg Starter",
    "Non-Veg Biriyani",
    "Non-Veg Curries",
    "Veg Tandoor",
    "Non-Veg Tandoor",
    "Indian Breads",
    "Egg"
  ]
const getCartItemsCount = () =>
  cartItems.reduce((total, item) => total + (item.quantity || 1), 0)

const getCartTotal = () =>
  cartItems.reduce((total, item) => {
    const basePrice = item.selectedVariant?.price || item.price;
    const addOnsPrice = (item.selectedAddOns || []).reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    return total + (basePrice + addOnsPrice) * (item.quantity || 1);
  }, 0);

  const filteredItems = useMemo(() => {
    return foodItems.filter(item => {
      if (vegOnly && !item.isVeg) return false
      if (filters.category && item.category !== filters.category) return false
      if (
        selectedCategory !== "Recommended" &&
        selectedCategory !== "Menu" &&
        item.category !== selectedCategory
      )
        return false
      if (filters.isVeg !== null && item.isVeg !== filters.isVeg) return false
      if (
        item.price < filters.priceRange[0] ||
        item.price > filters.priceRange[1]
      )
        return false
      if (item.rating < filters.rating) return false
      if (
        filters.searchQuery &&
        !item.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
        return false
      return true
    })
  }, [foodItems, vegOnly, filters, selectedCategory])

const handleAddToCart = (
  item,
  quantity = 1,
  selectedVariant,
  selectedAddOns = [],
  specialInstructions
) => {
dispatch(
  addItem({
    foodItem: item, // Always wrap the food item here
    quantity,
    selectedVariant,
    selectedAddOns,
    specialInstructions
  })
)

}

  const handleItemClick = item => {
    setSelectedItem(item)
  }

const handleCheckout = () => {
  dispatch(setIsOpen(false))
  setIsAuthOpen(true)
}

const handleBackToHome = () => {
  setOrderConfirmation(null)
}

  const handleAuthComplete = details => {
    setUserDetails(details)
    setShowOrderPage(true)
  }

  const handlePlaceOrder = orderDetails => {
    const completeOrderDetails = {
  ...orderDetails,
  orderTime: new Date().toLocaleString(),
  status: "confirmed"
}
setOrderConfirmation(completeOrderDetails)
    clearCart()
    setShowOrderPage(false)
    setUserDetails(null)
    alert(`Order placed successfully! Order ID: ${orderDetails.orderId}`)
  }

  const categories = [...new Set(foodItems.map(item => item.category))]

  if (orderConfirmation) {
  return (
    <OrderConfirmation
      orderDetails={orderConfirmation}
      onBackToHome={handleBackToHome}
    />
  )
}


  if (showOrderPage && userDetails) {
    return (
      <OrderPage
        cartItems={cartItems}
        userDetails={userDetails}
        onBack={() => setShowOrderPage(false)}
        onPlaceOrder={handlePlaceOrder}
        total={getCartTotal()}
      />
    )
  }



  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="border-b border-gray-200 px-4 py-3 lg:px-6 lg:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Logo and Restaurant Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold text-base lg:text-lg">
                R
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                React Restaurant
              </h1>
              <p className="text-xs lg:text-sm text-gray-600">
                React Restaurant - BrookeField
              </p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for items..."
                className="pl-10 bg-gray-50 border-gray-200"
                value={filters.searchQuery}
                onChange={e =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="hidden lg:block">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
              />
            </div>

            {/* Veg Only Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-xs lg:text-sm text-gray-700 hidden sm:block">
                {/* <img src="/veg.png" alt="" srcset="" height={"10%"}/> */}
              </span>
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-10 h-5 lg:w-12 lg:h-6 rounded-full transition-colors ${
                  vegOnly ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full transition-transform ${
                    vegOnly
                      ? "translate-x-5 lg:translate-x-6"
                      : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Cart Button */}
            <Button
              onClick={() =>dispatch(setIsOpen(true))
}
              className="relative bg-orange-500 hover:bg-orange-600 text-white px-3 lg:px-4"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Cart</span>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search for items..."
              className="pl-10 bg-gray-50 border-gray-200"
              value={filters.searchQuery}
              onChange={e =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <nav className="p-4 space-y-1">
              {menuCategories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === category
                      ? "bg-orange-50 text-orange-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delivery Info */}
   <DeliverySelector />

      <div className="flex max-w-7xl mx-auto">
        {/* Desktop Sidebar Menu */}
        <aside className="hidden lg:block w-64 border-r border-gray-200 p-6">
          <nav className="space-y-1">
            {menuCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
              {selectedCategory === "Menu" ? "All Items" : selectedCategory}
            </h2>
            <p className="text-sm lg:text-base text-gray-600">
              {filteredItems.length} Items
            </p>
          </div>

          {/* Food Items Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    {/* Veg/Non-veg indicator */}
                    <div className="mb-2">
                      <div
                        className={`w-4 h-4 border-2 flex items-center justify-center ${
                          item.isVeg ? "border-green-500" : "border-red-500"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>

                    <h3
                      className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-orange-600 text-sm lg:text-base"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-base lg:text-lg font-semibold text-gray-900 mb-3">
                      ₹{item.price}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className={`px-2 py-1 text-xs rounded-full ${
                            tag.includes("Chef") || tag.includes("Restaurant")
                              ? "bg-blue-100 text-blue-600"
                              : tag.includes("Spicy")
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {item.customizable && (
                      <p className="text-xs text-gray-500">Customizable</p>
                    )}
                  </div>

                  {/* Food Image and Add Button */}
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-20 lg:w-32 lg:h-24 object-cover rounded-lg cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    />
                    <Button
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold px-4 lg:px-6 py-1 text-xs lg:text-sm"
                      variant="outline"
                      onClick={() => handleItemClick(item)}
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-base lg:text-lg">
                No items found matching your criteria
              </p>
              <Button
                onClick={() => {
                  setFilters({
                    category: "",
                    isVeg: null,
                    priceRange: [0, 1000],
                    rating: 0,
                    searchQuery: ""
                  })
                  setVegOnly(false)
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <ItemDetailsModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
<CartSidebar
  isOpen={isCartOpen}
  onClose={() => dispatch(setIsOpen(false))}
  cartItems={cartItems}
  onUpdateQuantity={(id, quantity) =>
    dispatch(updateQuantity({ id, quantity }))
  }
  onRemoveItem={(id) => dispatch(removeItem(id))}
  onCheckout={handleCheckout}
  total={getCartTotal()}
/>
  

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthComplete={handleAuthComplete}
      />
    </div>
  )
}
