var infoPD = L.control({position: 'bottomright'});

//PD 2013 ////////////////////////////////////////////
function pdstyle(feature) {
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

function pd2013highlightFeature(e) {
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
     infoPD.update(layer.feature.properties);
  }

function pd2013resetHighlight(e) {
      pd2013geojson.resetStyle(e.target);
      infoPD.update();
  }

function pd2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pd2013highlightFeature,
          mouseout: pd2013resetHighlight
      });
    }

infoPD.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPD.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>' + totalVotes + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + props.percent + '%</h4>'
    + '<h4>' + recVotes + props.votes + '</h4>'
    + '<h4>' + wonSeats + props.seats + '</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  //PD
var pd2013geojson = L.geoJson(pd2013, {
      style: pdstyle,
      onEachFeature: pd2013EachFeature
  });
//END PD 2013 /////////////////////////////////////
