public class ListCalendarController {
    @AuraEnabled
    public static Map<String, Object> initComponent() {        
        List<Object> rtn = new List<Object>();		
        
        List<Event> evtLst = [SELECT Id, WhatId, ActivityDateTime, createdby.Name FROM Event];
        if(evtLst.size() > 0){
            Map<String, String> dateMap = new Map<String, String>();
            Map<String, List<String>> nonEventListMap = new Map<String, List<String>>();
            Map<String, String> nonEventMap = new Map<String, String>();
            
            List<String> nonEventList = new List<String>();
            for(Event evt : evtLst){
                // String date = '';
                // String nonEvent ='';
                
                // String dt = evt.ActivityDateTime;
                // date = String.valueof(dt.year()) + String.valueof(dt.month()) + String.valueof(dt.day());
                
                //String owner = evt.CreatedBy;
                system.debug(evt);
                system.debug(evt.createdby.Name);
                //nonEventList.add(owner);
            }
        }
        /*공공데이터 포털 연동 확인*/
        String key = 'vCRl6ne4IYjEAnR3v6x6ILvd%2Bjj8lfe1jpMTxH5MiOlSPz5pPqkNNzW7Ts9LWvZlyAAIpsht%2FLrbSet6K%2FjmZQ%3D%3D',
            solYear = '2019',
            solMonth = '02';
        Map<String, Object> results = new Map<String, Object>();
        String URL='http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey='+key+'&solYear='+solYear+'&solMonth='+solMonth+'&_type=json';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(URL);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
       	System.debug('test : '+response.getStatus());
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            System.debug('response.getBody() : '+response.getBody());            
            System.debug('JSON : '+JSON.deserializeUntyped(response.getBody()));
            results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug('results : '+results);
        }
        return results;
    }
}