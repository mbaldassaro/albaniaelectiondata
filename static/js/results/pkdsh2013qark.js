var infoPKDSH = L.control({position: 'bottomright'});

//PKDSH 2013 ////////////////////////////////////////////
function pkdshstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
    return d > 5 ?  '#fee391' :
           d > 0 ?  '#fff7bc' :
                     '#ffffe5';
      }
  }

function pkdsh2013highlightFeature(e) {
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
     infoPKDSH.update(layer.feature.properties);
  }

function pkdsh2013resetHighlight(e) {
      pkdsh2013geojson.resetStyle(e.target);
      infoPKDSH.update();
  }

function pkdsh2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pkdsh2013highlightFeature,
          mouseout: pkdsh2013resetHighlight
      });
    }

infoPKDSH.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPKDSH.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>Total Votes: ' + props.totalVotes + '</h4>'
    + '<h4>Total Seats: ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>Vote Percentage: ' + props.percent + '%</h4>'
    + '<h4>Votes Received: ' + props.votes + '</h4>'
    + '<h4>Seats Won: ' + props.seats + '</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoPKDSH.addTo(map);
//END PKDSH 2013 /////////////////////////////////////

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//PKDSH
var pkdsh2013geojson = L.geoJson(pkd2013, {
    style: pkdshstyle,
    onEachFeature: pkdsh2013EachFeature
});
