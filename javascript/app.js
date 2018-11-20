// Create a array of interesting topics and label 'topics'
var topics = ["Basketball", "Monkey", "Movies", "Comedy"];

function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#topics-view").empty();
    $("topics").empty();
    

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
      // Generate buttons for each topic in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class ot topic-btn to the button
      a.addClass("topic-btn");
      // Adding a data-attribute with a value of the topics at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the topics at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#topics-view").append(a);
      console.log(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box

    // The topic from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".topic-btn", displayTopicInf0);


  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();

//   ============================================================================================
// =================================================================================================

function displayTopicInf0() {
var topicReq = $(this).attr("#topic-input");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topicReq + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var topicImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              topicImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and topicImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(topicImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").html(gifDiv);
            }
          }
        });
    }