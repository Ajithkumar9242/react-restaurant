// "use client";
// import { useState } from "react";
// import {
//   ArrowLeft,
//   MapPin,
//   Phone,
//   Plus,
//   Minus,
//   Tag,
//   MessageSquare
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { CouponModal } from "./CouponModal";
// import { AddressModal } from "./AddressModal";

// export function OrderPage({
//   cartItems,
//   userDetails,
//   onBack,
//   onPlaceOrder,
//   total
// }) {
//   const [addresses, setAddresses] = useState([
//     {
//       id: "1",
//       type: "home",
//       name: "John Doe",
//       address: "Cluster_dodda Nekkundi 2 Benoxa Tower, SHRADDHA...",
//       landmark: "Near Metro Station",
//       city: "Bangalore",
//       pincode: "560037",
//       isDefault: true
//     }
//   ]);
//   const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

//   const [offerCode, setOfferCode] = useState("");
//   const [appliedOffer, setAppliedOffer] = useState(null);

//   const [preparationInstructions, setPreparationInstructions] = useState("");
//   const [showInstructionsInput, setShowInstructionsInput] = useState(false);

//   const [appliedCoupon, setAppliedCoupon] = useState(null)
// const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)


//   const deliveryFee = 40;
//   const cgst = Math.round(total * 0.09);
//   const sgst = Math.round(total * 0.09);
//   const discount = appliedOffer ? Math.round(total * 0.1) : 0;
//   const finalTotal = total + deliveryFee + cgst + sgst - discount;

//   const availableOffers = [
//     { code: "SAVE10", description: "Get 10% off on orders above ₹200", minOrder: 200 },
//     { code: "FIRST20", description: "20% off on first order", minOrder: 150 },
//     { code: "WEEKEND15", description: "15% off on weekend orders", minOrder: 250 }
//   ];

//   const handleApplyOffer = () => {
//     const offer = availableOffers.find(
//       o => o.code === offerCode && total >= o.minOrder
//     );
//     if (offer) {
//       setAppliedOffer(offer.code);
//       setOfferCode("");
//     } else {
//       alert("Invalid offer code or minimum order not met");
//     }
//   };

//   const handleUpdateQuantity = (itemId, newQuantity) => {
//     console.log("Update quantity:", itemId, newQuantity);
//   };

//   const handlePlaceOrder = () => {
//     const orderDetails = {
//       items: cartItems,
//       userDetails,
//       deliveryAddress: selectedAddress.address,
//       preparationInstructions,
//       subtotal: total,
//       deliveryFee,
//       cgst,
//       sgst,
//       discount,
//       total: finalTotal,
//       appliedOffer,
//       orderId: `MF${Date.now()}`,
//       estimatedDelivery: "45-50 mins"
//     };
//     onPlaceOrder(orderDetails);
//   };

//   const handleAddAddress = address => setAddresses([...addresses, address]);
//   const handleUpdateAddress = updatedAddress => {
//     setAddresses(addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr));
//     if (selectedAddress.id === updatedAddress.id) {
//       setSelectedAddress(updatedAddress);
//     }
//   };
//   const handleDeleteAddress = addressId =>
//     setAddresses(addresses.filter(addr => addr.id !== addressId));
//   const handleSelectAddress = address => setSelectedAddress(address);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-white border-b sticky top-0 z-10">
//         <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
//           <Button variant="ghost" size="sm" onClick={onBack}>
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <h1 className="text-lg font-semibold">My Order</h1>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-4 lg:p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Delivery Details */}
//             <div className="bg-white rounded-lg p-6 space-y-4">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-600 mb-1">Your location:</p>
//                   <p className="text-gray-900 font-medium">{selectedAddress.address}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-600 mb-1">Pickup from:</p>
//                   <p className="text-gray-900 font-medium">
//                     NO 90/3 4th floor Marathahalli - Sarjapur Outer Ring R...
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-2 border-t">
//                 <div className="flex items-center gap-3">
//                   <Phone className="w-5 h-5 text-gray-500" />
//                   <div>
//                     <p className="text-gray-900 font-medium">{userDetails.phone}</p>
//                     <p className="text-xs text-gray-500">
//                       (We'll send order updates on this no.)
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="text-orange-500 border-orange-500 bg-transparent"
//                   onClick={() => setIsAddressModalOpen(true)}
//                 >
//                   CHANGE
//                 </Button>
//               </div>
//             </div>

