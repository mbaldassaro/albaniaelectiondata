var legendPR2013qark = L.control({position: 'topright'});
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
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>' + totalVotes + ': ' + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + ': ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
    + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
    + '<h4>' + wonSeats + ': ' + props.seats + '</h4>'
    + '<br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoPR.addTo(map);


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
