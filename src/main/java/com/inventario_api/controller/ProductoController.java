package com.inventario_api.controller;

import com.inventario_api.dto.ProductoRequestDto;
import com.inventario_api.dto.ProductoResponseDto;
import com.inventario_api.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    // Inyección por constructor
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public ResponseEntity<List<ProductoResponseDto>> listar() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @PostMapping
    public ResponseEntity<ProductoResponseDto> crear(@Valid @RequestBody ProductoRequestDto requestDto) {
        ProductoResponseDto nuevoProducto = productoService.guardarProducto(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }
    @GetMapping("/reporte/pdf")
    public void descargarPdf(HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=inventario_productos.pdf");
        productoService.generarPdfProductos(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id){
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}