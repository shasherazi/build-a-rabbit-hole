import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import data from "../../../data/rabbitholes.json";

export async function GET() {
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = uuidv4();
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
