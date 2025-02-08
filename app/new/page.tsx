"use client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@/types";
import { LoaderCircle } from "lucide-react";

export default function NewRabbitHole() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const formSchema = z.object({
    name: z.string().min(1).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const formattedUser = {
        id: user?.id,
        name: user?.user_metadata?.full_name,
        avatarUrl: user?.user_metadata?.avatar_url,
      };

      setUser(formattedUser);
    };

    fetchUser();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      ...values,
      userName: user?.name,
      userId: user?.id,
    };

    await fetch("/api/rabbitholes", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/rabbitholes");
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mt-[-64px]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">
          Create a New Rabbit Hole
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RabbitHole Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The Psychology of Conspiracy Theories"
                      autoComplete="off"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? (
                <>
                  Creating Rabbit Hole
                  <LoaderCircle className="animate-spin ml-2" />
                </>
              ) : (
                "Create Rabbit Hole"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