//             {/* Items */}
//             <div className="bg-white rounded-lg p-6">
//               <h2 className="text-lg font-semibold mb-4">Items in cart</h2>
//               <div className="space-y-4">
//                 {cartItems.map(item => {
//                   const basePrice = item.selectedVariant?.price || item.foodItem.price;
//                   const addOnsPrice = item.selectedAddOns.reduce(
//                     (sum, addon) => sum + addon.price,
//                     0
//                   );
//                   const itemTotal = (basePrice + addOnsPrice) * item.quantity;

//                   return (
//                     <div key={item.id} className="flex items-start justify-between">
//                       <div className="flex items-start gap-3 flex-1">
//                        <div
//   className={`w-4 h-4 border-2 flex items-center justify-center mt-1 ${
//     item.foodItem
//       ? item.foodItem.isVeg
//         ? "border-green-500"
//         : "border-red-500"
//       : "border-gray-300"
//   }`}
// >
//   <div
//     className={`w-2 h-2 rounded-full ${
//       item.foodItem
//         ? item.foodItem.isVeg
//           ? "bg-green-500"
//           : "bg-red-500"
//         : "bg-gray-300"
//     }`}
//   />
// </div>

//                         <div className="flex-1">
//   <h3 className="font-medium text-gray-900">
//     {item.foodItem?.name || "Unknown Item"}
//   </h3>
//   {item.selectedVariant && (
//     <p className="text-sm text-gray-600">{item.selectedVariant.name}</p>
//   )}
//   {item.selectedAddOns?.length > 0 && (
//     <p className="text-sm text-gray-600">
//       Add-ons: {item.selectedAddOns.map(a => a?.name || "Unknown").join(", ")}
//     </p>
//   )}
//   <p className="text-sm font-medium text-gray-900">₹{itemTotal}</p>
// </div>

//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() =>
//                             handleUpdateQuantity(item.id, item.quantity - 1)
//                           }
//                           className="w-8 h-8 p-0 text-orange-500 border-orange-500"
//                         >
//                           <Minus className="w-3 h-3" />
//                         </Button>
//                         <span className="w-8 text-center text-sm font-medium">
//                           {item.quantity}
//                         </span>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() =>
//                             handleUpdateQuantity(item.id, item.quantity + 1)
//                           }
//                           className="w-8 h-8 p-0 text-orange-500 border-orange-500"
//                         >
//                           <Plus className="w-3 h-3" />
//                         </Button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-lg p-6">
//               <h2 className="text-lg font-semibold mb-4">Bill details</h2>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span>Item Total</span>
//                   <span>₹{total}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Delivery Fee</span>
//                   <span>₹{deliveryFee}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>CGST</span>
//                   <span>₹{cgst}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>SGST</span>
//                   <span>₹{sgst}</span>
//                 </div>
//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount ({appliedOffer})</span>
//                     <span>-₹{discount}</span>
//                   </div>
//                 )}
//                 <div className="border-t pt-3 flex justify-between font-semibold text-lg">
//                   <span>To Pay</span>
//                   <span>₹{finalTotal}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Offers */}
//             <div className="bg-white rounded-lg p-4 space-y-3">
//               {appliedOffer ? (
//                 <div className="bg-green-50 p-3 rounded-lg">
//                   <p className="text-sm font-medium text-green-700">
//                     Offer Applied: {appliedOffer}
//                   </p>
//                   <p className="text-xs text-green-600">
//                     You saved ₹{discount}!
//                   </p>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     onClick={() => setAppliedOffer(null)}
//                     className="mt-2 text-red-500 border-red-500"
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex gap-2">
//                     <Input
//                       placeholder="Enter offer code"
//                       value={offerCode}
//                       onChange={e => setOfferCode(e.target.value.toUpperCase())}
//                     />
//                     <Button
//                       onClick={handleApplyOffer}
//                       disabled={!offerCode}
//                       className="bg-green-600 hover:bg-green-700 text-white"
//                     >
//                       Apply
//                     </Button>
//                   </div>
//                   <div className="space-y-1">
//                     {availableOffers.map(o => (
//                       <p key={o.code} className="text-xs text-gray-500">
//                         <span className="font-medium">{o.code}</span>: {o.description}
//                       </p>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Make Payment */}
//             <Button
//               onClick={handlePlaceOrder}
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-medium rounded-lg"
//             >
//               MAKE PAYMENT
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <AddressModal
//         isOpen={isAddressModalOpen}
//         onClose={() => setIsAddressModalOpen(false)}
//         addresses={addresses}
//         onSelectAddress={handleSelectAddress}
//         onAddAddress={handleAddAddress}
//         onUpdateAddress={handleUpdateAddress}
//         onDeleteAddress={handleDeleteAddress}
//         selectedAddressId={selectedAddress.id}
//       />

