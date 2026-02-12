export default function LogoCloud() {
  return (
    <section className="py-20 border-t border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-10">
          Profesionales y empresas que confían en Identiqo
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center opacity-60">
          <div className="font-semibold">ACME</div>
          <div className="font-semibold">Globex</div>
          <div className="font-semibold">Innova</div>
          <div className="font-semibold">Vertex</div>
          <div className="font-semibold">Nexora</div>
        </div>
      </div>
    </section>
  );
}
