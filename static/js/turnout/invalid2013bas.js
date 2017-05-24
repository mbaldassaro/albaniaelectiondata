var infoBasINV = L.control({position: 'bottomright'});

//BAS INV 2013 /////////////////////////////////////
function basinvstyle(feature) {
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
    + '<h4>Ballots Cast: ' + props.ballotsCast + '</h4>'
    + '<h4>Invalid Votes: ' + props.invalidBallots + '</h4>'
    + '<h4>Invalid Percentage: ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoBasINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

    //INVBas
  var invalid2013basgeojson = L.geoJson(invalid2013bas, {
      style: basinvstyle,
      onEachFeature: basinv2013EachFeature
  });

//END BAS INV 2013
