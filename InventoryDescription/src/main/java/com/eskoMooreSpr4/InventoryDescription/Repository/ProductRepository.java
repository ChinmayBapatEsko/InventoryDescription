package com.eskoMooreSpr4.InventoryDescription.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eskoMooreSpr4.InventoryDescription.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	
}
