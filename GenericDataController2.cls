public with sharing class GenericDataController2 {

    @AuraEnabled(cacheable=true)
    public static List<SObject> getPaginatedData(String objectName, List<String> fields, Integer limitSize, Integer offsetSize) {
        DataFetcher2 df = new DataFetcherImpl2();
        return df.fetchPaginatedData(objectName, fields, limitSize, offsetSize);
    }

    @AuraEnabled(cacheable=true)
    public static Integer getTotalCount(String objectName) {
        DataFetcher2 df = new DataFetcherImpl2();
        return df.getTotalCount(objectName);
    }
}