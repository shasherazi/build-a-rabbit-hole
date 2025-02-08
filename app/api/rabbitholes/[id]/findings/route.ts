import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: findings, error } = await supabase.from("findings").select("*").eq("rabbitHole_id", id);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(findings);
}

export async function POST(req: Request,
  { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await req.json();

  const { data: findings, error } = await supabase.from("findings").insert({
    description: body.description,
    url: body.url,
    rabbitHole_id: id,
    user_name: body.userName,
    user_id: body.userId,
  }).single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(findings, { status: 201 });
}
