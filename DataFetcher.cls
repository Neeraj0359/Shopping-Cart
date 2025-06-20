public interface DataFetcher {
    List<SObject> fetchData(String objectName, List<String> fields);
}