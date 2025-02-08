import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: rabbitHole, error } = await supabase.from("rabbitHoles").select("*").eq("id", id).single();

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(rabbitHole);
}
