import { useState } from 'react';

export default function FormularioProducto({ alGuardar }) {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState(''); // <-- 1. Agregamos el estado para el stock

    const manejarEnvio = (e) => {
        e.preventDefault();
        // 2. Validamos que todos los campos estén llenos
        if (!nombre || !precio || !stock) return alert("Por favor llena todos los campos");

        // 3. Enviamos los tres campos que espera el backend (nombre, precio, stock)
        alGuardar({
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock, 10)
        });

        // Limpiamos los campos
        setNombre('');
        setPrecio('');
        setStock('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Agregar Nuevo Producto</h2>
            <form onSubmit={manejarEnvio} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Nombre del Producto</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Precio</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div>
                    {/* <-- Agregamos este input para el stock en tu formulario */}
                    <label className="block text-sm font-medium text-gray-600 mb-1">Stock</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Guardar Producto
                </button>
            </form>
        </div>
    );
}