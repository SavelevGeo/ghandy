import {Map, View} from 'ol';

const ghMap = new Map({
  target: 'mainMap',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

export default ghMap
