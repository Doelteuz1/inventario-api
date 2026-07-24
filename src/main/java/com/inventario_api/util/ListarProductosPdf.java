package com.inventario_api.util;

import com.inventario_api.model.Producto;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

public class ListarProductosPdf {
    public void exportar(List<Producto> listaProductos, HttpServletResponse response) throws Exception {
        Document documento = new Document(PageSize.A4);
        PdfWriter.getInstance(documento, response.getOutputStream());
        documento.open();

        // Título del PDF
        Font fuenteTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
        Paragraph titulo = new Paragraph("Reporte de Inventario Actual", fuenteTitulo);
        titulo.setAlignment(Element.ALIGN_CENTER);
        documento.add(titulo);
        documento.add(new Paragraph(" ")); // Espacio en blanco

        // Tabla de 4 columnas
        PdfPTable tabla = new PdfPTable(4);
        tabla.addCell("Nombre");
        tabla.addCell("Código");
        tabla.addCell("Precio");
        tabla.addCell("Stock");

        for (Producto p : listaProductos) {
            tabla.addCell(p.getNombre());
            tabla.addCell(p.getCodigoBarras());
            tabla.addCell("$" + p.getPrecio());
            tabla.addCell(String.valueOf(p.getStock()));
        }

        documento.add(tabla);
        documento.close();
    }
}
