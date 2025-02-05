"use client";
import { RabbitHole } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RabbitHoles() {
  const [rabbitHoles, setRabbitHoles] = useState<RabbitHole[]>([]);

  useEffect(() => {
    async function fetchRabbitHoles() {
      const res = await fetch("/api/rabbitholes");
      const rabbitHoles: RabbitHole[] = await res.json();
      setRabbitHoles(rabbitHoles);
    }

    fetchRabbitHoles();
  }, []);

  return (
    <div>
      <h1>Rabbit holes page</h1>
      <ul>
        {rabbitHoles.map((rabbitHole) => (
          <Link key={rabbitHole.id} href={`/rabbitholes/${rabbitHole.id}`}>
          <li key={rabbitHole.id}>{rabbitHole.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
