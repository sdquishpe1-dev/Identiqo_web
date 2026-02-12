"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

declare global {
  interface Window {
    google: any;
  }
}

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ===============================
  // GOOGLE INIT
  // ===============================
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleGoogleCallback,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        width: "100%",
      }
    );
  }, []);

  const handleGoogleCallback = async (response: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: response.credential,
          }),
        }
      );

      const data = await res.json();

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch (error) {
      setError("Error al iniciar sesión con Google");
    }
  };

  // ===============================
  // REGISTER NORMAL
  // ===============================
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await registerUser(email, password);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors">
      <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Crear cuenta
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            required
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            required
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg"
          >
            Crear cuenta
          </button>
        </form>

        {/* DIV GOOGLE */}
        <div className="mt-6">
          <div
            id="googleButton"
            className="flex justify-center"
          />
        </div>
      </div>
    </main>
  );
}
