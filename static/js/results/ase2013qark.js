var legendASE2013qark = L.control({position: 'topright'});
var infoASE = L.control({position: 'bottomright'});

//ASE 2013 /////////////////
function asestyle(feature) {
  return {
    fillColor: getColorASE2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorASE2013qark(d) {
  return d > 70 ? '#4a1486' :
         d > 60 ? '#6a51a3' :
         d > 50 ? '#807dba' :
         d > 40 ? '#9e9ac8' :
         d > 30 ? '#bcbddc' :
                  'gray';
      }


function ase2013highlightFeature(e) {
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
     infoASE.update(layer.feature.properties);
  }

function ase2013resetHighlight(e) {
      ase2013geojson.resetStyle(e.target);
      infoASE.update();
  }

function ase2013EachFeature(feature, layer) {
      layer.on({
          mouseover: ase2013highlightFeature,
          mouseout: ase2013resetHighlight
      });
    }

infoASE.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoASE.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>' + totalVotes + ': ' + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + ': ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
    + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
    + '<h4>' + wonSeats + ': ' + props.seats + '</h4>'
    + '</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoASE.addTo(map);
//END ASE 2013 /////////////////////////////////////

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendASE2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [30, 40, 50, 60, 70],
          labels = ['<h5>ASHE ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };


    legendASE2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
          '<i style="background: ' + getColorASE2013qark(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

//ASE
var ase2013geojson = L.geoJson(ase2013, {
    style: asestyle,
    onEachFeature: ase2013EachFeature
});
