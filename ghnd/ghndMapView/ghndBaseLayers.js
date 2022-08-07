import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const ghndOSM = new TileLayer({
	source: new OSM()
});

export default ghndOSM
