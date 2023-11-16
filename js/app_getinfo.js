//map the wms id with layer get info id


// consider mapip for layer atrribute
var layer_GetAttList = {
  "0": {
    GeoName: "EEZ Name",
    Pol_type: "Type"
  },
  "1": {
    Line_name: "Name",
    Line_type: "Type"
  },
  "2": {
    ECS_ID_NUM: "ECS Id",
    STATE: "State"
  },
  "4": {
    NAME_LONG: "State Name",
    TYPE: "Sovereign country"
  },
  "5": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "6": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "7": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "8": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "9": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "10": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "11": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "12": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  },
  "13": {
    ECS_ID_NUM: "ECS Id ",
    STATE: "State"
  }

}


//rater list to avoide mouse click enable
//var rasterList = "0,1,2,3,4,5,6,7,8,9,10,11,eez_boundaries,eez";

var arcgis_mapid = ("0,1,2,4,5,6,7,8,9,10,11,12,13").split(",");
//var geosever_mapid="eez_boundaries,eez".split(",");


//rasterList = rasterList.split(",");
var LayerName_keys = Object.keys(layer_GetAttList);

//Function to load layer list in a combobox
//Function to create a key value pair for legend  dictionary
var legDic;
//to be remove
legendDicnary();
public: function legendDicnary() {

  legDic = [];
  $('#lgList')[0].options.length = 0;
  var keyVal;
  overlays.forEach(objLay => {

    for (keyObj in objLay.layers) {
      keyVal = objLay.layers[keyObj];

      if ((LayerName_keys.indexOf(keyVal.options.mapid + "") > -1) && (map.hasLayer(keyVal))) {
        //add options
        var x = document.getElementById("lgList");
        var option = document.createElement("option");
        option.text = keyObj;
        x.add(option);

        legDic.push({
          key: keyObj,
          value: keyVal
        });

      }

    }

  });
  //add adefult selected layer tag
  var x1 = document.getElementById("lgList");
  var option1 = document.createElement("option");
  option1.text = "--Select a Layer--";
  x1.add(option1);
  //$('#lgList').val('--Select a Layer--');


}





//add the event to add layer on drodown slection 
var valCon = null;
var selected = "";


map.on('overlayadd', function (e) {

  legendDicnary();
  infoLayer.clearLayers();
  $('#lgList').val(e.name);

  if ($('#lgList').val() == null) {

    $('#lgList').val("--Select a Layer--");
  }


});
map.on('overlayremove ', function (e) {

  legendDicnary();
  infoLayer.clearLayers();

});




$("#lgList").on('change', function () {
  //layerJsonFromGeoserver()
});





//hold the ref of relected table row
var rowId_Selecetd=null;

//click event for raster
map.on("click", function (e) {
  highlight.clearLayers();
  selected = $('#lgList option:selected').val();
  valCon = legDic.filter(val => val.key == selected)[0].value
  if (selected != "--Select a Layer--") {
    getFeatureInfo(e);
  }
  if(rowId_Selecetd)
  {

    rowId_Selecetd.removeClass();
  }

});


//Function will identify the layer on click and its info
//List the map id



