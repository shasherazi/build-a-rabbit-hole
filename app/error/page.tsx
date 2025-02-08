"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4 mt-[-64px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Oops! Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            We encountered an unexpected error. Please try again or return to
            the home page.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
