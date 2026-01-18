// app/api/analyze-food/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini with the API Key from .env.local
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Destructure the user input
    const { country, state, city, healthConditions, dietPreference, foodSearch } = body;

    // 1. Construct the Prompt
    // We explicitly tell the AI to act as a nutritionist and force JSON format
    const prompt = `
      User Details:
      Country: ${country}
      State: ${state}
      City/Region: ${city}

      Health Conditions:
      ${healthConditions}

      Diet Preference:
      ${dietPreference}

      (Optional) User is searching for this specific food:
      ${foodSearch || "None"}

      Task Instructions:
      1. Identify commonly eaten local foods in the given city or region.
      2. Consider the user's health conditions carefully.
      3. For each food:
         - Check common ingredients.
         - Decide whether it is suitable or not.
      4. Categorize foods into:
         - "Good to Eat"
         - "Better to Avoid"
      5. If a specific food is provided:
         - Explain in detail why it is good or bad.
         - Mention ingredients and how they affect the condition.
      6. If multiple health conditions are present:
         - If a food is bad for even one condition, mark it as "Better to Avoid".

      Explanation Rules:
      • Use simple language
      • Explain in 1–3 short sentences per food
      • Be clear and practical
      • Do NOT scare the user

      IMPORTANT:
      Return the response in **well-structured, readable JSON** exactly in the format below.
      Do NOT include markdown.
      Do NOT include extra text outside JSON.

      REQUIRED OUTPUT FORMAT
      {
        "location": {
          "country": "",
          "state": "",
          "city": ""
        },
        "healthConditions": [],
        "goodToEat": [
          {
            "foodName": "",
            "whyItsGood": ""
          }
        ],
        "betterToAvoid": [
          {
            "foodName": "",
            "whyToAvoid": ""
          }
        ],
        "searchedFoodAnalysis": {
          "foodName": "",
          "status": "Good to Eat / Better to Avoid",
          "ingredients": [],
          "simpleExplanation": ""
        },
        "generalTip": ""
      }
    `;

    // 2. Call the AI Model
    // 'gemini-1.5-flash' is faster and cheaper, perfect for this task
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 3. Clean the Output
    // AI sometimes wraps JSON in markdown blocks like ```json ... ```. We must strip those.
    const cleanedJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

    // 4. Parse and Validate
    try {
      const jsonResponse = JSON.parse(cleanedJson);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json(
        { error: "The AI response was not valid JSON. Please try again." },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}