var legendPKD2013qark = L.control({position: 'bottomright'});
var infoPKDSH = L.control({position: 'bottomright'});

//PKDSH 2013 ////////////////////////////////////////////
function pkdshstyle(feature) {
  return {
    fillColor: getColorPKD2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPKD2013qark(d) {
  return d > 5 ?  '#fee391' :
         d > 0 ?  '#ffffe5' :
                  //'rgba(0,0,0,0)';
                  '#ffffff';
      }

//d > 20 ? '#fe9929' :
//d > 10 ? '#fec44f' :

function pkdsh2013highlightFeature(e) {
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
     infoPKDSH.update(layer.feature.properties);
  }

function pkdsh2013resetHighlight(e) {
      pkdsh2013geojson.resetStyle(e.target);
      infoPKDSH.update();
  }

function pkdsh2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pkdsh2013highlightFeature,
          mouseout: pkdsh2013resetHighlight
      });
    }

infoPKDSH.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPKDSH.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + wonSeats + ': ' + props.seats + '</h5>'
    + '' : '')
  };

//infoPKDSH.addTo(map);
//END PKDSH 2013 /////////////////////////////////////

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPKD2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 5],
          labels = ['<h5>PKDSH ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPKD2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorPKD2013qark(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

//PKDSH
var pkdsh2013geojson = L.geoJson(pkd2013, {
    style: pkdshstyle,
    onEachFeature: pkdsh2013EachFeature
});
