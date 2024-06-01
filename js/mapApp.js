/*var Points_Submissions_array = null;
var Submissions_Line_array = null;
var Foot_of_Slope_array = null;
var Reccomendation_Feature_array = null;
var Recommendations_Line_array = null;
var Subcomissions_Statuse_array = null;
var Revisions_Line_array = null;
var Not_Under_Consideration_array = null;
var Geomorphic_array = null;


//object hold the table refrence
var Geomorphic_temp = null;
var Foot_of_Slope_temp  = null;
var Not_Under_Consideration_temp = null;
var Revisions_Line_temp = null;
var Subcomissions_Statuse_temp = null;
var Recommendations_Line_temp = null;
var Reccomendation_Feature_temp = null;
var Submissions_Line_temp = null;
var Points_Submissions_temp = null;*/




$(window).resize(function () {
  sizeLayerControl();

});


$("#about-btn").click(function () {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function () {

//to be done

  //ecs_country.query().run(function (error, geojson, response) {  map.fitBounds(L.geoJson(geojson).getBounds()); });



  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function () {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function () {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function () {

  return false;
});

$("#nav-btn").click(function () {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function () {

  return false;
});

$("#sidebar-hide-btn").click(function () {
  animateSidebar();
  return false;
});

$("#btnInfo-hide-btn").click(function () {
  animateSidebar();
  return false;
});




//Layer styles
function styleEEZpoly(feature) {
  let style = {
    color: '#000000',        // Default outline color
    weight: 0,              // Default outline weight
    opacity: 0,           // Default outline opacity
    fillOpacity: 0.2,       // Default fill opacity
    fillColor: '#FFFFFF'    // Default fill color
  };

  switch (feature.properties.POL_TYPE) {
    case '200NM':
      style.fillColor = '#0000FF';
      break;
    case 'Joint regime':
      style.fillColor = '#00FF00';
      break;
    case 'Overlapping claim':
      style.fillColor = '#FF0000';
      break;
  }

  return style;
  
}

function styleEEZline(feature) {
  let style = {
    color: '#000000',
    weight: 1.2,
    opacity: 0.7,
    fillOpacity: 0,
    fillColor: '#FFFFFF'
  };

  switch (feature.properties.LINE_TYPE) {
    case '200 NM':
    case '12 NM':
      style.color = '#ADD8E6';
      break;
    case 'Treaty':
    case 'Court ruling':
      style.color = '#0000FF';
      break;
    case 'Connection line':
    case 'Median line':
      style.color = '#FFFF00';
      break;
    case 'Joint regime':
      style.color = '#00FF00';
      break;
    case 'Unilateral claim (undisputed)':
    case 'Unsettled (land)':
    case 'Unsettled (maritime)':
    case 'Unsettled median line (land)':
    case 'Unsettled median line (maritime)':
      style.color = '#FF0000';
      break;

  }

  return style;
  
}

function styleECSline(feature) {
  let style = {
    color: '#000000',
    weight: 2.4,
    opacity: 1,
    fillOpacity: 0,
    fillColor: '#FFFFFF'
  };

  switch (feature.properties.Status) {
    case 'Submission awaiting consideration':
      style.color = '#d3d3d3';
      break;
    case 'Submission under active consideration':
      style.color = '#FFCCCB';
      break;
    case 'Submission with recommendations':
      style.color = '#98FB98';
      break;
    case 'Submission with recommendations followed by deposit':
      style.color = '#00FFFF';
      break;
  }

  return style;
  
}

function styleWorldBoundaries(feature) {
  return {
    color: 'white',
    weight: 0,
    opacity: 0       
  };
}

//Get URL parameters and create filter condition
function getUrlParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

var map_id = getUrlParam('map_id');
var con_name = getUrlParam('con_name');

var filterCondition = "1=1";
if (map_id && map_id !== 'NOT') {
  filterCondition = "State LIKE '%"+ con_name + "%'";
}


//Basemaps
var arcgisOnline = new L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; arcgisonline.com',
    maxZoom: 30,
  });

var oceanLayer = L.esri.basemapLayer("Oceans");


//add the map control and center it
map = L.map('map', {
  zoom: 3,
  center: [22.355, 21.109],
  layers: [oceanLayer],
  zoomControl: false,
  attributionControl: false
});

//GRID ArcGIS base url

var base_url="https://services1.arcgis.com/ZdmoaKLXhx5EdwBs/arcgis/rest/services";

var EEZ_poly_url=base_url.concat("/eez_v12_lowres_feature/FeatureServer/0");
var EEZ_line_url=base_url.concat("/MarineRegions_EEZ_line/FeatureServer/0");
var ECS_line_url=base_url.concat("/ECS_Submissions_Line/FeatureServer/0");
var boundaries_url=base_url.concat("/WorldAdminBoundaries/FeatureServer/0")
var geomorphology_url="https://oceans1.arcgis.com/arcgis/rest/services/World_Seafloor_Geomorphology/MapServer";

//ECS Submissions Line
var ECS_submission_line = L.esri.featureLayer({
  url: ECS_line_url,
  style: styleECSline,
  where: filterCondition
})

//EEZ Boundaries Polygon
var EEZ_boundary_poly = L.esri.featureLayer({
  url: EEZ_poly_url,  
  style: styleEEZpoly
})

var EEZ_boundary_line = L.esri.featureLayer({
  url: EEZ_line_url,
  style: styleEEZline,
  where: "LINE_TYPE NOT IN ('Archipelagic baseline', 'Normal baseline (official)', 'Straight baseline')"
})

var national_boundaries = L.esri.featureLayer({
  url: boundaries_url,
  style: styleWorldBoundaries
})

//TODO: Fix geomorphology. Currently it is unaccessible as CORS is disabled for this map layer. Could recreate it with publicly available data.
// Geomorphic features
var geomorphology = L.esri.dynamicMapLayer({
  url: geomorphology_url,
  format: "image",
  opacity: 1
  });

//polygon highlight
var polyhighlightStyle = {

  weight: 6,
  color: "#00FFFF",
  opacity: 1,
  dashArray: '2,2',
  lineJoin: 'round'
};

//symbol style for invisible layers
var polyhighlightStyle1 = {

  weight: 6,
  color: "#00FFFF",
  opacity: 0,
  fillOpacity: 0,
  
};


/* Overlay Layers */
var highlight = L.geoJson(null);
var infoLayer = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.4,
  radius: 10
};



// Add layers to the map
EEZ_boundary_poly.addTo(map);
EEZ_boundary_line.addTo(map);
ECS_submission_line.addTo(map);
geomorphology.addTo(map);
national_boundaries.addTo(map);


/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function (index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
//map.on("layeradd", updateAttribution);
//map.on("layerremove", updateAttribution);


var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<span class='hidden-xs'><a href='http://www.grida.no/' target='_blank'>GRID-Arendal</a> | </span>";
  return div;
};




map.addControl(attributionControl);

var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

//add print option in map
var printer = L.easyPrint({
  sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
  filename: 'myMap',
  exportOnly: true,
  hideControlContainer: true,
  position: 'bottomright',
}).addTo(map);






L.control.scale({ maxWidth: 200, position: 'bottomleft' }).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
}

var baseMaps = {
    "Aerial Imagery": arcgisOnline,
    "Oceans": oceanLayer    
    };

var overlays = {
    "EEZ Boundaries": EEZ_boundary_poly,
    "EEZ Lines": EEZ_boundary_line,
    "ECS Submission Lines": ECS_submission_line,
    "Geomorphology": geomorphology 
  };

/* Add layer control */
var options = {
  collapsed: false
};

var layerControl = L.control.layers(baseMaps, overlays, options)
layerControl.addTo(map)

//TODO: Make legend dynamic
//ECS legend
var legendECS = L.control({ position: "bottomleft" });

legendECS.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4> Submissions to the CLCS </h4>';
  div.innerHTML += '<i style="background: #d3d3d3"></i><span>Awaiting consideration</span><br>';
  div.innerHTML += '<i style="background: #FFCCCB"></i><span>Under active consideration</span><br>';
  div.innerHTML += '<i style="background: #98FB98"></i><span>Recommendations</span><br>';
  div.innerHTML += '<i style="background: #00FFFF"></i><span>Recommendations followed by deposit</span><br>';
  return div;
};

