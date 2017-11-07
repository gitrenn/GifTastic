$(document).ready(function(){
    var robots = ["calculon", "daleks", "wall-e", "number six"];

    renderButtons();


    function renderButtons(){
        $("#buttons-view").empty();

        for(var i = 0; i < robots.length; i++){
            var $btn = $("<button>");
            // added bootstrap class 
            $btn.addClass("btn");
            $btn.addClass("btn-info");
            $btn.addClass("btn-sm");
            // added other attributes 
            $btn.addClass("robot");
            $btn.attr("data-name", robots[i]);
            $btn.text(robots[i]);
            // display it in the designated area
            $("#buttons-view").append("|").append($btn);  
        }
    }
})