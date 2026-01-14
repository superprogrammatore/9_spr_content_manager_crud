import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Database } from "lucide-react";
import { ContentForm } from "@/components/ContentForm";
import { ContentList } from "@/components/ContentList";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { InfoBox } from "@/components/InfoBox";
import { Content, ContentFormData } from "@/types/content";
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

  /**
   * 🆕 CREATE - Crea un nuovo contenuto
   * 
   * Questa funzione:
   * 1. Genera un ID univoco
   * 2. Aggiunge i timestamp
   * 3. Inserisce il nuovo record nell'array (simula INSERT INTO)
   */
  const handleCreate = (data: ContentFormData) => {
    const newContent: Content = {
      id: Date.now().toString(), // In produzione: UUID o ID dal database
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Aggiungi all'inizio della lista (ordine cronologico inverso)
    setContents(prev => [newContent, ...prev]);

    toast({
      title: "✅ Contenuto creato!",
      description: `"${data.title}" è stato aggiunto con successo.`,
    });
  };

  /**
   * 🔄 UPDATE - Aggiorna un contenuto esistente
   * 
   * Questa funzione:
   * 1. Trova il record tramite ID
   * 2. Aggiorna solo i campi modificati
   * 3. Aggiorna il timestamp updatedAt
   * 
   * Equivale a: UPDATE contents SET ... WHERE id = ?
   */
  const handleUpdate = (data: ContentFormData) => {
    if (!editingContent) return;

    setContents(prev => prev.map(content => 
      content.id === editingContent.id
        ? {
            ...content,
            ...data,
            updatedAt: new Date(), // Aggiorna il timestamp
          }
        : content
    ));

    setEditingContent(null);

    toast({
      title: "✏️ Contenuto aggiornato!",
      description: `"${data.title}" è stato modificato con successo.`,
    });
  };

  /**
   * 🗑️ DELETE - Elimina un contenuto
   * 
   * Questa funzione:
   * 1. Filtra via il record con l'ID specificato
   * 
   * Equivale a: DELETE FROM contents WHERE id = ?
   * 
   * ⚠️ Attenzione: l'eliminazione è permanente!
   */
  const handleDelete = () => {
    setContents(prev => prev.filter(content => content.id !== deleteDialog.contentId));
    
    setDeleteDialog({ isOpen: false, contentId: "", contentTitle: "" });

    toast({
      title: "🗑️ Contenuto eliminato!",
      description: "Il contenuto è stato rimosso definitivamente.",
      variant: "destructive",
    });
  };

  // Handler per aprire dialog di conferma eliminazione
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

  // Handler per gestire submit del form (CREATE o UPDATE)
  const handleFormSubmit = (data: ContentFormData) => {
    if (editingContent) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="p-3 rounded-xl bg-primary/20"
              >
                <Database className="h-8 w-8 text-primary" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">Content Manager</h1>
                <p className="text-sm text-muted-foreground">
                  Esercizio CRUD Didattico
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Code className="h-4 w-4" />
              <span>Create • Read • Update • Delete</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Form */}
          <div>
            <ContentForm
              onSubmit={handleFormSubmit}
              editingContent={editingContent}
              onCancelEdit={() => setEditingContent(null)}
            />
          </div>

          {/* Right Column: List */}
          <div>
            <ContentList
              contents={contents}
              onEdit={setEditingContent}
              onDelete={openDeleteDialog}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t bg-card/50 py-6 mt-12"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              App didattica per imparare le operazioni CRUD
            </span>
          </div>
        </div>
      </motion.footer>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        contentTitle={deleteDialog.contentTitle}
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, contentId: "", contentTitle: "" })}
      />
    </div>
  );
};

export default Index;
