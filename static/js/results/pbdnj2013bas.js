//PBDNJ 2013 ////////////////////////////////////////////
var legendPBDNJ2013bas = L.control({position: 'bottomright'});
var infoPBDNJ2013bas = L.control({position: 'bottomright'});

function pbdnj2013basstyle(feature) {
  return {
    fillColor: getColorPBDNJ2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPBDNJ2013bas(d) {
    return d > 20 ? '#08519c' :
           d > 10 ? '#3182bd' :
           d > 5 ? '#6baed6' :
           d > 2 ? '#bdd7e7' :
           d > 0 ? '#eff3ff' :
                    '#fee5d9';
      }


function pbdnj2013bashighlightFeature(e) {
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
     infoPBDNJ2013bas.update(layer.feature.properties);
  }

function pbdnj2013basresetHighlight(e) {
      pbdnj2013basgeojson.resetStyle(e.target);
      infoPBDNJ2013bas.update();
  }

function pbdnj2013basEachFeature(feature, layer) {
      layer.on({
          mouseover: pbdnj2013bashighlightFeature,
          mouseout: pbdnj2013basresetHighlight,
          click: zoomToFeature
      });
    }

infoPBDNJ2013bas.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPBDNJ2013bas.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  + '<h4>' + props.party + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '' : '')
};

//infoPBDNJ2013bas.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPBDNJ2013bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5, 10, 20],
          labels = ['<h5>PBDNJ ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendPBDNJ2013bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorPBDNJ2013bas(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

var pbdnj2013basgeojson = L.geoJson(pbdnj2013bas, {
    style: pbdnj2013basstyle,
    onEachFeature: pbdnj2013basEachFeature
  });
