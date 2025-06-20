public with sharing class OrderController {

    @AuraEnabled(cacheable=true)
    public static List<Order2__c> fetchOrders(Integer limitSize, Integer offsetSize) {
        return OrderSelector.getOrders(limitSize, offsetSize);
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalCount() {
        return OrderSelector.getTotalOrdersCount();
    }
}
