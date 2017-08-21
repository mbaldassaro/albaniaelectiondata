var legendLsiQark2017 = L.control({position: 'bottomright'});
var infoLsiQark2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function lsiQark2017style(feature) {
  return {
    fillColor: getColorLsiQark2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorLsiQark2017(d) {
  return d > 20 ? '#fb6a4a' :
         d > 10 ? '#fc9272' :
         d > 0 ?  '#fcbba1' :
                  '#fee5d9';
      }

function lsiQark2017highlightFeature(e) {
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
     infoLsiQark2017.update(layer.feature.properties);
  }

function lsiQark2017resetHighlight(e) {
      lsiQark2017geojson.resetStyle(e.target);
      infoLsiQark2017.update();
  }

function lsiQark2017EachFeature(feature, layer) {
      layer.on({
          mouseover: lsiQark2017highlightFeature,
          mouseout: lsiQark2017resetHighlight
      });
    }

infoLsiQark2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoLsiQark2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.lsi + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
  + '<h5>' + wonSeats + ': ' + props.lsiSeats + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendLsiQark2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 20],
          labels = ['<h5>LSI ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendLsiQark2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorLsiQark2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var lsiQark2017geojson = L.geoJson(lsiQark2017, {
      style: lsiQark2017style,
      onEachFeature: lsiQark2017EachFeature
  });
//END PD /////////////////////////////////////
