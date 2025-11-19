import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  Users,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "../contexts/AuthContext";

export default function MainLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/projects", label: "Projects", icon: FolderKanban },
    { path: "/task", label: "Tasks", icon: ListChecks },
    { path: "/teams", label: "Teams", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6 flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <h1 className="text-xl font-bold mb-8">Smart Task Manager</h1>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "justify-start gap-3",
                    !isActive && "hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">
            {currentUser?.name}
          </span>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="justify-start gap-3"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Page Content */}
      <main className="flex-1 h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
