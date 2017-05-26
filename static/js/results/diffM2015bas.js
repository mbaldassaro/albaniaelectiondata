var infoDiffM15 = L.control({position: 'bottomright'});

//DIFF 2015 Mayor ///////////////
function diffM15style(feature) {
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
         d == 0 ? 'gray' :
         d > -10 ? '#4292c6' :
         d > -25 ? '#2171b5' :
         d > -50 ? '#084594' :
                  'gray';
      }
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
    this._div.innerHTML = (props ? '<h3>' + props.bashkia + '</h3>'
    //+ '<h4>Registered Voters: ' + props.registeredVoters + '</h4>'
    + '<h4>' + totalVotes + props.totalMayor + '</h4><br>'
    + '<h3>' + props.partyASE + '</h3>'
    + '<h4>' + recVotes + props.aseMayor + '</h4>'
    + '<h4>' + pctVote + props.asePCT + '%</h4><br>'
    + '<h3>' + props.partyAPPD + '</h3>'
    + '<h4>' + recVotes + props.appdMayor + '</h4>'
    + '<h4>' + pctVote + props.appdPCT + '%</h4><br>'
    + '<h4>' + diff + props.percent + '%</h4><br>'
    + '<h4>' + otherVotes + props.otherMayor + '</h4>'
    + '<h4>' + otherPct + props.otherPCT + '%</h4>'
    + '<br><br><br><br><br><br><br>' + '' : '')
  };

infoDiffM15.addTo(map);
// END 2015 Diff Mayor

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//Diff Bas Mayor
var diffMayor2015basgeojson = L.geoJson(diffMayor2015bas, {
      style: diffM15style,
      onEachFeature: diffM15EachFeature
  });
