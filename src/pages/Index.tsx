import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Database, Sparkles, Zap } from "lucide-react";
import { ContentForm } from "@/components/ContentForm";
import { ContentList } from "@/components/ContentList";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { DatabaseAnimation } from "@/components/DatabaseAnimation";
import { InfoBox } from "@/components/InfoBox";
import { Content, ContentFormData } from "@/types/content";
import { useDatabaseAnimation } from "@/hooks/useDatabaseAnimation";
import { toast } from "@/hooks/use-toast";

/**
 * 🏠 Content Manager - App CRUD Didattica
 * 
 * Questa app dimostra le 4 operazioni fondamentali CRUD:
 * - CREATE: Crea nuovi record
 * - READ: Legge/visualizza i record
 * - UPDATE: Modifica record esistenti
 * - DELETE: Elimina record
 * 
 * Ogni operazione è commentata per scopi didattici.
 */

// Dati di esempio iniziali
const initialContents: Content[] = [
  {
    id: "1",
    title: "Introduzione al CRUD",
    description: "CRUD è l'acronimo di Create, Read, Update, Delete. Sono le quattro operazioni fondamentali per gestire dati persistenti in qualsiasi applicazione.",
    category: "tutorial",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "La validazione è importante",
    description: "Validare gli input previene errori, attacchi e dati corrotti. Sempre validare sia lato client che lato server!",
    category: "nota",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
];

const Index = () => {
  // State: lista dei contenuti (simula un database)
  const [contents, setContents] = useState<Content[]>(initialContents);
  
  // State: contenuto in modifica (null = modalità creazione)
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  
  // State: dialog di conferma eliminazione
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    contentId: string;
    contentTitle: string;
  }>({ isOpen: false, contentId: "", contentTitle: "" });

  // Hook per animazioni database
  const { operation, isAnimating, triggerAnimation } = useDatabaseAnimation(1000);

  /**
   * 🆕 CREATE - Crea un nuovo contenuto
   */
  const handleCreate = (data: ContentFormData) => {
    triggerAnimation("create");

    const newContent: Content = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTimeout(() => {
      setContents(prev => [newContent, ...prev]);
      toast({
        title: "✅ Contenuto creato!",
        description: `"${data.title}" è stato aggiunto con successo.`,
      });
    }, 800);
  };

  /**
   * 🔄 UPDATE - Aggiorna un contenuto esistente
   */
  const handleUpdate = (data: ContentFormData) => {
    if (!editingContent) return;

    triggerAnimation("update");

    setTimeout(() => {
      setContents(prev => prev.map(content => 
        content.id === editingContent.id
          ? { ...content, ...data, updatedAt: new Date() }
          : content
      ));

      setEditingContent(null);

      toast({
        title: "✏️ Contenuto aggiornato!",
        description: `"${data.title}" è stato modificato con successo.`,
      });
    }, 800);
  };

  /**
   * 🗑️ DELETE - Elimina un contenuto
   */
  const handleDelete = () => {
    triggerAnimation("delete");

    setTimeout(() => {
      setContents(prev => prev.filter(content => content.id !== deleteDialog.contentId));
      setDeleteDialog({ isOpen: false, contentId: "", contentTitle: "" });

      toast({
        title: "🗑️ Contenuto eliminato!",
        description: "Il contenuto è stato rimosso definitivamente.",
        variant: "destructive",
      });
    }, 800);
  };

  const openDeleteDialog = (id: string) => {
    const content = contents.find(c => c.id === id);
    if (content) {
      setDeleteDialog({
        isOpen: true,
        contentId: id,
        contentTitle: content.title,
      });
    }
  };

  const handleFormSubmit = (data: ContentFormData) => {
    if (editingContent) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  const handleStartEdit = (content: Content) => {
    triggerAnimation("read");
    setTimeout(() => {
      setEditingContent(content);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          type: "spring",
          stiffness: 100
        }}
        className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="relative p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 cursor-pointer"
                whileHover={{ rotate: 10, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatDelay: 2 
                  }}
                >
                  <Database className="h-8 w-8 text-primary" />
                </motion.div>
                
                {/* Orbital particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    animate={{
                      x: [
                        Math.cos((i * 120 * Math.PI) / 180) * 20,
                        Math.cos(((i * 120 + 360) * Math.PI) / 180) * 20,
                      ],
                      y: [
                        Math.sin((i * 120 * Math.PI) / 180) * 20,
                        Math.sin(((i * 120 + 360) * Math.PI) / 180) * 20,
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-2xl font-bold flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Content Manager
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="h-5 w-5 text-accent" />
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Esercizio CRUD Didattico
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 backdrop-blur-sm px-4 py-2 rounded-full border"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Code className="h-4 w-4" />
              </motion.div>
              <span className="hidden sm:inline">Create • Read • Update • Delete</span>
              <span className="sm:hidden">CRUD</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="mb-8"
        >
          <InfoBox title="📚 Cos'è il CRUD?" variant="tip">
            <strong>CRUD</strong> (Create, Read, Update, Delete) rappresenta le quattro 
            operazioni fondamentali per gestire dati in un database. Quasi ogni app 
            che salva dati utilizza queste operazioni. Prova a creare, modificare ed 
            eliminare contenuti per vedere come funzionano!
          </InfoBox>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <ContentForm
              onSubmit={handleFormSubmit}
              editingContent={editingContent}
              onCancelEdit={() => setEditingContent(null)}
            />
          </motion.div>

          {/* Right Column: List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
          >
            <ContentList
              contents={contents}
              onEdit={handleStartEdit}
              onDelete={openDeleteDialog}
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="border-t bg-card/80 backdrop-blur-md py-8 mt-12 relative z-10"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <BookOpen className="h-5 w-5" />
            </motion.div>
            <span>App didattica per imparare le operazioni CRUD</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <Zap className="h-4 w-4 text-accent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        contentTitle={deleteDialog.contentTitle}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, contentId: "", contentTitle: "" })}
      />

      {/* Database Animation Overlay */}
      <DatabaseAnimation operation={operation} isAnimating={isAnimating} />
    </div>
  );
};

export default Index;
