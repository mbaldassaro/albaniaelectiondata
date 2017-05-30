var legendVT2015bas = L.control({position: 'bottomright'});
var infoBasVT15 = L.control({position: 'bottomright'});

//BAS VT 2015 /////////////////////////////////////
function basvt15style(feature) {
  return {
    fillColor: getColorVT2015bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorVT2015bas(d) {
  return d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
                  '#ffffd4';
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
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    + '<h5>' + voterReg + ': ' + props.registeredVoters + '</h5>'
    + '<h5>' + voterTot + ': ' + props.totalVoters + '</h5>'
    + '<h5>' + turnout + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoBasVT15.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

legendVT2015bas.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info legend'),
            grades = [20, 30, 40, 50, 60],
            labels = ['<h5>' + turnout + '</h5>'];
            this.update();
            return this._div;
    };

      legendVT2015bas.update = function(e) {
        for (var i = 0; i < grades.length; i++) {
          labels.push(
            '<i style="background: ' + getColorVT2015bas(grades[i] + 1) + '"></i> '
            + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
            + '%<br>' : '%+'));
          }
        this._div.innerHTML = labels.join('');
        return this._div;
      };

//VTBas
  var turnout2015basgeojson = L.geoJson(turnout2015bas, {
      style: basvt15style,
      onEachFeature: basvt2015EachFeature
  });


//END BAS VT 2015
