//imports
import './style.css';

//for projection defining
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';

//for the main map
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';

//for layer switcher
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerSwitcher from 'ol-layerswitcher';

//custom projection difining, UNTM Zone 56N used for an example
//map projection
proj4.defs("EPSG:32656", "+proj=utm +zone=56 +datum=WGS84 +units=m +no_defs");
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
                projection: getProjection('EPSG:3395')
            }),
            title: 'Yandex Maps'
        }),
        new TileLayer({
            source: new OSM(),
    })
    ],
    view: new View({
        projection: getProjection('EPSG:32656'),
        center: [483312.3,7024735.4],
        zoom: 10
  })
});

//Layer switcher
var layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group'
});
map.addControl(layerSwitcher);
