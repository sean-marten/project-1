$(document).ready(function () {
  const tmdbApi = "0adfd846cf8f1168484b5da4e5339d7c";
  let personSearch = "";

  $(document).on("click", ".btn", function () {
    console.log("here");

    personSearch = $(".input").val();
    console.log(personSearch);

    retreiveData();
  });

  function retreiveData() {
    //this retreives the person ID so we can use other API searches to get more movies
    let tmdbPersonID = `https://api.themoviedb.org/3/search/person?api_key=${tmdbApi}&language=en-US&query=${personSearch}`;

    $.get(tmdbPersonID, function (response) {
      console.log(response);
      const personID = response.results[0].id;
      getMovieData(personID);
      getBioData(personID);
    });
    //uses that person ID to do an in depth search for movies
    function getMovieData(personID) {
      const tmdbMovies = `https://api.themoviedb.org/3/person/${personID}/combined_credits?api_key=${tmdbApi}&language=en-US`;

      $.get(tmdbMovies, function (response) {
        const movieArray = response.cast;
        const sortRating = movieArray
          .sort((a, b) => {
            return b.vote_average - a.vote_average;
          })
          .slice(0, 3);
        //looping through the sorted movies, getting movie poster image and appending to body for now
        $.each(sortRating, function (index) {
          const movieImage = $("<img>").attr(
            "src",
            "https://image.tmdb.org/t/p/w500/" + sortRating[index].poster_path
          );
          // $('body').append(movieImage)
        });
      });
    }
    function getBioData(personID) {
      const bioData = `https://api.themoviedb.org/3/person/${personID}?api_key=${tmdbApi}`;
      $.get(bioData, function (response) {
        // grabbing info for bio section
        const actorName = $('<h4>').text(response.name)
        const actorBirthday = $('<p>').text('Birthday: ' + response.birthday)
        const actorBirthplace = $('<p>').text('Birthplace: ' + response.place_of_birth)
        const actorKnownFor = $('<p>').text('Known for: ' + response.known_for_department)

        // the 'w' in the url below indicates the size of the image
        const actorImage = $('<img>').attr(
          "src",
          "https://image.tmdb.org/t/p/w500/" + response.profile_path
        );
        // dynamically append data to page
        $('.bio-img').append(actorImage);
        $('.card-bio').append(actorName);
        $('.card-bio').append(actorBirthday);
        $('.card-bio').append(actorBirthplace);
        $('.card-bio').append(actorKnownFor);
      });
    }
  }
});
