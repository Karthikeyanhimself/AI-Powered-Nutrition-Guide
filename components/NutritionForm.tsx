// components/NutritionForm.tsx
"use client";

import { useState } from "react";
import { UserInput } from "@/types";
import { motion } from "framer-motion";

interface Props {
    // The parent component (page.tsx) will handle the actual API call
    onSubmit: (data: UserInput) => void;
    isLoading: boolean;
}

export const NutritionForm = ({ onSubmit, isLoading }: Props) => {
    // Initialize state with default values
    const [formData, setFormData] = useState<UserInput>({
        country: "",
        state: "",
        city: "",
        healthConditions: "",
        dietPreference: "Omnivore",
        foodSearch: "",
    });

    // Generic handler for all input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Stop the page from reloading
        onSubmit(formData); // Send data up to the parent
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* Location Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    required
                    name="country"
                    placeholder="Country (e.g., India)"
                    className="input-field"
                    onChange={handleChange}
                />
                <input
                    name="state"
                    placeholder="State (Optional)"
                    className="input-field"
                    onChange={handleChange}
                />
                <input
                    required
                    name="city"
                    placeholder="City/Region (e.g., Mumbai)"
                    className="input-field"
                    onChange={handleChange}
                />
            </div>

            {/* Health Conditions Section */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Health Conditions
                </label>
                <textarea
                    required
                    name="healthConditions"
                    placeholder="E.g., Diabetes, High Blood Pressure, Gluten Intolerance..."
                    className="input-field min-h-[80px]"
                    onChange={handleChange}
                />
            </div>

            {/* Diet & Specific Search Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Diet Preference
                    </label>
                    <select name="dietPreference" className="input-field" onChange={handleChange}>
                        <option value="Omnivore">Omnivore (Eat everything)</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Pescatarian">Pescatarian</option>
                        <option value="Keto">Keto</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Specific Food Check (Optional)
                    </label>
                    <input
                        name="foodSearch"
                        placeholder="E.g., Samosa, Pizza..."
                        className="input-field"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Submit Button with Animation */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
                {isLoading ? "Analyzing..." : "Check My Food"}
            </motion.button>
        </form>
    );
};