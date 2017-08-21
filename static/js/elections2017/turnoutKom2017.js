var legendTurnoutKom2017 = L.control({position: 'bottomright'});
var infoTurnoutKom2017 = L.control({position: 'bottomright'});

//Kom VT 2013 /////////////////////////////////////
function turnoutKom2017style(feature) {
  return {
    fillColor: getColorTurnoutKom2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorTurnoutKom2017(d) {
  return d > 70 ? '#8c2d04' :
         d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
         d > 10 ? '#fff7bc' :
                  '#ffffd4';
      }

function turnoutKom2017highlightFeature(e) {
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
     infoTurnoutKom2017.update(layer.feature.properties);
  }

function turnoutKom2017resetHighlight(e) {
      turnoutKom2017geojson.resetStyle(e.target);
      infoTurnoutKom2017.update();
  }

function turnoutKom2017EachFeature(feature, layer) {
      layer.on({
          mouseover: turnoutKom2017highlightFeature,
          mouseout: turnoutKom2017resetHighlight
          //click: zoomToFeature
      });
    }

infoTurnoutKom2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoTurnoutKom2017.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
      + '<h5>' + voterReg + ': ' + props.regVoters + '</h5>'
      + '<h5>' + voterTot + ': ' + props.totalVotes + '</h5>'
      + '<h5>' + turnout + ': ' + props.percent + '%</h5>'
      + '' : '')
  };

//infoKomVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendTurnoutKom2017.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [10, 20, 30, 40, 50, 60, 70],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        legendTurnoutKom2017.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorTurnoutKom2017(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTKom
  var turnoutKom2017geojson = L.geoJson(turnoutKom2017, {
      style: turnoutKom2017style,
      onEachFeature: turnoutKom2017EachFeature
  });

//END Kom VT 2013
