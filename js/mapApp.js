


var Points_Submissions_array = null;
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
var Points_Submissions_temp = null;




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



//Base maps
var OSM = L.tileLayer("http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
  , {
    attribution: '&copy; openstreetmap.org',
    maxZoom: 30,
  })



var arcgisOnline = new L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; arcgisonline.com',
    maxZoom: 30,
  });


//add acean layer
var oceanLayer = L.esri.basemapLayer("Oceans");


var GEBCO = L.tileLayer.wms("http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?", {
  layers: 'GEBCO_LATEST_2',
  transparent: true,
  version: '1.1.0',
  attribution: "http://www.gebco.net",
  title: true,
  srs: 'EPSG:4326',
  format: 'image/png',
});


var cartoLight = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
});


var usgsImagery = L.layerGroup([L.tileLayer("http://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}", {
  maxZoom: 15,
}), L.tileLayer.wms("http://raster.nationalmap.gov/arcgis/services/Orthoimagery/USGS_EROS_Ortho_SCALE/ImageServer/WMSServer?", {
  minZoom: 16,
  maxZoom: 19,
  layers: "0",
  format: 'image/jpeg',
  transparent: true,
  attribution: "Aerial Imagery courtesy USGS"
})]);


//Base map Layers end





//add feature layers

//add country Layer
/*  var ecs_country = L.esri.featureLayer({
  url: 'http://tuvalu.grida.no/arcgis/rest/services/ECS/UNEP_ECS/MapServer/9',
  //  simplifyFactor:0.5,
  //  precision: 5,
  style: function (feature) {
    return {
      color: '#00A4AB',
      fillColor: '#00E5EE',
      fill: true,
      fillOpacity: 0.1,
      opacity: 0.9,
      clickable: true,
      weight: 1,

    };
  },
  onEachFeature: function (feature, layer) {

    var content = "<table class='table table-striped table-bordered table-condensed'>";
    content = content + "<tr><td><b>Country Name:</b></td>"
    content = content + "<td>" + feature.properties.CNTRY_NAME + "</td></tr>"
    content = content + "<table>";

    //popup the info window
    layer.on({
      click: function (e) {

        highlight.clearLayers().addLayer(L.polygon(layer.getLatLngs(), polyhighlightStyle));


      }
    });
    layer.bindPopup(content);

    layer.on({
      mouseover: function (e) {
        var layer = e.target;
        layer.setStyle({
          weight: 3,
          color: "#00FFFF",
          opacity: 1
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
      },
      mouseout: function (e) {

        return e.target.setStyle({

          color: '#00A4AB',
          fillColor: '#00E5EE',
          fill: true,
          fillOpacity: 0.1,
          opacity: 0.9,
          clickable: true,
          weight: 1,

        });


      }


    });

  },
  mapid:2


});  */




//Feature baselayer***********************

//GRID ArcGIS base url

base_url="http://tuvalu.grida.no/arcgis/rest/services/ECS/UNEP_ECSv2/MapServer";

//add GNIS Feature
var GNIS_Feature = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [0],
  opacity: 1,
  format: 'image/png',
  mapid:13
});


//Points Submissions
var Points_Submissions = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [1],
  opacity: 1,
  format: 'image/png',
  mapid:12
});


//Reccomendation Feature
var Reccomendation_Feature = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [2],
  opacity: 1,
  format: 'image/png',
  mapid:11
});

//Foot of Slope
var Foot_of_Slope = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [3],
  opacity: 1,
  format: 'image/png',
  mapid:10
});


//Subcomissions Status
var Subcomissions_Statuse = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [4],
  opacity: 1,
  format: 'image/png',
  mapid:9
});


//Submissions Line
var Submissions_Line = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [5],
  opacity: 1,
  format: 'image/png',
  mapid:8
});


//Recommendations_Line
var Recommendations_Line = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [6],
  opacity: 1,
  format: 'image/png',
  mapid:7
});


//Revisions Line
var Revisions_Line = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [7],
  opacity: 1,
  format: 'image/png',
  mapid:6
});

//Not Under Consideration
var Not_Under_Consideration = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [8],
  opacity: 1,
  format: 'image/png',
  mapid:5
});

