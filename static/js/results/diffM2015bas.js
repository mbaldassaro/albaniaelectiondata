var legendDiff2015M = L.control({position: 'bottomright'});
var infoDiffM15 = L.control({position: 'bottomright'});

//DIFF 2015 Mayor ///////////////
function diffM15style(feature) {
  return {
    fillColor: getColorDiff2015M(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorDiff2015M(d) {
  return d > 40 ? '#4a1486' :
         d > 25 ? '#6a51a3' :
         d > 10 ? '#807dba' :
         d > 0 ?  '#bcbddc' :
        // d > -0 ? 'gray' :
         d > -10 ? '#9ecae1' :
         d > -25 ? '#4292c6' :
         d > -50 ? '#2171b5' :
                  'gray';
      }



function diffM15highlightFeature(e) {
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
     infoDiffM15.update(layer.feature.properties);
  }

function diffM15resetHighlight(e) {
      diffMayor2015basgeojson.resetStyle(e.target);
      infoDiffM15.update();
  }

function diffM15EachFeature(feature, layer) {
      layer.on({
          mouseover: diffM15highlightFeature,
          mouseout: diffM15resetHighlight,
          click: zoomToFeature
      });
    }

infoDiffM15.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoDiffM15.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    //+ '<h5>Registered Voters: ' + props.registeredVoters + '</h5>'
    + '<h5>' + totalVotes + ': ' + props.totalMayor + '</h5>'
    + '<h4>' + props.partyASE + '</h4>'
    + '<h5>' + recVotes + ': ' + props.aseMayor + '</h5>'
    + '<h5>' + pctVote + ': ' + props.asePCT + '%</h5>'
    + '<h4>' + props.partyAPPD + '</h4>'
    + '<h5>' + recVotes + ': ' + props.appdMayor + '</h5>'
    + '<h5>' + pctVote + ': ' + props.appdPCT + '%</h5>'
    + '<h5>' + diff + ': ' + props.percent + '%</h5>'
    + '<h5>' + otherVotes + ': ' + props.otherMayor + '</h5>'
    + '<h5>' + otherPct + ': ' + props.otherPCT + '%</h5>'
    + '' : '')
  };

//infoDiffM15.addTo(map);
// END 2015 Diff Mayor

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendDiff2015M.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [-40, -25, -10, 1, 10, 25, 40],
            range = ['25-40%', '10-25%', '0-10%', '0-10%', '10-25%', '25-40%', '40%+'],
          labels = ['<h5>ASHE-APPD ' + diff + '</h5>'];
          this.update();
          return this._div;
  };

    legendDiff2015M.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorDiff2015M(grades[i] + 1) + '"></i> '
          + (grades[i] ? range[i] + '<br>' : '+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

//Diff Bas Mayor
var diffMayor2015basgeojson = L.geoJson(diffMayor2015bas, {
      style: diffM15style,
      onEachFeature: diffM15EachFeature
  });
