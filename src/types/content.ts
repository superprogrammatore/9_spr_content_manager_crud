/**
 * 📚 MODELLO DATI - Content
 * 
 * Questa interfaccia definisce la struttura di un contenuto.
 * In un'app CRUD, ogni entità deve avere:
 * - id: identificatore univoco per trovare, modificare ed eliminare
 * - campi dati: le informazioni che vogliamo gestire
 * - timestamp: per tracciare quando è stato creato/modificato
 */
export interface Content {
  /** Identificatore univoco - essenziale per UPDATE e DELETE */
  id: string;
  
  /** Titolo del contenuto - campo obbligatorio */
  title: string;
  
  /** Descrizione del contenuto - campo obbligatorio */
  description: string;
  
  /** Categoria del contenuto */
  category: string;
  
  /** Data di creazione - generata automaticamente */
  createdAt: Date;
  
  /** Data ultima modifica - aggiornata ad ogni UPDATE */
  updatedAt: Date;
}

/**
 * 📝 FORM DATA
 * 
 * Dati del form senza id e timestamp
 * (questi vengono generati automaticamente)
 */
export interface ContentFormData {
  title: string;
  description: string;
  category: string;
}
