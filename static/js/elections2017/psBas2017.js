var legendPsBas2017 = L.control({position: 'bottomright'});
var infoPsBas2017 = L.control({position: 'bottomright'});

//DIFF 2015 Mayor ///////////////
function psBas2017style(feature) {
  return {
    fillColor: getColorPsBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPsBas2017(d) {
  return d > 60 ? '#3f007d' :
         d > 50 ? '#54278f' :
         d > 40 ? '#6a51a3' :
         //d > 40 ? '#807dba' :
         d > 30 ? '#9e9ac8' :
         d > 20 ? '#bcbddc' :
                  '#dadaeb';
      }

function psBas2017highlightFeature(e) {
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
     infoPsBas2017.update(layer.feature.properties);
  }

function psBas2017resetHighlight(e) {
      psBas2017geojson.resetStyle(e.target);
      infoPsBas2017.update();
  }

function psBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: psBas2017highlightFeature,
          mouseout: psBas2017resetHighlight,
          click: zoomToFeature
      });
    }

infoPsBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPsBas2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.ps + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '' : '');
  };

//infoDiffM15.addTo(map);
// END

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPsBas2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [20, 30, 40, 50, 60],
          labels = ['<h5>PS ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendPsBas2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorPsBas2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };


//
var psBas2017geojson = L.geoJson(psBas2017, {
      style: psBas2017style,
      onEachFeature: psBas2017EachFeature
  });
