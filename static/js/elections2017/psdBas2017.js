var legendPsdBas2017 = L.control({position: 'bottomright'});
var infoPsdBas2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function psdBas2017style(feature) {
  return {
    fillColor: getColorPsdBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPsdBas2017(d) {
  return d > 20 ? '#fb6a4a' :
         d > 10 ? '#fc9272' :
         d > 0 ?  '#fee0d2' :
                  '#fff5f0';
      }

function psdBas2017highlightFeature(e) {
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
     infoPsdBas2017.update(layer.feature.properties);
  }

function psdBas2017resetHighlight(e) {
      psdBas2017geojson.resetStyle(e.target);
      infoPsdBas2017.update();
  }

function psdBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: psdBas2017highlightFeature,
          mouseout: psdBas2017resetHighlight
      });
    }

infoPsdBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPsdBas2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.psd + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPsdBas2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20],
          labels = ['<h5>PSD ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPsdBas2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPsdBas2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var psdBas2017geojson = L.geoJson(psdBas2017, {
      style: psdBas2017style,
      onEachFeature: psdBas2017EachFeature
  });
//END PD /////////////////////////////////////
