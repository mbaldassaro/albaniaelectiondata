var infoQarkVT = L.control({position: 'bottomright'});

//QARK VT 2013 /////////////////////////////////////
function qarkvtstyle(feature) {
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

function qarkvt2013highlightFeature(e) {
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
     infoQarkVT.update(layer.feature.properties);
  }

function qarkvt2013resetHighlight(e) {
      turnout2013qarkgeojson.resetStyle(e.target);
      infoQarkVT.update();
  }

function qarkvt2013EachFeature(feature, layer) {
      layer.on({
          mouseover: qarkvt2013highlightFeature,
          mouseout: qarkvt2013resetHighlight
          //click: zoomToFeature
      });
    }

infoQarkVT.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

infoQarkVT.update = function(props) {
    this._div.innerHTML = (props ? '<h3>' + props.name + '</h3>'
      + '<h4>' + voterReg + props.registeredVoters + '</h4>'
      + '<h4>' + voterTot + props.totalVoters + '</h4>'
      + '<h4>' + turnout + props.percent + '%</h4>'
    + '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoQarkVT.addTo(map);

//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  //VTQark
  var turnout2013qarkgeojson = L.geoJson(turnout2013qark, {
      style: qarkvtstyle,
      onEachFeature: qarkvt2013EachFeature
  });

//END QARK VT 2013
