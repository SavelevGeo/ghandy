import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection} from 'ol/proj';

proj4.defs("EPSG:32656","+proj=utm +zone=56 +datum=WGS84 +units=m +no_defs");
register(proj4);

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    view: new View({
        projection: getProjection('EPSG:32656'),
        center: [483312.3,7024735.4],
        zoom: 10
  })
});
