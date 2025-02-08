import { LoginForm } from "./components/LoginForm";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 mt-[-64px]">
      <div className="w-full max-w-sm mt-16">
        <LoginForm />
      </div>
    </div>
  );
}
