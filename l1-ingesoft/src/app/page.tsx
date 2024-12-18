import Link from "next/link";
import "./lluvia.scss";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-8 relative z-10">
      {/* Hero Section */}
      <main className="max-w-4xl mx-auto text-center">
        <section className="bg-[#C1C8C2]/90 backdrop-blur-sm p-1 pt-2 rounded-lg mb-10 shadow-lg align-center">
          <h1 className="text-5xl font-bold mb-6 text-[#3C4A3E]">
            Datos poblacionales 📈
          </h1>
        </section>

        <Link
          href="/queryPage"
          className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-[#546057] rounded-lg hover:bg-[#3D4A3F] transition-colors"
        >
          Ir al Dashboard
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </main>

      {/* Features Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-[#3D4A3F] transition-colors hover:text-white">
          <h3 className="text-xl font-bold mb-2">Consulta Personas</h3>
          <p>Consulta datos sobre personas registradas.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-[#3D4A3F] transition-colors hover:text-white">
          <h3 className="text-xl font-bold mb-2">Gestión de Viviendas</h3>
          <p>Consulta datos sobre viviendas.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-[#3D4A3F] transition-colors hover:text-white">
          <h3 className="text-xl font-bold mb-2">Datos Geográficos</h3>
          <p>Consulta datos sobre municipios y departamentos.</p>
        </div>
        <p className="flex text-white text-center align-center m-auto md:col-span-3 hover:text-blue">
          <a
            href="https://codepen.io/natewiley/pen/PwWxRd"
            target="_blank"
            rel="noopener noreferrer"
          >
            Créditos animación
          </a>
        </p>
      </section>

      {/* Rain Effect */}
      <div className="wrap">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="c"></div>
        ))}
      </div>
    </div>
  );
}
