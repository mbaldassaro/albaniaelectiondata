var infoPR2013bas = L.control({position: 'bottomright'});

//PR 2013 ////////////////////////////////////////////
function pr2013basstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
    return d > 20 ? '#023858' :
           d > 10 ? '#045a8d' :
           d > 5 ? '#0570b0' :
           d > 2 ? '#c6dbef' :
           d > 0 ? '#eff3ff' :
                    '#fee5d9';
      }
  }

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
     infoPR.update(layer.feature.properties);
  }

function pr2013basresetHighlight(e) {
      pr2013basgeojson.resetStyle(e.target);
      infoPR2013bas.update();
  }

function pr2013basEachFeature(feature, layer) {
      layer.on({
          mouseover: pr2013highlightFeature,
          mouseout: pr2013resetHighlight,
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
  + '<h4>' + totalVotes + props.validVotes + '</h4>'
  + '<h4>' + recVotes + props.votes + '</h4>'
  + '<h4>' + pctVote + props.percent + '%</h4>'
  + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
};

infoPR2013bas.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//PR
var pr2013basgeojson = L.geoJson(pr2013bas, {
    style: pr2013basstyle,
    onEachFeature: pr2013basEachFeature
});

//END PR 2013 /////////////////////////////////////
