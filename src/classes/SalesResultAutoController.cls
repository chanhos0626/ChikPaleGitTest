/**
 * Created by DKBMC on 2019-04-09.
 */

public with sharing class SalesResultAutoController{
    public boolean displayPopup {get; set;}
    public sObject[] ac1 {get; set;}
    public SalesResultAutoController(ApexPages.StandardController controller){
        ac1 = [SELECT Id, Name, CurrencyIsoCode FROM Account];
        SortClass.ascending(ac1, Account.Name);
        System.debug(ac1);
        SortClass.ascending(ac1, Account.Id);
        System.debug(ac1);
    }
}