package com.inventario_api.service;
import com.inventario_api.model.Producto;
import com.inventario_api.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;
    public List<Producto>obtenerTodos(){
        return
                productoRepository.findAll();
    }
    public Producto guardar(Producto producto){
        return
                productoRepository.save(producto);
    }
}
