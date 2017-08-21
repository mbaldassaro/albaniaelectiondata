var legendInvalidBas2017 = L.control({position: 'bottomright'});
var infoInvalidBas2017 = L.control({position: 'bottomright'});

//BAS INV 2013 /////////////////////////////////////
function invalidBas2017style(feature) {
  return {
    fillColor: getColorInvalidBas2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorInvalidBas2017(d) {
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

function invalidBas2017highlightFeature(e) {
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
     infoInvalidBas2017.update(layer.feature.properties);
  }

function invalidBas2017resetHighlight(e) {
      invalidBas2017geojson.resetStyle(e.target);
      infoInvalidBas2017.update();
  }

function invalidBas2017EachFeature(feature, layer) {
      layer.on({
          mouseover: invalidBas2017highlightFeature,
          mouseout: invalidBas2017resetHighlight,
          click: zoomToFeature
      });
    }

infoInvalidBas2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoInvalidBas2017.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    + '<h5>' + castBallot + ': ' + props.ballotsCast + '</h5>'
    + '<h5>' + votesInv + ': ' + props.invalidVotes + '</h5>'
    + '<h5>' + pctInv + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoBasINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendInvalidBas2017.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5],
              labels = ['<h5>' + pctInv + '</h5>'];
              this.update();
              return this._div;
      };

        legendInvalidBas2017.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorInvalidBas2017(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };


    //INVBas
  var invalidBas2017geojson = L.geoJson(invalidBas2017, {
      style: invalidBas2017style,
      onEachFeature: invalidBas2017EachFeature
  });

//END BAS INV 2013
