import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerSwitcher from 'ol-layerswitcher';

const ghLayerSwitcher = new LayerSwitcher({
	reverse: true,
	groupSelectStyle: 'group'
});

export default ghLayerSwitcher 
