import { motion, AnimatePresence } from "framer-motion";
import { Database, Plus, Eye, RefreshCw, Trash2, Check } from "lucide-react";

/**
 * 🗄️ DatabaseAnimation Component
 * 
 * Animazione visiva che mostra quando avviene un'operazione sul database.
 * Ogni operazione CRUD ha una sua animazione caratteristica:
 * - CREATE: freccia verso il DB + effetto pulse verde
 * - READ: freccia dal DB + effetto scan blu
 * - UPDATE: rotazione + effetto pulse arancione
 * - DELETE: shake + effetto pulse rosso
 */

export type CrudOperation = "create" | "read" | "update" | "delete" | null;

interface DatabaseAnimationProps {
  operation: CrudOperation;
  isAnimating: boolean;
}

const operationConfig = {
  create: {
    icon: Plus,
    color: "text-success",
    bgColor: "bg-success/20",
    ringColor: "ring-success",
    label: "CREATE",
    description: "Inserimento dati...",
  },
  read: {
    icon: Eye,
    color: "text-info",
    bgColor: "bg-info/20",
    ringColor: "ring-info",
    label: "READ",
    description: "Lettura dati...",
  },
  update: {
    icon: RefreshCw,
    color: "text-accent",
    bgColor: "bg-accent/20",
    ringColor: "ring-accent",
    label: "UPDATE",
    description: "Aggiornamento dati...",
  },
  delete: {
    icon: Trash2,
    color: "text-destructive",
    bgColor: "bg-destructive/20",
    ringColor: "ring-destructive",
    label: "DELETE",
    description: "Eliminazione dati...",
  },
};

export const DatabaseAnimation = ({ operation, isAnimating }: DatabaseAnimationProps) => {
  const config = operation ? operationConfig[operation] : null;
  const OperationIcon = config?.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isAnimating && config && OperationIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-card border shadow-2xl rounded-2xl p-5 min-w-[200px]"
          >
            {/* Animazione principale del database */}
            <div className="relative flex items-center justify-center mb-4">
              {/* Cerchi pulsanti di sfondo */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute w-20 h-20 rounded-full ${config.bgColor}`}
              />
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className={`absolute w-24 h-24 rounded-full ${config.bgColor}`}
              />

              {/* Container del database */}
              <motion.div
                animate={
                  operation === "delete"
                    ? { rotate: [-5, 5, -5, 5, 0], x: [-3, 3, -3, 3, 0] }
                    : operation === "update"
                    ? { rotate: 360 }
                    : { scale: [1, 1.1, 1] }
                }
                transition={{
                  duration: operation === "update" ? 1 : 0.5,
                  repeat: Infinity,
                  ease: operation === "update" ? "linear" : "easeInOut",
                }}
                className={`relative p-4 rounded-xl ${config.bgColor} ring-2 ${config.ringColor}`}
              >
                <Database className={`h-10 w-10 ${config.color}`} />

                {/* Icona dell'operazione */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className={`absolute -top-2 -right-2 p-1.5 rounded-full bg-card border-2 ${config.ringColor.replace('ring-', 'border-')}`}
                >
                  <OperationIcon className={`h-4 w-4 ${config.color}`} />
                </motion.div>
              </motion.div>

              {/* Particelle di dati animate */}
              {operation === "create" && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 40, opacity: 0, x: (i - 1) * 20 }}
                      animate={{ y: -10, opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.15,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                      className="absolute w-2 h-2 bg-success rounded-full"
                    />
                  ))}
                </>
              )}

              {operation === "read" && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -10, opacity: 0, x: (i - 1) * 20 }}
                      animate={{ y: 40, opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.15,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                      className="absolute w-2 h-2 bg-info rounded-full"
                    />
                  ))}
                </>
              )}
            </div>

            {/* Label e descrizione */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={`text-xs font-bold px-2 py-1 rounded ${config.bgColor} ${config.color}`}
              >
                {config.label}
              </motion.span>
              <p className="text-sm text-muted-foreground mt-2">
                {config.description}
              </p>
            </motion.div>

            {/* Barra di progresso */}
            <motion.div
              className="mt-3 h-1 bg-muted rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`h-full ${config.bgColor.replace('/20', '')} ${config.color.replace('text-', 'bg-')}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifica di successo */}
      <AnimatePresence>
        {!isAnimating && operation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-success text-success-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Completato!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
