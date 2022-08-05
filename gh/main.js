import {Map, View} from 'ol';
import ghOSM from './ghMapView/ghBaseLayers.js';

const map = new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

map.addLayer(ghOSM);
