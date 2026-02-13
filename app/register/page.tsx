"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/auth_service";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";

declare global {
  interface Window {
    google: any;
  }
}

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  // ================= VALIDACIONES =================

  const emailValid = useMemo(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }, [email]);

  const passwordChecks = useMemo(() => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&.#_-]/.test(password),
    };
  }, [password]);

  const passwordValid = Object.values(passwordChecks).every(Boolean);

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const formValid = emailValid && passwordValid && passwordsMatch;

  const progress = (Object.values(passwordChecks).filter(Boolean).length / 5) * 100;

  // ================= GOOGLE =================

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && document.getElementById("googleButtonRegister")) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleCallback,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleButtonRegister"),
          {
            theme: "outline",
            size: "large",
            width: 350,
          }
        );

        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleGoogleCallback = async (response: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: response.credential,
        }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      toast.success("Cuenta creada 🚀");
      router.push("/dashboard");
    } catch {
      toast.error("Error con Google");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;

    setLoading(true);

    try {
      const data = await registerUser(email, password);
      localStorage.setItem("token", data.token);
      toast.success("Bienvenido 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Error al crear cuenta");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================

  return (
    <main className="min-h-screen flex">
      <Toaster position="top-right" />

      {/* LADO IZQUIERDO VISUAL */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, #6d28d9, transparent 50%)",
              "radial-gradient(circle at 70% 60%, #2563eb, transparent 50%)",
              "radial-gradient(circle at 40% 70%, #9333ea, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute inset-0 blur-3xl opacity-40"
        />

        {/* Grid decorativo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 p-16 text-white flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <span className="text-sm font-semibold tracking-wider text-purple-400 uppercase">
                Plataforma empresarial
              </span>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Construye algo
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                extraordinario.
              </span>
            </h2>

            <p className="text-gray-300 text-lg max-w-md mb-12">
              Plataforma profesional diseñada con estándares SaaS modernos. Seguridad,
              escalabilidad y rendimiento empresarial.
            </p>

            <div className="space-y-4">
              {[
                "Autenticación empresarial segura",
                "Infraestructura escalable",
                "Soporte técnico 24/7",
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* LADO DERECHO FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50 dark:bg-black px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-900 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800">
            {/* PROGRESS BAR */}
            <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Crear cuenta
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Empieza tu experiencia empresarial en segundos
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="tu@empresa.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email && emailValid && (
                    <CheckCircle2 className="absolute right-3 top-3.5 text-green-500 w-5 h-5" />
                  )}
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Requisitos de contraseña */}
                {password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Requisitos de seguridad:
                    </p>
                    <div className="space-y-2">
                      {[
                        { key: "length", label: "Mínimo 8 caracteres" },
                        { key: "upper", label: "Una mayúscula (A-Z)" },
                        { key: "lower", label: "Una minúscula (a-z)" },
                        { key: "number", label: "Un número (0-9)" },
                        { key: "special", label: "Un carácter especial (@$!%*?&)" },
                      ].map(({ key, label }) => (
                        <div key={key} className="flex items-center gap-2">
                          {passwordChecks[key as keyof typeof passwordChecks] ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                          )}
                          <span
                            className={`text-xs ${
                              passwordChecks[key as keyof typeof passwordChecks]
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repite tu contraseña"
                    className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {passwordsMatch ? (
                    <CheckCircle2 className="absolute right-3 top-3.5 text-green-500 w-5 h-5" />
                  ) : (
                    confirmPassword && (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    )
                  )}
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-2 text-xs text-red-500">Las contraseñas no coinciden</p>
                )}
              </div>

              {/* BOTÓN SUBMIT */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={!formValid || loading}
                className={`w-full py-4 rounded-xl font-semibold text-base transition-all shadow-lg ${
                  formValid
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/50"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  "Crear cuenta empresarial"
                )}
              </motion.button>
            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                o continúa con
              </span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            </div>

            {/* GOOGLE BUTTON */}
            <div id="googleButtonRegister" className="flex justify-center" />

            {/* LOGIN LINK */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>

          {/* TÉRMINOS */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6 px-4">
            Al crear una cuenta, aceptas nuestros{" "}
            <a href="#" className="underline hover:text-gray-700 dark:hover:text-gray-300">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="underline hover:text-gray-700 dark:hover:text-gray-300">
              Política de Privacidad
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}