var legendPdiuQark2017 = L.control({position: 'bottomright'});
var infoPdiuQark2017 = L.control({position: 'bottomright'});

//////////////////////////////////////////////
function pdiuQark2017style(feature) {
  return {
    fillColor: getColorPdiuQark2017(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }
}

function getColorPdiuQark2017(d) {
  return     d > 10 ? '#c6dbef' :
             d > 0 ? '#eff3ff' :
             '#ffffff';
      }

function pdiuQark2017highlightFeature(e) {
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
     infoPdiuQark2017.update(layer.feature.properties);
  }

function pdiuQark2017resetHighlight(e) {
      pdiuQark2017geojson.resetStyle(e.target);
      infoPdiuQark2017.update();
  }

function pdiuQark2017EachFeature(feature, layer) {
      layer.on({
          mouseover: pdiuQark2017highlightFeature,
          mouseout: pdiuQark2017resetHighlight
      });
    }

infoPdiuQark2017.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoPdiuQark2017.update = function(props) {
  this._div.innerHTML = (props ? '<h4>' + props.name + '</h4>'
  + '<h5>' + totalVotes + ': ' + props.validVotes + '</h5>'
  + '<h5>' + recVotes + ': ' + props.pdiu + '</h5>'
  + '<h5>' + pctVote + ': ' + props.percent + '%</h5>'
  + '<h5>' + totalSeats + ': ' + props.totalSeats + '</h5>'
  + '<h5>' + wonSeats + ': ' + props.pdiuSeats + '</h5>'
  + '' : '');
  };

//infoPD.addTo(map);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  legendPdiuQark2017.onAdd = function(map) {
          this._div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10],
          labels = ['<h5>PDIU ' + pctVote + '</h5>'];
          this.update();
          return this._div;
  };

    legendPdiuQark2017.update = function(e) {
      for (var i = 0; i < grades.length; i++) {
        //this._div.innerHTML +=
        labels.push(
          '<i style="background: ' + getColorPdiuQark2017(grades[i] + 1) + '"></i> '
          + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1]
          + '%<br>' : '%+'));
        }
      this._div.innerHTML = labels.join('');
      return this._div;
    };

  //PD
var pdiuQark2017geojson = L.geoJson(pdiuQark2017, {
      style: pdiuQark2017style,
      onEachFeature: pdiuQark2017EachFeature
  });
//END PD /////////////////////////////////////
