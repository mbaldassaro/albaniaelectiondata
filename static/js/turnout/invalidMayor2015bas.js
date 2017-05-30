var legendMINV2015bas = L.control({position: 'bottomright'});
var infoBasMINV = L.control({position: 'bottomright'});

//BAS Mayor INV 2015 /////////////////////////////////////
function basminv15style(feature) {
  return {
    fillColor: getColorMINV2015bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorMINV2015bas(d) {
  return d > 5 ? '#000000' :
				 d > 4 ? '#252525' :
				 d > 3 ? '#525252' :
         d > 2 ? '#737373' :
         d > 1 ? '#969696' :
         //d > 0 ? '#bdbdbd' :
         //d > 1 ? '#d9d9d9' :
         //d > 0 ? '#f0f0f0' :
                  '#ffffff';
      }


function basminv2015highlightFeature(e) {
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
     infoBasMINV.update(layer.feature.properties);
  }

function basminv2015resetHighlight(e) {
      invalidMayor2015basgeojson.resetStyle(e.target);
      infoBasMINV.update();
  }

function basminv2015EachFeature(feature, layer) {
      layer.on({
          mouseover: basminv2015highlightFeature,
          mouseout: basminv2015resetHighlight,
          click: zoomToFeature
      });
    }

infoBasMINV.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasMINV.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    + '<h5>' + castBallot + ': ' + props.mayorTurnout + '</h5>'
    + '<h5>' + votesInv + ': ' + props.mayorInvalid + '</h5>'
    + '<h5>' + pctInv + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoBasMINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendMINV2015bas.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [1, 2, 3, 4, 5],
              labels = ['<h5>' + pctInv + '</h5>'];
              this.update();
              return this._div;
      };

        legendMINV2015bas.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorMINV2015bas(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };


//MINVBas
var invalidMayor2015basgeojson = L.geoJson(invalidMayor2015bas, {
    style: basminv15style,
    onEachFeature: basminv2015EachFeature
});

//END Mayor BAS INV 2015
