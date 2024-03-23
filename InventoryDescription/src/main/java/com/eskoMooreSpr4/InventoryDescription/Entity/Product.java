package com.eskoMooreSpr4.InventoryDescription.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productinventory")
public class Product {
	@Id
	@GeneratedValue
	
	@Column(name = "product_id")
	private Integer product_id;
	
	@Column(name = "productName")
	private String productName;
	
	@Column(name = "productCost")
	private String productCost;
	
	@Column(name = "productNoOfBreakdowns")
	private Integer productNoOfBreakdowns;
	
	public Product() {
		
	}

	public Product(int product_id, String productName, int productNoOfBreakdowns) {
		super();
		this.product_id = product_id;
		this.productName = productName;
		this.productNoOfBreakdowns = productNoOfBreakdowns;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductNoOfBreakdowns() {
		return productNoOfBreakdowns;
	}

	public void setProductNoOfBreakdowns(int productNoOfBreakdowns) {
		this.productNoOfBreakdowns = productNoOfBreakdowns;
	}
	

	public String getProductCost() {
		return productCost;
	}

	public void setProductCost(String productCost) {
		this.productCost = productCost;
	}

	@Override
	public String toString() {
		return "Product [productName=" + productName + ", productNoOfBreakdowns=" + productNoOfBreakdowns + "Product Cost: " + productCost + "]";
	}
	
	
	
	
	
}
