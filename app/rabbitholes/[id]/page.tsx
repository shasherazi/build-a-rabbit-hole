"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Finding } from "@/types";

export default function RabbitHole() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [rabbitHoleName, setRabbitHoleName] = useState<string | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/error");
        return;
      }

      setUser({
        id: user.id,
        name: user.user_metadata?.full_name,
        profilePictureUrl: user.user_metadata?.avatar_url,
      });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    async function getRabbitHole() {
      const response = await fetch(`/api/rabbitholes/${id}`);
      const data = await response.json();
      console.log("Rabbit Hole Data", data);
      setRabbitHoleName(data.name);
    }

    async function getFindings() {
      const response = await fetch(`/api/rabbitholes/${id}/findings`);
      const data = await response.json();
      setFindings(data);
    }

    getRabbitHole();
    getFindings();
  }, [id]);

  const formSchema = z.object({
    description: z.string().min(1).max(5000),
    url: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const body = {
      ...values,
      userId: user?.id,
    };

    await fetch(`/api/rabbitholes/${id}/findings`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Refresh findings after submission
    const response = await fetch(`/api/rabbitholes/${id}/findings`);
    const data = await response.json();
    setFindings(data);

    setLoading(false);
    form.reset();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        {rabbitHoleName || "Loading..."}
      </h1>

      {/* Add Finding Form */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Add Your Finding</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finding</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Octopuses have three hearts and blue blood"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.wikipedia.org/wiki/Octopus"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Existing Findings */}
      {findings.length > 0 ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Existing Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {findings.map((finding) => (
                <li key={finding.id} className="p-4 border rounded-lg">
                  <p className="font-medium">{finding.description}</p>
                  {finding.url && (
                    <p className="cursor-pointer hover:underline text-sm">
                      {finding.url}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-gray-500">No findings yet.</p>
      )}
    </div>
  );
}