//        <CouponModal
//         isOpen={isCouponModalOpen}
//         onClose={() => setIsCouponModalOpen(false)}
//         onApplyCoupon={(coupon) => {
//           setAppliedCoupon(coupon)
//           setIsCouponModalOpen(false)
//         }}
//         currentTotal={total}
//         appliedCoupon={appliedCoupon}
//       />
//     </div>
//   );
// }












"use client"
import { useState } from "react"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Plus,
  Minus,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CouponModal } from "./CouponModal"
import { AddressModal } from "./AddressModal"
import { useSelector } from "react-redux";

export function OrderPage({
  cartItems,
  userDetails,
  onBack,
  onPlaceOrder,
  total
}) {
  const [deliveryAddress, setDeliveryAddress] = useState(
    "Cluster_dodda Nekkundi 2 Benoxa Tower, SHRADDH..."
  )
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const [preparationInstructions, setPreparationInstructions] = useState("")
  const [showInstructionsInput, setShowInstructionsInput] = useState(false)

  const [addresses, setAddresses] = useState([
    {
      id: "1",
      type: "home",
      name: "John Doe",
      address: "Cluster_dodda Nekkundi 2 Benoxa Tower, SHRADDHA...",
      landmark: "Near Metro Station",
      city: "Bangalore",
      pincode: "560037",
      isDefault: true
    }
  ])
  const [selectedAddress, setSelectedAddress] = useState(addresses[0])
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const location = useSelector(state => state.location);
const [items, setItems] = useState(cartItems);

const handleUpdateQuantity = (itemId, newQuantity) => {
  if (newQuantity < 1) return; // prevent 0 quantity

  setItems(prevItems =>
    prevItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
};

const computedTotal = items.reduce((sum, item) => {
  const base = item.selectedVariant?.price || item.foodItem?.price || 0;
  const addOns = item.selectedAddOns.reduce((s, a) => s + a.price, 0);
  return sum + (base + addOns) * item.quantity;
}, 0);

const cgst = Math.round(computedTotal * 0.025);
const sgst = Math.round(computedTotal * 0.025);

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.type === "fixed") {
      return appliedCoupon.discount
    } else {
      const discount = (total * appliedCoupon.discount) / 100
      return appliedCoupon.maxDiscount
        ? Math.min(discount, appliedCoupon.maxDiscount)
        : discount
    }
  }

  const discount = calculateDiscount()
  const finalTotal = computedTotal + cgst + sgst - discount

 

  const handleAddAddress = address => {
    setAddresses([...addresses, address])
  }

  const handleUpdateAddress = updatedAddress => {
    setAddresses(
      addresses.map(addr =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      )
    )
    if (selectedAddress.id === updatedAddress.id) {
      setSelectedAddress(updatedAddress)
    }
  }

  const handleDeleteAddress = addressId => {
    setAddresses(addresses.filter(addr => addr.id !== addressId))
  }

  const handleSelectAddress = address => {
    setSelectedAddress(address)
  }

  const handlePlaceOrder = () => {
    const orderDetails = {
      items: cartItems,
      userDetails,
      deliveryAddress: selectedAddress.address,
      preparationInstructions,
      subtotal: total,
      cgst,
      sgst,
      discount,
      total: finalTotal,
      appliedCoupon,
      orderId: `MF${Date.now()}`,
      estimatedDelivery: "45-50 mins"
    }
    onPlaceOrder(orderDetails)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">My Order</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Your location:</p>
                  <p className="text-gray-900 font-medium">
  {location.data || "No location selected"}
</p>

                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Pickup from:</p>
                  <p className="text-gray-900 font-medium">
                    NO 90/3 4th floor Marathahalli - Sarjapur Outer Ring R...
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      {userDetails.phone}
                    </p>
                    <p className="text-xs text-gray-500">
                      (We'll send order updates on this no.)
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-orange-500 border-orange-500 bg-transparent"
                  onClick={() => setIsAddressModalOpen(true)}
                >
                  CHANGE
                </Button>
              </div>
            </div>

            {/* Items in Cart */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Items in cart</h2>
              <div className="space-y-4">
                {cartItems.map(item => {
                  const basePrice =
                    item.selectedVariant?.price || item.foodItem.price
                  const addOnsPrice = item.selectedAddOns.reduce(
                    (sum, addon) => sum + addon.price,
                    0
                  )
                  const itemTotal = (basePrice + addOnsPrice) * item.quantity

                  return (
                    <div key={item.id} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                       <div
  className={`w-4 h-4 border-2 flex items-center justify-center mt-1 ${
    item.foodItem
      ? item.foodItem.isVeg
        ? "border-green-500"
        : "border-red-500"
      : "border-gray-300"
  }`}
>
  <div
    className={`w-2 h-2 rounded-full ${
      item.foodItem
        ? item.foodItem.isVeg
          ? "bg-green-500"
          : "bg-red-500"
        : "bg-gray-300"
    }`}
  />
</div>

                          <div className="flex-1">
<h3 className="font-medium text-gray-900">
  {item.foodItem?.name || item.name || "Unnamed Item"}
</h3>


  {item.selectedVariant && (
    <p className="text-sm text-gray-600">{item.selectedVariant.name}</p>
  )}
  {item.selectedAddOns.length > 0 && (
    <p className="text-sm text-gray-600">
      Add-ons: {item.selectedAddOns.map(a => a.name).join(", ")}
    </p>
  )}
  <p className="text-sm font-medium text-gray-900">₹{itemTotal}</p>
</div>

                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 p-0 text-orange-500 border-orange-500"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 p-0 text-orange-500 border-orange-500"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Preparation Instructions */}
                      <div className="ml-7">
                        {!showInstructionsInput ? (
                          <button
                            onClick={() => setShowInstructionsInput(true)}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Preparation Instructions +
                          </button>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <MessageSquare className="w-4 h-4" />
                              Preparation Instructions
                            </div>
                            <Input
                              placeholder="e.g., less spicy, extra sauce, no onions"
                              value={preparationInstructions}
                              onChange={e =>
                                setPreparationInstructions(e.target.value)
                              }
                              className="text-sm"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => setShowInstructionsInput(false)}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setShowInstructionsInput(false)
                                  setPreparationInstructions("")
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Bill Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Bill details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span className="font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CGST</span>
                  <span className="font-medium">₹{cgst}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SGST</span>
                  <span className="font-medium">₹{sgst}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-₹{Math.round(discount)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>To Pay</span>
                  <span>₹{Math.round(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Apply Store Offer */}
            <div className="bg-white rounded-lg p-4">
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">%</span>
                  </div>
                  <span className="font-medium text-green-600">
                    Apply Store offer
                  </span>
                </div>
                <span className="text-green-600 text-xl">›</span>
              </button>
              {appliedCoupon && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-700">
                    {appliedCoupon.code} Applied
                  </p>
                  <p className="text-xs text-green-600">
                    You saved ₹{Math.round(discount)}!
                  </p>
                </div>
              )}
            </div>

            {/* Make Payment Button */}
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-medium rounded-lg"
            >
              MAKE PAYMENT
            </Button>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        onSelectAddress={handleSelectAddress}
        onAddAddress={handleAddAddress}
        onUpdateAddress={handleUpdateAddress}
        onDeleteAddress={handleDeleteAddress}
        selectedAddressId={selectedAddress.id}
      />

      {/* Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onApplyCoupon={coupon => {
          setAppliedCoupon(coupon)
          setIsCouponModalOpen(false)
        }}
        currentTotal={total}
        appliedCoupon={appliedCoupon}
      />
    </div>
  )
}