function getFeatureInfo(e) {



  if (map.hasLayer(valCon) && (LayerName_keys.indexOf(valCon.options.mapid + "") > -1)) {


    if (arcgis_mapid.indexOf(valCon.options.mapid + "") > -1) {
      valCon.identify().on(map).at(e.latlng).tolerance(10).layers('visible:' + valCon.options.layers).run(function (error, featureCollection) {

        if (featureCollection.features.length > 0) {

          highlight_boundary_popup(featureCollection, e, "arcgis");


          rowId_Selecetd=null;
          //to be continue        
          switch (valCon.options.layers + "") {

            case "1":
              var indexes = Points_Submissions_temp.rows().eq(0).filter(function (rowIdx) {
                return Points_Submissions_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Points_Submissions_temp.rows().nodes().to$().hasClass('selected')) {
                Points_Submissions_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Points_Submissions_temp.rows(indexes).nodes().to$().addClass('selected');

              break;


              case "2":
              var indexes = Reccomendation_Feature_temp.rows().eq(0).filter(function (rowIdx) {
                return Reccomendation_Feature_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Reccomendation_Feature_temp.rows().nodes().to$().hasClass('selected')) {
                Reccomendation_Feature_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd =   Reccomendation_Feature_temp.rows(indexes).nodes().to$().addClass('selected');

              break;


              case "3":
              var indexes = Foot_of_Slope_temp.rows().eq(0).filter(function (rowIdx) {
                return Foot_of_Slope_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Foot_of_Slope_temp.rows().nodes().to$().hasClass('selected')) {
                Foot_of_Slope_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Foot_of_Slope_temp.rows(indexes).nodes().to$().addClass('selected');

              break;


              case "4":
              var indexes = Subcomissions_Statuse_temp.rows().eq(0).filter(function (rowIdx) {
                return Subcomissions_Statuse_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Subcomissions_Statuse_temp.rows().nodes().to$().hasClass('selected')) {
                Subcomissions_Statuse_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Subcomissions_Statuse_temp.rows(indexes).nodes().to$().addClass('selected');

              break;


              case "5":
              var indexes = Submissions_Line_temp.rows().eq(0).filter(function (rowIdx) {
                return Submissions_Line_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Submissions_Line_temp.rows().nodes().to$().hasClass('selected')) {
                Submissions_Line_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Submissions_Line_temp.rows(indexes).nodes().to$().addClass('selected');

              break;


              case "6":
              var indexes = Recommendations_Line_temp.rows().eq(0).filter(function (rowIdx) {
                return Recommendations_Line_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Recommendations_Line_temp.rows().nodes().to$().hasClass('selected')) {
                Recommendations_Line_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Recommendations_Line_temp.rows(indexes).nodes().to$().addClass('selected');

              break;

              case "7":
              var indexes = Revisions_Line_temp.rows().eq(0).filter(function (rowIdx) {
                return Revisions_Line_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Revisions_Line_temp.rows().nodes().to$().hasClass('selected')) {
                Revisions_Line_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd =  Revisions_Line_temp.rows(indexes).nodes().to$().addClass('selected');

              break;

              case "8":
              var indexes = Not_Under_Consideration_temp.rows().eq(0).filter(function (rowIdx) {
                return Not_Under_Consideration_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Not_Under_Consideration_temp.rows().nodes().to$().hasClass('selected')) {
                Not_Under_Consideration_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Not_Under_Consideration_temp.rows(indexes).nodes().to$().addClass('selected');

              break;

              case "11":
              var indexes = Geomorphic_temp.rows().eq(0).filter(function (rowIdx) {
                return Geomorphic_temp.rows(rowIdx).data()[0].att.OBJECTID + "" === featureCollection.features[0].properties.OBJECTID + "" ? true : false;
              });

              if (Geomorphic_temp.rows().nodes().to$().hasClass('selected')) {
                Geomorphic_temp.rows().nodes().to$().removeClass('selected');
              }
              rowId_Selecetd = Geomorphic_temp.rows(indexes).nodes().to$().addClass('selected');
              break;

            default:
              break;




          }





        }

      });
    }

   

     

    /*   if (geosever_mapid.indexOf(valCon.options.mapid + "") > -1) {
   //$("#loading").show();
      
    var url = getFeatureInfoUrl(map, valCon, e.latlng, {
          'info_format': 'application/json',
   
        }); 
  
  url ="http://geo.vliz.be:80/geoserver/MarineRegions/ows?REQUEST=GetFeatureInfo&SERVICE=WMS&SRS=EPSG%3A4326&STYLES=&BUFFER=10&TRANSPARENT=true&VERSION=1.1.1&FORMAT=image%2Fpng&BBOX=-52.82226562499999%2C-39.0277188402116%2C116.103515625%2C35.53222622770337&HEIGHT=916&WIDTH=1922&LAYERS=MarineRegions%3Aeez&QUERY_LAYERS=MarineRegions%3Aeez&INFO_FORMAT=application%2Fjson&X=1222&Y=515";
  
  
        // Write ajex query to retrive data from wms layer
        $.ajax({
          url: url,
          async: false,
          dataType: 'json',
          crossDomain: false,
          success: function (data) {
           
            highlight_boundary_popup(data, e, "geoserver");
         
          }, error: function (xhr, status, error) {
            console.log(error);
            $("#loading").hide();
          }
        });
  
      }
  */

  }
  else {
    $("#loading").hide();

  }

}






//function will highlight the boundary
 //function to remove selected rwo form table

function highlight_boundary_popup(data, e, serverType) {

  


  var content = "<table class='table table-bordered table-condensed'>";
  if (data.features.length > 0) {

    var layID = layer_GetAttList[valCon.options.mapid + ""]


    $.each(layID, function (key, value) {
      //console.log(key, value);

      content = content + "<tr><td><b>" + value + "</b></td><td>" + data.features[0].properties[key] + "</td></tr>"


    });
    $("#loading").hide();
    content = content + "<table>";

    var caseVal = ((data.features[0].geometry != null) ? data.features[0].geometry.type.toString() : 'raster');

    if (caseVal == "LineString") { caseVal = "MultiLineString"; }
    if (caseVal == "Polygon") { caseVal = "MultiPolygon"; }
  
   
   
    switch (caseVal) {
      case "Point":
        var pt = L.point(data.features[0].geometry.coordinates);
        pt = crack_antimaredian(pt, "Point");
         L.popup({ maxWidth: 800 }).setLatLng([pt[0][0], pt[0][1]]).setContent(content).openOn(map);
        highlight.clearLayers().addLayer(L.circleMarker([pt[0][0], pt[0][1]], highlightStyle));
        break;

      case "MultiPolygon":
     L.popup({ maxWidth: 800 }).setLatLng(e.latlng).setContent(content).openOn(map);
        if (serverType == "geoserver") {
          var polyArray = crack_antimaredian(data.features[0].geometry.coordinates[0], "MultiPolygon");
          var polygon_poly = L.polygon(polyArray);
          highlight.clearLayers().addLayer(L.polygon(polygon_poly.getLatLngs(), polyhighlightStyle));
        }
        if (serverType == "arcgis") {
          highlight.clearLayers().addLayer(L.geoJson(data.features[0], polyhighlightStyle));
        }

        break;

      case "MultiLineString":

      L.popup({ maxWidth: 800 }).setLatLng(e.latlng).setContent(content).openOn(map);
        if (serverType == "geoserver") {
          var polyArray = crack_antimaredian(data.features[0].geometry.coordinates[0], "MultiLineString");
          var polygon_line = L.polyline(polyArray);
          highlight.clearLayers().addLayer(L.polyline(polygon_line.getLatLngs(), polyhighlightStyle));
        }
        if (serverType == "arcgis") {
          highlight.clearLayers().addLayer(L.geoJson(data.features[0], polyhighlightStyle));
        }

        break;

      case "raster":
       L.popup({ maxWidth: 800 }).setLatLng(e.latlng).setContent(content).openOn(map);
        highlight.clearLayers().addLayer(L.circleMarker(e.latlng, highlightStyle));
        break;

      default:
        break;
      //  console.load(layer.feature.geometry.type)
    }

  }
  else {
    $("#loading").hide();
  }


  $(".leaflet-popup-close-button").on('click', function(event){
        
    if(rowId_Selecetd)
    {

      rowId_Selecetd.removeClass();
    }
  
  });



}








//Functions will return the  feture from the wms layer and also its geometries to hilight

function mapPolygon(poly) {
  return poly.map(function (line) {
    return mapLineString(line);
  });
}

function mapLineString(line) {
  return line.map(function (d) {
    return [d[1], d[0]];
  });
}

function getFeatureInfoUrl(map, layer, latlng, params) {


  var point = map.latLngToContainerPoint(latlng, map.getZoom()),
    size = map.getSize();


  var defaultParams = {
    request: 'GetFeatureInfo',
    service: 'WMS',
    srs: 'EPSG:4326',
    styles: '',
    //increase the tolrance for click
    buffer: 10,
    transparent: layer.options.transparent,
    version: layer.options.version,
    format: layer.options.format,
    bbox: map.getBounds().toBBoxString(),
    height: size.y,
    width: size.x,
    layers: layer.options.layers,
    query_layers: layer.options.layers,
    info_format: 'application/json',
  };

  params = L.Util.extend(defaultParams, params || {});

  params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
  params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

  return layer._url + L.Util.getParamString(params, layer._url, true);

}




public: function crack_antimaredian(arrayObj, geoType) {
  var geoArray = [];

  switch (geoType) {
    case "Point":
      if (arrayObj.x < 0) {
        arrayObj.x += 360;
      }
      geoArray.push([arrayObj.y, arrayObj.x]);
      break;

    case "MultiPolygon":
      arrayObj.forEach(function (locArray) {
        locArray.forEach(function (loc) {
          if (loc[0] < 0) {
            loc[0] += 360;
          }
          geoArray.push([loc[1], loc[0]]);
        });
      });
      break;

    case "MultiLineString":
      arrayObj.forEach(function (loc) {
        if (loc[0] < 0) {
          loc[0] += 360;
        }
        geoArray.push([loc[1], loc[0]]);
      });
      break;

    default:
      break;

  }

  return geoArray;

} 