import { motion } from "framer-motion";
import { Info, BookOpen } from "lucide-react";

/**
 * 💡 InfoBox Component
 * 
 * Box informativo per spiegazioni didattiche.
 * Usato per commentare le operazioni CRUD.
 */

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
  variant?: "info" | "tip";
}

export const InfoBox = ({ title, children, variant = "info" }: InfoBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border p-4 ${
        variant === "info" 
          ? "bg-info-light border-info/30" 
          : "bg-secondary border-secondary-foreground/20"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${
          variant === "info" ? "bg-info/20" : "bg-primary/20"
        }`}>
          {variant === "info" ? (
            <Info className="h-4 w-4 text-info" />
          ) : (
            <BookOpen className="h-4 w-4 text-primary" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
        </div>
      </div>
    </motion.div>
  );
};
