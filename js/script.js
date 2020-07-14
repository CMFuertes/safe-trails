
// Event listener for all button elements

$("button").on("click", function () {

    // In this case, the "this" keyword refers to the button that was clicked
    var city = $(this).siblings(".input-data").val();
    console.log(city);
    var state="NJ";

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-04-07",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
    //         "x-rapidapi-key": "6f4c62189fmshacee60036d76b2cp101a45jsn8679c155c21e"
    //     }
    // }
    // $.ajax(settings).done(function (response) {
    //     console.log(response);

    // });
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/reports?region_province="+ state+"& iso=USA& region_name=US & city_name="+ city + "& date=2020 - 07 - 12 & q=US % 20"+ state,
    "method": "GET",
        "headers": {
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            "x-rapidapi-key": "6f4c62189fmshacee60036d76b2cp101a45jsn8679c155c21e"
        }
    }
    
    $.ajax(settings).done(function (response) {
    console.log(response);
    $(".test").text(response.data.active);
    console.log(response.data);
    });
});



// ---------------


//     --------------