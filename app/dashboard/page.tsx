import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <h1 className="text-3xl font-bold mb-10">
            Bienvenido de nuevo 👋
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border dark:border-gray-800 shadow-sm">
              <h3 className="font-semibold mb-2">Visitas totales</h3>
              <p className="text-3xl font-bold">1,284</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border dark:border-gray-800 shadow-sm">
              <h3 className="font-semibold mb-2">Clicks en contacto</h3>
              <p className="text-3xl font-bold">342</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border dark:border-gray-800 shadow-sm">
              <h3 className="font-semibold mb-2">Perfil activo</h3>
              <p className="text-green-500 font-semibold">Activo</p>
            </div>

          </div>

        </div>
      </main>
    </>
  );
}
