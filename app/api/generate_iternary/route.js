import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

// Define schema for itinerary data
const activitySchema = z.object({
  time: z.string().describe("Time of the activity"),
  activity: z.string().describe("Description of the activity"),
  location: z.string().optional().describe("Location of the activity if applicable")
});

const daySchema = z.object({
  day: z.string().describe("Nth day of the trip"),
  hotel: z.object({
    name: z.string().describe("Name of the hotel"),
    price: z.string().optional().describe("Price of the hotel"),
    imageUrl: z.string().optional().describe("Image URL of the hotel"),
    address: z.string().optional().describe("Address of the hotel"),
    rating: z.number().optional().describe("Rating of the hotel"),
    websiteUrl: z.string().optional().describe("Website URL of the hotel"),

  }),
  schedule: z.array(activitySchema).describe("List of activities for the day")
});

const itinerarySchema = z.array(daySchema).describe("Daily itinerary with hotel and schedule, dont change hotel if its unecessary, only change if you need to");

export async function POST(req) {
  const { text } = await req.json();

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          "You are a travel planner. Your job is to create a detailed itinerary based on the user's request. Include hotel recommendations for each day and a daily schedule of activities. Make the itinerary practical, engaging, and tailored to the user's preferences.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      },
    ],
    schema: itinerarySchema,
    onFinish: ({ object }) => {
      const res = itinerarySchema.safeParse(object);
      if (res.error) {
        throw new Error(res.error.errors.map((e) => e.message).join("\n"));
      }
    },
  });

  return result.toTextStreamResponse();
}
