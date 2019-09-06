({
    init : function(component, event, helper) {        
        //component.find('FilterFunc').set('v.value',"[{'=','='},{'≠','!='},{'<','<'},{'≤','<='},{'>','>'},{'≥','>='},{'starts with','starts'},{'ends with','ends'},{'contains','contains'},{'IN','IN'},{'NOT IN','NOTIN'},{'INCLUDES','INCLUDES'},{'EXCLUDES','EXCLUDES'},]");
        
        var action = component.get('c.getObjectList');
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.ObjectList',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
        
        action = component.get('c.getObjectMap');
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.ObjectMap',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    SelectObjectList : function(component, event, helper) {
        var ObjectName = component.get('v.SelectObject');
        var ObjectMap = component.get('v.ObjectMap');
        var action = component.get('c.getFieldList');
        action.setParams({
            ObjectName:ObjectMap[ObjectName]
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                window.console.log(response.getReturnValue()[0]);//QualifiedApiName
                component.set('v.SortObject1',response.getReturnValue()[0].QualifiedApiName);
                component.set('v.SortObject2',response.getReturnValue()[0].QualifiedApiName);
                component.set('v.SortObject3',response.getReturnValue()[0].QualifiedApiName);
                component.set('v.FilterObject',response.getReturnValue()[0].QualifiedApiName);
                component.set('v.FieldList',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
        action = component.get('c.getFieldMap');
        action.setParams({
            ObjectName:ObjectMap[ObjectName]
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.FieldMap',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    AllChange : function(component, event, helper) {
        var master = component.find("master");
        var boxPack = component.find("AllSelectCheckbox");
        if (!Array.isArray(boxPack)) {
            boxPack = [boxPack];
        }
        
        var val = master.get("v.value");
        window.console.log(boxPack.length)
        for (var i = 0; i < boxPack.length; i++) {
            window.console.log(boxPack[i]);
            if(boxPack[i] != undefined){
                boxPack[i].set("v.value", val);                
            }
        }
        
    },
    SortChange1 : function(component, event, helper) {
    	component.find('SortOrderDisable1').set('v.disabled',false);
    	component.find('NullCheckDisable1').set('v.disabled',false);
    },
    SortChange2 : function(component, event, helper) {
    	component.find('SortOrderDisable2').set('v.disabled',false);
    	component.find('NullCheckDisable2').set('v.disabled',false);
    },
    SortChange3 : function(component, event, helper) {
    	component.find('SortOrderDisable3').set('v.disabled',false);
    	component.find('NullCheckDisable3').set('v.disabled',false);
    },
    SortChange4 : function(component, event, helper) {
    	component.find('FilterCheckDisable').set('v.disabled',false);
    	component.find('FilterStringDisable').set('v.disabled',false);
    },
    QuerySelect : function(component, event, helper) {
        var boxPack = component.find("AllSelectCheckbox");
        var ObjectName = component.get('v.SelectObject');
        var QueryField = 'SELECT ';
        var jbAry = new Array();
        var count = 0;
        var t1='',t2='',t3='',t4='';
        if (!Array.isArray(boxPack)) {
            boxPack = [boxPack];
        }
        for (var i = 0; i < boxPack.length; i++) {
            if(boxPack[i].get('v.value') == true){
                jbAry[count] = QueryField+boxPack[i].get('v.text');
                count = count+1;
            }
        }
        for (var i = 0; i < jbAry.length; i++) {
            if((i+1) != jbAry.length){
                QueryField = QueryField+boxPack[i].get('v.text')+', ';                    
            }else{                    
                QueryField = QueryField+boxPack[i].get('v.text')+' ';  
            }
        }
        QueryField = QueryField + 'FROM '+ObjectName;
        
        if(component.get('v.SortObject1') != '' || component.get('v.SortObject2') != '' || component.get('v.SortObject3') != '' || component.get('v.FilterObject') != ''){
            QueryField = QueryField + ' WHERE ';
        }
        if(component.get('v.SortObject1') != ''){
            t1 = t1+component.get('v.SortObject1')+component.get('v.SortOrder1')+component.get('v.NullOrder1');
        }
        if(component.get('v.SortObject2') != ''){
            t2 = t2+component.get('v.SortObject2')+component.get('v.SortOrder2')+component.get('v.NullOrder2');
        }
        if(component.get('v.SortObject3') != ''){
            t3 = t3+component.get('v.SortObject3')+component.get('v.SortOrder3')+component.get('v.NullOrder3');
        }
        if(component.get('v.FilterObject') != ''){
            t4 = t4+component.get('v.FilterObject')+component.get('v.FilterOrder')+component.get('v.FilterString');
        }
        if(t1 != ''){
            QueryField = QueryField + t1;
            if(t2 != ''){
            	QueryField = QueryField +','+ t2;
                if(t3 != ''){
                    QueryField = QueryField +','+ t3;
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }else{
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }
            }else{
                if(t3 != ''){
                    QueryField = QueryField +','+ t3;
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }else{
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }
            }
        }else{
            if(t2 != ''){
                QueryField = QueryField + t2;
                if(t3 != ''){
                    QueryField = QueryField +','+ t3;
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }else{
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }
            }else{
                if(t3 != ''){
                    QueryField = QueryField+ t3;
                    if(t4 != ''){
                        QueryField = QueryField +','+ t4;
                    }
                }else{
                    if(t4 != ''){
                        QueryField = QueryField+ t4;
                    }
                }
            }
        }
        
        window.console.log(QueryField);
    }
})