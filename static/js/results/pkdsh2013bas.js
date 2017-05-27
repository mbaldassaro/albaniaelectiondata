var legendPKD2013bas = L.control({position: 'topright'});
var infoPKDSH2013bas = L.control({position: 'bottomright'});

//PKDSH 2013 ////////////////////////////////////////////
function pkdsh2013basstyle(feature) {
  return {
    fillColor: getColorPKD2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPKD2013bas(d) {
    return d > 20 ? '#fe9929' :
           d > 10 ? '#fec44f' :
           d > 5 ?  '#fee391' :
           d > 2 ?  '#fff7bc' :
           d > 0 ?  '#ffffe5' :
                    '#ffffff' ;
      }


function pkdsh2013bashighlightFeature(e) {
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
     infoPKDSH2013bas.update(layer.feature.properties);
  }

function pkdsh2013basresetHighlight(e) {
      pkdsh2013basgeojson.resetStyle(e.target);
      infoPKDSH2013bas.update();
  }

function pkdsh2013basEachFeature(feature, layer) {
      layer.on({
          mouseover: pkdsh2013bashighlightFeature,
          mouseout: pkdsh2013basresetHighlight
      });
    }

infoPKDSH2013bas.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPKDSH2013bas.update = function(props) {
  this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
  + '<h3>' + props.party + '</h3>'
  + '<h4>' + totalVotes + ': ' + props.validVotes + '</h4>'
  + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
  + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
  + '<br><br><br><br><br><br><br><br><br><br>' + '' : '')
};


infoPKDSH2013bas.addTo(map);
//END PKDSH 2013 /////////////////////////////////////

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPKD2013bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5, 10, 20],
          labels = ['<h5>PKDSH ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPKD2013bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorPKD2013bas(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };


//PKDSH
var pkdsh2013basgeojson = L.geoJson(pkdsh2013bas, {
    style: pkdsh2013basstyle,
    onEachFeature: pkdsh2013basEachFeature
});
