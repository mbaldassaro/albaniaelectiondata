var legendPdBas2017 = L.control({position: 'bottomright'});
var infoPdBas2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function pdBas2017style(feature) {
  return {
    fillColor: getColorPdBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPdBas2017(d) {
    return d > 50 ? '#2171b5' :
           d > 40 ? '#4292c6' :
           d > 30 ? '#6baed6' :
           d > 20 ? '#9ecae1' :
           d > 10 ? '#c6dbef' :
                    '#eff3ff' ;
      }

function pdBas2017highlightFeature(e) {
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
     infoPdBas2017.update(layer.feature.properties);
  }

function pdBas2017resetHighlight(e) {
      pdBas2017geojson.resetStyle(e.target);
      infoPdBas2017.update();
  }

function pdBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: pdBas2017highlightFeature,
          mouseout: pdBas2017resetHighlight
      });
    }

infoPdBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPdBas2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.pd + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPdBas2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20, 30, 40, 50],
          labels = ['<h5>PD ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPdBas2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPdBas2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var pdBas2017geojson = L.geoJson(pdBas2017, {
      style: pdBas2017style,
      onEachFeature: pdBas2017EachFeature
  });
//END PD /////////////////////////////////////
