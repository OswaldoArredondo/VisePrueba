package com.vise;

import java.util.List;
import java.util.Locale;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.vise.dto.ProductoDTO;

@Controller
public class ProductoController {

	private Gson gson = new GsonBuilder().setPrettyPrinting().create();

    private static final Logger logger = LogManager.getLogger(ProductoController.class);

	@Autowired
	private ProductoService service;

	@RequestMapping("/index")
	public String viewHomePage() {
		return "index";
	}

	@GetMapping(value = "/getProductos",produces = {"application/json;charset=UTF-8" })
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody String getProductos() {
		logger.info("Inicia Proceso de Obtencion de Productos");
		List<Producto> listProductos = service.listAll();
		logger.info("Finaliza Proceso de Obtencion de Productos");
		return gson.toJson(listProductos);
	}

	@GetMapping(value = "/getProductosByMarca/{marca}",produces = {"application/json;charset=UTF-8" })
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody String getProductosByMarca(@PathVariable(name = "marca") String marca) {
		logger.info("Inicia Proceso de Obtencion de Productos Por Marca");
		List<Producto> listProductos = service.listByMarca(marca);
		logger.info("Finaliza Proceso de Obtencion de Productos Por Marca");
		return gson.toJson(listProductos);
	}

	@GetMapping(value = "/getProductosByPrecio/{precio}",produces = {"application/json;charset=UTF-8"})
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody String getProductosByPrecio(@PathVariable(name = "precio") String precio) {
		logger.info("Inicia Proceso de Obtencion de Productos Por Precio");
		List<Producto> listProductos = service.listByPrecio(Float.parseFloat(precio));
		logger.info("Finaliza Proceso de Obtencion de Productos Por Precio");
		return gson.toJson(listProductos);
	}

	@PutMapping(value = "/save")
	public String saveProduct(@RequestBody ProductoDTO productoDTO) {
		logger.info("Inicia Proceso de Guardado de Nuevo Producto");
		Producto producto = new Producto();
		
		producto.setId(productoDTO.getId());
		producto.setNombre(productoDTO.getNombre());
		producto.setMarca(productoDTO.getMarca());
		producto.setOrigen(productoDTO.getOrigen());
		producto.setPrecio(productoDTO.getPrecio());
		
		service.save(producto);
		logger.info("Finaliza Proceso de Guardado de Nuevo Producto");
		return "redirect:/index";
	}

	@PutMapping(value = "/edit/{id}")
	public @ResponseBody String editProducto(@PathVariable(name = "id") int id) {
		logger.info("Inicia Proceso de Busqueda de Producto a Editar");
		Producto producto = service.get(id);
		logger.info("Inicia Proceso de Busqueda de Producto a Editar");
		return gson.toJson(producto);
	}

	@DeleteMapping(value = "/delete/{id}")
	public String deleteProducto(@PathVariable(name = "id") int id) {
		logger.info("Inicia Proceso de Borrado de Producto");
		service.delete(id);
		logger.info("Finaliza Proceso de Borrado de Producto");
		return "redirect:/index";
	}
}