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
    console.log(selectedState);

    var queryURL = "https://covidtracking.com/api/states";
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) { //async code block, it's going to run when you get the response back 
      console.log(response);
      console.log("The State of:", response[selectedState].state);
      console.log("Had an increase of", response[selectedState].positiveIncrease, "cases");
      console.log("Total positive cases =", response[selectedState].positive);
      console.log("Data Updated on =", response[selectedState].dateChecked);
      $("#following-data").text("Based on your selection, the following state's information is as follows:");
      $("#state-name").html("The State of: " + (response[selectedState].state));
      $("#state-increase").html("Had an increase of: " + (response[selectedState].positiveIncrease) + " cases since,  " + (response[selectedState].dateChecked));
      $("#total-cases").html("Total positive cases: " + (response[selectedState].positive));
      $("#alert").html("<br><b>Alert:</b><br>Be advised that your destination may have travel restrictions in place. Please check <b>before</b> embarking.");

      stateData.state = response[selectedState].state;
      stateData.cases = response[selectedState].positiveIncrease;
      stateData.total = response[selectedState].positive;
      stateData.date = response[selectedState].dateChecked;
      console.log("state data:", stateData);



    });

    
  });


})(jQuery); // end of jQuery name space
