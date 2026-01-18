import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    lines?: number; // How many "text lines" should we simulate?
}

export const SkeletonCard = ({ className, lines = 1 }: SkeletonProps) => {
    return (
        <div className={cn("bg-white rounded-2xl p-6 border border-slate-100 shadow-sm", className)}>
            {/* Simulates a Title */}
            <div className="h-6 bg-slate-200 rounded-md w-1/3 mb-6 animate-pulse" />

            {/* Simulates Text Lines */}
            <div className="space-y-4">
                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    );
};