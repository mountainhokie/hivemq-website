$(document).ready(function(){
  var regions = "hidden";
  $("#revealBtn").html("Show more regions");
  $("#revealBtn").click(function(){
      $(".hidden").toggleClass("reveal");
      if (regions == "revealed"){
        $("#revealBtn").html("Show more regions");
           regions = "hidden";
      } else {
        $("#revealBtn").html("Show less regions");
        regions = "revealed";
      } 
  });
});