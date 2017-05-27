var legendINV2013bas = L.control({position: 'topright'});
var infoBasINV = L.control({position: 'bottomright'});

//BAS INV 2013 /////////////////////////////////////
function basinvstyle(feature) {
  return {
    fillColor: getColorINV2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorINV2013bas(d) {
  return d > 3 ? '#525252' :
         d > 2 ? '#737373' :
         d > 1 ? '#969696' :
         d > 0 ? '#bdbdbd' :
         //d > 1 ? '#d9d9d9' :
         //d > 0 ? '#f0f0f0' :
                  '#ffffff';
      }

function basinv2013highlightFeature(e) {
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
     infoBasINV.update(layer.feature.properties);
  }

function basinv2013resetHighlight(e) {
      invalid2013basgeojson.resetStyle(e.target);
      infoBasINV.update();
  }

function basinv2013EachFeature(feature, layer) {
      layer.on({
          mouseover: basinv2013highlightFeature,
          mouseout: basinv2013resetHighlight,
          click: zoomToFeature
      });
    }

infoBasINV.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasINV.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>' + castBallot + ': ' + props.ballotsCast + '</h4>'
    + '<h4>' + votesInv + ': ' + props.invalidBallots + '</h4>'
    + '<h4>' + pctInv + ': ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendINV2013bas.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3],
              labels = ['<h5>' + pctInv + '</h5>'];
              this.update();
              return this._div;
      };

        legendINV2013bas.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorINV2013bas(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };


    //INVBas
  var invalid2013basgeojson = L.geoJson(invalid2013bas, {
      style: basinvstyle,
      onEachFeature: basinv2013EachFeature
  });

//END BAS INV 2013
