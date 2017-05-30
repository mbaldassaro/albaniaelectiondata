//var legendAPMI2013qark = L.control({position: 'topright'});
var legendAPMI2013qark = L.control({position: 'bottomright'});
var infoAPMI = L.control({position: 'bottomright'});


//APMI 2013 ////////////////////////////
function apmistyle(feature) {
  return {
    fillColor: getColorAPMI2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
    }
}
  function getColorAPMI2013qark(d) {
    return d > 50 ? '#084594' :
           d > 40 ? '#2171b5' :
           d > 30 ? '#4292c6' :
           d > 20 ? '#6baed6' :
                      'gray';
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
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + wonSeats +': ' + props.seats + '</h5>'
    + '' : '')
  };

  //infoAPMI.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendAPMI2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [20, 30, 40, 50],
          labels = ['<h5>APMI ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendAPMI2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorAPMI2013qark(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

//APMI
  var apmi2013geojson = L.geoJson(apmi2013, {
      style: apmistyle,
      onEachFeature: apmi2013EachFeature
    });
//END APMI 2013 /////////////////////////////////////
