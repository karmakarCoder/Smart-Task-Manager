import { LayoutDashboard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader({ onReassign }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of your projects and tasks
        </p>
      </div>

      <Button onClick={onReassign} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Reassign Tasks
      </Button>
    </div>
  );
}
