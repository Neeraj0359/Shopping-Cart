public with sharing class ProductController {

    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(Integer limitSize, Integer offsetSize) {
        return ProductSelector.fetchProducts(limitSize, offsetSize);
    }

    @AuraEnabled(cacheable=true)
    public static Integer getProductCount() {
        return ProductSelector.fetchProductCount();
    }
}
