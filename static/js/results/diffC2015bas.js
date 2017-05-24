var infoDiffC15 = L.control({position: 'bottomright'});

//DIFF 2015 Council ///////////////
function diffC15style(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 40 ? '#4a1486' :
         d > 25 ? '#6a51a3' :
         d > 10 ? '#807dba' :
         d > 0 ?  '#9e9ac8' :
         d > -10 ? '#4292c6' :
         d > -25 ? '#2171b5' :
         d > -40 ? '#084594' :
                  'gray';
      }
  }

function diffC15highlightFeature(e) {
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
     infoDiffC15.update(layer.feature.properties);
  }

function diffC15resetHighlight(e) {
      diffCouncil2015basgeojson.resetStyle(e.target);
      infoDiffC15.update();
  }

function diffC15EachFeature(feature, layer) {
      layer.on({
          mouseover: diffC15highlightFeature,
          mouseout: diffC15resetHighlight,
          click: zoomToFeature
      });
    }

infoDiffC15.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoDiffC15.update = function(props) {
  this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
  //+ '<h4>Registered Voters: ' + props.registeredVoters + '</h4>'
  + '<h4>' + totalVotes + props.totalCouncil + '</h4>'
  + '<h3>' + props.partyASE + '</h3>'
  + '<h4>' + recVotes + props.aseCouncil + '</h4>'
  + '<h4>' + pctVote + props.pctASE + '%</h4>'
  + '<h4>' + wonSeats + props.aseSeats + '</h4>'
  + '<h3>' + props.partyAPPD + '</h3>'
  + '<h4>' + recVotes + props.appdCouncil + '</h4>'
  + '<h4>' + pctVote + props.pctAPPD + '%</h4>'
  + '<h4>' + wonSeats + props.appdSeats + '</h4><br>'
  + '<h4>' + diff + props.percent + '%</h4><br>'
  + '<h4>' + otherVotes + props.otherCouncil + '</h4>'
  //+ '<h4>Other Percentage: ' + props.otherPCT + '%</h4>'
  + '<h4>' + otherSeats + props.otherSeats + '</h4>'
  + '<br><br><br><br>'
  + '' : '')
};

infoDiffC15.addTo(map);
// END 2015 Diff Council

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//Diff Bas Council
var diffCouncil2015basgeojson = L.geoJson(diffCouncil2015bas, { //diffCouncil2015bas
    style: diffC15style,
    onEachFeature: diffC15EachFeature
});
