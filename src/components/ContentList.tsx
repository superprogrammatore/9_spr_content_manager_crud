import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          <motion.div
            whileHover={{ rotate: 10 }}
            className="p-2 rounded-lg bg-primary/20"
          >
            <FileText className="h-5 w-5 text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold">📖 Lista Contenuti</h2>
        </motion.div>
        
        <motion.span 
          className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          {contents.length} {contents.length === 1 ? "elemento" : "elementi"}
        </motion.span>
      </div>

      {/* Info Box didattico */}
      <InfoBox title="📖 READ - Lettura" variant="info">
        <strong>READ</strong> recupera i dati dal database. Può leggere tutti 
        i record (<code>SELECT *</code>) o uno specifico tramite ID 
        (<code>WHERE id = ...</code>). È l'operazione più frequente in un'app.
      </InfoBox>

      {/* Lista contenuti */}
      {contents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-card rounded-xl border"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Search className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">Nessun contenuto trovato</h3>
          <p className="text-muted-foreground">
            Crea il tuo primo contenuto usando il form a sinistra! 🚀
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid gap-4">
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
