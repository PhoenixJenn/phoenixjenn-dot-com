var locations = [
     ['Paris, France', 48.85661400000001, 2.3522219000000177, 4],
     ['Rome, Italy Beach', 41.8724111, 12.48022489999994, 5],
     ['Barcelona, Spain', 41.38506389999999, 2.1734034999999494, 3],
     ['London, England', 51.5073509, -0.12775829999998223, 2],
     ['Dublin, Ireland', 53.3498053, -6.260309699999993, 1]
];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(41.35, 2.25),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
        }
    })(marker, i));
}

//var myCenter = new google.maps.LatLng(51.508742, -0.120850);
//var locations = [
//     ['Bondi Beach', -33.890542, 151.274856, 4],
//     ['Coogee Beach', -33.923036, 151.259052, 5],
//     ['Cronulla Beach', -34.028249, 151.157507, 3],
//     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 151.259302, 1]
//];
////https://gist.github.com/parth1020/4481893
//function initialize() {
//    var mapProp = {
//        center: myCenter,
//        zoom: 5,
//        mapTypeId: google.maps.MapTypeId.ROADMAP
//    };

//    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

//    var marker = new google.maps.Marker({
//        position: myCenter,
//        animation: google.maps.Animation.BOUNCE
//    });

//    marker.setMap(map);

//    var infowindow = new google.maps.InfoWindow({
//        content: "Hello World!"
//    });



//    google.maps.event.addListener(map, 'center_changed', function () {
//        window.setTimeout(function () {
//            map.panTo(marker.getPosition());
//        }, 3000);
//    });

//    infowindow.open(map, marker);

//    google.maps.event.addListener(marker, 'click', function () {
//        infowindow.open(map, marker);
//    });

//    // Zoom to 9 when clicking on marker
//    google.maps.event.addListener(marker, 'click', function () {
//        map.setZoom(9);
//        map.setCenter(marker.getPosition());
//    });

//}


//google.maps.event.addDomListener(window, 'load', initialize);