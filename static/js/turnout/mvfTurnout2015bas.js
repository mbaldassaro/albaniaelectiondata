var infoMVF = L.control({position: 'bottomright'});



//BAS MALE vs Female VT 2015 /////////////////////////////////////
function basmvfstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 10 ? '#034e7b' :
         d > 8 ? '#0570b0' :
         d > 6 ? '#3690c0' :
         d > 4 ? '#74a9cf' :
         d > 2 ? '#a6bddb' :
         d > 0 ? '#d0d1e6' :
         d > -1 ? '#eff3ff' :
         d > -2 ? '#feebe2' :
         d > -4 ? '#fcc5c0' :
         d > -6 ? '#fa9fb5' :
         d > -8 ? '#f768a1' :
         d > -10 ? '#dd3497' :
                  'gray';
      }
  }

function basMVFhighlightFeature(e) {
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
     infoMVF.update(layer.feature.properties);
  }

function basMVFresetHighlight(e) {
      mvfTurnout2015basgeojson.resetStyle(e.target);
      infoMVF.update();
  }

function basMVFeachFeature(feature, layer) {
      layer.on({
          mouseover: basMVFhighlightFeature,
          mouseout: basMVFresetHighlight,
          click: zoomToFeature
      });
    }

infoMVF.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoMVF.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>Registered Male Voters: ' + props.registeredM + '</h4>'
    + '<h4>Male Voter Turnout: ' + props.turnoutM + '</h4>'
    + '<h4>Male Turnout Percentage: ' + props.percentM + '%</h4>'
    + '<h4>Registered Female Voters: ' + props.registeredF + '</h4>'
    + '<h4>Female Voter Turnout: ' + props.turnoutF + '</h4>'
    + '<h4>Female Turnout Percentage: ' + props.percentF + '%</h4>'
    + '<h4>Difference (+/-): ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoMVF.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//VTM vs F
var mvfTurnout2015basgeojson = L.geoJson(mvfTurnout2015bas, {
      style: basmvfstyle,
      onEachFeature: basMVFeachFeature
  });
//END MVF bas 2015
