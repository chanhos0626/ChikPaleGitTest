<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <title>간단한 지도 표시하기</title>

    <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=8ccklgt3ps&amp;submodules=panorama,geocoder,drawing,visualization"></script>
    <script  src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>

  <div id="wrap" class="section">
      <h2>주소와 좌표 검색 API 사용하기</h2>
      <p>Geocoder 서브 모듈의 Service 객체를 사용하여 주소로 좌표를 검색하거나(Geocode) 좌표로 주소를 검색하는(Reversegeocode) 예제입니다.<br />
      입력 창에 주소를 입력하여 검색하면 해당 주소의 좌표로 이동하며, 지도를 클릭하면 해당 지점의 TM128 좌표로 주소를 검색합니다.</p>
      <div id="map" style="width:100%;height:600px;">
          <div class="search" style="">
              <input id="address" type="text" placeholder="검색할 주소" value="불정로 6" style="position: absolute;z-index: 10000;"/>
              <input id="submit" type="button" value="주소 검색" style="position: absolute;z-index: 10000;    left: 11rem;" />
          </div>
      </div>
      <code id="snippet" class="snippet"></code>
  </div>


  <script id="code">
  var map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595316, 127.1052133),
      zoom: 10,
      mapTypeControl: true
  });

  var infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true
  });

  map.setCursor('pointer');

  // search by tm128 coordinate
  function searchCoordinateToAddress(latlng) {
      var tm128 = naver.maps.TransCoord.fromLatLngToTM128(latlng);

      infoWindow.close();

      naver.maps.Service.reverseGeocode({
          location: tm128,
          coordType: naver.maps.Service.CoordType.TM128
      }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
              return alert('Something Wrong!');
          }

          var items = response.result.items,
              htmlAddresses = [];

          for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
              item = items[i];
              addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]';

              htmlAddresses.push((i+1) +'. '+ addrType +' '+ item.address);
          }

          infoWindow.setContent([
                  '<div style="padding:10px;min-width:200px;line-height:150%;">',
                  '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                  htmlAddresses.join('<br />'),
                  '</div>'
              ].join('\n'));

          infoWindow.open(map, latlng);
      });
  }

  // result by latlng coordinate
  function searchAddressToCoordinate(address) {
      naver.maps.Service.geocode({
          address: address
      }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
              return alert('Something Wrong!');
          }

          var item = response.result.items[0],
              addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]',
              point = new naver.maps.Point(item.point.x, item.point.y);

          infoWindow.setContent([
                  '<div style="padding:10px;min-width:200px;line-height:150%;">',
                  '<h4 style="margin-top:5px;">검색 주소 : '+ response.result.userquery +'</h4><br />',
                  addrType +' '+ item.address +'<br />',
                  '</div>'
              ].join('\n'));


          map.setCenter(point);
          infoWindow.open(map, point);
      });
  }

  function initGeocoder() {
      map.addListener('click', function(e) {
          searchCoordinateToAddress(e.coord);
      });

      $('#address').on('keydown', function(e) {
          var keyCode = e.which;

          if (keyCode === 13) { // Enter Key
              searchAddressToCoordinate($('#address').val());
          }
      });

      $('#submit').on('click', function(e) {
          e.preventDefault();

          searchAddressToCoordinate($('#address').val());
      });

      searchAddressToCoordinate('정자동 178-1');
  }

  naver.maps.onJSContentLoaded = initGeocoder;
  </script>
</body>
</html>
