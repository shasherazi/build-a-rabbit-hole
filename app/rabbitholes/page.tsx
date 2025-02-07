"use client";
import { RabbitHole } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RabbitHoles() {
  const [rabbitHoles, setRabbitHoles] = useState<RabbitHole[] | null>(null);

  useEffect(() => {
    async function fetchRabbitHoles() {
      const res = await fetch("/api/rabbitholes");
      const rabbitHoles: RabbitHole[] = await res.json();
      setRabbitHoles(rabbitHoles);
    }

    fetchRabbitHoles();
  }, []);

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
                  <CardTitle className="text-lg font-semibold">{rabbitHole.name}</CardTitle>
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
