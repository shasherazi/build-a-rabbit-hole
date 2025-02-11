"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function EmailConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4 mt-[-64px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            We&apos;ve sent you a confirmation link. Please check your inbox and
            click the link to verify your email address.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Don&apos;t see the email? Check your spam folder or request a new
            link.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/login">
            <Button>Back to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
