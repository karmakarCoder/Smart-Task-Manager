import { LayoutDashboard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader({ onReassign, overloadedMembers }) {
  return (
    <div className="flex items-center justify-between border-b py-5 px-8 sticky top-0 left-0 bg-white z-50">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of your projects and tasks
        </p>
      </div>

      <Button
        onClick={onReassign}
        className="gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={overloadedMembers?.length === 0}
      >
        <RefreshCw className="h-4 w-4" />
        Reassign Tasks
      </Button>
    </div>
  );
}
