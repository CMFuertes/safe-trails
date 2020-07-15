(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
  $(document).ready(function(){
    $('select').formSelect();
  });

  $("#submit").on("click", function(event) {

    event.preventDefault();       

    var selectedState = parseInt($("#mySelection").val() );     
    console.log(selectedState);

      var queryURL = "https://covidtracking.com/api/states";
      console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { //async code block, it's going to run when you get the response back 
    console.log(response);
    console.log("The State/Territory of:", response[selectedState].state);
    console.log("Had an increase of", response[selectedState].positiveIncrease, "cases");
    console.log("Total positive cases =", response[selectedState].positive);
    console.log("Data Updated on =", response[selectedState].dateChecked);
  });
        });
})(jQuery); // end of jQuery name space
