var legendPD2013qark = L.control({position: 'bottomright'});
var infoPD = L.control({position: 'bottomright'});

//PD 2013 ////////////////////////////////////////////
function pdstyle(feature) {
  return {
    fillColor: getColorPD2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPD2013qark(d) {
    return d > 50 ? '#2171b5' :
           d > 40 ? '#4292c6' :
           d > 30 ? '#6baed6' :
           d > 20 ? '#9ecae1' :
                    '#c6dbef';
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
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + wonSeats + ': ' + props.seats + '</h5>'
    + '' : '')
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPD2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [10, 20, 30, 40],
          labels = ['<h5>PD ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPD2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPD2013qark(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var pd2013geojson = L.geoJson(pd2013, {
      style: pdstyle,
      onEachFeature: pd2013EachFeature
  });
//END PD 2013 /////////////////////////////////////
