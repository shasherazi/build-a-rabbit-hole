import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key not found" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b", systemInstruction: `The 'Rabbit Holes' project is a place where people dive into a topic together, collecting interesting facts, links, and insights along the way. At the end of the session, it’s time to wrap it all up with an AI-generated summary.

Summarize the research session in a casual, engaging way—like telling a story to a friend.Start with a fun or intriguing hook to set the stage for the topic.Bring in the participants naturally, using phrases like 'user2 found…' or 'user3 shared…' to introduce their discoveries without just listing facts.Keep it light, friendly, and conversational—a little humor is welcome if it fits.

As you go, look for patterns or connections between findings.If something took an unexpected turn, make it stand out.Did the research challenge assumptions? Did someone find something particularly weird or surprising? Highlight those moments.

      Finally, wrap things up with a short but satisfying closing thought—something that makes the session feel complete without encouraging further exploration.The goal is to leave the reader with a sense of ‘That was cool!’ rather than ‘What’s next?’ Keep it engaging but concise—not too long, but not rushed either.

Below is an example of how the data is structured. This is only an example, do not use this data in the responses:
{
  "name": "Lost Media",
  "userName": "user3",
  "findings": [
    {
      "description": "A lost episode of Sesame Street featuring the Wicked Witch of the West scared so many kids that it was banned.",
      "url": "https://lostmediawiki.com/Sesame_Street_Wicked_Witch_Episode",
      "userName": "user3"
    },
    {
      "description": "The 1970s Doctor Who episode 'Shada' was never completed due to a BBC strike.",
      "url": "https://lostmediawiki.com/Shada",
      "userName": "user2"
    },
    {
      "description": "The game 'EarthBound 64' was canceled and later reworked into Mother 3.",
      "url": "https://lostmediawiki.com/EarthBound_64",
      "userName": "user1"
    },
    {
      "description": "An unreleased Nirvana song was found in 2015 on an old cassette tape.",
      "url": "https://lostmediawiki.com/Nirvana_Unreleased_Song",
      "userName": "user3"
    },
    {
      "description": "Disney's 'The Black Cauldron' had deleted scenes that were too scary for kids.",
      "url": "https://lostmediawiki.com/The_Black_Cauldron_Deleted_Scenes",
      "userName": "user2"
    }
  ]
}`});

  const body = await req.text();
  const result = await model.generateContent(body)
  return NextResponse.json({ summary: result.response.text() });
}
