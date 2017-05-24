var infoBasVT = L.control({position: 'bottomright'});

//BAS VT 2013 /////////////////////////////////////
function basvtstyle(feature) {
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

function basvt2013highlightFeature(e) {
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
     infoBasVT.update(layer.feature.properties);
  }

function basvt2013resetHighlight(e) {
      turnout2013basgeojson.resetStyle(e.target);
      infoBasVT.update();
  }

function basvt2013EachFeature(feature, layer) {
      layer.on({
          mouseover: basvt2013highlightFeature,
          mouseout: basvt2013resetHighlight,
          click: zoomToFeature
      });
    }

infoBasVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>' + voterReg + props.registeredVoters + '</h4>'
    + '<h4>' + voterTot + props.totalVoters + '</h4>'
    + '<h4>' + turnout + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  //VTBas
var turnout2013basgeojson = L.geoJson(turnout2013bas, {
    style: basvtstyle,
    onEachFeature: basvt2013EachFeature
});
//END BAS VT 2013
