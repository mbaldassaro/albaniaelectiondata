var legendPR2013bas = L.control({position: 'topright'});
var infoPR2013bas = L.control({position: 'bottomright'});

//PR 2013 ////////////////////////////////////////////
function pr2013basstyle(feature) {
  return {
    fillColor: getColorPR2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPR2013bas(d) {
    return d > 10 ? '#045a8d' :
           d > 5 ? '#0570b0' :
           d > 2 ? '#c6dbef' :
           d > 0 ? '#eff3ff' :
                    '#fee5d9';
      }
      // d > 20 ? '#023858' :

function pr2013bashighlightFeature(e) {
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
     infoPR2013bas.update(layer.feature.properties);
  }

function pr2013basresetHighlight(e) {
      pr2013basgeojson.resetStyle(e.target);
      infoPR2013bas.update();
  }

function pr2013basEachFeature(feature, layer) {
      layer.on({
          mouseover: pr2013bashighlightFeature,
          mouseout: pr2013basresetHighlight,
          click: zoomToFeature
      });
    }

infoPR2013bas.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPR2013bas.update = function(props) {
  this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
  + '<h3>' + props.party + '</h3>'
  + '<h4>' + totalVotes + ': ' + props.validVotes + '</h4>'
  + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
  + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
  + '<br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
};

infoPR2013bas.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
  legendPR2013bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5, 10],
          labels = ['<h5>PR ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPR2013bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorPR2013bas(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };
//PR
var pr2013basgeojson = L.geoJson(pr2013bas, {
    style: pr2013basstyle,
    onEachFeature: pr2013basEachFeature
});

//END PR 2013 /////////////////////////////////////