// Add
legendECS.addTo(map);

//EEZ legend
var legendEEZ = L.control({ position: "bottomleft" });

legendEEZ.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<h4> EEZ boundaries </h4>';
  div.innerHTML += '<i style="background: #ADD8E6"></i><span>200 NM</span><br>';
  div.innerHTML += '<i style="background: #0000FF"></i><span>Treaty/court ruling</span><br>';
  div.innerHTML += '<i style="background: #FFFF00"></i><span>Median line</span><br>';
  div.innerHTML += '<i style="background: #00FF00"></i><span>Joint regime</span><br>';
  div.innerHTML += '<i style="background: #FF0000"></i><span>Contested/unilateral</span><br>';
  return div;
};

// Add the legend to the map
legendEEZ.addTo(map);




/* Load the content before map load */
// $(document).one("ajaxStop", function () {
// alert("ok");

// });





// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
  L.DomEvent
    .disableClickPropagation(container)
    .disableScrollPropagation(container);
} else {
  L.DomEvent.disableClickPropagation(container);
}
//$("#loading").hide();


//ECS line popup
ECS_submission_line.on('click', function(e) {
  var feature = e.layer.feature;
  var properties = feature.properties;
  var popupContent = '<div>';
  popupContent += '<h3><strong>' + properties.State + '</strong><h3>';
  popupContent += '<p>Status: ' + properties.Status + '</p>'
  popupContent += '<p>View submission: <a href="' + properties.Link + '" target="_blank">Click Here</a></p>';
  

  L.popup()
    .setLatLng(e.latlng) // Set the location to where the polygon was clicked
    .setContent(popupContent)
    .openOn(map);
});