//Not Under Consideration
var ecs_country = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [9],
  opacity: 1,
  format: 'image/png',
  mapid:4
});


// Coastline
var Coastline = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [10],
  opacity: 1,
  format: 'image/png',
  mapid:3
});


// geomorphic
var Geomorphic = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [11],
  opacity: 1,
  format: 'image/png',
  mapid:2
});

//EEZ Line
var EEZLine = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [12],
  opacity: 1,
  format: 'image/png',
  mapid:1
});


//EEZ polygon layerremove
var EEZPoly = L.esri.dynamicMapLayer({
  url: base_url,
  layers: [13],
  opacity: 1,
  format: 'image/png',
  mapid:0
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


//add the map control and center it
map = L.map('map', {
  zoom: 3,
  center: [22.355, 21.109],
  layers: [ecs_country, oceanLayer,highlight,infoLayer],
  zoomControl: false,
  attributionControl: false
});

//fix the map bound
/* ecs_country.query().run(function (error, geojson, response) {

  //map.setMaxBounds(L.geoJson(geojson).getBounds());

}); */



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
  div.innerHTML = "<span class='hidden-xs'><a href='http://www.grida.no/' target='_blank'>GRID-Arenda</a> | </span>";
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




var baseMaps = [{
  groupName: "Base Maps",
  expanded: false,
  layers: {
    "Aerial Imagery": arcgisOnline,
    "OpenStreetMap": OSM,
    "Oceans": oceanLayer,
    "GEBCO": GEBCO,
    "CartoLight": cartoLight,
    "USGS Imagery": usgsImagery

  }
}
];



var overlays = [
  {
    groupName: "Marine Region",
    expanded: true,
    layers: {

      "ECS Country": ecs_country,
      "Coastline": Coastline,
      "EEZ Polygon": EEZPoly,
      "EEZ Line": EEZLine


    }
  },
  {
    groupName: "Submissions",
    expanded: false,
    layers: {

      "Points Submissions": Points_Submissions,
      "Submissions Line": Submissions_Line



    }
  },
  {
    groupName: "Point of Interest",
    expanded: false,
    layers: {
      "Foot_of_Slope": Foot_of_Slope,
      "GNIS_Feature": GNIS_Feature



    }
  },
  {
    groupName: "Recommendation",
    expanded: false,
    layers: {

      "Recommendation Point": Reccomendation_Feature,
      "Recommendations Line": Recommendations_Line


    }
  },
  {
    groupName: "Subcomissions",
    expanded: false,
    layers: {

      "Subcomissions Status": Subcomissions_Statuse,



    }
  },
  {
    groupName: "Revisions",
    expanded: false,
    layers: {

      "Revisions Line": Revisions_Line,



    }
  },
  {
    groupName: "Consideration",
    expanded: false,
    layers: {

      "Not under Consideration": Not_Under_Consideration,



    }
  },
  {
    groupName: "Geomorphic Feature",
    expanded: false,
    layers: {

      "Geomorphic Feature": Geomorphic,



    }
  }
];




/* Add legend */
var options = {
  container_width: "250px",
  group_maxHeight: "180px",
  container_maxHeight: "350px",
  exclusive: true,
  collapsed: false
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);



//controlling the legend size /popup
function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);

  if (($("#navcol").is(":visible"))) {

    map.removeControl(control);
    control.options.collapsed = false;
    map.addControl(control);
  }
  else {
    map.removeControl(control);
    control.options.collapsed = true;
    map.addControl(control);

  }
}





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




$(document).ready(function () {
  var map_id = $.urlParam('map_id');
  if (map_id.toString() != "NOT") {
    //do some things

  }
  else {

    $("#sidebar").hide();
    map.invalidateSize();
  }


});




