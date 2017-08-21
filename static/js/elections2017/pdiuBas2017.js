var legendPdiuBas2017 = L.control({position: 'bottomright'});
var infoPdiuBas2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function pdiuBas2017style(feature) {
  return {
    fillColor: getColorPdiuBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPdiuBas2017(d) {
  return      d > 40 ? '#4292c6' :
              d > 30 ? '#6baed6' :
              d > 20 ? '#9ecae1' :
              d > 10 ? '#c6dbef' :
              d > 0 ? '#eff3ff' :
                      '#ffffff';
      }

function pdiuBas2017highlightFeature(e) {
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
     infoPdiuBas2017.update(layer.feature.properties);
  }

function pdiuBas2017resetHighlight(e) {
      pdiuBas2017geojson.resetStyle(e.target);
      infoPdiuBas2017.update();
  }

function pdiuBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: pdiuBas2017highlightFeature,
          mouseout: pdiuBas2017resetHighlight
      });
    }

infoPdiuBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPdiuBas2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.pdiu + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPdiuBas2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20, 30, 40],
          labels = ['<h5>PDIU ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPdiuBas2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPdiuBas2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var pdiuBas2017geojson = L.geoJson(pdiuBas2017, {
      style: pdiuBas2017style,
      onEachFeature: pdiuBas2017EachFeature
  });
//END PD /////////////////////////////////////
