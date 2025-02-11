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
import { User, Finding, type RabbitHole } from "@/types";
import { Copy } from "lucide-react";

export default function RabbitHole() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [rabbitHole, setRabbitHole] = useState<RabbitHole>();
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyLinkSuccess, setCopyLinkSuccess] = useState(false);

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
      setRabbitHole(data);
      if (data.summary) {
        setAiSummary(data.summary);
      }
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
      userName: user?.name,
      userId: user?.id,
    };

    await fetch(`/api/rabbitholes/${id}/findings`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    form.reset();
  }

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    try {
      const bodyfind = findings.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ rabbitHoleId, id, userId, ...rest }) => ({
          ...rest,
        }),
      );

      if (!rabbitHole) {
        console.error("Rabbit hole not found");
        setAiSummary(
          "Rabbit hole not found. Error generating summary. Please try again.",
        );
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, userId, ...rabbitHoleWithoutId } = rabbitHole;
      rabbitHoleWithoutId.findings = bodyfind as Finding[];
      console.log(rabbitHoleWithoutId);

      // Get summary from Gemini
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rabbitHoleWithoutId),
      });

      const data = await response.json();

      // Save summary to file
      await fetch("/api/rabbitholes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          summary: data.summary,
        }),
      });

      setAiSummary(data.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setAiSummary("Failed to generate summary. Please try again.");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aiSummary || "");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyLinkSuccess(true);
      setTimeout(() => setCopyLinkSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {rabbitHole?.name || "Loading..."}
        </h1>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={handleCopyLink}
        >
          <Copy className="h-4 w-4 mr-2" />
          {copyLinkSuccess ? "Copied!" : "Copy Link"}
        </Button>
      </div>

      {/* Add Finding Form */}
      {!aiSummary && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Add Your Finding</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
      )}

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
                  <p className="font-medium mb-2">{finding.description}</p>
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

      {/* AI Summary Section */}
      {aiSummary ? (
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">AI Summary</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleCopyToClipboard}
            >
              <Copy className="h-4 w-4 mr-2" />
              {copySuccess ? "Copied!" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{aiSummary}</p>
          </CardContent>
        </Card>
      ) : (
        !rabbitHole?.summary && (
          <Button
            className="w-full mt-4"
            onClick={handleGenerateSummary}
            disabled={summaryLoading}
          >
            {summaryLoading ? "Generating Summary..." : "Generate AI Summary"}
          </Button>
        )
      )}
    </div>
  );
}
