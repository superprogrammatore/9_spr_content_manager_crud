import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoBox } from "./InfoBox";

/**
 * 🗑️ DeleteConfirmDialog Component
 * 
 * Dialog di conferma per l'operazione DELETE.
 * È importante chiedere conferma prima di eliminare
 * perché DELETE è un'operazione irreversibile!
 */

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  contentTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmDialog = ({ 
  isOpen, 
  contentTitle, 
  onConfirm, 
  onCancel 
}: DeleteConfirmDialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onCancel}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 bg-card rounded-xl border shadow-2xl"
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mx-auto w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mb-4"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-xl font-bold text-center mb-2"
            >
              Conferma Eliminazione
            </motion.h3>

            {/* Content */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-muted-foreground mb-4"
            >
              Stai per eliminare:
              <br />
              <strong className="text-foreground">"{contentTitle}"</strong>
            </motion.p>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mb-6"
            >
              <InfoBox title="🗑️ DELETE - Eliminazione" variant="info">
                <strong>DELETE</strong> rimuove permanentemente un record dal database.
                Questa operazione è <strong>irreversibile</strong>! In produzione,
                spesso si usa un "soft delete" (flag <code>deleted: true</code>).
              </InfoBox>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3"
            >
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                Annulla
              </Button>
              <Button
                variant="destructive"
                className="flex-1 gap-2"
                onClick={onConfirm}
              >
                <Trash2 className="h-4 w-4" />
                Elimina
              </Button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
