"use client" // Added client directive to enable event handlers

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, Heart } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  description: string | null
  image: string | null
  logoImage: string | null
  cuisine: string | string[] | null
  rating: number | null
  deliveryTime?: string | null
  deliveryFee: number | null
  isOpen: boolean
}

interface RestaurantCardProps {
  restaurant: Restaurant
  featured?: boolean
}

export function RestaurantCard({ restaurant, featured = false }: RestaurantCardProps) {
  const cardClass = featured
    ? "group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    : "group cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"

  const displayImage = restaurant.logoImage || restaurant.image || null
  const placeholderImage = `/placeholder.svg?width=400&height=200&text=${encodeURIComponent(restaurant.name)}`

  // Handle cuisine display - convert array to string if needed
  const cuisineDisplay = Array.isArray(restaurant.cuisine)
    ? restaurant.cuisine.join(", ")
    : restaurant.cuisine || "Various"

  return (
    <Link href={`/customer/restaurant/${restaurant.id}`} className="block">
      <Card
        className={`${cardClass} overflow-hidden rounded-2xl`}
      >
        <div className="relative">
          <div className={`w-full object-cover overflow-hidden ${featured ? "h-52" : "h-44"} bg-muted`}>
            <img
              src={displayImage || placeholderImage}
              alt={`${restaurant.name} logo`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(event) => {
                event.currentTarget.src = placeholderImage
              }}
              onLoad={(event) => {
                event.currentTarget.style.filter = "none"
              }}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-card/90 hover:bg-card rounded-full shadow-md backdrop-blur-sm"
          >
            <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors" />
          </Button>

          {restaurant.deliveryFee === 0 && (
            <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-500 text-white border-none shadow-md rounded-full px-3 py-1">
              Free Delivery
            </Badge>
          )}

          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="destructive" className="text-white font-semibold px-5 py-2 rounded-full shadow-lg">
                Closed
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-bold text-foreground line-clamp-1 ${featured ? "text-xl" : "text-lg"}`}>
              {restaurant.name}
            </h3>
            <div className="flex items-center space-x-1 flex-shrink-0 ml-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-full px-2 py-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-bold text-foreground">{restaurant.rating?.toFixed(1) || "4.5"}</span>
            </div>
          </div>

          <p className="text-sm text-primary mb-3 font-medium">{cuisineDisplay}</p>

          {restaurant.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{restaurant.description}</p>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1.5 text-muted-foreground bg-muted rounded-full px-3 py-1.5">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{restaurant.deliveryTime || "25-40 min"}</span>
            </div>
            <span className={`font-semibold ${restaurant.deliveryFee === 0 ? "text-green-600 dark:text-green-500" : "text-foreground"}`}>
              {restaurant.deliveryFee === 0
                ? "Free"
                : `$${restaurant.deliveryFee?.toFixed(2) || "2.99"}`}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
