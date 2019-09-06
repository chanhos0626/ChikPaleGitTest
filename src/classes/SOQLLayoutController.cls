public class SOQLLayoutController {
    @AuraEnabled
    public static Map<String,String> getObjectMap() {
		Map<String,String> MapList = new Map<String,String>();
        for ( Schema.SObjectType o : Schema.getGlobalDescribe().values()) {
            Schema.DescribeSObjectResult objResult = o.getDescribe();
            MapList.put(objResult.getLabel(), objResult.getName());
        }
        return MapList;
    }
    @AuraEnabled
    public static List<String> getObjectList() {
		List<String> objectList = new List<String>();
        LiST<EntityDefinition> test = [SELECT Label, QualifiedApiName FROM EntityDefinition order by Label ];
        for(EntityDefinition E1 : test){
            objectList.add(E1.Label);
        }
        return objectList;
    }
    @AuraEnabled
    public static List<sObject> getFieldList(String ObjectName) {
        String Query = 'SELECT  QualifiedApiName,Label FROM FieldDefinition WHERE EntityDefinition.QualifiedApiName = \''+ObjectName+'\'';
        List<sObject> Result = Database.query(Query);
        return Result;
    }
    @AuraEnabled
    public static Map<String,String> getFieldMap(String ObjectName) {
        String Query = 'SELECT  QualifiedApiName,Label FROM FieldDefinition WHERE EntityDefinition.QualifiedApiName = \''+ObjectName+'\'';
        List<sObject> Result = Database.query(Query);
        Map<String,String> MapResult = new Map<String,String>();
        for(Integer i=0;i<Result.size();i++){
            MapResult.put(String.Valueof(Result[i].get('Label')), String.Valueof(Result[i].get('QualifiedApiName')));
        }
        return MapResult;
    }
}