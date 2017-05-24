var infoPDIU = L.control({position: 'bottomright'});


//PDIU 2013 ////////////////////////////////////////////
function pdiustyle(feature) {
  return {
    fillColor: getColor(feature.properties.percent),
    weight: 0.5,
    opacity: 1,
    color: '#FFFFFF',
    dashArray: '0',
    fillOpacity: 0.5
  }

function getColor(d) {
    return d > 5 ? '#3690c0' :
           d > 2 ? '#9ecae1' :
           d > 0 ? '#f7fbff' :
                    '#ffffff';
      }
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
    + '<h4>' + totalVotes + props.totalVotes + '</h4>'
    + '<h4>' + totalSeats + props.totalSeats + '</h4>'
    + '<h3>' + props.party + '</h3>'
    + '<h4>' + pctVote + props.percent + '%</h4>'
    + '<h4>' + recVotes + props.votes + '</h4>'
    + '<h4>' + wonSeats + props.seats + '</h4>'
    + '</h4><br><br><br><br><br><br><br><br><br><br><br><br><br><br>' + '' : '')
  };

infoPDIU.addTo(map);


//ALL  /////////////
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
//PDIU
var pdiu2013geojson = L.geoJson(pdiu2013, {
    style: pdiustyle,
    onEachFeature: pdiu2013EachFeature
});

//END PDIU 2013 /////////////////////////////////////
