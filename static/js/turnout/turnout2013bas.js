var legendVT2013bas = L.control({position: 'bottomright'});
var infoBasVT = L.control({position: 'bottomright'});

//BAS VT 2013 /////////////////////////////////////
function basvtstyle(feature) {
  return {
    fillColor: getColorVT2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorVT2013bas(d) {
  return d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
                  '#ffffd4';
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
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    + '<h5>' + voterReg + ': ' + props.registeredVoters + '</h5>'
    + '<h5>' + voterTot + ': ' + props.totalVoters + '</h5>'
    + '<h5>' + turnout + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoBasVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendVT2013bas.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [20, 30, 40, 50, 60],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        legendVT2013bas.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorVT2013bas(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };


  //VTBas
var turnout2013basgeojson = L.geoJson(turnout2013bas, {
    style: basvtstyle,
    onEachFeature: basvt2013EachFeature
});
//END BAS VT 2013
