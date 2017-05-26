var infoBasPS = L.control({position: 'bottomright'});

//PS BAS 2013 ////////////////////////////////////////////
function psbasstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  };

function getColor(d) {
  return d > 50 ? '#4a1486' :
         d > 40 ? '#6a51a3' :
         //d > 40 ? '#807dba' :
         d > 30 ? '#9e9ac8' :
         d > 20 ? '#bcbddc' :
                  '#dadaeb';
      }
  }

function psbas2013highlightFeature(e) {
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
     infoBasPS.update(layer.feature.properties);
  }

function psbas2013resetHighlight(e) {
      ps2013basgeojson.resetStyle(e.target);
      infoBasPS.update();
  }

function psbas2013EachFeature(feature, layer) {
      layer.on({
          mouseover: psbas2013highlightFeature,
          mouseout: psbas2013resetHighlight,
          click: zoomToFeature
      });
    }

infoBasPS.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasPS.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + totalVotes + props.totalVotes + '</h4>'
    + '<h4>' + recVotes + props.votes + '</h4>'
    + '<h4>' + pctVote + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '');
  };

infoBasPS.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  //PS BAS
  var ps2013basgeojson = L.geoJson(ps2013bas, {
      style: psbasstyle,
      onEachFeature: psbas2013EachFeature
  });

//END PS BAS 2013 /////////////////////////////////////
