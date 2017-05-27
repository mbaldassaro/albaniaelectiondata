var legendFVT2015bas = L.control({postion: 'topright'});
var infoFVT = L.control({position: 'bottomright'});


//BAS Female VT 2015 /////////////////////////////////////
function basfvtstyle(feature) {
  return {
    fillColor: getColorFVT2015bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorFVT2015bas(d) {
  return d > 60 ? '#ae017e' :
         d > 50 ? '#dd3497' :
         d > 40 ? '#f768a1' :
         d > 30 ? '#fa9fb5' :
         d > 20 ? '#fcc5c0' :
                  '#feebe2';
      }


function basFVThighlightFeature(e) {
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
     infoFVT.update(layer.feature.properties);
  }

function basFVTresetHighlight(e) {
      femaleTurnout2015basgeojson.resetStyle(e.target);
      infoFVT.update();
  }

function basFVTeachFeature(feature, layer) {
      layer.on({
          mouseover: basFVThighlightFeature,
          mouseout: basFVTresetHighlight,
          click: zoomToFeature
      });
    }

infoFVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoFVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>' + voterRegF + ': ' + props.registeredF + '</h4>'
    + '<h4>' + voterTotF + ': ' + props.turnoutF + '</h4>'
    + '<h4>' + voterPctF + ': ' + props.percent + '%</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoFVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

legendFVT2015bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [20, 30, 40, 50, 60],
          labels = ['<h5>' + voterPctF + '</h5>'];
          this.update();
          return this._div;
  };

    legendFVT2015bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorFVT2015bas(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };



//VTFemale
var femaleTurnout2015basgeojson = L.geoJson(femaleTurnout2015bas, {
      style: basfvtstyle,
      onEachFeature: basFVTeachFeature
  });

//END FVT bas 2015
