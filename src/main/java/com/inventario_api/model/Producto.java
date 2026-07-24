package com.inventario_api.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false)
    private String nombre;
    private String descripcion;
    @Column(unique = true)
    private String codigoBarras;
    private Double precio;
    private Integer stock;
}
