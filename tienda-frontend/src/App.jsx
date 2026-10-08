import { useState, useEffect } from 'react';
import clienteAxios from './api/clienteAxios';

export default function App() {
  // Estados para la lista de productos y el formulario
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [errorCors, setErrorCors] = useState(false);

  // 1. Función para obtener los productos (GET)
const obtenerProductos = async () => {
  try {
    setErrorCors(false);
    const respuesta = await clienteAxios.get('/productos');
    console.log("Datos del backend:", respuesta.data); // <-- Agrega esto para espiar los datos
    setProductos(Array.isArray(respuesta.data) ? respuesta.data : []);
  } catch (error) {
    setErrorCors(true);
  }
};


  // Cargar los productos al abrir la aplicación
  useEffect(() => {
    obtenerProductos();
  }, []);

  // 2. Función para guardar un producto (POST)
  const guardarProducto = async (e) => {
    e.preventDefault();
    if (!nombre || !precio) return alert("Por favor llena todos los campos");

    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio)
    };

    try {
      await clienteAxios.post('/productos', nuevoProducto);
      alert("¡Producto agregado con éxito!");
      setNombre('');
      setPrecio('');
      obtenerProductos(); // Recargar la lista automáticamente
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  // 3. Función para abrir/descargar el reporte PDF
  const descargarReporte = () => {
    // Abrimos el endpoint directamente en una nueva pestaña del navegador
    window.open('http://localhost:8080/api/productos/reporte/pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Productos</h1>
            <p className="text-gray-500">Conectado a: http://localhost:8080</p>
          </div>
          <button
            onClick={descargarReporte}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            📄 Descargar Reporte PDF
          </button>
        </header>

        {errorCors && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
            <p className="font-bold">⚠️ Error de Conexión (Posible error de CORS)</p>
            <p>Asegúrate de que tu Backend esté corriendo y tenga la anotación <code className="bg-red-200 px-1 rounded">@CrossOrigin(origins = "*")</code> en tu controlador de Java.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna del Formulario */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Agregar Nuevo Producto</h2>
            <form onSubmit={guardarProducto} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej. Laptop, Mouse"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              >
                Guardar Producto
              </button>
            </form>
          </div>

          {/* Columna de la Tabla de Productos */}
          <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Inventario Actual</h2>
            {productos.length === 0 ? (
              <p className="text-gray-500 italic">No hay productos registrados o el servidor está vacío.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-gray-400 uppercase text-xs font-semibold">
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Nombre</th>
                      <th className="py-3 px-4 text-right">Precio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-gray-700">
                    {productos.map((producto) => (
                      <tr key={producto.id} className="hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-mono text-sm text-gray-500">{producto.id}</td>
                        <td className="py-3 px-4 font-medium">{producto.nombre}</td>
                        <td className="py-3 px-4 text-right font-semibold">${producto.precio?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
