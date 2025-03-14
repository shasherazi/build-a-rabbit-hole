"use client";
import { RabbitHole } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getRabbitHolesOfUser } from "../actions";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function RabbitHoles() {
  const [rabbitHoles, setRabbitHoles] = useState<RabbitHole[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchRabbitHoles() {
      if (!user) return; // Early return if no user

      //const res = await fetch("/api/rabbitholes");
      //const rabbitHoles: RabbitHole[] = await res.json();
      const rabbitHoles: RabbitHole[] = await getRabbitHolesOfUser(user?.id);
      setRabbitHoles(rabbitHoles);
    }
    fetchRabbitHoles();
  }, [user]); // Only run when user changes

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
  }, []); // Empty dependency array - run only once on mount

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Your Rabbit Holes</h1>

      <div className="space-y-4">
        {rabbitHoles === null ? (
          // Show skeleton loaders while fetching
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-lg" />
            ))
        ) : rabbitHoles.length > 0 ? (
          rabbitHoles.map((rabbitHole) => (
            <Link key={rabbitHole.id} href={`/rabbitholes/${rabbitHole.id}`}>
              <Card className="hover:shadow-lg transition-shadow mb-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {rabbitHole.name}
                  </CardTitle>
                  <CardDescription>by {rabbitHole.user_name}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No rabbit holes found.</p>
        )}
      </div>
    </div>
  );
}
