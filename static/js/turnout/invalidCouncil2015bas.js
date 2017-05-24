


var infoBasCINV = L.control({position: 'bottomright'});





//BAS Council INV 2015 /////////////////////////////////////
function bascinv15style(feature) {
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

function bascinv2015highlightFeature(e) {
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
     infoBasCINV.update(layer.feature.properties);
  }

function bascinv2015resetHighlight(e) {
      invalidCouncil2015basgeojson.resetStyle(e.target);
      infoBasCINV.update();
  }

function bascinv2015EachFeature(feature, layer) {
      layer.on({
          mouseover: bascinv2015highlightFeature,
          mouseout: bascinv2015resetHighlight,
          click: zoomToFeature
      });
    }

infoBasCINV.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasCINV.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    + '<h4>Ballots Cast: ' + props.councilTurnout + '</h4>'
    + '<h4>Invalid Votes: ' + props.councilInvalid + '</h4>'
    + '<h4>Invalid Percentage: ' + props.percent + '%</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasCINV.addTo(map);
//END BAS CINV 2015

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }



//CINVBas
var invalidCouncil2015basgeojson = L.geoJson(invalidCouncil2015bas, {
    style: bascinv15style,
    onEachFeature: bascinv2015EachFeature
});