$( document ).ready(function () {

  //return the 
  var map_id = $.urlParam('map_id');
 

  if (map_id.toString() != "NOT") {

//Filter the layerdata based on country
 Points_Submissions.options.layerDefs= {1:"country_code LIKE '%"+map_id+"%'"};
 Reccomendation_Feature.options.layerDefs= {2:"country_code LIKE '%"+map_id+"%'"};
 Foot_of_Slope.options.layerDefs= {3:"country_code LIKE '%"+map_id+"%'"};
 Subcomissions_Statuse.options.layerDefs= {4:"country_code LIKE '%"+map_id+"%'"};;
 Submissions_Line.options.layerDefs= {5:"country_code LIKE '%"+map_id+"%'"};
 Recommendations_Line.options.layerDefs= {6:"country_code LIKE '%"+map_id+"%'"};
 Revisions_Line.options.layerDefs= {7:"country_code LIKE '%"+map_id+"%'"};
 Not_Under_Consideration.options.layerDefs= {8:"country_code LIKE '%"+map_id+"%'"};
 Geomorphic.options.layerDefs= {11:"country_code LIKE '%"+map_id+"%'"};




    //Zoom to selected feature
    ecs_country.query()
    .layer(9)
      .fields(["FIPS_10_,NAME_LONG,OBJECTID"])
      .where("FIPS_10_ ='" + map_id + "'")
      .returnGeometry(true).run(function (error, latlongs, response) {

        map.fitBounds(L.geoJson(latlongs).getBounds());
        //map.zoomOut(1);

       /*  ecs_country.setFeatureStyle(response.features[0].attributes.OBJECTID, {
          color: 'yellow',
          weight: 2,
          opacity: 0.85,
          fillOpacity: 0.5
        }); */

        highlight.clearLayers().addLayer(L.geoJson(latlongs, {
          color: '#00FFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.3
        }));
        ecs_country.bringToBack();

      });

    
    
      //query on entire map
       queryMap(map_id);
       

  }

});

//zoom process finished
//return the query string val
$.urlParam = function (name, url) {
  if (!url) {
    url = window.location.href;
  }
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
  if (!results) {
    return undefined;
  }
  return results[1] || undefined;
}




// Split(['#map', '#info_template'], {
//   sizes: [50,50],
//   direction: 'vertical'
// })

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function () {
    map.invalidateSize();
  });
}

//get the popup on click on point





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



function queryMap(map_id) {
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


//add layer Points_Submissions 
  $('#collapseOne').on('show.bs.collapse', function (e) {
    
 if(!map.hasLayer(Points_Submissions))
 {   map.addLayer(Points_Submissions)  }

  });
  
//add layer Line_Submissions 
  $('#collapseTwo').on('show.bs.collapse', function (e) {
    
    if(!map.hasLayer(Submissions_Line))
    {   map.addLayer(Submissions_Line)  }
   
     });

//add layer Reccomendation Feature point
$('#collapseThree').on('show.bs.collapse', function (e) {
    
  if(!map.hasLayer(Reccomendation_Feature))
  {   map.addLayer(Reccomendation_Feature)  }
 
   });

//add layer Reccomendation Feature Line
$('#collapseThree1').on('show.bs.collapse', function (e) {
    
  if(!map.hasLayer(Recommendations_Line))
  {   map.addLayer(Recommendations_Line)  }
 
   });

   //add layer Subcomissions_Status
$('#collapseThree2').on('show.bs.collapse', function (e) {
    
  if(!map.hasLayer(Subcomissions_Statuse))
  {   map.addLayer(Subcomissions_Statuse)  }
 
   });

   //add layer Subcomissions_Status
   $('#collapseThree3').on('show.bs.collapse', function (e) {
    
    if(!map.hasLayer(Revisions_Line))
    {   map.addLayer(Revisions_Line)  }
   
     });

      //add layer Not_Under_Consideration
   $('#collapseThree4').on('show.bs.collapse', function (e) {
    
    if(!map.hasLayer(Not_Under_Consideration))
    {   map.addLayer(Not_Under_Consideration)  }
   
     });

  //add layer Foot_of_Slope
   $('#collapseThree5').on('show.bs.collapse', function (e) {
    
    if(!map.hasLayer(Foot_of_Slope))
    {   map.addLayer(Foot_of_Slope)  }
   
     });

    //add layer Geomorphic 
    $('#collapseThree6').on('show.bs.collapse', function (e) {
    
      if(!map.hasLayer(Geomorphic))
      {   map.addLayer(Geomorphic)  }
     
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

//********************Wms getfeture function end