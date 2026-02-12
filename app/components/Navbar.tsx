import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Identiqo
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/register"
            className="bg-black dark:bg-white dark:text-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            Prueba gratis
          </Link>
          <ThemeToggle />

        </nav>
      </div>
    </header>
  );
}
