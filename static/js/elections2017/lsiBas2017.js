var legendLsiBas2017 = L.control({position: 'bottomright'});
var infoLsiBas2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function lsiBas2017style(feature) {
  return {
    fillColor: getColorLsiBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorLsiBas2017(d) {
  return d > 50 ? '#a50f15' :
         d > 40 ? '#cb181d' :
         d > 30 ? '#ef3b2c' :
         d > 20 ? '#fb6a4a' :
         d > 10 ? '#fc9272' :
         d > 0 ?  '#fcbba1' :
                  '#fee5d9';
      }

function lsiBas2017highlightFeature(e) {
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
     infoLsiBas2017.update(layer.feature.properties);
  }

function lsiBas2017resetHighlight(e) {
      lsiBas2017geojson.resetStyle(e.target);
      infoLsiBas2017.update();
  }

function lsiBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: lsiBas2017highlightFeature,
          mouseout: lsiBas2017resetHighlight
      });
    }

infoLsiBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoLsiBas2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.lsi + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendLsiBas2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20, 30, 40, 50],
          labels = ['<h5>LSI ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendLsiBas2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorLsiBas2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var lsiBas2017geojson = L.geoJson(lsiBas2017, {
      style: lsiBas2017style,
      onEachFeature: lsiBas2017EachFeature
  });
//END PD /////////////////////////////////////
