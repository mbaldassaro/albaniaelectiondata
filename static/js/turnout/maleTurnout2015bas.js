var legendMVT2015bas = L.control({position: 'bottomright'});
var infoMVT = L.control({position: 'bottomright'});

//BAS MALE VT 2015 /////////////////////////////////////
function basmvtstyle(feature) {
  return {
    fillColor: getColorMVT2015bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorMVT2015bas(d) {
  return d > 60 ? '#0570b0' :
         d > 50 ? '#3690c0' :
         d > 40 ? '#74a9cf' :
         d > 30 ? '#a6bddb' :
         d > 20 ? '#d0d1e6' :
                  '#f1eef6';
      }

function basMVThighlightFeature(e) {
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
     infoMVT.update(layer.feature.properties);
  }

function basMVTresetHighlight(e) {
      maleTurnout2015basgeojson.resetStyle(e.target);
      infoMVT.update();
  }

function basMVTeachFeature(feature, layer) {
      layer.on({
          mouseover: basMVThighlightFeature,
          mouseout: basMVTresetHighlight,
          click: zoomToFeature
      });
    }

infoMVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoMVT.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    + '<h5>' + voterRegM + ': ' + props.registeredM + '</h5>'
    + '<h5>'+ voterTotM + ': ' + props.turnoutM + '</h5>'
    + '<h5>' + voterPctM + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoMVT.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendMVT2015bas.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'info legend'),
            grades = [20, 30, 40, 50, 60],
            labels = ['<h5>' + voterPctM + '</h5>'];
            this.update();
            return this._div;
    };

      legendMVT2015bas.update = function(e) {
        for (var i = 0; i < grades.length; i++) {
          labels.push(
            '<i style="background: ' + getColorMVT2015bas(grades[i] + 1) + '"></i> '
            + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
            + '%<br>' : '%+'));
          }
        this._div.innerHTML = labels.join('');
        return this._div;
      };

//VTMale
  var maleTurnout2015basgeojson = L.geoJson(maleTurnout2015bas, {
      style: basmvtstyle,
      onEachFeature: basMVTeachFeature
  });
//END MVT bas 2015
