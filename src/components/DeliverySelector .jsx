"use client";
import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, LocateFixed } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../redux/locationSlice";
import { Button } from "@/components/ui/button";

export function DeliverySelector() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const menuRef = useRef();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const modes = [
    { value: "delivery", label: "Delivery" },
    { value: "pickup", label: "Pickup" },
  ];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const address = data.display_name;

          dispatch(
            setLocation({
              type: location.type,
              data: address,
            })
          );
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Could not retrieve address.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location.");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
          >
            <span className="font-medium capitalize">{location.type}</span>
            <ChevronDown className="ml-1 w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded shadow">
              {modes.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => {
                    dispatch(
                      setLocation({
                        type: mode.value,
                        data: location.data,
                      })
                    );
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm ${
                    location.type === mode.value
                      ? "font-medium text-gray-900 bg-gray-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 mr-2 rounded-full border border-gray-400 flex items-center justify-center`}
                  >
                    {location.type === mode.value && (
                      <div className="w-2 h-2 rounded-full bg-gray-800" />
                    )}
                  </div>
                  {mode.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm truncate max-w-xs">
            <span className="font-medium capitalize">{location.type} to:</span>{" "}
            {location.data || "No location selected"}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? "Locating..." : (
              <>
                <LocateFixed className="w-4 h-4 mr-1" />
                Use My Location
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
