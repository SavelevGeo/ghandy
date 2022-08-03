
    //map init
    const map = new Map({
      target: 'map',
      layers: [
          new TileLayer({ //ArcGIS Imagery
              source: new XYZ({
                  attributions:
                      ' © <a href="https://services.arcgisonline.com/' +
                      'ArcGIS/rest/services/World_Imagery/MapServer">' +
                      'ArcGIS Imagery</a>',
                  url:
                      'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                      'World_Imagery/MapServer/tile/{z}/{y}/{x}',
              }),
              title: 'ArcGIS Imagery'
          }),
          new TileLayer({ //Yandex Maps
              source: new XYZ({
                  attributions:
                      ' © <a href="https://yandex.ru/legal/maps_termsofuse/">'
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
              title: 'Yandex Satellite'
          }),
          new TileLayer({
              source: new OSM(),
              title: 'OSM',
              opacity: 0.8
          })
      ],
      view: new View({
          projection: mapProjection,
          center: startPosition,
          zoom: 14
    })
    });
