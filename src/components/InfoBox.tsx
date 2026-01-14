import { motion } from "framer-motion";
import { Info, BookOpen, Sparkles } from "lucide-react";

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
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      className={`relative rounded-xl border p-4 overflow-hidden backdrop-blur-sm ${
        variant === "info" 
          ? "bg-info-light/80 border-info/30" 
          : "bg-secondary/80 border-secondary-foreground/20"
      }`}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 opacity-30 ${
          variant === "info" 
            ? "bg-gradient-to-br from-info/20 via-transparent to-info/10" 
            : "bg-gradient-to-br from-primary/20 via-transparent to-primary/10"
        }`}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            variant === "info" ? "bg-info/40" : "bg-primary/40"
          }`}
          style={{
            left: `${20 + i * 30}%`,
            top: "50%",
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative flex items-start gap-3">
        <motion.div 
          className={`p-2 rounded-full ${
            variant === "info" ? "bg-info/20" : "bg-primary/20"
          }`}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {variant === "info" ? (
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Info className="h-4 w-4 text-info" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <BookOpen className="h-4 w-4 text-primary" />
            </motion.div>
          )}
        </motion.div>
        <div className="flex-1">
          <motion.h4 
            className="font-semibold text-sm mb-1 flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            >
              <Sparkles className="h-3 w-3 text-accent" />
            </motion.span>
          </motion.h4>
          <motion.div 
            className="text-sm text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
