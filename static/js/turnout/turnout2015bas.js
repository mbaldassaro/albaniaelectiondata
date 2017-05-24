var infoBasVT15 = L.control({position: 'bottomright'});

//BAS VT 2015 /////////////////////////////////////
function basvt15style(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 70 ? '#8c2d04' :
         d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
                  '#ffffd4';
      }
  }

function basvt2015highlightFeature(e) {
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
     infoBasVT15.update(layer.feature.properties);
  }

function basvt2015resetHighlight(e) {
      turnout2015basgeojson.resetStyle(e.target);
      infoBasVT15.update();
  }

function basvt2015EachFeature(feature, layer) {
      layer.on({
          mouseover: basvt2015highlightFeature,
          mouseout: basvt2015resetHighlight,
          click: zoomToFeature
      });
    }

infoBasVT15.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasVT15.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>Registered Voters: ' + props.registeredVoters + '</h4>'
    + '<h4>Total Voters: ' + props.totalVoters + '</h4>'
    + '<h4>Turnout Percentage: ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasVT15.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//VTBas
  var turnout2015basgeojson = L.geoJson(turnout2015bas, {
      style: basvt15style,
      onEachFeature: basvt2015EachFeature
  });


//END BAS VT 2015
