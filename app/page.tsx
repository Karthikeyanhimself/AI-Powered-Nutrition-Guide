"use client";

import { useState } from "react";
import { NutritionForm } from "@/components/NutritionForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { NutritionResponse, UserInput } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [result, setResult] = useState<NutritionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalysis = async (input: UserInput) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Call our own API route
      const response = await fetch("/api/analyze-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analysis");
      }

      const data = await response.json();
      setResult(data);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your internet or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Nutri<span className="text-indigo-600">Guide</span>
          </h1>
          <p className="text-slate-600 text-lg">
            Your friendly local food assistant tailored to your health.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
          <NutritionForm onSubmit={handleAnalysis} isLoading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium border border-red-100"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && <ResultsSkeleton />}

        {/* Results State */}
        <AnimatePresence>
          {!loading && result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ResultsDisplay data={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}