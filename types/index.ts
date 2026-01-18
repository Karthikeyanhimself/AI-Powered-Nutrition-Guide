// types/index.ts

// 1. Structure for individual items in the "Good" or "Avoid" lists
export interface FoodItem {
    foodName: string;
    whyItsGood?: string; // Optional because "Avoid" items won't have this
    whyToAvoid?: string; // Optional because "Good" items won't have this
}

// 2. Structure for the specific food search analysis
export interface SearchedFoodAnalysis {
    foodName: string;
    status: "Good to Eat" | "Better to Avoid";
    ingredients: string[];
    simpleExplanation: string;
}

// 3. Structure for location details
export interface LocationInfo {
    country: string;
    state: string;
    city: string;
}

// 4. THE MAIN RESPONSE: This matches the JSON the AI will return
export interface NutritionResponse {
    location: LocationInfo;
    healthConditions: string[];
    goodToEat: FoodItem[];
    betterToAvoid: FoodItem[];
    // searchedFoodAnalysis is optional (?) because the user might not search for a specific food
    searchedFoodAnalysis?: SearchedFoodAnalysis;
    generalTip: string;
}

// 5. THE USER INPUT: This matches the form data we send to the API
export interface UserInput {
    country: string;
    state: string;
    city: string;
    healthConditions: string;
    dietPreference: string;
    foodSearch: string;
}