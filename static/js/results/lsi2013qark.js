var legendLSI2013qark = L.control({position: 'bottomright'});
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
         d > 0 ? '#fcbba1' :
                  '#gray';
      }


            //d > 5 ? '#fc9272' :

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
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + wonSeats + ': ' + props.seats + '</h5>'
    + '' : '')
  };

//infoLSI.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendLSI2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20],
          labels = ['<h5>LSI ' + pctVote + '</h5>'];
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
