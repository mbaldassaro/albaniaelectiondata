var legendPdQark2017 = L.control({position: 'bottomright'});
var infoPdQark2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function pdQark2017style(feature) {
  return {
    fillColor: getColorPdQark2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPdQark2017(d) {
    return d > 50 ? '#2171b5' :
           d > 40 ? '#4292c6' :
           d > 30 ? '#6baed6' :
           d > 20 ? '#9ecae1' :
                    '#c6dbef';
      }

function pdQark2017highlightFeature(e) {
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
     infoPdQark2017.update(layer.feature.properties);
  }

function pdQark2017resetHighlight(e) {
      pdQark2017geojson.resetStyle(e.target);
      infoPdQark2017.update();
  }

function pdQark2017EachFeature(feature, layer) {
      layer.on({
          mouseover: pdQark2017highlightFeature,
          mouseout: pdQark2017resetHighlight
      });
    }

infoPdQark2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPdQark2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.pd + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
  + '<h5>' + wonSeats + ': ' + props.pdSeats + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPdQark2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [10, 20, 30, 40],
          labels = ['<h5>PD ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPdQark2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPdQark2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var pdQark2017geojson = L.geoJson(pdQark2017, {
      style: pdQark2017style,
      onEachFeature: pdQark2017EachFeature
  });
//END PD /////////////////////////////////////
