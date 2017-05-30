var legendPR2013qark = L.control({position: 'bottomright'});
var infoPR = L.control({position: 'bottomright'});

//PR 2013 ////////////////////////////////////////////
function prstyle(feature) {
  return {
    fillColor: getColorPR2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPR2013qark(d) {
  return d > 5 ? '#0570b0' :
         d > 2 ? '#c6dbef' :
         d > 0 ? '#eff3ff' :
                  '#fee5d9';
      }

      //d > 20 ? '#023858' :
      //d > 10 ? '#045a8d' :

function pr2013highlightFeature(e) {
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
     infoPR.update(layer.feature.properties);
  }

function pr2013resetHighlight(e) {
      pr2013geojson.resetStyle(e.target);
      infoPR.update();
  }

function pr2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pr2013highlightFeature,
          mouseout: pr2013resetHighlight
      });
    }

infoPR.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPR.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + wonSeats + ': ' + props.seats + '</h5>'
    + '' : '')
  };

//infoPR.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPR2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5],
          labels = ['<h5>PR ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPR2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorPR2013qark(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

//PR
var pr2013geojson = L.geoJson(pr2013, {
    style: prstyle,
    onEachFeature: pr2013EachFeature
});

//END PR 2013 /////////////////////////////////////
