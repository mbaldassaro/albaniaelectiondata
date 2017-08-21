var legendInvalidKom2017 = L.control({position: 'bottomright'});
var infoInvalidKom2017 = L.control({position: 'bottomright'});

//Kom INV 2013 /////////////////////////////////////
function invalidKom2017style(feature) {
  return {
    fillColor: getColorInvalidKom2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorInvalidKom2017(d) {
  return d > 5 ? '#000000' :
				 d > 4 ? '#252525' :
				 d > 3 ? '#525252' :
         d > 2 ? '#737373' :
         d > 1 ? '#969696' :
         d > 0 ? '#bdbdbd' :
         //d > 1 ? '#d9d9d9' :
         //d > 0 ? '#f0f0f0' :
                  '#ffffff';
      }

function invalidKom2017highlightFeature(e) {
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
     infoInvalidKom2017.update(layer.feature.properties);
  }

function invalidKom2017resetHighlight(e) {
      invalidKom2017geojson.resetStyle(e.target);
      infoInvalidKom2017.update();
  }

function invalidKom2017EachFeature(feature, layer) {
      layer.on({
          mouseover: invalidKom2017highlightFeature,
          mouseout: invalidKom2017resetHighlight,
          click: zoomToFeature
      });
    }

infoInvalidKom2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoInvalidKom2017.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + castBallot + ': ' + props.ballotsCast + '</h5>'
    + '<h5>' + votesInv + ': ' + props.invalidVotes + '</h5>'
    + '<h5>' + pctInv + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoKomINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendInvalidKom2017.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5],
              labels = ['<h5>' + pctInv + '</h5>'];
              this.update();
              return this._div;
      };

        legendInvalidKom2017.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorInvalidKom2017(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };


    //INVKom
  var invalidKom2017geojson = L.geoJson(invalidKom2017, {
      style: invalidKom2017style,
      onEachFeature: invalidKom2017EachFeature
  });

//END Kom INV 2013
