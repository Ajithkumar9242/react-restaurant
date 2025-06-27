"use client"
import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FilterPanel({ filters, onFiltersChange, categories }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <Input
                  placeholder="Search items..."
                  value={filters.searchQuery}
                  onChange={e =>
                    handleFilterChange("searchQuery", e.target.value)
                  }
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={e => handleFilterChange("category", e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Veg/Non-Veg */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Food Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vegType"
                      checked={filters.isVeg === null}
                      onChange={() => handleFilterChange("isVeg", null)}
                    />
                    <span>All</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vegType"
                      checked={filters.isVeg === true}
                      onChange={() => handleFilterChange("isVeg", true)}
                    />
                    <span>Veg Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="vegType"
                      checked={filters.isVeg === false}
                      onChange={() => handleFilterChange("isVeg", false)}
                    />
                    <span>Non-Veg Only</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange[0]}
                    onChange={e =>
                      handleFilterChange("priceRange", [
                        Number(e.target.value),
                        filters.priceRange[1]
                      ])
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange[1]}
                    onChange={e =>
                      handleFilterChange("priceRange", [
                        filters.priceRange[0],
                        Number(e.target.value)
                      ])
                    }
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={e =>
                    handleFilterChange("rating", Number(e.target.value))
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              <Button
                onClick={() => {
                  onFiltersChange({
                    category: "",
                    isVeg: null,
                    priceRange: [0, 1000],
                    rating: 0,
                    searchQuery: ""
                  })
                }}
                variant="outline"
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
