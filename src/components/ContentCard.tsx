import { motion } from "framer-motion";
import { Edit2, Trash2, Calendar, Clock } from "lucide-react";
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

export const ContentCard = ({ content, onEdit, onDelete, index }: ContentCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.8 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ 
        y: -4,
        boxShadow: "0 10px 40px -15px rgba(0,0,0,0.15)"
      }}
      className="bg-card rounded-xl border p-5 shadow-md group"
    >
      {/* Header con categoria */}
      <div className="flex items-start justify-between mb-3">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: -10 }}
          animate={{ x: 0 }}
        >
          <span className="text-2xl">{categoryIcons[content.category] || "📄"}</span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground capitalize">
            {content.category}
          </span>
        </motion.div>
        
        {/* Action buttons - appaiono on hover */}
        <motion.div 
          className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(content)}
            className="h-8 w-8 hover:bg-accent/20 hover:text-accent"
          >
            <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
              <Edit2 className="h-4 w-4" />
            </motion.div>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(content.id)}
            className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
          >
            <motion.div whileHover={{ rotate: -15 }} whileTap={{ scale: 0.9 }}>
              <Trash2 className="h-4 w-4" />
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* Titolo */}
      <motion.h3 
        className="text-lg font-bold mb-2 text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {content.title}
      </motion.h3>

      {/* Descrizione */}
      <motion.p 
        className="text-muted-foreground text-sm mb-4 line-clamp-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {content.description}
      </motion.p>

      {/* Timestamps */}
      <motion.div 
        className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-3 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Creato: {format(new Date(content.createdAt), "dd MMM yyyy", { locale: it })}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Modificato: {format(new Date(content.updatedAt), "dd MMM yyyy HH:mm", { locale: it })}</span>
        </div>
      </motion.div>

      {/* ID (per scopi didattici) */}
      <motion.div 
        className="mt-3 pt-3 border-t border-dashed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
          ID: {content.id}
        </code>
      </motion.div>
    </motion.div>
  );
};
