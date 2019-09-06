({
	doInit : function(component, envent,defData) {
		var action = component.get("c.initComponent");
        action.setParams({
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnValue = response.getReturnValue(); 
                for(var j=0;j<defData.length;j++){
                    for(var i=0;i<returnValue.response.body.items.item.length;i++){
                        var SHoliday = String(returnValue.response.body.items.item[i].locdate);
                        window.console.log(defData[j].Date);
                        window.console.log(SHoliday.substring(0,4)+'-'+SHoliday.substring(4,6)+'-'+SHoliday.substring(6,8));
                        if(defData[j].Date == SHoliday.substring(0,4)+'-'+SHoliday.substring(4,6)+'-'+SHoliday.substring(6,8)){
                            window.console.log(defData);
                            defData.splice(j,1);
                            window.console.log(defData);
                        }   
                    }                    
                }
                window.console.log(defData);
                component.set('v.Data', defData);                
            }
        });
        $A.enqueueAction(action);
	}
})