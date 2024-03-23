package com.eskoMooreSpr4.InventoryDescription.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.eskoMooreSpr4.InventoryDescription.Entity.Product;
import com.eskoMooreSpr4.InventoryDescription.Repository.ProductRepository;

@Service
public class ProductServiceImplementation implements ProductService{
	
	@Autowired //dependency injection
	private ProductRepository repo;
	
	@Override
	public Product insertProduct(Product p) {
		return repo.save(p);
	}
	@Override
	public List<Product> fetchAllProducts(){
		List<Product> ans = repo.findAll();
		System.out.println(ans);
		return ans;
		
	}
	@Override
	public Product updateProductById(int product_id, Product p) {
		Optional<Product> tempProduct = repo.findById(product_id); //optional says that the structure can contain null values too.
		
		if(tempProduct.isPresent()) {
			
			Product pFound = tempProduct.get();
			
			pFound.setProductName(p.getProductName());
			pFound.setProductNoOfBreakdowns(p.getProductNoOfBreakdowns());
			pFound.setProductCost(p.getProductCost());
			
			return repo.save(pFound);
		}
		else {
			return null;
		}
	}
	@Override
	public boolean deleteProductById(int product_id) {
		if(repo.findById(product_id).isPresent()) {
			repo.deleteById(product_id);
			return true;
		}
		else {
			return false;
		}
	}
	@Override
	public Product getProductById(int product_id) {
		Optional<Product> p = repo.findById(product_id);
        if (p.isPresent()) {
            return p.get();
        }
        return null;
	}
}
