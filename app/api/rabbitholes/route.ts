import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: rabbitHoles, error } = await supabase.from("rabbitHoles").select("*")

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json(rabbitHoles);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const { data: rabbitHoles, error } = await supabase.from("rabbitHoles").insert({
    name: body.name,
    user_name: body.userName,
    user_id: body.userId,
  }).single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(rabbitHoles, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();
  const { id, summary } = body;
  console.log(id, summary)
  const { data: rabbitHoles, error } = await supabase.from("rabbitHoles")
    .update({ summary }).eq("id", id).single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(rabbitHoles);
}
