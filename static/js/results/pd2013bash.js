var legendPD2013bas = L.control({position: 'bottomright'});
var infoBasPD = L.control({position: 'bottomright'});

//PD BAS 2013 ////////////////////////////////////////////
function pdbasstyle(feature) {
  return {
    fillColor: getColorPD2013bas(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPD2013bas(d) {
  return d > 50 ? '#2171b5' :
         d > 40 ? '#4292c6' :
         d > 30 ? '#6baed6' :
         d > 20 ? '#9ecae1' :
         d > 10 ? '#c6dbef' :
         d > 0 ?  '#eff3ff' :
                  "gray";
    }


function pdbas2013highlightFeature(e) {
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
     infoBasPD.update(layer.feature.properties);
  }

function pdbas2013resetHighlight(e) {
      pd2013basgeojson.resetStyle(e.target);
      infoBasPD.update();
  }

function pdbas2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pdbas2013highlightFeature,
          mouseout: pdbas2013resetHighlight,
          click: zoomToFeature
      });
    }

infoBasPD.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoBasPD.update = function(props) {
    this._div.innerHTML = (props ? '<h4>' + props.bashkia + '</h4>'
    + '<h4>' + props.party + '</h4>'
    + '<h5>' + totalVotes + ': ' + props.totalVotes + '</h5>'
    + '<h5>' + recVotes + ': ' + props.votes + '</h5>'
    + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
    + '' : '')
  };

//infoBasPD.addTo(map);

//PD BAS
var pd2013basgeojson = L.geoJson(pd2013bas, {
    style: pdbasstyle,
    onEachFeature: pdbas2013EachFeature
});

legendPD2013bas.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50],
        labels = ['<h5>PD ' + pctVote + '</h5>'];
        this.update();
        return this._div;
};

  legendPD2013bas.update = function(e) {
    for (var i = 0; i < grades.length; i++) {
      //this._div.innerHTML +=
      labels.push(
        '<i style="background: ' + getColorPD2013bas(grades[i] + 1) + '"></i> '
        + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
        + '%<br>' : '%+'));
      }
    this._div.innerHTML = labels.join('');
    return this._div;
  };

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//END PD BAS 2013 /////////////////////////////////////
