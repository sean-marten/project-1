$(document).ready(function () {
  const tmdbApi = "0adfd846cf8f1168484b5da4e5339d7c";
  let personSearch = "";

  $(document).on("click", ".search", function () {
    $('.topRated').empty()
    personSearch = $(".input").val();
    retreiveData();
    $('.input').val('')
  });

  function retreiveData() {
    //this retreives the person ID so we can use other API searches to get more movies
    let tmdbPersonID = `https://api.themoviedb.org/3/search/person?api_key=${tmdbApi}&language=en-US&query=${personSearch}`;

    $.get(tmdbPersonID, function (response) {
      const personID = response.results[0].id;
      getMovieData(personID);
      getBioData(personID);
    });
    //uses that person ID to do an in depth search for movies
    function getMovieData(personID) {
      const tmdbMovies = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${tmdbApi}&language=en-US`;

      $.get(tmdbMovies, function (response) {
        const movieArray = response.cast;
        const sortRating = movieArray
          .sort((a, b) => {
            return b.vote_average - a.vote_average;
          }).slice(0, 3);
        //looping through the sorted movies, creating cards with info
        $.each(sortRating, function (index) {
          const cardContainer = $('<div>').addClass('col-lg-4 col-md-6')
          const createCard = $('<div>').addClass('card')
          const cardImgContainer = $('<div>').addClass('view')
          const cardImg =$('<img>').attr("src",
          "https://image.tmdb.org/t/p/w200/" + sortRating[index].poster_path).attr('alt', 'movie poster').addClass('card-img-top')
          cardImgContainer.append(cardImg)
          const cardBody = $('<div>').addClass('card-body elegant-color white-text')
          const cardTitle = $('<h3>').addClass('cardTitle').text(sortRating[index].title)
          const cardText = $('<p>').addClass('card-text white-text').text(sortRating[index].overview)
          const cardRating = $('<p>').addClass('card-text white-text').text('Rating: ' + sortRating[index].vote_average + '/10')
          cardBody.append(cardTitle, cardText, cardRating)
          createCard.append(cardImgContainer, cardBody)
          cardContainer.append(createCard)
          $('.topRated').append(cardContainer)
        });
      });
    }
    function getBioData(personID) {
      const bioData = `https://api.themoviedb.org/3/person/${personID}?api_key=${tmdbApi}`;
      $.get(bioData, function (response) {
        // clear bio div
        $('.bio').text('')
        // create HTML framework for bio section
        const $imgDiv = $('<div>').addClass('view card-img')
        const $infoDiv = $('<div>').addClass('card-body card-bio')
        $('.bio').append($imgDiv);
        $('.bio').append($infoDiv);
        // grabbing info for bio section
        const actorName = $('<h4>').text(response.name).addClass('card-title')
        const actorBirthday = $('<p>').text('Birthday: ' + response.birthday).addClass('card-text')
        const actorBirthplace = $('<p>').text('Birthplace: ' + response.place_of_birth).addClass('card-text')
        const actorKnownFor = $('<p>').text('Known for: ' + response.known_for_department).addClass('card-text')
        // the 'w' in the url below indicates the size of the image
        const actorImage = $('<img>').attr(
        'src', 
        'https://image.tmdb.org/t/p/w500/' + response.profile_path).attr(
        'alt', 
        'Actor Image').addClass('card-img-top');
        // dynamically append data to page
        $('.card-img').append(actorImage);
        $('.card-bio').append(actorName, actorBirthday, actorBirthplace, actorKnownFor);
      });
    }
  }
  
});
