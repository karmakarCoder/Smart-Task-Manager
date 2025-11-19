import { CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

export default function LoginHeader() {
  return (
    <CardHeader className="gap-1">
      <div className="flex items-center">
        <CardTitle className="text-2xl font-bold">Smart Task Manager</CardTitle>
      </div>
      <CardDescription>
        Enter your credentials to access your account
      </CardDescription>
    </CardHeader>
  );
}
