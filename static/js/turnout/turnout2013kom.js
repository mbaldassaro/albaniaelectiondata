var legendVT2013kom = L.control({position: 'topright'});
var infoKomVT = L.control({position: 'bottomright'});

//KOM VT 2013 /////////////////////////////////////
function komvtstyle(feature) {
  return {
    fillColor: getColorVT2013kom(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorVT2013kom(d) {
  return d > 70 ? '#8c2d04' :
         d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
                  '#ffffd4';
      }


function komvt2013highlightFeature(e) {
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
     infoKomVT.update(layer.feature.properties);
  }

function komvt2013resetHighlight(e) {
      turnout2013Komgeojson.resetStyle(e.target);
      infoKomVT.update();
  }

function komvt2013EachFeature(feature, layer) {
      layer.on({
          mouseover: komvt2013highlightFeature,
          mouseout: komvt2013resetHighlight,
          click: zoomToFeature
      });
    }

infoKomVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoKomVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.komune + '</h3>'
    + '<h4>' + voterReg + ': ' + props.registeredVoters + '</h4>'
    + '<h4>' + voterTot + ': ' + props.totalVoters + '</h4>'
    + '<h4>' + turnout + ': ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoKomVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendVT2013kom.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [20, 30, 40, 50, 60, 70],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        legendVT2013kom.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorVT2013kom(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

//VTKom
var turnout2013Komgeojson = L.geoJson(turnout2013Kom, {
    style: komvtstyle,
    onEachFeature: komvt2013EachFeature
});
//END KOM VT 2013
