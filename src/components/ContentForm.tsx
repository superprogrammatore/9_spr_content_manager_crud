import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, X, AlertCircle, CheckCircle, Sparkles, Zap } from "lucide-react";
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

// Varianti di animazione per stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    }
  },
} as const;

export const ContentForm = ({ onSubmit, editingContent, onCancelEdit }: ContentFormProps) => {
  const [formData, setFormData] = useState<ContentFormData>({
    title: "",
    description: "",
    category: "",
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isFocused, setIsFocused] = useState<string | null>(null);

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
   */
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Il titolo è obbligatorio";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Il titolo deve avere almeno 3 caratteri";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Il titolo non può superare 100 caratteri";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descrizione è obbligatoria";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "La descrizione deve avere almeno 10 caratteri";
    }

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
    setIsFocused(null);
    validate();
  };

  const isEditing = editingContent !== null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
      className="relative bg-card rounded-2xl border shadow-xl p-6 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: isEditing 
            ? [
                "radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, hsl(var(--accent) / 0.1) 0%, transparent 50%)",
              ]
            : [
                "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
              ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-5, 5, -5],
            x: [-3, 3, -3],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          <Sparkles className={`h-3 w-3 ${isEditing ? "text-accent/30" : "text-primary/30"}`} />
        </motion.div>
      ))}

      <div className="relative z-10">
        {/* Header con icona animata */}
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-xl ${isEditing ? "bg-accent/20" : "bg-primary/20"} cursor-pointer`}
            >
              <motion.div
                animate={isEditing ? { rotate: [0, 360] } : { rotate: [0, 90, 0] }}
                transition={{ 
                  duration: isEditing ? 2 : 1, 
                  repeat: Infinity, 
                  repeatDelay: isEditing ? 0 : 3,
                  ease: isEditing ? "linear" : "easeInOut"
                }}
              >
                {isEditing ? (
                  <Save className="h-6 w-6 text-accent" />
                ) : (
                  <Plus className="h-6 w-6 text-primary" />
                )}
              </motion.div>
            </motion.div>
            <motion.h2 
              className="text-xl font-bold"
              key={isEditing ? "edit" : "create"}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isEditing ? "✏️ Modifica Contenuto" : "➕ Crea Nuovo Contenuto"}
            </motion.h2>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {isEditing && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onCancelEdit}
                  className="rounded-full hover:bg-destructive/20 hover:text-destructive"
                >
                  <motion.div whileHover={{ rotate: 90 }} whileTap={{ scale: 0.8 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Box didattico */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring" }}
        >
          <InfoBox 
            title={isEditing ? "🔄 UPDATE - Aggiornamento" : "🆕 CREATE - Creazione"}
            variant="info"
          >
            {isEditing ? (
              <>
                <strong>UPDATE</strong> modifica un record esistente nel database. 
                L'ID rimane invariato, ma i dati vengono aggiornati.
                Il timestamp <code className="bg-muted px-1 rounded">updatedAt</code> viene aggiornato automaticamente.
              </>
            ) : (
              <>
                <strong>CREATE</strong> inserisce un nuovo record nel database. 
                Viene generato un ID univoco e impostati i timestamp 
                <code className="bg-muted px-1 rounded">createdAt</code> e <code className="bg-muted px-1 rounded">updatedAt</code>.
              </>
            )}
          </InfoBox>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Campo Titolo */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="title" className="flex items-center gap-2">
              <motion.span
                animate={isFocused === "title" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                Titolo
              </motion.span>
              <span className="text-xs text-muted-foreground">(min. 3 caratteri)</span>
            </Label>
            <motion.div
              whileFocus={{ scale: 1.01 }}
              animate={isFocused === "title" ? { 
                boxShadow: "0 0 20px rgba(var(--primary), 0.2)" 
              } : {}}
              className="rounded-lg"
            >
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                onFocus={() => setIsFocused("title")}
                onBlur={() => handleBlur("title")}
                placeholder="Inserisci un titolo..."
                className={`transition-all duration-300 ${
                  touched.title && errors.title 
                    ? "border-destructive ring-destructive/20 ring-2" 
                    : touched.title && !errors.title && formData.title
                      ? "border-success ring-success/20 ring-2"
                      : isFocused === "title"
                        ? "border-primary ring-primary/20 ring-2"
                        : ""
                }`}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              {touched.title && errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                    <AlertCircle className="h-3 w-3" />
                  </motion.span>
                  {errors.title}
                </motion.p>
              )}
              {touched.title && !errors.title && formData.title && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-sm text-success flex items-center gap-1"
                >
                  <motion.span 
                    animate={{ scale: [1, 1.3, 1] }} 
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle className="h-3 w-3" />
                  </motion.span>
                  Titolo valido
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Campo Descrizione */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="description" className="flex items-center gap-2">
              <motion.span
                animate={isFocused === "description" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                Descrizione
              </motion.span>
              <span className="text-xs text-muted-foreground">(min. 10 caratteri)</span>
            </Label>
            <motion.div
              animate={isFocused === "description" ? { 
                boxShadow: "0 0 20px rgba(var(--primary), 0.2)" 
              } : {}}
              className="rounded-lg"
            >
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                onFocus={() => setIsFocused("description")}
                onBlur={() => handleBlur("description")}
                placeholder="Descrivi il contenuto..."
                rows={4}
                className={`transition-all duration-300 resize-none ${
                  touched.description && errors.description 
                    ? "border-destructive ring-destructive/20 ring-2" 
                    : touched.description && !errors.description && formData.description
                      ? "border-success ring-success/20 ring-2"
                      : isFocused === "description"
                        ? "border-primary ring-primary/20 ring-2"
                        : ""
                }`}
              />
            </motion.div>
            <AnimatePresence mode="wait">
              {touched.description && errors.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                    <AlertCircle className="h-3 w-3" />
                  </motion.span>
                  {errors.description}
                </motion.p>
              )}
              {touched.description && !errors.description && formData.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-sm text-success flex items-center gap-1"
                >
                  <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.4 }}>
                    <CheckCircle className="h-3 w-3" />
                  </motion.span>
                  Descrizione valida
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Campo Categoria */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, category: value }));
                setTouched(prev => ({ ...prev, category: true }));
                // Rimuovi l'errore categoria immediatamente quando viene selezionata
                setErrors(prev => ({ ...prev, category: undefined }));
              }}
            >
              <SelectTrigger 
                className={`transition-all duration-300 ${
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
                {categories.map((cat, index) => (
                  <motion.div
                    key={cat.value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SelectItem value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  </motion.div>
                ))}
              </SelectContent>
            </Select>
            <AnimatePresence>
              {touched.category && errors.category && (
                <motion.p
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="text-sm text-destructive flex items-center gap-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.category}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info sulla validazione */}
          <motion.div variants={itemVariants}>
            <InfoBox title="⚠️ Perché validare gli input?" variant="tip">
              La validazione previene errori, migliora la sicurezza e 
              garantisce che i dati siano corretti prima di essere salvati.
            </InfoBox>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full gap-2 h-12 text-base relative overflow-hidden group"
                size="lg"
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <motion.span
                  className="relative flex items-center gap-2"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  {isEditing ? (
                    <>
                      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                        <Save className="h-5 w-5" />
                      </motion.div>
                      Salva Modifiche
                    </>
                  ) : (
                    <>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Zap className="h-5 w-5" />
                      </motion.div>
                      Crea Contenuto
                    </>
                  )}
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};
