"use server";
import { createClient } from "@/utils/supabase/server";

export async function getRabbitHolesOfUser(userId: string) {
  const supabase = await createClient();

  const { data: findings, error: findingError } = await supabase.from("findings")
    .select("rabbitHole_id")
    .eq('user_id', userId);

  if (findingError) {
    throw findingError;
  }

  const rabbitHoleIds = findings.map(finding => finding.rabbitHole_id);

  const { data: userRabbitHoles, error } = await supabase.from("rabbitHoles")
    .select("*")
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  const { data: findingRabbitHoles, error: findingRabbitHoleError } = await supabase.from("rabbitHoles")
    .select("*")
    .in('id', rabbitHoleIds);

  if (findingRabbitHoleError) {
    throw findingRabbitHoleError;
  }

  // Combine and remove duplicates
  const combinedRabbitHoles = [...userRabbitHoles, ...findingRabbitHoles].filter(
    (v, i, a) => a.findIndex(t => (t.id === v.id)) === i
  );

  return combinedRabbitHoles;
}
