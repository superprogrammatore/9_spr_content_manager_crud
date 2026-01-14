import { useState, useCallback } from "react";
import { CrudOperation } from "@/components/DatabaseAnimation";

/**
 * 🎬 useDatabaseAnimation Hook
 * 
 * Hook personalizzato per gestire le animazioni del database.
 * Gestisce lo stato dell'animazione e il tipo di operazione.
 */

export const useDatabaseAnimation = (animationDuration = 800) => {
  const [operation, setOperation] = useState<CrudOperation>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = useCallback((op: CrudOperation) => {
    setOperation(op);
    setIsAnimating(true);

    // Termina l'animazione dopo la durata specificata
    setTimeout(() => {
      setIsAnimating(false);
      
      // Resetta l'operazione dopo che la notifica di successo è scomparsa
      setTimeout(() => {
        setOperation(null);
      }, 1000);
    }, animationDuration);
  }, [animationDuration]);

  return {
    operation,
    isAnimating,
    triggerAnimation,
  };
};
