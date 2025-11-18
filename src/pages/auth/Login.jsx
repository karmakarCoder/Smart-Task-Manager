import LoginForm from "../../components/LoginComponents/LoginForm";
import LoginHeader from "../../components/LoginComponents/LoginHeader";
import { Card } from "@/components/ui/card";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <LoginHeader />
        <LoginForm />
      </Card>
    </div>
  );
}
