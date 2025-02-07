import { RabbitHole } from "@/types";
import { NextResponse } from "next/server";
import data from "../../../../data/rabbitholes.json";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rabbitHoles: RabbitHole[] = JSON.parse(JSON.stringify(data));
  const rabbitHole = rabbitHoles.find((rh) => rh.id === id);

  if (!rabbitHole) {
    return NextResponse.json({ error: "Rabbit hole not found" }, { status: 404 });
  }
  return NextResponse.json(rabbitHole);
}
