import Link from "next/link";

export default function Home() {
  console.log("Hola mundo")
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#C1C8C1] p-8">
      {/* Hero Section: seccion principal de la pagina */}
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Datos poblacionales 📈</h1>

        <p className="text-xl mb-8">
          Realiza consultas y visualiza datos de manera eficiente
        </p>

        {/* CTA: Call to Action Button, es decir lo que motiva al usuario a interactuar */}
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

      {/* Optional: Features Section */}
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
      </section>
    </div>
  );
}
