var infoAPMI = L.control({position: 'bottomright'});


//APMI 2013 ////////////////////////////
function apmistyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
    }

  function getColor(d) {
    return d > 50 ? '#084594' :
           d > 40 ? '#2171b5' :
           d > 30 ? '#4292c6' :
           d > 20 ? '#6baed6' :
           d > 10 ? '#9ecae1' :
                      'gray';
      }
  }

function apmi2013highlightFeature(e) {
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
     infoAPMI.update(layer.feature.properties);
  }

function apmi2013resetHighlight(e) {
      apmi2013geojson.resetStyle(e.target);
      infoAPMI.update();
  }

function apmi2013EachFeature(feature, layer) {
      layer.on({
        mouseover: apmi2013highlightFeature,
        mouseout: apmi2013resetHighlight
    });
  }

  infoAPMI.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  infoAPMI.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>{{gettext('Total Votes')}}: ' + props.totalVotes + '</h4>'
    + '<h4>{{gettext('Total Seats')}}: ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>{{gettext('Vote Percentage')}}: ' + props.percent + '%</h4>'
    + '<h4>{{gettext('Votes Received')}}: ' + props.votes + '</h4>'
    + '<h4>{{gettext('Seats Won')}}: ' + props.seats + '</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

  infoAPMI.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//APMI
  var apmi2013geojson = L.geoJson(apmi2013, {
      style: apmistyle,
      onEachFeature: apmi2013EachFeature
    });
//END APMI 2013 /////////////////////////////////////
