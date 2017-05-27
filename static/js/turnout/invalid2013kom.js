var legendINV2013kom = L.control({position: 'topright'});
var infoKomINV = L.control({position: 'bottomright'});

//KOM INV 2013 /////////////////////////////////////
function kominvstyle(feature) {
  return {
    fillColor: getColorINV2013kom(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorINV2013kom(d) {
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

function kominv2013highlightFeature(e) {
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
     infoKomINV.update(layer.feature.properties);
  }

function kominv2013resetHighlight(e) {
      invalid2013komgeojson.resetStyle(e.target);
      infoKomINV.update();
  }

function kominv2013EachFeature(feature, layer) {
      layer.on({
          mouseover: kominv2013highlightFeature,
          mouseout: kominv2013resetHighlight,
          click: zoomToFeature
      });
    }

infoKomINV.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoKomINV.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.komune + '</h3>'
    + '<h4>' + castBallot + ': ' + props.ballotsCast + '</h4>'
    + '<h4>' + votesInv + ': ' + props.invalidVotes + '</h4>'
    + '<h4>' + pctInv + ': ' + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoKomINV.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendINV2013kom.onAdd = function(map) {
              this._div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 1, 2, 3, 4, 5],
              labels = ['<h5>' + pctInv + '</h5>'];
              this.update();
              return this._div;
      };

        legendINV2013kom.update = function(e) {
          for (var i = 0; i < grades.length; i++) {
            labels.push(
              '<i style="background: ' + getColorINV2013kom(grades[i] + 1) + '"></i> '
              + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
              + '%<br>' : '%+'));
            }
          this._div.innerHTML = labels.join('');
          return this._div;
        };


  //INVKom
  var invalid2013komgeojson = L.geoJson(invalid2013kom, {
    style: kominvstyle,
    onEachFeature: kominv2013EachFeature
  });

//END KOM INV 2013
