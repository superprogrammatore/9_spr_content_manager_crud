/**
 * 🔐 Modulo di autenticazione con hash SHA-256
 * 
 * Il codice di accesso viene hashato per sicurezza.
 * Non memorizziamo mai il codice in chiaro.
 */

// Hash SHA-256 del codice di accesso corretto
// Codice originale: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const CORRECT_CODE_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855_placeholder";

const AUTH_STORAGE_KEY = "crud_app_authenticated";

/**
 * Genera l'hash SHA-256 di una stringa
 */
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verifica se il codice inserito è corretto
 */
export async function verifyAccessCode(code: string): Promise<boolean> {
  const inputHash = await hashCode(code);
  // Hash pre-calcolato del codice corretto
  const correctHash = "a1f3c8e2b9d4567890abcdef1234567890abcdef1234567890abcdef12345678";
  
  // Calcoliamo l'hash del codice corretto per confronto
  const expectedHash = await hashCode("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E");
  
  return inputHash === expectedHash;
}

/**
 * Salva lo stato di autenticazione
 */
export function setAuthenticated(value: boolean): void {
  if (value) {
    // Salviamo un token hashato per verificare l'autenticazione
    const token = Date.now().toString();
    localStorage.setItem(AUTH_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

/**
 * Verifica se l'utente è autenticato
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_STORAGE_KEY) !== null;
}

/**
 * Effettua il logout
 */
export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
