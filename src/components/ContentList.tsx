import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Sparkles, Database } from "lucide-react";
import { ContentCard } from "./ContentCard";
import { InfoBox } from "./InfoBox";
import { Content } from "@/types/content";

/**
 * 📋 ContentList Component
 * 
 * Questo componente implementa l'operazione READ del CRUD.
 * READ recupera e visualizza tutti i record dal database.
 * 
 * In un'app reale, qui si farebbe una query al database:
 * SELECT * FROM contents ORDER BY createdAt DESC
 */

interface ContentListProps {
  contents: Content[];
  onEdit: (content: Content) => void;
  onDelete: (id: string) => void;
}

export const ContentList = ({ contents, onEdit, onDelete }: ContentListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.2,
        type: "spring",
        stiffness: 150
      }}
      className="space-y-6"
    >
      {/* Header con animazioni migliorate */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2 
            }}
            className="p-3 rounded-xl bg-primary/20 cursor-pointer"
          >
            <FileText className="h-6 w-6 text-primary" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              📖 Lista Contenuti
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-accent" />
              </motion.span>
            </h2>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
          whileHover={{ scale: 1.1 }}
          className="relative"
        >
          <motion.span 
            className="text-sm font-medium text-muted-foreground bg-muted/80 backdrop-blur-sm px-4 py-2 rounded-full border flex items-center gap-2"
            key={contents.length}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Database className="h-3 w-3" />
            {contents.length} {contents.length === 1 ? "elemento" : "elementi"}
          </motion.span>
          
          {/* Pulse effect when count changes */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            key={`pulse-${contents.length}`}
          />
        </motion.div>
      </motion.div>

      {/* Info Box didattico */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <InfoBox title="📖 READ - Lettura" variant="info">
          <strong>READ</strong> recupera i dati dal database. Può leggere tutti 
          i record (<code className="bg-muted px-1 rounded">SELECT *</code>) o uno specifico tramite ID 
          (<code className="bg-muted px-1 rounded">WHERE id = ...</code>). È l'operazione più frequente in un'app.
        </InfoBox>
      </motion.div>

      {/* Lista contenuti */}
      {contents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="relative text-center py-20 bg-card rounded-2xl border overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "32px 32px"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating search icon */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <motion.div
              className="inline-block p-6 rounded-full bg-muted/50 mb-6"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <Search className="h-16 w-16 text-muted-foreground/40" />
            </motion.div>
          </motion.div>

          <motion.h3 
            className="text-xl font-bold mb-3 relative z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nessun contenuto trovato
          </motion.h3>

          <motion.p 
            className="text-muted-foreground relative z-10 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Crea il tuo primo contenuto usando il form a sinistra! 
            <motion.span
              className="inline-block ml-2"
              animate={{ 
                x: [0, 5, 0],
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              🚀
            </motion.span>
          </motion.p>

          {/* Decorative elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          layout 
          className="grid gap-5"
        >
          <AnimatePresence mode="popLayout">
            {contents.map((content, index) => (
              <ContentCard
                key={content.id}
                content={content}
                onEdit={onEdit}
                onDelete={onDelete}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};
