var legendPDIU2013bas = L.control({position: 'topright'});
var infoPDIU2013bas = L.control({position: 'bottomright'});

//PDIU 2013 ////////////////////////////////////////////
function pdiu2013basstyle(feature) {
  return {
    fillColor: getColorPDIU2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPDIU2013bas(d) {
    return d > 20 ? '#045a8d' :
           d > 10 ? '#0570b0' :
           d > 5 ? '#3690c0' :
           d > 2 ? '#9ecae1' :
           d > 0 ? '#f7fbff' :
                    '#ffffff';
      }

function pdiu2013bashighlightFeature(e) {
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
     infoPDIU2013bas.update(layer.feature.properties);
  }

function pdiu2013basresetHighlight(e) {
      pdiu2013basgeojson.resetStyle(e.target);
      infoPDIU2013bas.update();
  }

function pdiu2013basEachFeature(feature, layer) {
      layer.on({
          mouseover: pdiu2013bashighlightFeature,
          mouseout: pdiu2013basresetHighlight,
          click: zoomToFeature
      });
    }

infoPDIU2013bas.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPDIU2013bas.update = function(props) {
  this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
  + '<h3>' + props.party + '</h3>'
  + '<h4>' + totalVotes + ': ' + props.validVotes + '</h4>'
  + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
  + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
  + '<br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
};

infoPDIU2013bas.addTo(map);
//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPDIU2013bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5, 10, 20],
          labels = ['<h5>PDIU ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPDIU2013bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorPDIU2013bas(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };
//PDIU
var pdiu2013basgeojson = L.geoJson(pdiu2013bas, {
    style: pdiu2013basstyle,
    onEachFeature: pdiu2013basEachFeature
});

//END PDIU 2013 /////////////////////////////////////
