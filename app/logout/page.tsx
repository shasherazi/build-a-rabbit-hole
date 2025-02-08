"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/"), 1000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4 mt-[-64px]">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <h1 className="text-2xl font-semibold">Logging out...</h1>
            </div>
            <p className="text-muted-foreground">
              Thank you for using Rabbithole. Redirecting you to the home page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;
