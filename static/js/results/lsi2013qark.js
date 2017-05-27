var legendLSI2013qark = L.control({position: 'topright'});
var infoLSI = L.control({position: 'bottomright'});

//LSI 2013 ////////////////////////////////////////////
function lsistyle(feature) {
  return {
    fillColor: getColorLSI2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}
//added

function getColorLSI2013qark(d) {
  return d > 20 ? '#ef3b2c' :
         d > 10 ? '#fb6a4a' :
         d > 5 ? '#fc9272' :
         d > 0 ? '#fcbba1' :
                  '#fee5d9';
      }


function lsi2013highlightFeature(e) {
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
     infoLSI.update(layer.feature.properties);
  }

function lsi2013resetHighlight(e) {
      lsi2013geojson.resetStyle(e.target);
      infoLSI.update();
  }

function lsi2013EachFeature(feature, layer) {
      layer.on({
          mouseover: lsi2013highlightFeature,
          mouseout: lsi2013resetHighlight
      });
    }

infoLSI.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoLSI.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>' + totalVotes + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + props.percent + '%</h4>'
    + '<h4>' + recVotes + props.votes + '</h4>'
    + '<h4>' + wonSeats + props.seats + '</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoLSI.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendLSI2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 5, 10, 20],
          labels = ['<h5>' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendLSI2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorLSI2013qark(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

var lsi2013geojson = L.geoJson(lsi2013, {
    style: lsistyle,
    onEachFeature: lsi2013EachFeature
});
//END LSI 2013 /////////////////////////////////////
