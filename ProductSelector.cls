public class ProductSelector {

    public static List<Product2> fetchProducts(Integer limitSize, Integer offsetSize) {
        return [
            SELECT Id, Name, Price__c, ProductCode, Available_Units__c 
            FROM Product2 
            LIMIT :limitSize 
            OFFSET :offsetSize
        ];
    }

    public static Integer fetchProductCount() {
        return [SELECT COUNT() FROM Product2];
    }
}
