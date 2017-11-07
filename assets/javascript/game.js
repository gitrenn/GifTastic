$(document).ready(function(){
    var robots = ["calculon", "daleks", "wall-e", "cylon centurion"];
    var limit = 10; 

    renderButtons();

    $(document).on("click", ".robot", displayRobots);

    function displayRobots(){
        var $robot = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IBJnoLKIE0W4kb6Uh1VcfNBwXYiiTaRL&q=" + 
            $robot + "&limit=" + 
            limit + "&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            var results = response.data;
            console.log(results);
            for(var i = 0; i < results.length; i++){
                var $gifDiv = $("<div>").addClass("item");

                var rating = results[i].rating;

                var $p =$("<p>").text("Rating: " + rating);

                var $image = $("<img>");
                // get urls for still and animated gifs
                var img_still_url = results[i].images.fixed_height_still.url;
                var img_animated_url = results[i].images.fixed_height.url;

                // add attributes for the image tag
                $image.attr("src", img_still_url);
                $image.attr("data-still", img_still_url);
                $image.attr("data-animated", img_animated_url);
                $image.attr("data-state", "still");
                $image.addClass("gif");

                $gifDiv.prepend($p);
                $gifDiv.prepend($image);

                $(".giphy-view").prepend($gifDiv);
            }
        });
    }




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