//EEZ polygon popup
EEZ_boundary_poly.on('click', function(e) {
  var feature = e.layer.feature;
  var properties = feature.properties;
  var popupContent = '<p><h4>' + properties.GEONAME + '</h4></p>';

  L.popup()
    .setLatLng(e.latlng) // Set the location to where the polygon was clicked
    .setContent(popupContent)
    .openOn(map);
});

// Zoom to the feature with the specified map_id when the layer is loaded

$(document).ready(function() {
  var zoomed = false; // Flag to track whether zooming has occurred
  
  if (map_id && map_id !== 'NOT') {
      ECS_submission_line.on('load', function() {
          if (!zoomed) { // Check if zooming has not occurred yet
              var query = L.esri.query({
                  url: ECS_line_url
              });

              query.where("State LIKE '%" + con_name + "%'").run(function(error, featureCollection) {
                  if (featureCollection.features.length > 0) {
                      var bounds = L.geoJson(featureCollection).getBounds();
                      map.flyToBounds(bounds);
                      zoomed = true; // Set flag to true after zooming
                  }
              });
          }
      });
  }
});


// Not_Under_Consideration.bindPopup(function (error, featureCollection) {
//   if(error || featureCollection.features.length === 0) {
//     return "Unable to retrive data1";
//   } else {

//     props = featureCollection.features[0].properties;

//     var content = "<table class='table table-striped table-bordered table-condensed'>"+

//     "<tr><td><b>Country:</b></td>" +
//      "<td>"+props.STATE+"</td></tr>"+

//      "<tr><td><b>ECS ID:</b></td>" +
//      "<td>"+props.ECS_ID_NUM+"</td></tr>"+

//     "<table>";
//     highlight.clearLayers().addLayer(L.geoJson(featureCollection.features[0], polyhighlightStyle));
//     return content;
//   }
// });



//end of map clik

// function to retrive data from all the layer



