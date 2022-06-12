//imports
import './style.css';

//for projection defining
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';
import {createXYZ} from 'ol/tilegrid'; //for custom Yandex tilegrid

//for the main map
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';

//for layer switcher
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerSwitcher from 'ol-layerswitcher';

//for locate me button
import Control from 'ol/control/Control';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {circular} from 'ol/geom/Polygon';
import {fromLonLat} from 'ol/proj';

//custom projection difining, UNTM Zone 56N used for an example
//map projection
proj4.defs("EPSG:32636", "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs");
//yandex sat projection
proj4.defs("EPSG:3395",
    "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
register(proj4);

//map init
const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({ //ArcGIS Imagery
            source: new XYZ({
                attributions:
                    'Tiles © <a href="https://services.arcgisonline.com/' +
                    'ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
                url:
                    'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                    'World_Imagery/MapServer/tile/{z}/{y}/{x}',
            }),
            title: 'ArcGIS Imagery'
        }),
        new TileLayer({ //Yandex Maps
            source: new XYZ({
                attributions:
                    'Tiles © <a href="https://yandex.ru/legal/maps_termsofuse/">'
                    + 'Yandex Satellite</a>',
                url:
                    'https://core-sat.maps.yandex.net/tiles?l=sat&v=3.927.0' +
                    '&x={x}&y={y}&z={z}&scale=1',
                projection: getProjection('EPSG:3395'),
                //(c) https://gis-lab.info/forum/viewtopic.php?f=19&t=19763#p147223
                tileGrid: createXYZ({
                    extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34]
                })
            }),
            title: 'Yandex Maps'
        }),
        new TileLayer({
            source: new OSM(),
            title: 'OSM',
            opacity: 0.8
        })
    ],
    view: new View({
        projection: getProjection('EPSG:32636'),
        center: [351680.38,6650587.24],
        zoom: 14
  })
});

//Layer switcher
const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);

//Locate me button
//source layer to write location to
const source = new VectorSource();
const layer = new VectorLayer({
  source: source,
});
map.addLayer(layer);
//write location function
navigator.geolocation.watchPosition(
  function (pos) {
    const coords = [pos.coords.longitude, pos.coords.latitude];
    alert(fromLonLat(coords));
    const accuracy = circular(coords, pos.coords.accuracy);
    source.clear(true);
    source.addFeatures([
      new Feature(
        accuracy.transform('EPSG:4326', map.getView().getProjection())
      ),
      new Feature(new Point(fromLonLat(coords))),
    ]);
  },
  function (error) {
    alert(`ERROR: ${error.message}`);
  },
  {
    enableHighAccuracy: true,
  }
);
//location control
const locate = document.querySelector('.locate');
locate.addEventListener('click', function () {
  if (!source.isEmpty()) {
    map.getView().fit(source.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });
  }
});
map.addControl(
  new Control({
    element: locate
  })
);
