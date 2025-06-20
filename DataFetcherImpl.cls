public class DataFetcherImpl implements DataFetcher {
    public List<SObject> fetchData(String objectName, List<String> fields) {
        String fieldStr = String.join(fields, ',');
        String query = 'SELECT ' + fieldStr + ' FROM ' + objectName + ' LIMIT 10';
        return Database.query(query);
    }
}