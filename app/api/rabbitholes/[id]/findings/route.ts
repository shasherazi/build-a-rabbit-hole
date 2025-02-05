import { NextResponse } from "next/server";
import data from "../../../../../data/rabbitholes.json";
import fs from "fs";
import { Finding, RabbitHole } from "@/types";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rabbitHoles: RabbitHole[] = JSON.parse(JSON.stringify(data));
  const rabbitHole = rabbitHoles.find((rh) => rh.id === id);

  if (!rabbitHole) {
    return NextResponse.json({ error: "Rabbit hole not found" }, { status: 404 });
  }
  return NextResponse.json(rabbitHole.findings || []);
}

export async function POST(req: Request,
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body: Finding = await req.json();
  console.log("POST /api/rabbitholes/:id/findings", id, body);
  const findingId = Date.now().toString();
  const rabbitHoles: RabbitHole[] = JSON.parse(JSON.stringify(data));

  const rabbitHole = rabbitHoles.find((rh) => rh.id === id);
  if (!rabbitHole) {
    return NextResponse.json({ error: "Rabbit hole not found" }, { status: 404 });
  }

  rabbitHole.findings = rabbitHole.findings || [];
  rabbitHole.findings.push({ id: findingId, rabbitHoleId: id, ...body });

  fs.writeFileSync("data/rabbitholes.json", JSON.stringify(rabbitHoles, null, 2));

  return NextResponse.json({ id: findingId, ...body }, { status: 201 });
}
