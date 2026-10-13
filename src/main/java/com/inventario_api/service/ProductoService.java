package com.inventario_api.service;

import com.inventario_api.dto.ProductoRequestDto;
import com.inventario_api.dto.ProductoResponseDto;
import com.inventario_api.exception.RecursoNoEncontradoException;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.inventario_api.model.Producto;
import com.inventario_api.repository.ProductoRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public List<ProductoResponseDto> listarProductos() {
        return productoRepository.findAll().stream()
                .map(this::mapearADto)
                .collect(Collectors.toList());
    }

    public ProductoResponseDto guardarProducto(ProductoRequestDto requestDto) {
        Producto producto = new Producto();
        producto.setNombre(requestDto.getNombre());
        producto.setPrecio(requestDto.getPrecio());
        producto.setStock(requestDto.getStock());

        Producto productoGuardado = productoRepository.save(producto);
        return mapearADto(productoGuardado);
    }

    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Producto no encontrado con ID: " + id);
        }
        productoRepository.deleteById(id);
    }

    public void generarPdfProductos(HttpServletResponse response) throws IOException {
        List<ProductoResponseDto> productos = listarProductos();

        Document document = new Document();
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        document.add(new Paragraph("Reporte de Inventario - Productos"));
        document.add(new Paragraph("--------------------------------------------------"));
        document.add(new Paragraph(" "));

        for (ProductoResponseDto p : productos) {
            document.add(new Paragraph("ID: " + p.getId() + " | Nombre: " + p.getNombre() + " | Precio: $" + p.getPrecio() + " | Stock: " + p.getStock()));
        }

        document.close();
    }

    private ProductoResponseDto mapearADto(Producto producto) {
        ProductoResponseDto dto = new ProductoResponseDto();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        return dto;
    }
}