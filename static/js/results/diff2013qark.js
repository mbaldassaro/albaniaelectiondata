//var legendDiff2013qark = L.control({position: 'topright'});
var legendDiff2013qark = L.control({position: 'bottomright'});
var infoDiff = L.control({position: 'bottomright'});

//qark diff 2013 //////////////
function diffstyle(feature) {
  return {
    fillColor: getColorDiff2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorDiff2013qark(d) {
  return d > 40 ? '#4a1486' :
         d > 25 ? '#6a51a3' :
         d > 10 ? '#807dba' :
         d > 1 ?  '#bcbddc' :
         d > -10 ? '#9ecae1' :
         d > -25 ? '#4292c6' :
                  'gray';
      }
      // d > -40 ? '#084594' :

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
    this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
    + '<h4>' + props.partyASE + '</h4>'
    + '<h5>' + recVotes + ': ' + props.votesASE + '</h5>'
    + '<h5>' + pctVote + ': ' + props.ashePCT + '%</h5>'
    + '<h5>' + wonSeats + ': ' + props.seatsASE + '</h5>'
    + '<h4>' + props.partyAPMI + '</h4>'
    + '<h5>' + recVotes + ': ' + props.votesAPMI + '</h5>'
    + '<h5>' + pctVote + ': ' + props.apmiPCT + '%</h5>'
    + '<h5>' + wonSeats + ': ' + props.seatsAPMI + '</h5>'
    + '<h5>' + diff + ': ' + props.percent + '%</h5>'
    + '<h5>' + otherVotes + ': ' + props.votesOther + '</h5>'
    + '<h5>' + pctVote + ': ' + props.otherPCT + '%</h5>'
    + '' : '')
  };

//infoDiff.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendDiff2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [-25, -10, 1, 10, 25, 40],
          range = ['10-25%', '0-10%', '0-10%', '10-25%', '25-40%', '40%+'],
          labels = ['<h5>ASHE-APMI ' + diff + '</h5>'];
          this.update();
          return this._div;
  };


    legendDiff2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorDiff2013qark(grades[i] + 1) + '"></i> '
            + (grades[i] ? range[i] + '<br>' : '+'));
        }
      this._div.innerHTML = labels.join('');
      //return this._div;
    };



//diff
var qarkdiff2013geojson = L.geoJson(qarkDiff2013, {
    style: diffstyle,
    onEachFeature: diff2013EachFeature
})
