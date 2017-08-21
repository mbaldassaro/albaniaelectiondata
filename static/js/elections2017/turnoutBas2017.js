var legendTurnoutBas2017 = L.control({position: 'bottomright'});
var infoTurnoutBas2017 = L.control({position: 'bottomright'});

//Bas VT 2013 /////////////////////////////////////
function turnoutBas2017style(feature) {
  return {
    fillColor: getColorTurnoutBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorTurnoutBas2017(d) {
  return d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
         //d > 60 ? '#cc4c02' :
                  '#ffffd4';
      }

function turnoutBas2017highlightFeature(e) {
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
     infoTurnoutBas2017.update(layer.feature.properties);
  }

function turnoutBas2017resetHighlight(e) {
      turnoutBas2017geojson.resetStyle(e.target);
      infoTurnoutBas2017.update();
  }

function turnoutBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: turnoutBas2017highlightFeature,
          mouseout: turnoutBas2017resetHighlight
          //click: zoomToFeature
      });
    }

infoTurnoutBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoTurnoutBas2017.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
      + '<h5>' + voterReg + ': ' + props.regVoters + '</h5>'
      + '<h5>' + voterTot + ': ' + props.totalVotes + '</h5>'
      + '<h5>' + turnout + ': ' + props.percent + '%</h5>'
      + '' : '')
  };

//infoBasVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendTurnoutBas2017.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [20, 30, 40, 50],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        legendTurnoutBas2017.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorTurnoutBas2017(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTBas
  var turnoutBas2017geojson = L.geoJson(turnoutBas2017, {
      style: turnoutBas2017style,
      onEachFeature: turnoutBas2017EachFeature
  });

//END Bas VT 2013
