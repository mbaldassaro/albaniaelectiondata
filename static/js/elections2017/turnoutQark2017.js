var legendTurnoutQark2017 = L.control({position: 'bottomright'});
var infoTurnoutQark2017 = L.control({position: 'bottomright'});

//QARK VT 2013 /////////////////////////////////////
function turnoutQark2017style(feature) {
  return {
    fillColor: getColorTurnoutQark2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorTurnoutQark2017(d) {
  return d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         //d > 60 ? '#cc4c02' :
         //d > 20 ? '#fee391' :
                  '#ffffd4';
      }

function turnoutQark2017highlightFeature(e) {
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
     infoTurnoutQark2017.update(layer.feature.properties);
  }

function turnoutQark2017resetHighlight(e) {
      turnoutQark2017geojson.resetStyle(e.target);
      infoTurnoutQark2017.update();
  }

function turnoutQark2017EachFeature(feature, layer) {
      layer.on({
          mouseover: turnoutQark2017highlightFeature,
          mouseout: turnoutQark2017resetHighlight
          //click: zoomToFeature
      });
    }

infoTurnoutQark2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoTurnoutQark2017.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
      + '<h5>' + voterReg + ': ' + props.regVoters + '</h5>'
      + '<h5>' + voterTot + ': ' + props.totalVotes + '</h5>'
      + '<h5>' + turnout + ': ' + props.percent + '%</h5>'
      + '' : '')
  };

//infoQarkVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendTurnoutQark2017.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [30, 40, 50],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        legendTurnoutQark2017.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorTurnoutQark2017(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTQark
  var turnoutQark2017geojson = L.geoJson(turnoutQark2017, {
      style: turnoutQark2017style,
      onEachFeature: turnoutQark2017EachFeature
  });

//END QARK VT 2013
