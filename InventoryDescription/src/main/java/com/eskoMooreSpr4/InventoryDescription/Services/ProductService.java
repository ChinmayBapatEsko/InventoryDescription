package com.eskoMooreSpr4.InventoryDescription.Services;

import java.util.List;

import com.eskoMooreSpr4.InventoryDescription.Entity.Product;

public interface ProductService {
	Product insertProduct(Product p);
	List<Product> fetchAllProducts();
	Product updateProductById(int product_id, Product p);
	boolean deleteProductById(int product_id);
	Product getProductById(int product_id);
}
