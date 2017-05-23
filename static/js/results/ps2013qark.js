var infoPS = L.control({position: 'bottomright'});

//PS 2013 ////////////////////////////////////////////
function psstyle(feature) {
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

function ps2013highlightFeature(e) {
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
     infoPS.update(layer.feature.properties);
  }

function ps2013resetHighlight(e) {
      ps2013geojson.resetStyle(e.target);
      infoPS.update();
  }

function ps2013EachFeature(feature, layer) {
      layer.on({
          mouseover: ps2013highlightFeature,
          mouseout: ps2013resetHighlight//,
          //click: zoomToFeature
      });
    }

infoPS.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPS.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>Total Votes: ' + props.totalVotes + '</h4>'
    + '<h4>Total Seats: ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>Vote Percentage: ' + props.percent + '%</h4>'
    + '<h4>Votes Received: ' + props.votes + '</h4>'
    + '<h4>Seats Won: ' + props.seats + '</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '');
  };

infoPS.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//PS
var ps2013geojson = L.geoJson(ps2013, {
    style: psstyle,
    onEachFeature: ps2013EachFeature
});

//END PS 2013 /////////////////////////////////////
