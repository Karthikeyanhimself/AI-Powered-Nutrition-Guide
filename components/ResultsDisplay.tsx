"use client";

import { NutritionResponse } from "@/types";
import { Card } from "./ui/Card";
import { StatusBadge } from "./ui/StatusBadge";
import { MapPin, Info } from "lucide-react";

interface Props {
    data: NutritionResponse;
}

export const ResultsDisplay = ({ data }: Props) => {
    return (
        <div className="space-y-8 mt-8">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium uppercase tracking-wide">
                <MapPin size={16} />
                {data.location.city}, {data.location.country}
            </div>
            {data.searchedFoodAnalysis && data.searchedFoodAnalysis.foodName && (
                <Card className="border-l-4 border-l-indigo-500">
                    <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">
                                {data.searchedFoodAnalysis.foodName}
                            </h3>
                            <div className="text-sm text-slate-500">
                                Ingredients: {data.searchedFoodAnalysis.ingredients.join(", ")}
                            </div>
                        </div>
                        <StatusBadge status={data.searchedFoodAnalysis.status} />
                    </div>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
                        {data.searchedFoodAnalysis.simpleExplanation}
                    </p>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Good to Eat List */}
                <Card delay={0.1}>
                    <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                        🥗 Good Options
                    </h3>
                    <ul className="space-y-4">
                        {data.goodToEat.map((food, idx) => (
                            <li key={idx} className="pb-3 border-b border-slate-100 last:border-0">
                                <div className="font-semibold text-slate-800">{food.foodName}</div>
                                <div className="text-sm text-slate-500 mt-1">{food.whyItsGood}</div>
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card delay={0.2}>
                    <h3 className="text-lg font-bold text-rose-700 mb-4 flex items-center gap-2">
                        ⚠️ Better to Avoid
                    </h3>
                    <ul className="space-y-4">
                        {data.betterToAvoid.map((food, idx) => (
                            <li key={idx} className="pb-3 border-b border-slate-100 last:border-0">
                                <div className="font-semibold text-slate-800">{food.foodName}</div>
                                <div className="text-sm text-slate-500 mt-1">{food.whyToAvoid}</div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-none" delay={0.3}>
                <div className="flex gap-4 items-start">
                    <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
                        <Info size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">Nutritionist's Tip</h4>
                        <p className="text-indigo-800 text-sm leading-relaxed">{data.generalTip}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};