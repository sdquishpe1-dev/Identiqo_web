import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProfileMockup from "./components/ProfileMockup";
import Link from "next/link";
import FadeIn from "./components/FadeIn";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative py-32 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-black" />

          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Tu identidad profesional
                <br />
                en un solo enlace inteligente.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                Diseñado para profesionales modernos que quieren destacar.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link
                href="/register"
                className="bg-black dark:bg-white dark:text-black text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition"
              >
                Crear mi perfil gratis
              </Link>
            </FadeIn>

            <ProfileMockup />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
