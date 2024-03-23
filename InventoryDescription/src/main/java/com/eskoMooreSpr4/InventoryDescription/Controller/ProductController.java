package com.eskoMooreSpr4.InventoryDescription.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eskoMooreSpr4.InventoryDescription.Entity.Product;
import com.eskoMooreSpr4.InventoryDescription.Services.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
	@Autowired
	private ProductService service;
	
	@PostMapping("/insertProduct")
	public Product insertProduct(@RequestBody Product p) {
		return service.insertProduct(p);
	}
	
	@GetMapping("/fetchProducts")
	public List<Product> fetchAllProducts(){
		return service.fetchAllProducts();
	}
	
	@GetMapping("/fetchProduct/{product_id}")
		public Product getProductById(@PathVariable("product_id") int product_id) {
			return service.getProductById(product_id);
		}
	
	@PutMapping("/updateProduct/{product_id}")
	public Product updateProduct(@PathVariable("product_id") int product_id, @RequestBody Product p) {
		return service.updateProductById(product_id, p);
	}
	
	@DeleteMapping("/deleteProduct/{product_id}")
	public boolean deleteProduct(@PathVariable("product_id") int product_id) {
		boolean flag = service.deleteProductById(product_id);
		return flag;
	}
}
