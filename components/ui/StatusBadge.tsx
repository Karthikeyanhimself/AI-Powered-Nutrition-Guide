import { CheckCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
    status: "Good to Eat" | "Better to Avoid";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const isGood = status === "Good to Eat";

    return (
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${isGood
            ? "bg-emerald-100 text-emerald-800"
            : "bg-rose-100 text-rose-800"
            }`}>
            {/* Conditionally render the Icon */}
            {isGood ? <CheckCircle size={16} /> : <XCircle size={16} />}
            {status}
        </span>
    );
};