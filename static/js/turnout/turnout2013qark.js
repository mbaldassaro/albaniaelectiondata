var legendVT2013qark = L.control({position: 'bottomright'});
var infoQarkVT = L.control({position: 'bottomright'});

//QARK VT 2013 /////////////////////////////////////
function qarkvtstyle(feature) {
  return {
    fillColor: getColorVT2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorVT2013qark(d) {
  return d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         //d > 30 ? '#fec44f' :
         //d > 20 ? '#fee391' :
                  '#ffffd4';
      }

function qarkvt2013highlightFeature(e) {
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
     infoQarkVT.update(layer.feature.properties);
  }

function qarkvt2013resetHighlight(e) {
      turnout2013qarkgeojson.resetStyle(e.target);
      infoQarkVT.update();
  }

function qarkvt2013EachFeature(feature, layer) {
      layer.on({
          mouseover: qarkvt2013highlightFeature,
          mouseout: qarkvt2013resetHighlight
          //click: zoomToFeature
      });
    }

infoQarkVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoQarkVT.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
      + '<h5>' + voterReg + ': ' + props.registeredVoters + '</h5>'
      + '<h5>' + voterTot + ': ' + props.totalVoters + '</h5>'
      + '<h5>' + turnout + ': ' + props.percent + '%</h5>'
      + '' : '')
  };

//infoQarkVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendVT2013qark.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [40, 50, 60],
              labels = ['<h5>' + turnout + '</h5>'];
              this.update();
              return this._div;
      };

        legendVT2013qark.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorVT2013qark(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };

  //VTQark
  var turnout2013qarkgeojson = L.geoJson(turnout2013qark, {
      style: qarkvtstyle,
      onEachFeature: qarkvt2013EachFeature
  });

//END QARK VT 2013
