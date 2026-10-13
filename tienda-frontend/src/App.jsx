import React, { useEffect, useState } from 'react';
import clienteAxios from './api/clienteAxios';
import FormularioProducto from './components/FormularioProducto';
import TablaProductos from './components/TablaProductos';

export default function App() {
    const [productos, setProductos] = useState([]);

    // Cargar productos al iniciar la página
    const cargarProductos = async () => {
        try {
            const respuesta = await clienteAxios.get('/productos');
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // Función que se ejecuta al guardar un producto nuevo desde el formulario
    const manejarGuardar = async (nuevoProductoDto) => {
        try {
            await clienteAxios.post('/productos', nuevoProductoDto);
            cargarProductos(); // Recargamos la tabla
            alert("¡Producto guardado con éxito!");
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar el producto");
        }
    };

    // Función para abrir el reporte en PDF en una nueva pestaña
    const descargarPdf = () => {
        window.open('http://localhost:8080/api/productos/reporte/pdf', '_blank');
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Control de Productos</h1>

            <button
                onClick={descargarPdf}
                className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Descargar Reporte PDF
            </button>

            <FormularioProducto alGuardar={manejarGuardar} />

            <TablaProductos
                productos={productos}
                alEliminar={(idEliminado) => setProductos(productos.filter(p => p.id !== idEliminado))}
            />
        </div>
    );
}