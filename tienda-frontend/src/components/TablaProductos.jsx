import React from 'react';
import clienteAxios from '../api/clienteAxios';

export default function TablaProductos({ productos, alEliminar }) {

    const manejarEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

        try {
            // Petición DELETE al backend que acabamos de crear
            await clienteAxios.delete(`/productos/${id}`);

            // Avisamos al componente padre para que actualice la tabla en pantalla
            if (alEliminar) alEliminar(id);

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("No se pudo eliminar el producto");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Inventario Actual</h2>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b text-left text-gray-600">
                        <th className="py-2">ID</th>
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Precio</th>
                        <th className="py-2">Stock</th>
                        <th className="py-2 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">No hay productos registrados</td>
                        </tr>
                    ) : (
                        productos.map((producto) => (
                            <tr key={producto.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{producto.id}</td>
                                <td className="py-2">{producto.nombre}</td>
                                <td className="py-2">${producto.precio}</td>
                                <td className="py-2">{producto.stock}</td>
                                <td className="py-2 text-center">
                                    <button
                                        onClick={() => manejarEliminar(producto.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}