"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginGoogle, loginUser } from "@/lib/auth_service";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
} from "lucide-react";

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE =================
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && document.getElementById("googleButtonLogin")) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          callback: handleGoogleCallback,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleButtonLogin"),
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
      /*const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: response.credential,
        }),
      });
*/
      const data = await loginGoogle(response);
      localStorage.setItem("token", data.token);
     if(data.hasProfile){
        toast.success("¡Bienvenido de vuelta! 🚀");
        router.push("/dashboard");
      }else{
        router.push("/createProfile");
      }
    } catch {
      toast.error("Error al iniciar sesión con Google");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      
if (data.role === 'ADMIN') {
  console.info('Admin logueado; puedes redirigir a /adm');
}console.log("rol",data.role);
      if(data.hasProfile){
        toast.success("¡Bienvenido de vuelta!");
       // router.push("/dashboard");
      }else{
       // router.push("/createProfile");
      }
      
      
    } catch (err: any) {
      toast.error(err.message || "Error al iniciar sesión");
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
                Bienvenido de vuelta
              </span>
            </div>

            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Continúa donde
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                lo dejaste.
              </span>
            </h2>

            <p className="text-gray-300 text-lg max-w-md mb-12">
              Accede a tu plataforma empresarial con la máxima seguridad y
              rendimiento. Tu trabajo te espera.
            </p>

            <div className="space-y-4">
              {[
                "Acceso seguro y encriptado",
                "Sincronización en tiempo real",
                "Datos protegidos 24/7",
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Iniciar sesión
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accede a tu cuenta empresarial
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
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
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    placeholder="Ingresa tu contraseña"
                    required
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
              </div>

              {/* RECORDARME Y OLVIDÉ CONTRASEÑA */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Recordarme
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* BOTÓN SUBMIT */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-base transition-all shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    Iniciando sesión...
                  </span>
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight className="w-5 h-5" />
                  </>
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
            <div id="googleButtonLogin" className="flex justify-center" />

            {/* REGISTRO LINK */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Crear cuenta
                </Link>
              </p>
            </div>
          </div>

          {/* TÉRMINOS */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6 px-4">
            Al iniciar sesión, confirmas que aceptas nuestros{" "}
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