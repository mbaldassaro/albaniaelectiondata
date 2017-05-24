var infoBasMINV = L.control({position: 'bottomright'});

//BAS Mayor INV 2015 /////////////////////////////////////
function basminv15style(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
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
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>' + castBallot + props.mayorTurnout + '</h4>'
    + '<h4>' + votesInv + props.mayorInvalid + '</h4>'
    + '<h4>' + pctInv + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasMINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//MINVBas
var invalidMayor2015basgeojson = L.geoJson(invalidMayor2015bas, {
    style: basminv15style,
    onEachFeature: basminv2015EachFeature
});

//END Mayor BAS INV 2015
