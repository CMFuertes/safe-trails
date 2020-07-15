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
    $("#following-data").text("Based on your selection, the following state's information is as follows:");
    $("#state-name").html("The State/Territory of: " + (response[selectedState].state));
    $("#state-increase").html("Had an increase of: " +(response[selectedState].positiveIncrease) + " cases since, " + (response[selectedState].dateChecked));
    $("#total-cases").html("Total positive cases: " + (response[selectedState].positive));

    
    
  });
        });

        $(".saveState").on("click", function () {
          console.log("save me");
          var savedState = $(this).siblings(".description").val();
          console.log(savedState);
          var stateInfo = $(this).parent().attr("id");
          console.log(stateInfo);
          localStorage.setItem(stateInfo), JSON.stringify(savedState);

        });

        
})(jQuery); // end of jQuery name space
