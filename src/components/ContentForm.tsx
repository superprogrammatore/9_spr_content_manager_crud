import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoBox } from "./InfoBox";
import { Content, ContentFormData } from "@/types/content";

/**
 * 📝 ContentForm Component
 * 
 * Questo form gestisce sia CREATE che UPDATE:
 * - Se `editingContent` è null → CREATE (crea nuovo contenuto)
 * - Se `editingContent` ha un valore → UPDATE (modifica esistente)
 * 
 * ⚠️ VALIDAZIONE: Ogni campo viene validato prima dell'invio.
 * La validazione è fondamentale per:
 * 1. Prevenire dati corrotti nel database
 * 2. Dare feedback immediato all'utente
 * 3. Migliorare l'esperienza utente
 */

interface ContentFormProps {
  onSubmit: (data: ContentFormData) => void;
  editingContent: Content | null;
  onCancelEdit: () => void;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  category?: string;
}

const categories = [
  { value: "articolo", label: "📝 Articolo" },
  { value: "tutorial", label: "📚 Tutorial" },
  { value: "nota", label: "🗒️ Nota" },
  { value: "idea", label: "💡 Idea" },
];

export const ContentForm = ({ onSubmit, editingContent, onCancelEdit }: ContentFormProps) => {
  const [formData, setFormData] = useState<ContentFormData>({
    title: "",
    description: "",
    category: "",
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Quando editingContent cambia, popola il form
  useEffect(() => {
    if (editingContent) {
      setFormData({
        title: editingContent.title,
        description: editingContent.description,
        category: editingContent.category,
      });
    } else {
      setFormData({ title: "", description: "", category: "" });
    }
    setErrors({});
    setTouched({});
  }, [editingContent]);

  /**
   * 🔍 VALIDAZIONE INPUT
   * 
   * Perché validare?
   * - Previene l'inserimento di dati vuoti o non validi
   * - Dà feedback immediato all'utente
   * - Riduce errori nel sistema
   */
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validazione titolo: minimo 3 caratteri
    if (!formData.title.trim()) {
      newErrors.title = "Il titolo è obbligatorio";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Il titolo deve avere almeno 3 caratteri";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Il titolo non può superare 100 caratteri";
    }

    // Validazione descrizione: minimo 10 caratteri
    if (!formData.description.trim()) {
      newErrors.description = "La descrizione è obbligatoria";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "La descrizione deve avere almeno 10 caratteri";
    }

    // Validazione categoria: deve essere selezionata
    if (!formData.category) {
      newErrors.category = "Seleziona una categoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, description: true, category: true });
    
    if (validate()) {
      onSubmit({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
      });
      
      if (!editingContent) {
        setFormData({ title: "", description: "", category: "" });
        setTouched({});
      }
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const isEditing = editingContent !== null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-xl border shadow-lg p-6"
    >
      {/* Header con icona animata */}
      <div className="flex items-center justify-between mb-6">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
            className={`p-2 rounded-lg ${isEditing ? "bg-accent/20" : "bg-primary/20"}`}
          >
            {isEditing ? (
              <Save className="h-5 w-5 text-accent" />
            ) : (
              <Plus className="h-5 w-5 text-primary" />
            )}
          </motion.div>
          <h2 className="text-xl font-bold">
            {isEditing ? "✏️ Modifica Contenuto" : "➕ Crea Nuovo Contenuto"}
          </h2>
        </motion.div>
        
        {isEditing && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Button variant="ghost" size="icon" onClick={onCancelEdit}>
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Info Box didattico */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <InfoBox 
          title={isEditing ? "🔄 UPDATE - Aggiornamento" : "🆕 CREATE - Creazione"}
          variant="info"
        >
          {isEditing ? (
            <>
              <strong>UPDATE</strong> modifica un record esistente nel database. 
              L'ID rimane invariato, ma i dati vengono aggiornati.
              Il timestamp <code>updatedAt</code> viene aggiornato automaticamente.
            </>
          ) : (
            <>
              <strong>CREATE</strong> inserisce un nuovo record nel database. 
              Viene generato un ID univoco e impostati i timestamp 
              <code>createdAt</code> e <code>updatedAt</code>.
            </>
          )}
        </InfoBox>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Titolo */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="title" className="flex items-center gap-2">
            Titolo
            <span className="text-xs text-muted-foreground">(min. 3 caratteri)</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            onBlur={() => handleBlur("title")}
            placeholder="Inserisci un titolo..."
            className={`transition-all duration-200 ${
              touched.title && errors.title 
                ? "border-destructive ring-destructive/20 ring-2" 
                : touched.title && !errors.title && formData.title
                  ? "border-success ring-success/20 ring-2"
                  : ""
            }`}
          />
          <AnimatePresence>
            {touched.title && errors.title && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.title}
              </motion.p>
            )}
            {touched.title && !errors.title && formData.title && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-success flex items-center gap-1"
              >
                <CheckCircle className="h-3 w-3" />
                Titolo valido
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Campo Descrizione */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="description" className="flex items-center gap-2">
            Descrizione
            <span className="text-xs text-muted-foreground">(min. 10 caratteri)</span>
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            onBlur={() => handleBlur("description")}
            placeholder="Descrivi il contenuto..."
            rows={4}
            className={`transition-all duration-200 resize-none ${
              touched.description && errors.description 
                ? "border-destructive ring-destructive/20 ring-2" 
                : touched.description && !errors.description && formData.description
                  ? "border-success ring-success/20 ring-2"
                  : ""
            }`}
          />
          <AnimatePresence>
            {touched.description && errors.description && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </motion.p>
            )}
            {touched.description && !errors.description && formData.description && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-success flex items-center gap-1"
              >
                <CheckCircle className="h-3 w-3" />
                Descrizione valida
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Campo Categoria */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              setFormData(prev => ({ ...prev, category: value }));
              setTouched(prev => ({ ...prev, category: true }));
            }}
          >
            <SelectTrigger 
              className={`transition-all duration-200 ${
                touched.category && errors.category 
                  ? "border-destructive ring-destructive/20 ring-2" 
                  : touched.category && !errors.category && formData.category
                    ? "border-success ring-success/20 ring-2"
                    : ""
              }`}
            >
              <SelectValue placeholder="Seleziona categoria..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AnimatePresence>
            {touched.category && errors.category && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.category}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info sulla validazione */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <InfoBox title="⚠️ Perché validare gli input?" variant="tip">
            La validazione previene errori, migliora la sicurezza e 
            garantisce che i dati siano corretti prima di essere salvati.
          </InfoBox>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Button 
            type="submit" 
            className="w-full gap-2"
            size="lg"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  Salva Modifiche
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Crea Contenuto
                </>
              )}
            </motion.span>
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};
