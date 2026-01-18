import { SkeletonCard } from "./ui/SkeletonCard";

export const ResultsSkeleton = () => {
    return (
        <div className="space-y-8 mt-8">
            {/* Location Header Skeleton */}
            <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />

            {/* Searched Food Analysis Skeleton (Top Box) */}
            <div className="bg-white rounded-2xl p-6 border-l-4 border-l-slate-200 shadow-sm">
                <div className="flex justify-between mb-4">
                    <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-slate-200 rounded-full animate-pulse" />
                </div>
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse mb-2" />
                <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
            </div>

            {/* The Two Columns (Good vs Bad) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Good to Eat Skeleton */}
                <SkeletonCard lines={4} className="h-64" />

                {/* Avoid Skeleton */}
                <SkeletonCard lines={4} className="h-64" />
            </div>

            {/* Tip Skeleton (Bottom Box) */}
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50 flex gap-4">
                <div className="h-10 w-10 bg-indigo-100 rounded-full animate-pulse flex-shrink-0" />
                <div className="w-full space-y-2">
                    <div className="h-4 w-1/4 bg-indigo-200 rounded animate-pulse" />
                    <div className="h-4 w-full bg-indigo-100 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
};