var legendDiff2015C = L.control({position: 'bottomright'});
var infoDiffC15 = L.control({position: 'bottomright'});

//DIFF 2015 Council ///////////////
function diffC15style(feature) {
  return {
    fillColor: getColorDiff2015C(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorDiff2015C(d) {
  return d > 40 ? '#4a1486' :
         d > 25 ? '#6a51a3' :
         d > 10 ? '#807dba' :
         d > 1 ?  '#bcbddc' :
         d > -10 ? '#9ecae1' :
         d > -25 ? '#4292c6' :
                  'gray';
      }
         //d > -40 ? '#084594' :

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
  this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
  //+ '<h4>Registered Voters: ' + props.registeredVoters + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.totalCouncil + '</h5>'
  + '<h4>' + props.partyASE + '</h4>'
  + '<h5>' + recVotes + ': ' + props.aseCouncil + '</h5>'
  + '<h5>' + pctVote + ': ' + props.pctASE + '%</h5>'
  + '<h5>' + wonSeats + ': ' + props.aseSeats + '</h5>'
  + '<h4>' + props.partyAPPD + '</h4>'
  + '<h5>' + recVotes + ': ' + props.appdCouncil + '</h5>'
  + '<h5>' + pctVote + ': ' + props.pctAPPD + '%</h5>'
  + '<h5>' + wonSeats + ': ' + props.appdSeats + '</h5>'
  + '<h5>' + diff + ': ' + props.percent + '%</h5>'
  + '<h5>' + otherVotes + ': ' + props.otherCouncil + '</h5>'
  //+ '<h4>Other Percentage: ' + props.otherPCT + '%</h4>'
  + '<h5>' + otherSeats + ': ' + props.otherSeats + '</h5>'
  + '' : '')
};

//infoDiffC15.addTo(map);
// END 2015 Diff Council

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
  legendDiff2015C.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [-25, -10, 1, 10, 25, 40],
          range = ['10-25%', '0-10%', '0-10%', '10-25%', '25-40%', '40%+'],
          labels = ['<h5>ASHE-APPD ' + diff + '</h5>'];
          this.update();
          return this._div;
  };


    legendDiff2015C.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorDiff2015C(grades[i] + 1) + '"></i> '
          + (grades[i] ? range[i] + '<br>' : '+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };



//Diff Bas Council
var diffCouncil2015basgeojson = L.geoJson(diffCouncil2015bas, { //diffCouncil2015bas
    style: diffC15style,
    onEachFeature: diffC15EachFeature
});
