public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts() {
        return [
            SELECT Id, Name, Description, IsActive, QuantityUnitOfMeasure, Family, Price__c,Available_Unit__c 
            FROM Product2
            WHERE IsActive = TRUE
            ORDER BY Name
        ];
    }
}