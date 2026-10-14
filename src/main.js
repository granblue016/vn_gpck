import './style.css'

const center = [10.780074, 106.6876522];

const map = L.map('map').setView(center, 7);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});


const marker = L.marker(center).addTo(map);

marker.bindPopup("<b>Sở Khoa học và Công nghệ TP.HCM</b>").openPopup();

const baseMaps = {
  "OpenStreetMap": osm,
  "OpenStreetMap H.O.T.": osmHOT
};

const myOverLay = [
  {url: 'http://localhost:8080/geoserver/my_workspace/wms',
    id: 'my_workspace:ADM_ADM_0',
    name: '	ADM_ADM_0',
    default: true
  },
  {url: 'http://localhost:8080/geoserver/my_workspace/wms',
    id: 'my_workspace:ADM_ADM_1',
    name: '	ADM_ADM_1',
    default: false
  },
  {url: 'http://localhost:8080/geoserver/my_workspace/wms',
    id: 'my_workspace:ADM_ADM_2',
    name: '	ADM_ADM_2',
    default: false
  },
  {url: 'http://localhost:8080/geoserver/my_workspace/wms',
    id: 'my_workspace:ADM_ADM_3',
    name: '	ADM_ADM_3',
    default: false
  }
]
const overlayMaps = {
  // "Điểm cốt lõi (Sở KH&CN)": marker
};

myOverLay.forEach(item => {
    var wmsLayer = L.tileLayer.wms(item.url, { // Sử dụng trực tiếp item.url của từng lớp
        layers: item.id,
        format: 'image/png',
        transparent: true,
        version: '1.1.0',
        attribution: 'Sở TN&MT TP.HCM'
    });

    if (item.defaultOn) {
        wmsLayer.addTo(map);
    }

    overlayMaps[item.name] = wmsLayer;
});

const layerControl = L.control.layers(baseMaps, overlayMaps, { 
  collapsed: false // Giúp bảng điều khiển luôn mở sẵn trên góc bản đồ để dễ thao tác
}).addTo(map);



// fetch('http://localhost:8080/geoserver/my_workspace/wfs?service=WFS&version=1.0.0&request=GetFeature&typename=my_workspace:ADM_ADM_1&outputFormat=application/json')
//   .then(response => response.json())
//   .then(data => {
//     L.geoJSON(data).addTo(map);
//   });


