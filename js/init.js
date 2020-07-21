(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
  $(document).ready(function () {
    $('select').formSelect();
    var states = JSON.parse(localStorage.getItem("statesNew")) || []; //when page loads get states from local storage, for loop
  });

  var stateData = {};

  $("#submit").on("click", function (event) {

    event.preventDefault();

    var selectedState = parseInt($("#mySelection").val());
    

    var queryURL = "https://covidtracking.com/api/states";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) { 
      $("#following-data").text("Based on your selection, the following state's information is as follows:");
      $("#state-name").html("The State/District of: " + (response[selectedState].state));
      $("#state-increase").html("Had an increase of: " + (response[selectedState].positiveIncrease) + " cases since,  " + (response[selectedState].dateChecked));
      $("#total-cases").html("Total positive cases: " + (response[selectedState].positive));
      $("#alert").html("<br><b>Alert:</b><br>Be advised that your destination may have travel restrictions in place. Please check <b>before</b> embarking.");


    });

    
  });


})(jQuery); // end of jQuery name space
