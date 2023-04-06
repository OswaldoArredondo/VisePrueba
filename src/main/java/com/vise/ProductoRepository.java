package com.vise;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
 
	List<Producto> findByMarca(String marca);
	
	List<Producto> findByPrecioGreaterThan(float precio);
}