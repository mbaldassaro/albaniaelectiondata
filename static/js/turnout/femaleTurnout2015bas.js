var infoFVT = L.control({position: 'bottomright'});


//BAS Female VT 2015 /////////////////////////////////////
function basfvtstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 70 ? '#7a0177' :
         d > 60 ? '#ae017e' :
         d > 50 ? '#dd3497' :
         d > 40 ? '#f768a1' :
         d > 30 ? '#fa9fb5' :
         d > 20 ? '#fcc5c0' :
                  '#feebe2';
      }
  }

function basFVThighlightFeature(e) {
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
     infoFVT.update(layer.feature.properties);
  }

function basFVTresetHighlight(e) {
      femaleTurnout2015basgeojson.resetStyle(e.target);
      infoFVT.update();
  }

function basFVTeachFeature(feature, layer) {
      layer.on({
          mouseover: basFVThighlightFeature,
          mouseout: basFVTresetHighlight,
          click: zoomToFeature
      });
    }

infoFVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoFVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>Registered Female Voters: ' + props.registeredF + '</h4>'
    + '<h4>Female Voter Turnout: ' + props.turnoutF + '</h4>'
    + '<h4>Female Turnout Percentage: ' + props.percent + '%</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoFVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//VTFemale
var femaleTurnout2015basgeojson = L.geoJson(femaleTurnout2015bas, {
      style: basfvtstyle,
      onEachFeature: basFVTeachFeature
  });

//END FVT bas 2015
