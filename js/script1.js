// function to force js to wait till the whole document loads
$(document).ready(function () {
    $('.modal').modal();
    $('select').formSelect();

    // setting up some global variables
    var lat = "";
    var lon = "";
    var city;
    var cardsFull = true;
    var debugMode = false;
    var debugResponse;
    var debugResponse1;
    var debugResponse3;
    var APIkey1 = "f2e73a675d880326530db1f8aee7437b";
    var APIkey2 = "f2e73a675d880326530db1f8aee7437b";
    var APIkey3;
    var radius=10;
    var cityDebug;
    var perPage=10;
    
    
    // on click function for updating  the below 3 variables from user preferences modal
    $(".modal-close").on("click", function (APIkey3) {
        APIkey3 = $("#APIkey3").val().trim();
        radius = $("#search-radius").val().trim();
        perPage = $("#search-results").val().trim();
        console.log(APIkey3);
        console.log(radius);
        console.log(perPage);
        $(".pererences").html(`radius = ${radius} miles, results = ${perPage} trails.`);
    });
    $(".pererences").html(`radius = ${radius} miles, results = ${perPage} trails.`);

    // module for connecting the debugMode boolean to the debugMode toggle
    debugModePicker = $("#debugModePicker");

    debugModePicker.click(function () {
        debugMode = !debugMode;
        console.log("debugMode : " + debugMode);
    });


    $("#submit-city").on("click", function (event) {
        event.preventDefault();
        city = $("#city-input").val().trim();
        // APIkey1 = "f2e73a675d880326530db1f8aee7437b";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey1;
        cityDebug = localStorage.getItem("city");

        console.log(cityDebug);
        console.log(city);

        // Creating an AJAX call for the specific city button being clicked
        //if the program is in a debugMode 
        // the call would be avoided and data red from local storage instead
        if (debugMode === false) {
            console.log("ajax call 1");

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                // preparing the div that will hold the city and date displayed
                console.log("response 1 :");
                console.log(response);
                localStorage.setItem("responseString", JSON.stringify(response));
                console.log("ajax call ");
                // getting the lon and lat for the given city to be used for the next 2 api calls
                lat = response.city.coord.lat;
                lon = response.city.coord.lon;

                $(".fd-forecast").removeClass("no-show");
                findBikeTrails(lon, lat);
                displayUv();
            });
        }
        else {
            // debug Mode  uses saved last responce for debugging , no actual ajax calls=============
            debugResponse = JSON.parse(localStorage.getItem("responseString"));
            console.log(debugResponse);
            console.log("debugResponse");
            lat = debugResponse.city.coord.lat;
            lon = debugResponse.city.coord.lon;
            console.log("lat  " + lat);
            console.log("lon  " + lon);
            $(".fd-forecast").removeClass("no-show");
            findBikeTrails();
            displayUv();
        }
    });



    var datesArrey = ["day0", ".day1", ".day2", ".day3", ".day4", ".day5"];
    function displayUv() {
        // var APIkey2 = "f2e73a675d880326530db1f8aee7437b";
        APIkey2 = APIkey1;
        // puting together the queryURL for the second AJAX call
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="
            + lon + "&exclude=minutely,hourly&appid=" + APIkey2;

        // Creating an AJAX call for the specific city button being clicked by Lat and Lon
        //if the program is in a debugMode 
        // the call would be avoided and data red from local storage instead
        if (debugMode === false) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log("response 2 :");
                console.log("ajax call 2 ");
                console.log(response);
                localStorage.setItem("responseString1", JSON.stringify(response));
                createForecast(response);
            });

        }
        else {
            debugResponse1 = JSON.parse(localStorage.getItem("responseString1"));
            console.log(debugResponse1);
            console.log("debugResponse1");
            response = debugResponse1
            createForecast(response);

        }
        function createForecast(response) {
            // clearing the display divs for the 5 day forecast cards
            if (cardsFull === true) {
                for (var i = 1; i < 6; i++) {
                    $(datesArrey[i]).empty();
                    // setting the check boolean to "false" after emtying the card divs
                    cardsFull = false;
                }
            }
            else {

            }
            // module cards starts
            for (var i = 1; i < 6; i++) {
                var date1 = $("<p>");
                var dateDU1 = response.daily[i].dt;
                var dateD1 = new Date();
                dateD1.setTime(dateDU1 * 1000);

                var month = dateD1.getMonth();
                var day = dateD1.getDate();
                var year = dateD1.getFullYear();
                var dateDD = (month + 1) + "/" + day + "/" + year;

                date1.text(dateDD);
                $(datesArrey[i]).append(date1);
                $(datesArrey[i]).removeClass("no-show");

                var weatherIcon = response.daily[i].weather[0].icon;

                var imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

                // // Creating an element to hold the image
                var imageDp = $("<img>");

                imageDp.attr("src", imgURL);
                imageDp.attr("alt", "weather icon");
                // appending to the card
                $(datesArrey[i]).append(imageDp);

                // creating values for humidity and temp
                var humidityD = response.daily[i].humidity;
                var tempK = response.daily[i].temp.day;
                var tempF = (tempK - 273.15) * 1.80 + 32;
                var pTwo = $("<p>").text("Humidity: " + humidityD + " % ");
                var pThree = $("<p>").text("Temp: " + tempF.toFixed(1) + " F");
                // appending to the card
                $(datesArrey[i]).append(pTwo);
                $(datesArrey[i]).append(pThree);
                // setting the check var to true to avoid creating more than one set of weather cards for the prognosis
                // module for cards ends here
            }
            cardsFull = true;
        }

    }



    // trails api
    function findBikeTrails() {
        // for some reason in chrome the APIkey value from the user preferences does not work , so it is placed here manually
        // APIkey3 = "6f4c62189fmshacee60036d76b2cp101a45jsn8679c155c21e";
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://trailapi-trailapi.p.rapidapi.com/trails/explore/?page=1&per_page="
                + perPage + "&radius=" + radius + "&lat=" + lat + "&lon=" + lon,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
                "x-rapidapi-key": APIkey3
            }
        }
        console.log(settings);
        console.log(perPage);
        console.log(radius);

        //if the program is in a debugMode or if the city already is in local storage , 
        // the call would be avoided and data red from local storage instead
        if (debugMode === false && city !== cityDebug) {
            cityDebug = localStorage.setItem("city", city);
            $.ajax(settings).done(function (response) {
                localStorage.setItem("responseString3", JSON.stringify(response));
                console.log("response 3 :");
                console.log(response);
                console.log("ajax call 3");
                fillIntrailCards(response);
            });

        }
        else {
            // same as above but uses a saved object from local storage to avoid additional calls during debugs and testing
            debugResponse3 = JSON.parse(localStorage.getItem("responseString3"));
            console.log(debugResponse3);
            console.log("debugResponse3");
            response = debugResponse3;
            fillIntrailCards(response);
        }
    }


    function fillIntrailCards(response) {
        $("#bike-trails-list").empty();

        // forloop for creating and filling in of the card elements
        for (var i = 0; i < response.data.length; i++) {


            // creating variables and assigning values from the trail api object(fresh or from localstorage)
            var aCity = response.data[i].city
            var aState = response.data[i].region;
            var aName = response.data[i].name;
            var aDirections = response.data[i].directions;
            var aDescription = response.data[i].description;
            var aLength = response.data[i].length;
            var aRaiting = response.data[i].rating;
            var aImg = response.data[i].thumbnail;
            var aUrl = response.data[i].url;
            var aId = response.data[i].id;
            var aDifficulty = response.data[i].difficulty;
            // creating the new elements for the dom
            var news12m7 = $('<div class="col s7 m6">');
            var newCard = $('<div class="card">');
            var newCardImg = $('<div class="card-image">');
            var newCardCont = $('<div class="card-content">');
            var pOne = $('<p>');
            var s1 = $('<span class="card-title">');
            var s2 = $('<span class="card-title">');
            var pThree = $('<p>');
            var pFour = $('<p>');
            var pFive = $('<p>');
            var pSix = $('<p>');
            var pSeven = $('<p>');
            var pEight = $('<p>');
            var pNine = $('<p>');
            var iOne = $('<img class="activator">');
            var l1 = $('<a>');
            var newCardReveal = $('<div>');

            // assigning values , text , html, attibutes and classes accordingly
            $(newCardImg).addClass("waves-effect waves-block waves-light");
            $(s1).addClass("activator grey-text text-darken-4");
            $(s2).addClass("grey-text text-darken-4");
            $(s1).html(`Name: ${aName}<i class="material-icons right">Click for More</i>`);
            $(s2).html(`Name: ${aName}<i class="material-icons right">close</i>`);
            $(newCardReveal).addClass("card-reveal");
            $(pOne).text("Location of the trail: " + aCity + "," + aState);
            pThree.html("Directions:  " + aDirections);
            pFour.html("Description:  " + aDescription);
            pFive.text("Length of the trail:  " + aLength);
            pSix.text("Rating:  " + aRaiting);
            iOne.attr("src", aImg);
            iOne.attr("width", "330");
            iOne.attr("height", "257");
            iOne.attr("alt", "thumbnail");
            pSeven.text("id: " + aId);
            pEight.text("difficulty: " + aDifficulty);
            l1.attr("href", aUrl);
            l1.attr("target", "_blank");
            l1.text("Link to the trail website");
            pNine.html(l1);

            //appending all  completed new elements on the page
            $(newCardReveal).append(s2);
            $(newCardReveal).append(pFour);
            $(newCardReveal).append(pFive);
            $(newCardReveal).append(pSix);
            $(newCardReveal).append(pEight);
            $(newCardReveal).append(pThree);
            $(newCardReveal).append(pOne);
            $(newCardCont).append(s1);
            $(newCardCont).append(pNine);
            $(newCard).append(pSeven);
            $(newCard).append(newCardReveal);
            $(newCardImg).append(iOne);
            $(newCard).append(newCardImg);
            $(newCard).append(newCardCont);
            $(news12m7).append(newCard);
            $("#bike-trails-list").append(news12m7);

        }

    }

});