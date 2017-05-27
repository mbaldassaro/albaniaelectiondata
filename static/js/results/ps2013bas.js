var legendPS2013bas = L.control({position: 'topright' });
var infoBasPS = L.control({position: 'bottomright'});

//PS BAS 2013 ////////////////////////////////////////////
function psbasstyle(feature) {
  return {
    fillColor: getColorPS2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPS2013bas(d) {
  return d > 50 ? '#4a1486' :
         d > 40 ? '#6a51a3' :
         //d > 40 ? '#807dba' :
         d > 30 ? '#9e9ac8' :
         d > 20 ? '#bcbddc' :
                  '#dadaeb';
      }

function psbas2013highlightFeature(e) {
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
     infoBasPS.update(layer.feature.properties);
  }

function psbas2013resetHighlight(e) {
      ps2013basgeojson.resetStyle(e.target);
      infoBasPS.update();
  }

function psbas2013EachFeature(feature, layer) {
      layer.on({
          mouseover: psbas2013highlightFeature,
          mouseout: psbas2013resetHighlight,
          click: zoomToFeature
      });
    }

infoBasPS.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasPS.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + totalVotes + ': ' + props.totalVotes + '</h4>'
    + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
    + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '');
  };

infoBasPS.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPS2013bas.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [20, 30, 40, 50],
          labels = ['<h5>PS ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendPS2013bas.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorPS2013bas(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PS BAS
  var ps2013basgeojson = L.geoJson(ps2013bas, {
      style: psbasstyle,
      onEachFeature: psbas2013EachFeature
  });

//END PS BAS 2013 /////////////////////////////////////
