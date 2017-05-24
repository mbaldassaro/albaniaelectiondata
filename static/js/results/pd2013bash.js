var infoBasPD = L.control({position: 'bottomright'});

//PD BAS 2013 ////////////////////////////////////////////
function pdbasstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 50 ? '#2171b5' :
         d > 40 ? '#4292c6' :
         d > 30 ? '#6baed6' :
         d > 20 ? '#9ecae1' :
                  '#c6dbef';
    }
  }

function pdbas2013highlightFeature(e) {
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
     infoBasPD.update(layer.feature.properties);
  }

function pdbas2013resetHighlight(e) {
      pd2013basgeojson.resetStyle(e.target);
      infoBasPD.update();
  }

function pdbas2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pdbas2013highlightFeature,
          mouseout: pdbas2013resetHighlight,
          click: zoomToFeature
      });
    }

infoBasPD.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasPD.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + totalVotes + props.validVotes + '</h4>'
    + '<h4>' + recVotes + props.votes + '</h4>'
    + '<h4>' + pctVote + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasPD.addTo(map);

//PD BAS
var pd2013basgeojson = L.geoJson(pd2013bas, {
    style: pdbasstyle,
    onEachFeature: pdbas2013EachFeature
});

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//END PD BAS 2013 /////////////////////////////////////
