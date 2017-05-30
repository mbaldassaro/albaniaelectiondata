//PBDNJ 2013 ////////////////////////////////////////////
var legendPBDNJ2013qark = L.control({position: 'bottomright'});
var infoPBDNJ = L.control({position: 'bottomright'});

function pbdnjstyle(feature) {
  return {
    fillColor: getColorPBDNJ2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPBDNJ2013qark(d) {
  return d > 5 ? '#6baed6' :
         d > 2 ? '#bdd7e7' :
         d > 0 ? '#eff3ff' :
                  '#fee5d9';
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
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + wonSeats + ': ' + props.seats + '</h5>'
    + '' : '')
  };

//infoPBDNJ.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPBDNJ2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5],
          labels = ['<h5>PBDNJ ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendPBDNJ2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorPBDNJ2013qark(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

var pbdnj2013geojson = L.geoJson(pbdnj2013, {
    style: pbdnjstyle,
    onEachFeature: pbdnj2013EachFeature
  });
