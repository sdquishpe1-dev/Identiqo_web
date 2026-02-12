export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-6">
        © {new Date().getFullYear()} Identiqo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
