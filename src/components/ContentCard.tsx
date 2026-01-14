import { motion } from "framer-motion";
import { Edit2, Trash2, Calendar, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Content } from "@/types/content";
import { format } from "date-fns";
import { it } from "date-fns/locale";

/**
 * 📄 ContentCard Component
 * 
 * Rappresenta un singolo contenuto nella lista.
 * Implementa le operazioni READ (visualizzazione) e fornisce
 * i pulsanti per UPDATE (modifica) e DELETE (elimina).
 */

interface ContentCardProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (id: string) => void;
  index: number;
}

const categoryIcons: Record<string, string> = {
  articolo: "📝",
  tutorial: "📚",
  nota: "🗒️",
  idea: "💡",
};

const categoryColors: Record<string, string> = {
  articolo: "from-blue-500/20 to-cyan-500/20",
  tutorial: "from-purple-500/20 to-pink-500/20",
  nota: "from-amber-500/20 to-orange-500/20",
  idea: "from-green-500/20 to-emerald-500/20",
};

export const ContentCard = ({ content, onEdit, onDelete, index }: ContentCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ 
        opacity: 0, 
        x: -200, 
        scale: 0.5,
        rotateZ: -10,
        transition: { duration: 0.4, ease: "easeInOut" }
      }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        rotateY: 2,
        boxShadow: "0 20px 50px -15px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 }
      }}
      className="relative bg-card rounded-2xl border p-5 shadow-lg group overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${categoryColors[content.category] || "from-primary/10 to-accent/10"} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{}}
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        whileHover={{
          backgroundPosition: ["200% 0%", "-200% 0%"],
          transition: { duration: 1.5, ease: "easeInOut" }
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header con categoria */}
        <div className="flex items-start justify-between mb-3">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.1 }}
          >
            <motion.span 
              className="text-2xl"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 + 0.5,
              }}
              whileHover={{
                scale: 1.3,
                rotate: 15,
                transition: { duration: 0.2 }
              }}
            >
              {categoryIcons[content.category] || "📄"}
            </motion.span>
            <motion.span 
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground capitalize backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              {content.category}
            </motion.span>
          </motion.div>
          
          {/* Action buttons con animazioni migliorate */}
          <motion.div 
            className="flex gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 + 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(content)}
                className="h-9 w-9 rounded-full hover:bg-accent/30 hover:text-accent transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 20, scale: 1.2 }} 
                  whileTap={{ scale: 0.8, rotate: -20 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Edit2 className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(content.id)}
                className="h-9 w-9 rounded-full hover:bg-destructive/30 hover:text-destructive transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: -20, scale: 1.2 }} 
                  whileTap={{ scale: 0.8, rotate: 20 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Trash2 className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Titolo con underline animata */}
        <motion.h3 
          className="text-lg font-bold mb-2 text-foreground relative inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.15 }}
        >
          {content.title}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>

        {/* Descrizione */}
        <motion.p 
          className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.2 }}
        >
          {content.description}
        </motion.p>

        {/* Timestamps con icone animate */}
        <motion.div 
          className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 + 0.25 }}
        >
          <motion.div 
            className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Calendar className="h-3 w-3" />
            </motion.div>
            <span>Creato: {format(new Date(content.createdAt), "dd MMM yyyy", { locale: it })}</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-1.5 bg-muted/50 px-2 py-1 rounded-md"
            whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-3 w-3" />
            </motion.div>
            <span>Modificato: {format(new Date(content.updatedAt), "dd MMM yyyy HH:mm", { locale: it })}</span>
          </motion.div>
        </motion.div>

        {/* ID con effetto glow */}
        <motion.div 
          className="mt-3 pt-3 border-t border-dashed border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.3 }}
        >
          <motion.code 
            className="text-xs bg-muted/70 px-3 py-1.5 rounded-md text-muted-foreground inline-flex items-center gap-2"
            whileHover={{ 
              boxShadow: "0 0 15px rgba(var(--primary), 0.3)",
              scale: 1.02
            }}
          >
            <Sparkles className="h-3 w-3" />
            ID: {content.id}
          </motion.code>
        </motion.div>
      </div>
    </motion.div>
  );
};
