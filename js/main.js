$(document).ready(function () {

    var owl = $("#header-slider");

    owl.owlCarousel({
        singleItem: true,
        navigation: true,
        navigationText: ["<i class='ion-ios-arrow-thin-left'></i>", "<i class='ion-ios-arrow-thin-right'></i>"],
        transitionStyle: "fade",
        pagination: true,
    });

    $("#Client_Logo").owlCarousel({
        autoPlay: 5000,
        items: 6,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    });

    $("#blog-post").owlCarousel({
        autoPlay: 5000,
        items: 3,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    });


    $(function () {
        $('#mixed-items').mixItUp();
    });


    new WOW().init();

    // DOM Content Load Event Actions;
    $(window).load(function () {
        $('div#loading').remove();
        $('body').removeClass('loading');
    });


    $('.menu').onePageNav({
        currentClass: 'active',
        changeHash: true,
        scrollSpeed: 1200,
        top: 0
    });

    // $('.counter').counterUp({
    //     delay: 10,
    //     time: 2000
    // });





    $('.carousel').carousel();


    /**
     * Google Map
     */
    if ($('#googleMap').length) {
        var mapProp = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 9,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    }



	/**
     * Google Map
     */
    // if ($('#googleMap').length) {
    //     var mapProp = {
    //         center: new google.maps.LatLng(41.878114, -87.629798),
    //         zoom: 9,
    //         scrollwheel: false,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    // }

    // Animated Scrolling
    (function () {
        var topoffset = 0;
        $('#scroll').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - topoffset
                    }, 1000);
                    return false;
                } // target.length
            } //location hostname
        }); //on click

        $.scrollUp({
            scrollDistance: 2000,
            scrollSpeed: 1200,
        });
    }())


    var cont_list = null;
    //reading json file fill the info table
    $.getJSON("data/infotab.json", function (data) {

        get_con_list(data.slice(0))
        loadPdfList(data.slice(0))

        var content = '<table id="infoTable"  class="table table-striped table-bordered  display table-condensed"  cellspacing="0" ;height:500px; width:100%">' +
            '<thead style="background-color:#008040;color:white;font-size: 15px;font-family:Arial">'+
            '<tr><th>Sl.no.</th>'+    
           '<th>Country</th>'+
           '<th>Submission</th>'+
         //   '<th>Entitlement</th>'+
           '<th>Date of Ratification</th>'+
           '<th>Deadline for Submission</th>'+
           '<th>Preliminary Information Document</th>'+
           '<th>Less than 200 NM Maritime Zone</th>'+
           '<th>Offshore Territories and Is.</th></tr></thead>';

        $.each(data, function (index, value) {

            var str = value.associate_country.toString().split(" ");
            var str_con ="";
            if(str.length > 1)
            {
            
             str_con = str.map((valc, i, arr) => {
                               
                    try{
                                var valCon = data.filter(val => val.contry_cod == valc);
                                valCon = valCon[0].contry_name;
                                return " "+valCon;
                            }
                            catch(ex){
                                var str1 = value.associate_country.toString().split(" ");
                                console.log(ex);
                            }
                           
                            });
             }

            content = content + '<tr><td style="background-color:#008040;color: white;font-size: 16px;">' + value.sl_no +'</td>'+
                 '<td class="bg-warning" style="font-size: 18px; font-weight:300px;"><a href="ecs_map.html?map_id=' + value.contry_cod + '&con_name=' + value.contry_name + '">' +
                (value.contry_iso.toString().length > 1 ? '<img src="css/flags/blank.gif" class="flag flag-' +
                    (value.contry_iso).toLowerCase() + '"/>' + '  -  ' + value.contry_name : value.contry_name) + '</a></td>' +
                '<td class="text-center">' + value.submission + '</td>' +
               // '<td class="text-center">' + value.no_entitlement + '</td>' +
                '<td class="text-center">' + value.not_signature + '</td>' +
                '<td class="text-center">' + value.later_dealine + '</td>' +
                '<td class="text-center">' + value.preliminary_document + '</td>'+
                '<td class="bg-warning">' + value.sea_less_than_200m + '</td>'+
                '<td class="bg-warning">' + str_con + '</td></tr>';
           

        });

    
        content = content + '</tbody></table>';
        $('#div_contry').append(content);

        $('#infoTable').DataTable({

            fixedHeader: {
                header: true,
                footer: true,

            },
            "scrollY": "50vh",
            "scrollCollapse": true,

            'rowCallback': function (row, data, index) {

               // (data[1].toUpperCase() == 'YES' ? $(row).find('td:eq(1)').addClass("success") : $(row).find('td:eq(1)').addClass("warning"));
                (data[2].toUpperCase() == 'YES' ? $(row).find('td:eq(2)').addClass("success").text("").append('<i class="fa fa-check-circle" style="font-size:25px;color:#008040;"></i>') : $(row).find('td:eq(2)').addClass("warning"));
                (data[3].toUpperCase() == 'YES' ? $(row).find('td:eq(3)').addClass("success").text("").append('<i class="fa fa-check-circle" style="font-size:25px;color:#008040;"></i>') : $(row).find('td:eq(3)').addClass("warning"));
                (data[4].toUpperCase() == 'YES' ? $(row).find('td:eq(4)').addClass("success").text("").append('<i class="fa fa-check-circle" style="font-size:25px;color:#008040;"></i>') : $(row).find('td:eq(4)').addClass("warning"));
                (data[5].toUpperCase() == 'YES' ? $(row).find('td:eq(5)').addClass("success").text("").append('<i class="fa fa-check-circle" style="font-size:25px;color:#008040;"></i>') : $(row).find('td:eq(5)').addClass("warning"));
                (data[6].toUpperCase() == 'YES' ? $(row).find('td:eq(6)').addClass("success").text("").append('<i class="fa fa-check-circle" style="font-size:25px;color:#008040;"></i>') : $(row).find('td:eq(6)').addClass("warning"));
            },
            "columnDefs": [{
                "targets": 0,
                "orderable": false
            }],


        });



    });

    //<i class="fa fa-check-circle"></i>

    // $("#tab1primary").load("http://localhost/ECS/data/about.html");
    //activate the listhead in serch box front page
    var cont_val = null;
    function get_con_list(cont_list) {
        cont_list = cont_list.map((val, i, arr) => {
            return { 'id': val.contry_cod, 'name': val.contry_name };

        });

        var $input = $(".typeahead");
        $input.typeahead({
            source: cont_list,
            autoSelect: true
        });
        $input.change(function () {
            var current = $input.typeahead("getActive");
            if (current) {
                // Some item from your model is active!
                if (current.name == $input.val()) {
                    // This means the exact match is found. Use toLowerCase() if you want case insensitive match.

                    cont_val = current;
                } else {
                    // This means it is only a partial match, you can either add a new item
                    // or take the active if you don't want new items
                }
            } else {
                // Nothing is active so it is a new value (or maybe empty value)
            }
        });

    }


    $('#open_costalGIS').on('click', function (e) {


        window.open("ecs_map.html?map_id=" + cont_val.id + "&con_name=" + cont_val.name, "_self");

    });
    //load the pdf in the list table
    function loadPdfList(masterTable) {


        $.getJSON("data/pdfList.json", function (pdfs) {


            var btn = "";


            $.each(pdfs, function (index, value) {

                btn = '<span class="input-group-btn">' +
                    '<button id="'+value+'" type="button"  class="btn btn-success" style="padding:2px 4px 2px 4px;"><i class="fa fa-download"></i></button></span>';

                var str = value.split("_");
                //str value is greater than 2 it ia ECS id
                var str_ecsID = str.filter(val => val.toString().length > 2);

                //str value is euql to 2 it is acontry code
                var str_con = str.filter(val => val.toString().length == 2).map((valc, i, arr) => {
                    var valCon = masterTable.filter(val => val.contry_cod == valc);
                    valCon = valCon[0].contry_name;
                    return " "+valCon;
                });

                // str val is less than 2 its is version
                var str_version = str.filter(val => val.toString().length < 2);


                $('#recom_table').append('<tr id="'+value+'_pdf"><td>' + str_ecsID + '</td><td>' + str_con + '</td><td>' + "Ver.- " + str_version + '</td><td>' + btn + '</td></tr>');
               
                //download pdf
                var tt_pdf = "#"+value;
                $(tt_pdf).on('click', function (e) {


                    window.open("data/pdfs/"+value+".pdf","_blank");
            
                });

             //chnage  pdf viewer
             var dd_pdf = "#"+value+"_pdf";
             $(dd_pdf).on('click', function (e) {


                     $('#obj_pdf').attr('data',"data/pdfs/"+value+".pdf#page=1");
                    $('#ifrm_pdf').attr('src',"data/pdfs/"+value+".pdf#page=1");
         
             });



            });



        });
    }

    
                    
     
        
      


});

