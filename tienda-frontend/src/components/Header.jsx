export default function Header({ alDescargarPDF }) {
  return (
    <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Panel de Productos</h1>
        <p className="text-gray-500">Conectado a: http://localhost:8080</p>
      </div>
      <button
        onClick={alDescargarPDF}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition flex items-center gap-2"
      >
        📄 Descargar Reporte PDF
      </button>
    </header>
  );
}