/*function queryMap(map_id) {
  var dynLayer = L.esri.dynamicMapLayer({
    url: "http://tuvalu.grida.no/arcgis/rest/services/ECS/UNEP_ECSv2/MapServer",
  });

  //Zoom to selected feature
  if (map_id.toString() != "NOT") {

    dynLayer.find()
      .layers('1,2,3,4,5,6,7,8,11')
      .fields('country_code')
      .text(map_id)
      .returnGeometry(true).run(function (error, latlongs, response) {

        
        //set the info table hadder
         var con_name = $.urlParam('con_name').replace(/%20/g, " ");

         $("#con_name").text("   "+con_name);
          $("#total_feature").text(response.results.length);
        
        
        
        Points_Submissions_array = response.results.filter(val => val.layerId == '1').map((val, i, arr) => {
          
          return { 'att': val.attributes, 'geo': val.geometry };

        });

      

        Reccomendation_Feature_array = response.results.filter(val => val.layerId == '2').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });

        Foot_of_Slope_array = response.results.filter(val => val.layerId == '3').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });


        Subcomissions_Statuse_array = response.results.filter(val => val.layerId == '4').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });

        Submissions_Line_array = response.results.filter(val => val.layerId == '5').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });

        Recommendations_Line_array = response.results.filter(val => val.layerId == '6').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });

        Revisions_Line_array = response.results.filter(val => val.layerId == '7').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });

        Not_Under_Consideration_array = response.results.filter(val => val.layerId == '8').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });

        Geomorphic_array = response.results.filter(val => val.layerId == '11').map((val, i, arr) => {
          return { 'att': val.attributes, 'geo': val.geometry };
        });







        //set the hadder text
       // $("#Submissions_Line_a").text(Submissions_Line_array.length);
       // $("#Foot_of_Slope_a").text(Foot_of_Slope_array.length);
       // $("#Reccomendation_Feature_a").text(Reccomendation_Feature_array.length);
       // $("#Recommendations_Line_a").text(Recommendations_Line_array.length);
       // $("#Subcomissions_Statuse_a").text(Subcomissions_Statuse_array.length);
       // $("#Revisions_Line_a").text(Revisions_Line_array.length);
       // $("#Not_Under_Consideration_a").text(Not_Under_Consideration_array.length);



        //set points submissions   
        $("#Points_Submissions_a").text(Points_Submissions_array.length);  
        if(!map.hasLayer(Points_Submissions))
          {   map.addLayer(Points_Submissions)  }

         Points_Submissions_temp = $('#Points_Submissions_tab').DataTable({
          data: Points_Submissions_array,
          columns: [

            { "data": "att.ECS_ID_NUM" },
            { "data": "att.STATUS" },
            { "data": "att.DATE" },
            { "data": "att.FORMULA" },
            { "data": "att.STATE" },
            { "data": "att.Depth_Etopo2" },
            { "data": "att.FOS" },
            { "data": "att.Page_Number" }
          ],
          lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
          paging: false,
          info: false,
          searching: true,
          drawCallback: function () {

           //set the row col and highlight point
            $('#Points_Submissions_tab tbody').on('mouseover', 'tr', function () {
              var data = Points_Submissions_temp.row(this).data();
              highlight.clearLayers().addLayer(L.circleMarker([data.geo.y, data.geo.x], highlightStyle));

            });
            $('#Points_Submissions_tab tbody').on('mouseout', 'tr', function () {
              
              highlight.clearLayers();

            });

     // on click higligt to point
            $('#Points_Submissions_tab tbody').on('click', 'tr', function () {
              var data = Points_Submissions_temp.row(this).data();
              map.setView([data.geo.y, data.geo.x], 10);
            });

          }
        });

        


         //set Line submissions   
         $("#Submissions_Line_a").text(Submissions_Line_array.length);  
        
          Submissions_Line_temp = $('#Submissions_Line_tab').DataTable({
           data: Submissions_Line_array,
           columns: [
 
             { "data": "att.ECS_ID_NUM" },
             { "data": "att.DATE" },
             { "data": "att.weblink",
             "render": function ( data, type, full, meta ) {
               var filename = data.substring(data.lastIndexOf('/')+1);
             return '<a href="'+data+' "target="_blank"> <span class="txt" >'+filename+'<span/></a>';
           }
             },
 
           ],
           lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
           paging: false,
           info: false,
           searching: true,
           drawCallback: function () {
 
            //set the row col and highlight line
             $('#Submissions_Line_tab tbody').on('mouseover', 'tr', function () {
               var data = Submissions_Line_temp.row(this).data();
         
      
              highlight.clearLayers().addLayer(L.geoJson(L.esri.Util.arcgisToGeojson(data.geo), polyhighlightStyle));
             
              });

              $('#Submissions_Line_tab tbody').on('mouseout', 'tr', function () {
              
                highlight.clearLayers();
  
              });
 
     // on click higligt to line
             $('#Submissions_Line_tab tbody').on('click', 'tr', function () {
               
              var data = Submissions_Line_temp.row(this).data();             
               var latlog =  L.geoJson(L.esri.Util.arcgisToGeojson(data.geo)).getBounds();
              
               map.fitBounds(latlog);
             });
 
           }
         });



  //set Reccomendation Feature
  $("#Reccomendation_Feature_a").text(Reccomendation_Feature_array.length);  
 
   Reccomendation_Feature_temp = $('#Reccomendation_Feature_tab').DataTable({
    data: Reccomendation_Feature_array,
    columns: [
      { "data": "att.ECS_ID_NUM" },
      { "data": "att.Feature_na" },
      { "data": "att.Type" },
      { "data": "att.FOS_accept" },
      { "data": "att.Page_numbe" },
      { "data": "att.comments" },
    ],
    lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
    paging: false,
    info: false,
    searching: true,
    drawCallback: function () {

     //set the row col and highlight point
      $('#Reccomendation_Feature_tab tbody').on('mouseover', 'tr', function () {
        var data = Reccomendation_Feature_temp.row(this).data();
        highlight.clearLayers().addLayer(L.circleMarker([data.geo.y, data.geo.x], highlightStyle));

      });

      $('#Reccomendation_Feature_tab tbody').on('mouseout', 'tr', function () {
              
        highlight.clearLayers();

      });

// on click higligt to point
      $('#Reccomendation_Feature_tab tbody').on('click', 'tr', function () {
        var data = Reccomendation_Feature_temp.row(this).data();
        map.setView([data.geo.y, data.geo.x], 10);
      });

    }
  });



//set Recommendations_Line  
$("#Recommendations_Line_a").text(Recommendations_Line_array.length);  
        
 Recommendations_Line_temp = $('#Recommendations_Line_tab').DataTable({
  data: Recommendations_Line_array,
  columns: [
    { "data": "att.ECS_ID_NUM" },
    { "data": "att.DATE" },
    { "data": "att.weblink",
      "render": function ( data, type, full, meta ) {
        var filename = data.substring(data.lastIndexOf('/')+1);
      return '<a href="'+data+' "target="_blank"> <span class="txt" >'+filename+'<span/></a>';
    } },

  ],
  lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
  paging: false,
  info: false,
  searching: true,
  drawCallback: function () {

   //set the row col and highlight line
    $('#Recommendations_Line_tab tbody').on('mouseover', 'tr', function () {
      var data = Recommendations_Line_temp.row(this).data();
    

     //to be higlight
     highlight.clearLayers().addLayer(L.geoJson(L.esri.Util.arcgisToGeojson(data.geo), polyhighlightStyle));
    
     });

     $('#Recommendations_Line_tab tbody').on('mouseout', 'tr', function () {
              
      highlight.clearLayers();

    });

// on click higligt to line
    $('#Recommendations_Line_tab tbody').on('click', 'tr', function () {
      
     var data = Recommendations_Line_temp.row(this).data();             
      var latlog =  L.geoJson(L.esri.Util.arcgisToGeojson(data.geo)).getBounds();
     
      map.fitBounds(latlog);
    });

  }
});


//set Subcomissions_Statuse  
$("#Subcomissions_Statuse_a").text(Subcomissions_Statuse_array.length);  
        
 Subcomissions_Statuse_temp = $('#Subcomissions_Statuse_tab').DataTable({
  data: Subcomissions_Statuse_array,
  columns: [
    { "data": "att.ECS_ID_NUM" },
    { "data": "att.DATE" },
    { "data": "att.Link",
    "render": function ( data, type, full, meta ) {
      var filename = data.substring(data.lastIndexOf('/')+1);
    return '<a href="'+data+' "target="_blank"> <span class="txt" >'+filename+'<span/></a>';
  }
   },
    { "data": "att.Area_km2" },
    { "data": "att.C" },
    { "data": "att.VC" },
    { "data": "att.M" },
    { "data": "att.STATUS" },

  ],
  lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
  paging: false,
  info: false,
  searching: true,
  drawCallback: function () {

   //set the row col and highlight line
    $('#Subcomissions_Statuse_tab tbody').on('mouseover', 'tr', function () {
      var data = Subcomissions_Statuse_temp.row(this).data();
    

     //to be higlight
     highlight.clearLayers().addLayer(L.geoJson(L.esri.Util.arcgisToGeojson(data.geo), polyhighlightStyle));
    
     });

     $('#Subcomissions_Statuse_tab tbody').on('mouseout', 'tr', function () {
              
      highlight.clearLayers();

    });
// on click higligt to line
    $('#Subcomissions_Statuse_tab tbody').on('click', 'tr', function () {
      
     var data = Subcomissions_Statuse_temp.row(this).data();             
      var latlog =  L.geoJson(L.esri.Util.arcgisToGeojson(data.geo)).getBounds();
     
      map.fitBounds(latlog);
    });

  }
});


//set Revisions_Line
$("#Revisions_Line_a").text(Revisions_Line_array.length);  
        
 Revisions_Line_temp = $('#Revisions_Line_tab').DataTable({
  data: Revisions_Line_array,
  columns: [
    { "data": "att.ECS_ID_NUM" },
    { "data": "att.DATE" },
    { "data": "att.weblink",
    "render": function ( data, type, full, meta ) {
      var filename = data.substring(data.lastIndexOf('/')+1);
    return '<a href="'+data+' "target="_blank"> <span class="txt" >'+filename+'<span/></a>';
  }
   },
  ],
  lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
  paging: false,
  info: false,
  searching: true,
  drawCallback: function () {

   //set the row col and highlight line
    $('#Revisions_Line_tab tbody').on('mouseover', 'tr', function () {
      var data = Revisions_Line_temp.row(this).data();
    

     //to be higlight
     highlight.clearLayers().addLayer(L.geoJson(L.esri.Util.arcgisToGeojson(data.geo), polyhighlightStyle));
    
     });

     $('#Revisions_Line_tab tbody').on('mouseout', 'tr', function () {
              
      highlight.clearLayers();

    });

// on click higligt to line
    $('#Revisions_Line_tab tbody').on('click', 'tr', function () {
      
     var data = Revisions_Line_temp.row(this).data();             
      var latlog =  L.geoJson(L.esri.Util.arcgisToGeojson(data.geo)).getBounds();
     
      map.fitBounds(latlog);
    });

  }
});



//set Not_Under_Consideration
$("#Not_Under_Consideration_a").text(Not_Under_Consideration_array.length);  
        
 Not_Under_Consideration_temp = $('#Not_Under_Consideration_tab').DataTable({
  data: Not_Under_Consideration_array,
  columns: [
    { "data": "att.ECS_ID_NUM" },
    { "data": "att.Reason" },
    { "data": "att.Disputing_States" },
  ],
  lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
  paging: false,
  info: false,
  searching: true,
  drawCallback: function () {

   //set the row col and highlight line
    $('#Not_Under_Consideration_tab tbody').on('mouseover', 'tr', function () {
      var data = Not_Under_Consideration_temp.row(this).data();
    

     //to be higlight
     highlight.clearLayers().addLayer(L.geoJson(L.esri.Util.arcgisToGeojson(data.geo), polyhighlightStyle));
    
     });


     $('#Not_Under_Consideration_tab tbody').on('mouseout', 'tr', function () {
              
      highlight.clearLayers();

    });
// on click higligt to line
    $('#Not_Under_Consideration_tab tbody').on('click', 'tr', function () {
      
     var data = Not_Under_Consideration_temp.row(this).data();             
      var latlog =  L.geoJson(L.esri.Util.arcgisToGeojson(data.geo)).getBounds();
      map.fitBounds(latlog);

    });

  }
});


$("#Foot_of_Slope_a").text(Foot_of_Slope_array.length); 

 Foot_of_Slope_temp = $('#Foot_of_Slope_tab').DataTable({
  data: Foot_of_Slope_array,
  columns: [
    { "data": "att.ECS_ID_NUM" },
    { "data": "att.Status" },
    { "data": "att.Source" },
    { "data": "att.depth" },
    { "data": "att.Page_number" },
    { "data": "att.FOS_ID" },
    { "data": "att.supp_crit" },
  ],
  lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
  paging: false,
  info: false,
  searching: true,
  drawCallback: function () {

   //set the row col and highlight point
    $('#Foot_of_Slope_tab tbody').on('mouseover', 'tr', function () {
      var data = Foot_of_Slope_temp.row(this).data();
      highlight.clearLayers().addLayer(L.circleMarker([data.geo.y, data.geo.x], highlightStyle));

    });

    $('#Foot_of_Slope_tab tbody').on('mouseout', 'tr', function () {
              
      highlight.clearLayers();

    });

// on click higligt to point
    $('#Foot_of_Slope_tab tbody').on('click', 'tr', function () {
      var data = Foot_of_Slope_temp.row(this).data();
      map.setView([data.geo.y, data.geo.x], 10);
    });

  }
});


//Set a Geomorphic
$("#Geomorphic_a").text(Geomorphic_array.length); 

 Geomorphic_temp = $('#Geomorphic_tab').DataTable({
  data: Geomorphic_array,
  columns: [
    { "data": "att.ECS_ID_NUM" },
    { "data": "att.Feature_na" },
    { "data": "att.Type" },
    { "data": "att.FOS_accept" },
    { "data": "att.Page_numbe" },
    { "data": "att.comments" },
  ],
  lengthMenu: [[5, 25, 50, -1], [5, 25, 50, "All"]],
  paging: false,
  info: false,
  searching: true,
  drawCallback: function () {

   //set the row col and highlight point
    $('#Geomorphic_tab tbody').on('mouseover', 'tr', function () {
      var data = Geomorphic_temp.row(this).data();
      highlight.clearLayers().addLayer(L.circleMarker([data.geo.y, data.geo.x], highlightStyle));

    });


    $('#Geomorphic_tab tbody').on('mouseout', 'tr', function () {
              
      highlight.clearLayers();

    });

// on click higligt to point
    $('#Geomorphic_tab tbody').on('click', 'tr', function () {
      var data = Geomorphic_temp.row(this).data();
      map.setView([data.geo.y, data.geo.x], 10);
    });

  }
});




      });//run function end

  }//check NOT end

}//query map end 


//add layer EEZ_boundary_poly 
  $('#collapseOne').on('show.bs.collapse', function (e) {
    
 if(!map.hasLayer(EEZ_boundary_poly))
 {   map.addLayer(EEZ_boundary_poly)  }

  });
  
//add layer ECS_submission_line 
  $('#collapseTwo').on('show.bs.collapse', function (e) {
    
    if(!map.hasLayer(ECS_submission_line))
    {   map.addLayer(ECS_submission_line)  }
   
     });

//add layer geomorphology
$('#collapseThree').on('show.bs.collapse', function (e) {
    
  if(!map.hasLayer(geomorphology))
  {   map.addLayer(geomorphology)  }
 
   });

//add the associated recomendation and its doenload
var map_id = $.urlParam('map_id');
if (map_id.toString() != "NOT")
{
$.getJSON("data/pdfList.json", function (pdfs) {

  var pdfLink = null;
  

  pdfLink = pdfs.filter(chekTheCon);

  if(pdfLink.length > 0)
  {
    for (i = 0; i < pdfLink.length; i++) {
      
      $('#pdfLits').append('<a  class="label label-success" href="data/pdfs/'+pdfLink[i]+'.pdf" target="_blank">'+pdfLink[i]+'.pdf</a><span style="padding-left: 3px;padding-right: 3px;"></span>');
      
      $('#pdfpoits').append('<a  class="label label-success" href="data/pdfs/'+pdfLink[i]+'.pdf" target="_blank">'+pdfLink[i]+'.pdf</a><span style="padding-left: 3px;padding-right: 3px;"></span>');
      
   
    }
    
 
 
 
}

  function chekTheCon(value) {
    var val = value.split("_");
    val = val.indexOf(map_id);
  
     return val > -1;
   }

//to be start here
   

});

}




// map.on('overlayadd', function (e) {
  
//  //alert("oik");
// });




//Functions will return the  feture from the wms layer and also its geometries to hilight

/* function mapPolygon(poly) {
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
    transparent: layer.transparent,
    version: layer.version,
    format: layer.format,
    bbox: map.getBounds().toBBoxString(),
    height: size.y,
    width: size.x,
    layers: layer.options.layers,
    query_layers: layer.options.layers,
    info_format: 'text/html'
  };

  params = L.Util.extend(defaultParams, params || {});

  params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
  params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

  return layer._url + L.Util.getParamString(params, layer._url, true) + '&buffer=10';

} */

//********************Wms getfeture function end*/