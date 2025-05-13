import { google } from "@ai-sdk/google";
import { streamObject, generateObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

// Define schema for itinerary data
const activitySchema = z.object({
  time: z.string().describe("Time of the activity (e.g., '9:00 AM')"),
  activity: z.string().describe("Description of the activity (e.g., 'Visit the Louvre Museum')"),
  location: z.string().optional().describe("Location of the activity if applicable (e.g., 'Paris, France')"),
  description: z.string().describe("A detailed paragraph describing the activity, what to expect, and why it's worth doing"),
  cost: z.string().describe("Estimated cost for this activity (e.g., '€15 per person')")
});

const dayScheduleSchema = z.object({
  dayNumber: z.number().describe("The number of this day in the overall trip (e.g., 1, 2, 3)"),
  date: z.string().describe("Specific date for this day's schedule (e.g., 'May 8, 2025')"),
  description: z.string().optional().describe("A brief summary or theme for the day."),
  scheduleItems: z.array(activitySchema).describe("List of scheduled activities for this day"),
  dailyCost: z.string().describe("Total estimated cost for all activities on this day")
});

const destinationSchema = z.object({
  city: z.string().describe("City name of the destination (e.g., 'Berlin')"),
  country: z.string().describe("Country name of the destination (e.g., 'Germany')"),
  daysRange: z.string().describe("Range of overall trip days covered in this destination (e.g., 'Days 1 - 4')"),
  description: z.string().describe("A brief narrative description and introduction to the destination."),
  hotel: z.object({
    name: z.string().describe("Name of the recommended hotel in this city"),
    pricePerNight: z.string().optional().describe("Estimated price per night for the hotel (e.g., '₹17,307 /per night')"),
    totalPrice: z.string().optional().describe("Estimated total price for the stay at this hotel (e.g., '₹51,921 total')"),
    stayDates: z.string().optional().describe("Stay dates at this hotel (e.g., 'From: May 8-11')"),
    imageUrl: z.string().optional().describe("A relevant image URL for the hotel or city (can be a placeholder or generic if specific URL not known)"),
    address: z.string().optional().describe("Address of the hotel"),
    rating: z.number().optional().describe("Rating of the hotel out of 5 stars (e.g., 4.5)"),
    websiteUrl: z.string().optional().describe("Website URL for the hotel or a booking link"),
  }).describe("Recommended hotel details for this destination"),
  schedule: z.array(dayScheduleSchema).describe("Detailed schedule for each day spent in this destination"),
});

const fullItinerarySchema = z.object({
  overview: z.object({
    title: z.string().describe("Overall title of the trip (e.g., '10-Day Romantic European Escape')"),
    subtitle: z.string().optional().describe("Optional subtitle or theme (e.g., 'Romantic Getaway, Cultural Exploration, European Adventure')"),
    duration: z.string().describe("Trip duration (e.g., '10-Day')"),
    dates: z.string().describe("Overall trip dates (e.g., 'From May 08 - May 18, 2025')"),
  }).describe("Overall trip overview details"),
  destinations: z.array(destinationSchema).describe("List of destinations with details and daily schedules"),
  approxTotalCost: z.string().optional().describe("Approximate total cost for the entire trip itinerary (excluding flights/major transport) based on estimated activity costs.")
});

export async function POST(req) {
  try {
    const { text } = await req.json();
    console.log("User prompt:", text);

    const result = streamObject({
      model: google("gemini-2.0-pro"),
      messages: [
        {
          role: "system",
          content:
            `You are TriplanIQ, an AI-powered travel planner. Create a detailed travel itinerary based on the user's request.
            Provide the output as a JSON object strictly following the provided schema.
            The itinerary should include:
            1.  An overall trip overview (title, dates, duration).
            2.  A list of destinations.
            3.  For each destination:
                -   City and country.
                -   The range of days this destination covers in the overall trip.
                -   A brief, engaging narrative description of the destination.
                -   A recommended hotel with details like name, price (per night and total for the stay), stay dates, address, a rating (out of 5), and a website/booking link. For the image URL, provide a relevant one if possible, or a good quality placeholder if not. Ensure hotel details align with the destination and trip type.
                -   A detailed daily schedule for each day spent in that specific destination. Each schedule item should have a time, activity, location, a detailed paragraph description, and estimated cost.
            Make the itinerary practical, engaging, and tailored to the user's preferences from the prompt.
            
            Combine multiple days under a single destination with one hotel unless the user prompt clearly indicates moving hotels within a city or moving cities frequently.
            
            Provide an approximate total cost estimate for activities for each day and an overall trip cost estimate.
            
            For each activity, include a detailed paragraph (3-5 sentences) that describes what the activity entails, what visitors can expect, and why it's worth doing.
            
            Calculate and include the total cost for each day based on the individual activity costs.
            
            If the user mentions a budget, make sure to:
            1. Use most of the available budget without going over the limit
            2. Distribute the budget appropriately across accommodations, activities, and other expenses
            3. If the budget seems too low for the requested destinations or duration, suggest alternatives that would fit within the budget
            4. Clearly indicate the total estimated cost in relation to the specified budget
            5. Prioritize essential experiences while staying within budget constraints`,
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
      schema: fullItinerarySchema,
      onFinish: ({ object }) => {
        const res = fullItinerarySchema.safeParse(object);
        if (res.error) {
          console.error("AI response validation error:", res.error.errors);
          throw new Error(res.error.errors.map((e) => e.message).join("\n"));
        }
        // Log the complete AI response object
        console.log("AI response:", JSON.stringify(object, null, 2));
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in itinerary generation:", error);
    return new Response(
      JSON.stringify({
        error: true,
        message: error.message || "An error occurred while generating the itinerary"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
