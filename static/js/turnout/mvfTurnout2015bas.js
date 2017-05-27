var legendMVF2015bas = L.control({position: 'topright'});
var infoMVF = L.control({position: 'bottomright'});

//BAS MALE vs Female VT 2015 /////////////////////////////////////
function basmvfstyle(feature) {
  return {
    fillColor: getColorMVF2015bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorMVF2015bas(d) {
  return d > 5 ? '#0570b0' :
         d > 2 ? '#74a9cf' :
         //d > 2 ? '#a6bddb' :
         d > 1 ? '#d0d1e6'  :
         d > -1 ? '#eff3ff' :
         d > -2 ? '#fa9fb5' :
         d > -5 ? '#dd3497' :
         d > -10 ? '#ae017e' :
         //d > -8 ? '#f768a1' :
         //d > -10 ? '#dd3497' :
                  'gray';
      }

function basMVFhighlightFeature(e) {
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
     infoMVF.update(layer.feature.properties);
  }

function basMVFresetHighlight(e) {
      mvfTurnout2015basgeojson.resetStyle(e.target);
      infoMVF.update();
  }

function basMVFeachFeature(feature, layer) {
      layer.on({
          mouseover: basMVFhighlightFeature,
          mouseout: basMVFresetHighlight,
          click: zoomToFeature
      });
    }

infoMVF.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoMVF.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>' + voterRegM + ': ' + props.registeredM + '</h4>'
    + '<h4>' + voterTotM + ': ' + props.turnoutM + '</h4>'
    + '<h4>' + voterPctM + ': ' + props.percentM + '%</h4>'
    + '<h4>' + voterRegF + ': ' + props.registeredF + '</h4>'
    + '<h4>' + voterTotF + ': ' + props.turnoutF + '</h4>'
    + '<h4>' + voterPctF + ': ' + props.percentF + '%</h4>'
    + '<h4>' + difference + ': ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoMVF.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }



legendMVF2015bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          range = ['5%+', '2-5%', '1-2%', '0%+/-', '1-2%', '2-5%', '5%+'],
          grades = [-10, -5, -2, -1, 1, 2, 5],
          labels = ['<h5>M-F ' + difference + '</h5>'];
          this.update();
          return this._div;
  };

    legendMVF2015bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorMVF2015bas(grades[i] + 1) + '"></i> '
          + (grades[i] ? range[i] + '<br>' : '+'));
        }

        //+ grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      this._div.innerHTML = labels.join('');
      return this._div;
    };


//VTM vs F
var mvfTurnout2015basgeojson = L.geoJson(mvfTurnout2015bas, {
      style: basmvfstyle,
      onEachFeature: basMVFeachFeature
  });
//END MVF bas 2015
