public with sharing class OrderSelector {
    
    public static List<Order2__c> getOrders(Integer limitSize, Integer offsetSize) {
        return [
            SELECT Id, Name, Order_Total__c, Status__c
            FROM Order2__c
            ORDER BY CreatedDate DESC
            LIMIT :limitSize OFFSET :offsetSize
        ];
    }
    
    public static Integer getTotalOrdersCount() {
        return [SELECT COUNT() FROM Order2__c];
    }
}
