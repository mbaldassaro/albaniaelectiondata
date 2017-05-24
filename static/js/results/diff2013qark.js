var infoDiff = L.control({position: 'bottomright'});

//qark diff 2013 //////////////
function diffstyle(feature) {
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

function diff2013highlightFeature(e) {
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
     infoDiff.update(layer.feature.properties);
  }

function diff2013resetHighlight(e) {
      qarkdiff2013geojson.resetStyle(e.target);
      infoDiff.update();
  }

function diff2013EachFeature(feature, layer) {
      layer.on({
          mouseover: diff2013highlightFeature,
          mouseout: diff2013resetHighlight
      });
    }

infoDiff.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoDiff.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>' + totalVotes + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + props.totalSeats + '</h4>'
    + '<h3>' + props.partyASE + '</h3>'
    + '<h4>' + recVotes + props.votesASE + '</h4>'
    + '<h4>' + pctVote + props.ashePCT + '%</h4>'
    + '<h4>' + wonSeats + props.seatsASE + '</h4>'
    + '<h3>' + props.partyAPMI + '</h3>'
    + '<h4>' + recVotes + props.votesAPMI + '</h4>'
    + '<h4>' + pctVote + props.apmiPCT + '%</h4>'
    + '<h4>' + wonSeats + props.seatsAPMI + '</h4><br>'
    + '<h4>' + diff + props.percent + '%</h4><br>'
    + '<h4>' + otherVotes + props.votesOther + '</h4>'
    + '<h4>' + pctVote + props.otherPCT + '%</h4>'
    + '<br><br><br><br><br><br>' + '' : '')
  };

infoDiff.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//diff
var qarkdiff2013geojson = L.geoJson(qarkDiff2013, {
    style: diffstyle,
    onEachFeature: diff2013EachFeature
})
