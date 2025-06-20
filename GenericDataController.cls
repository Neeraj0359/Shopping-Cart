public with sharing class GenericDataController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getGenericData(String objectName, List<String> fields) {
        DataFetcher df = new DataFetcherImpl();
        List<SObject> records = df.fetchData(objectName, fields);

        List<Map<String, Object>> output = new List<Map<String, Object>>();
        for (SObject rec : records) {
            Map<String, Object> row = new Map<String, Object>();
            for (String field : fields) {
                row.put(field, rec.get(field));
            }
            output.add(row);
        }
        return output;
    }
}