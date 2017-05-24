var infoMVT = L.control({position: 'bottomright'});

//BAS MALE VT 2015 /////////////////////////////////////
function basmvtstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 70 ? '#034e7b' :
         d > 60 ? '#0570b0' :
         d > 50 ? '#3690c0' :
         d > 40 ? '#74a9cf' :
         d > 30 ? '#a6bddb' :
         d > 20 ? '#d0d1e6' :
                  '#f1eef6';
      }
  }

function basMVThighlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: '#FFFFFF',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
         layer.bringToFront();
     }
     infoMVT.update(layer.feature.properties);
  }

function basMVTresetHighlight(e) {
      maleTurnout2015basgeojson.resetStyle(e.target);
      infoMVT.update();
  }

function basMVTeachFeature(feature, layer) {
      layer.on({
          mouseover: basMVThighlightFeature,
          mouseout: basMVTresetHighlight,
          click: zoomToFeature
      });
    }

infoMVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoMVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>' + voterRegM + props.registeredM + '</h4>'
    + '<h4>'+ voterTotM + props.turnoutM + '</h4>'
    + '<h4>' + voterPctM + props.percent + '%</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoMVT.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//VTMale
  var maleTurnout2015basgeojson = L.geoJson(maleTurnout2015bas, {
      style: basmvtstyle,
      onEachFeature: basMVTeachFeature
  });
//END MVT bas 2015
