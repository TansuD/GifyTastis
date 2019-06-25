$(document).ready(function () {

    var fixedButtons = ["The Doctor", "River Song", "Amelia Pond", "Rory Williams"];



    $("#display-images").empty();
    var input = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=DXGhwsQreBn806K1d2Iwo411gwb7CMtv";


    function displayImg() {

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);


            for (var i = 0; i < limit; i++) {

                var newDiv = $("<div>");
                newDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.original_still.url);
                image.attr("data-animate", response.data[i].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                newDiv.append(image);

                var rating = response.data[i].rating;
                console.log(response);
                var imageRating = $("<p>").text("Rating: " + rating);
                newDiv.append(imageRating)

                $("#display-images").append(newDiv);
            }
        });
    }

    function newButton() {

        $("#display-buttons").empty();

        for (var i = 0; i < fixedButtons.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
            newButton.attr("data-name", fixedButtons[i]);
            newButton.text(fixedButtons[i]);
            $("#display-buttons").append(newButton);
        }
    }

    function imageState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $("#submit").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
        fixedButtons.push(input);

        newButton();

        return false;
    })

    newButton();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageState);
});