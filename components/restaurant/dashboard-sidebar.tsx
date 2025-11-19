"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Building2,
  Menu,
  ShoppingBag,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { signOut, useSession } from "next-auth/react"

const navigation = [
  {
    name: "Dashboard",
    href: "/restaurant/dashboard",
    icon: Home,
  },
  {
    name: "Account & Settings",
    href: "/restaurant/dashboard/account",
    icon: User,
  },
  {
    name: "Menu Management",
    href: "/restaurant/dashboard/menu",
    icon: Menu,
  },
  {
    name: "Orders & Kitchen",
    href: "/restaurant/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    name: "Analytics",
    href: "/restaurant/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Support",
    href: "/restaurant/dashboard/support",
    icon: HelpCircle,
  },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-foreground">FoodHub</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-1">
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "R"}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {session?.user?.name || "Restaurant Owner"}
                </p>
                <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                  Active
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/restaurant/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Theme Toggle & Sign Out */}
        <div className="p-4 border-t border-border space-y-2">
          {!collapsed && (
            <div className="flex items-center justify-between px-3">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          )}
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className={`w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 ${
              collapsed ? "px-2" : ""
            }`}
          >
            <LogOut className={`w-5 h-5 ${collapsed ? "mx-auto" : "mr-3"}`} />
            {!collapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
