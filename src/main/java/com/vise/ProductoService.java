package com.vise;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductoService {
 
    @Autowired
    private ProductoRepository repo;
     
    public List<Producto> listAll() {
        return repo.findAll();
    }
    
    public List<Producto> listByMarca(String marca) {
        return repo.findByMarca(marca);
    }
    
    public List<Producto> listByPrecio(float precio) {
        return repo.findByPrecioGreaterThan(precio);
    }
    
    public void save(Producto producto) {
        repo.save(producto);
    }
     
    public Producto get(long id_producto) {
        return repo.findById(id_producto).get();
    }
     
    public void delete(long id_producto) {
        repo.deleteById(id_producto);
    }
}