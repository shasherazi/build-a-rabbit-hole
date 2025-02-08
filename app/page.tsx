import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Search, BookOpen, SparklesIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-4xl mx-auto p-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Follow Your Curiosity
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into any topic. Document your findings. Let AI help you
            connect the dots.
          </p>
          <Link href="/new">
            <Button size="lg" className="mt-6">
              Create New Rabbit Hole
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 py-12">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <Search className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Explore Freely</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Start with a question and follow wherever your curiosity leads
                you.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Document Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Save interesting discoveries and sources as you explore.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <SparklesIcon className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get AI-powered summaries and connections from your research.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to Start Exploring?</h2>
            <p className="text-primary-foreground/90 max-w-xl mx-auto">
              Create your first rabbit hole and begin documenting your journey
              of discovery.
            </p>
            <Link href="/new">
              <Button size="lg" variant="secondary" className="mt-4">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
