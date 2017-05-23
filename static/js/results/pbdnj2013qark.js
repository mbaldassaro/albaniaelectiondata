//PBDNJ 2013 ////////////////////////////////////////////
var infoPBDNJ = L.control({position: 'bottomright'});

function pbdnjstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
    return d > 5 ? '#6baed6' :
           d > 2 ? '#bdd7e7' :
           d > 0 ? '#eff3ff' :
                   '#fee5d9';
      }
  }

function pbdnj2013highlightFeature(e) {
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
     infoPBDNJ.update(layer.feature.properties);
  }

function pbdnj2013resetHighlight(e) {
      pbdnj2013geojson.resetStyle(e.target);
      infoPBDNJ.update();
  }

function pbdnj2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pbdnj2013highlightFeature,
          mouseout: pbdnj2013resetHighlight
      });
    }

infoPBDNJ.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPBDNJ.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>Total Votes: ' + props.totalVotes + '</h4>'
    + '<h4>Total Seats: ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>Vote Percentage: ' + props.percent + '%</h4>'
    + '<h4>Votes Received: ' + props.votes + '</h4>'
    + '<h4>Seats Won: ' + props.seats + '</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoPBDNJ.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

var pbdnj2013geojson = L.geoJson(pbdnj2013, {
    style: pbdnjstyle,
    onEachFeature: pbdnj2013EachFeature
  });
