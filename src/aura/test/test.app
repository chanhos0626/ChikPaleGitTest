<aura:application extends="force:slds" >
    <!--<c:CC_Task />-->
    <!--<c:EventAttendee />-->
    <!--<c:CC_Customer_MapMapping />-->
    <!--<c:LightningNaverMapTest />-->
    <!-- 작업중이던 리스트 -->
    <!--<c:TaskListTest/>-->
    <!-- 이벤트 가이드 라인
    <c:ceNotifier/>
    <c:ceHandler/>  -->
    <lightning:tabset>
        <lightning:tab label="SOQL">
            <c:SOQLLayout/>
        </lightning:tab>
        <lightning:tab label="Item Two">
            Two Content !
        </lightning:tab>
        <lightning:tab label="Item Three">
            Three Content !
        </lightning:tab>
    </lightning:tabset>
</aura:application>