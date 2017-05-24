var infoLSI2013bas = L.control({position: 'bottomright'});

//LSI 2013 ////////////////////////////////////////////
function lsi2013basstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
    return d > 40 ? '#99000d' :
           d > 30 ? '#cb181d' :
           d > 20 ? '#ef3b2c' :
           d > 10 ? '#fb6a4a' :
           d > 5 ? '#fc9272' :
           d > 0 ? '#fcbba1' :
                    '#fee5d9';
      }
  }

function lsi2013bashighlightFeature(e) {
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
     infoLSI2013bas.update(layer.feature.properties);
  }

function lsi2013basresetHighlight(e) {
      lsi2013basgeojson.resetStyle(e.target);
      infoLSI2013bas.update();
  }

function lsi2013basEachFeature(feature, layer) {
      layer.on({
          mouseover: lsi2013bashighlightFeature,
          mouseout: lsi2013basresetHighlight
      });
    }

infoLSI2013bas.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoLSI2013bas.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
  + '<h3>' + props.party + '</h3>'
  + '<h4>' + totalVotes + props.validVotes + '</h4>'
  + '<h4>' + recVotes + props.votes + '</h4>'
  + '<h4>' + pctVote + props.percent + '%</h4>'
  + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoLSI2013bas.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
//LSI
var lsi2013basgeojson = L.geoJson(lsi2013bas, {
    style: lsi2013basstyle,
    onEachFeature: lsi2013basEachFeature
});
