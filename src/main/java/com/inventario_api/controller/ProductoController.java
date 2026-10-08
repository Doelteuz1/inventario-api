package com.inventario_api.controller;

import com.inventario_api.model.Producto;
import com.inventario_api.service.ProductoService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.inventario_api.util.ListarProductosPdf;

import java.util.List;
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")

public class ProductoController {
    @Autowired
    private ProductoService
    productoService;
    @GetMapping
    public List<Producto> listar(){
        return
    productoService.obtenerTodos();
    }
    @PostMapping
    public Producto crear(@RequestBody Producto producto){
        return
                productoService.guardar(producto);
    }
    @GetMapping("/reporte/pdf")
    public void descargarPdf(HttpServletResponse response) throws Exception {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=inventario_productos.pdf");

        List<Producto> productos = productoService.obtenerTodos();
        ListarProductosPdf exporter = new ListarProductosPdf();
        exporter.exportar(productos, response);
    }

}
