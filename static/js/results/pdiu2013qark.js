var legendPDIU2013qark = L.control({position: 'topright'});
var infoPDIU = L.control({position: 'bottomright'});

//PDIU 2013 ////////////////////////////////////////////
function pdiustyle(feature) {
  return {
    fillColor: getColorPDIU2013qark(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPDIU2013qark(d) {
    return d > 5 ? '#3690c0' :
           d > 2 ? '#9ecae1' :
           d > 0 ? '#f7fbff' :
                    '#ffffff';
      }

function pdiu2013highlightFeature(e) {
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
     infoPDIU.update(layer.feature.properties);
  }

function pdiu2013resetHighlight(e) {
      pdiu2013geojson.resetStyle(e.target);
      infoPDIU.update();
  }

function pdiu2013EachFeature(feature, layer) {
      layer.on({
          mouseover: pdiu2013highlightFeature,
          mouseout: pdiu2013resetHighlight//,
          //click: zoomToFeature
      });
    }

infoPDIU.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPDIU.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
    + '<h4>' + totalVotes + ': ' + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + ': ' + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + ': ' + props.percent + '%</h4>'
    + '<h4>' + recVotes + ': ' + props.votes + '</h4>'
    + '<h4>' + wonSeats + ': ' + props.seats + '</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoPDIU.addTo(map);
//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPDIU2013qark.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 2, 5],
          labels = ['<h5>PDIU ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPDIU2013qark.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        labels.push(
      '<i style="background: ' + getColorPDIU2013qark(grades[i] + 1) + '"></i> '
      + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
      + '%<br>' : '%+'));
    }
      this._div.innerHTML = labels.join('');
      return this._div;
    };
//PDIU
var pdiu2013geojson = L.geoJson(pdiu2013, {
    style: pdiustyle,
    onEachFeature: pdiu2013EachFeature
});

//END PDIU 2013 /////////////////////////////////////
