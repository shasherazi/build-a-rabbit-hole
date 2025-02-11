import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-center">
      <div className="flex justify-center">
        <Image
          src="/rabbithole.png"
          alt="Rabbithole Logo"
          width={64}
          height={64}
        />
      </div>
      <h1 className="text-4xl font-bold mt-4 text-gray-900">
        Welcome to Rabbithole
      </h1>
      <p className="text-lg text-gray-600 mt-3">
        A space where curiosity meets collaboration. Explore topics with
        friends, dive deep into research, and uncover insights together.
      </p>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Start Exploring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Choose a topic, set a goal, and invite friends to explore with
              you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discover Together</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Log your findings, share insights, and discuss ideas in real-time.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summarize & Share</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              At the end, our AI will generate a summary of your research
              journey.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Link href="/new">
          <Button size="lg">Start Your First Rabbithole</Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
