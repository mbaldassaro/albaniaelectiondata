var legendPS2013qark = L.control({position: 'topright'});
var infoPS = L.control({position: 'bottomright'});

//PS 2013 ////////////////////////////////////////////
function psstyle(feature) {
  return {
    fillColor: getColorPS2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPS2013qark(d) {
  return d > 40 ? '#6a51a3' :
         //d > 40 ? '#807dba' :
         d > 30 ? '#9e9ac8' :
         d > 20 ? '#bcbddc' :
                  '#dadaeb';
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
    + '<h4>' + totalVotes + ': ' + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + ': ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
    + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
    + '<h4>' + wonSeats + ': ' + props.seats + '</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '');
  };

infoPS.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPS2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [20, 30, 40],
          labels = ['<h5>PS ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendPS2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorPS2013qark(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

//PS
var ps2013geojson = L.geoJson(ps2013, {
    style: psstyle,
    onEachFeature: ps2013EachFeature
});

//END PS 2013 /////////////////////////////////////
