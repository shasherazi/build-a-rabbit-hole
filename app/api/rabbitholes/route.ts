import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import data from "../../../data/rabbitholes.json";

export async function GET() {
  console.log("GET /api/rabbitholes called");
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = Date.now().toString();
  const rabbitHoles = JSON.parse(JSON.stringify(data));
  rabbitHoles.push({ id, ...body });

  fs.writeFileSync("data/rabbitholes.json", JSON.stringify(rabbitHoles, null, 2));
  const url = req.nextUrl.clone();
  url.pathname = `/rabbitholes/${id}`;

  return NextResponse.json({ id, ...body },
    {
      status: 201,
      headers: { Location: url.toString() }
    });
}
