var legendPsdQark2017 = L.control({position: 'bottomright'});
var infoPsdQark2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function psdQark2017style(feature) {
  return {
    fillColor: getColorPsdQark2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPsdQark2017(d) {
  return d > 10 ? '#fc9272' :
         //d > 20 ? '#fb6a4a' :
         d > 0 ?  '#fee0d2' :
                  '#fff5f0';
      }

function psdQark2017highlightFeature(e) {
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
     infoPsdQark2017.update(layer.feature.properties);
  }

function psdQark2017resetHighlight(e) {
      psdQark2017geojson.resetStyle(e.target);
      infoPsdQark2017.update();
  }

function psdQark2017EachFeature(feature, layer) {
      layer.on({
          mouseover: psdQark2017highlightFeature,
          mouseout: psdQark2017resetHighlight
      });
    }

infoPsdQark2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPsdQark2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.psd + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
  + '<h5>' + wonSeats + ': ' + props.psdSeats + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPsdQark2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10],
          labels = ['<h5>PSD ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPsdQark2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPsdQark2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var psdQark2017geojson = L.geoJson(psdQark2017, {
      style: psdQark2017style,
      onEachFeature: psdQark2017EachFeature
  });
//END PD /////////////////////////////////////
