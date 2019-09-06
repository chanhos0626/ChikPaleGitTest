({
    init : function(component, event, helper) {
        var today = new Date('2019','4','7'), checkday = new Date(),
            dd = today.getDate(),mm = today.getMonth(),yyyy = today.getFullYear(),
            day = '',Month = '', lastDay = ( new Date( yyyy, mm, 0) ).getDate(),
            defData = [],nexts = false, nextMonth = mm, nextDay = dd;
        if(dd>1){
            nexts = true;
        }
        if(mm<10) {
            Month='0'+mm
        }
        for(;dd<=lastDay;dd++){
            if(dd<10) {
                day='0'+dd
            }else{
                day=''+dd
            }
            today = yyyy +'-'+ Month +'-'+ day;	
            checkday = new Date(yyyy,(mm-1),(dd+1));
            if(String(checkday.getDay()) != '0' && String(checkday.getDay()) != '1'){
                defData.push({"Date":today,"NonEventList":['대리점1','대리점2','대리점3','대리점4'],'NonEvent': '대리점1, 대리점5'});    
            } 
        }
        
        if((mm+1)<10) {
            Month='0'+(mm+1)
        }
        if(nextMonth){
            for(var i = 1;i<nextDay;i++){
                if(i<10) {
                    day='0'+i
                }
                today = yyyy +'-'+ Month +'-'+ day;
                checkday = new Date(yyyy,mm,i);
                if(String(checkday.getDay()) != '6' && String(checkday.getDay()) != '0'){
                	defData.push({"Date":today,"NonEventList":['대리점1','대리점2','대리점3','대리점4'],'NonEvent': '대리점1, 대리점5'});
                }
            }
        }
        helper.doInit(component, event,defData);
    }
})