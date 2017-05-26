//PBDNJ 2013 ////////////////////////////////////////////
var infoPBDNJ2013bas = L.control({position: 'bottomright'});

function pbdnj2013basstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
    return d > 20 ? '#08519c' :
           d > 10 ? '#3182bd' :
           d > 5 ? '#6baed6' :
           d > 2 ? '#bdd7e7' :
           d > 0 ? '#eff3ff' :
                    '#fee5d9';
      }
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
  this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
  + '<h3>' + props.party + '</h3>'
  + '<h4>' + totalVotes + props.validVotes + '</h4>'
  + '<h4>' + recVotes + props.votes + '</h4>'
  + '<h4>' + pctVote + props.percent + '%</h4>'
  + '<br><br><br><br><br><br><br><br><br>' + '' : '')
};

infoPBDNJ2013bas.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

var pbdnj2013basgeojson = L.geoJson(pbdnj2013bas, {
    style: pbdnj2013basstyle,
    onEachFeature: pbdnj2013basEachFeature
  });
