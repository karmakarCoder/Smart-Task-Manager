import { CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function LoginHeader() {
  return (
    <CardHeader className="space-y-1">
      <div className="flex items-center gap-2 mb-2">
        <LogIn className="h-6 w-6 text-primary" />
        <CardTitle className="text-2xl font-bold">Smart Task Manager</CardTitle>
      </div>
      <CardDescription>
        Enter your credentials to access your account
      </CardDescription>
    </CardHeader>
  );
}
