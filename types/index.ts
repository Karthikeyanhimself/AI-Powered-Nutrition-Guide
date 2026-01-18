// types/index.ts

export interface FoodItem {
    foodName: string;
    whyItsGood?: string;
    whyToAvoid?: string;
}

export interface SearchedFoodAnalysis {
    foodName: string;
    status: "Good to Eat" | "Better to Avoid";
    ingredients: string[];
    simpleExplanation: string;
}

export interface LocationInfo {
    country: string;
    state: string;
    city: string;
}

export interface NutritionResponse {
    location: LocationInfo;
    healthConditions: string[];
    goodToEat: FoodItem[];
    betterToAvoid: FoodItem[];
    searchedFoodAnalysis?: SearchedFoodAnalysis;
    generalTip: string;
}

export interface UserInput {
    country: string;
    state: string;
    city: string;
    healthConditions: string;
    dietPreference: string;
    foodSearch: string;
}