$(document).ready(function () {
    var robots = ["bender futurama", "calculon futurama", "wall-e", "marvin robot"];
    var limit = 10;

    renderButtons();

    $(document).on("click", ".robot", displayRobots);


    function displayRobots() {
        var $robot = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IBJnoLKIE0W4kb6Uh1VcfNBwXYiiTaRL&q=" +
            $robot + "&limit=" +
            limit + "&offset=0&rating=pg&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var $gifDiv = $("<div>").addClass("item");

                var rating = results[i].rating;

                var $p = $("<p>").text("Rating: " + rating);

                var $image = $("<img>").addClass("gif");
                // get urls for still and animated gifs
                var img_still_url = results[i].images.fixed_height_still.url;
                var img_animated_url = results[i].images.fixed_height.url;

                // add attributes for the image tag
                $image.attr("src", img_still_url);
                $image.attr("data-still", img_still_url);
                $image.attr("data-animate", img_animated_url);
                $image.attr("data-state", "still");


                $gifDiv.prepend($p);
                $gifDiv.prepend($image);

                $(".giphy-view").prepend($gifDiv);
            }
        });
    }

    function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < robots.length; i++) {
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

    // create function to implement gif-state switch feature  
    $(".giphy-view").on("click", ".gif", function () {
        var state = $(this).data("state");

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).data("state", "animate");
            console.log("Switched state: " + $(this).data("state"));
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).data("state", "still");
            console.log("Switched state: " + $(this).data("state"));
        }
    });
})