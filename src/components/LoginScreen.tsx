import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, KeyRound, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyAccessCode, setAuthenticated } from "@/lib/auth";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError("Inserisci il codice di accesso");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const isValid = await verifyAccessCode(code);
      
      if (isValid) {
        setIsUnlocking(true);
        setAuthenticated(true);
        
        // Animazione di sblocco prima di procedere
        setTimeout(() => {
          onLoginSuccess();
        }, 1500);
      } else {
        setError("Codice di accesso non valido");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Errore durante la verifica");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95 overflow-hidden">
          {/* Animated top border */}
          <motion.div
            className="h-1 bg-gradient-to-r from-primary via-accent to-primary"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundSize: "200% 100%" }}
          />

          <CardHeader className="text-center pb-2">
            <motion.div
              className="mx-auto mb-4 relative"
              animate={isUnlocking ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <AnimatePresence mode="wait">
                  {isUnlocking ? (
                    <motion.div
                      key="unlocked"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Unlock className="w-10 h-10 text-green-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="locked"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, rotate: 180 }}
                    >
                      <Lock className="w-10 h-10 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Orbital particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-accent"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      transformOrigin: "40px 40px",
                    }}
                  />
                ))}
              </motion.div>

              {isUnlocking && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-green-400"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: [0, Math.cos((i * 45 * Math.PI) / 180) * 50],
                        y: [0, Math.sin((i * 45 * Math.PI) / 180) * 50],
                      }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>

            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              Content Manager
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-5 w-5 text-accent" />
              </motion.span>
            </CardTitle>
            <CardDescription className="flex items-center justify-center gap-2 mt-2">
              <ShieldCheck className="w-4 h-4" />
              Inserisci il codice di accesso per continuare
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                  >
                    <KeyRound className="w-4 h-4" />
                  </motion.div>
                  <Input
                    type="password"
                    placeholder="Codice di accesso"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setError("");
                    }}
                    className="pl-10 h-12 text-lg transition-all focus:ring-2 focus:ring-primary/50"
                    disabled={isLoading || isUnlocking}
                    autoFocus
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-2 text-sm text-destructive"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 text-lg relative overflow-hidden group"
                  disabled={isLoading || isUnlocking}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  <AnimatePresence mode="wait">
                    {isUnlocking ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Unlock className="w-5 h-5" />
                        Accesso consentito!
                      </motion.span>
                    ) : isLoading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Lock className="w-5 h-5" />
                        </motion.div>
                        Verifica in corso...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Lock className="w-5 h-5" />
                        Accedi
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-center text-muted-foreground mt-4"
            >
              🔐 Il codice viene verificato tramite hash SHA-256
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
