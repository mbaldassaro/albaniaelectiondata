var infoKomVT = L.control({position: 'bottomright'});

//KOM VT 2013 /////////////////////////////////////
function komvtstyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
  return d > 70 ? '#8c2d04' :
         d > 60 ? '#cc4c02' :
         d > 50 ? '#ec7014' :
         d > 40 ? '#fe9929' :
         d > 30 ? '#fec44f' :
         d > 20 ? '#fee391' :
                  '#ffffd4';
      }
  }

function komvt2013highlightFeature(e) {
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
     infoKomVT.update(layer.feature.properties);
  }

function komvt2013resetHighlight(e) {
      turnout2013Komgeojson.resetStyle(e.target);
      infoKomVT.update();
  }

function komvt2013EachFeature(feature, layer) {
      layer.on({
          mouseover: komvt2013highlightFeature,
          mouseout: komvt2013resetHighlight,
          click: zoomToFeature
      });
    }

infoKomVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoKomVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.komune + '</h3>'
    + '<h4>' + voterReg + props.registeredVoters + '</h4>'
    + '<h4>' + voterTot + props.totalVoters + '</h4>'
    + '<h4>' + turnout + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoKomVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

//VTKom
var turnout2013Komgeojson = L.geoJson(turnout2013Kom, {
    style: komvtstyle,
    onEachFeature: komvt2013EachFeature
});
//END KOM VT 2013
