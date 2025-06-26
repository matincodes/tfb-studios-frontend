import { LayoutDashboard, Settings, Package } from "lucide-react"

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
  },
  {
    title: "Materials",
    href: "/materials-library",
    icon: Package,
    badge: null,
  },
]

export default function Layout() {
  return <div>{/* Your layout content here */}</div>
}
