var legendPsQark2017 = L.control({position: 'bottomright'});
var infoPsQark2017 = L.control({position: 'bottomright'});

//DIFF 2015 Mayor ///////////////
function psQark2017style(feature) {
  return {
    fillColor: getColorPsQark2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPsQark2017(d) {
  return d > 60 ? '#3f007d' :
         d > 50 ? '#54278f' :
         d > 40 ? '#6a51a3' :
         //d > 40 ? '#807dba' :
         d > 30 ? '#9e9ac8' :
         //d > 20 ? '#bcbddc' :
                  '#dadaeb';
      }

function psQark2017highlightFeature(e) {
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
     infoPsQark2017.update(layer.feature.properties);
  }

function psQark2017resetHighlight(e) {
      psQark2017geojson.resetStyle(e.target);
      infoPsQark2017.update();
  }

function psQark2017EachFeature(feature, layer) {
      layer.on({
          mouseover: psQark2017highlightFeature,
          mouseout: psQark2017resetHighlight,
          click: zoomToFeature
      });
    }

infoPsQark2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPsQark2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.ps + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
  + '<h5>' + wonSeats + ': ' + props.psSeats + '</h5>'
  + '' : '');
  };

//infoDiffM15.addTo(map);
// END

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPsQark2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [30, 40, 50, 60],
          labels = ['<h5>PS ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendPsQark2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorPsQark2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };


//
var psQark2017geojson = L.geoJson(psQark2017, {
      style: psQark2017style,
      onEachFeature: psQark2017EachFeature
  });
