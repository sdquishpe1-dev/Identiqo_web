export default function ProfileMockup() {
  return (
    <div className="relative mx-auto mt-16 max-w-md">
      <div className="rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-6 space-y-4">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div>
            <h4 className="font-semibold">Carlos Mendoza</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Consultor Empresarial
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
          <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
          <div className="h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <button className="w-full bg-black dark:bg-white dark:text-black text-white py-2 rounded-lg text-sm font-medium">
            Guardar contacto
          </button>
        </div>

      </div>

      {/* Glow effect premium */}
      <div className="absolute -z-10 inset-0 blur-3xl opacity-30 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full" />
    </div>
  );
}
