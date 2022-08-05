import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const ghOSM = new TileLayer({
	source: new OSM()
});

export default ghOSM
