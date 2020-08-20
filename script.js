$(document).ready(function(){
    const movieGluAPI = '5zwPt8bzCu7r7rifnKoCd827XemsTLcO6rk51vTy';
    // const NYTMovie = '';//we will need to grab the movie name from wherever it will be rendered on the page
    // const NTYQueryMovies = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+ NYTMovie + 'api-key=' + NYTAPI;
    const TMDBAPI = '0adfd846cf8f1168484b5da4e5339d7c';
    const personSearch = 'matthew mcconaughey' ;//function around get requests that gets value of input when search is clicked
    const TMDBPersonID ='https://api.themoviedb.org/3/search/person?api_key=' + TMDBAPI + '&language=en-US&query=' + personSearch;
    

    // NYT get request
    // $.get(NTYQueryMovies, function(response){
        
    
    // })
    //grab whatever search button is going to be called, run get request on click rather than on load
    $().on('click', function(){
        //input value needs to be what the actual input will be called
        //personSearch = input.val();
        retreiveData();
    })

    function retreiveData (){ //this retreives the person ID so we can use other API searches to get more movies
        $.get(TMDBPersonID, function(response){
            const personID = response.results[0].id
            getMovieData(personID)
            getBioData(personID)
        })
        //uses that person ID to do an in depth search for movies
        function getMovieData(personID){
            const TMDBMovies = 'https://api.themoviedb.org/3/person/'+ personID + '/combined_credits?api_key='+ TMDBAPI + '&language=en-US';
            $.get(TMDBMovies, function(response){
                const movieArray = response.cast;
                const sortRating = movieArray.sort((a,b) => {
                    return b.vote_average - a.vote_average
                }).slice(0,3)
                //looping through the sorted movies, getting movie poster image and appending to body for now
                $.each(sortRating, function(index){
                    const movieImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500/' + sortRating[index].poster_path);
                    // $('body').append(movieImage)
                })
                
                console.log("SORTED___", sortRating);
            })
        }
        function getBioData(personID){
            const bioData = 'https://api.themoviedb.org/3/person/'+ personID + '?api_key=' + TMDBAPI ;
            $.get(bioData, function(response){
                console.log(response)
                //grabbing info for bio section, we can uncomment once we link to the HTML elements, Still need to figure out the picture
                // const actorName = $('').text(response.name)
                // const actorBirthday = $('').text(response.birthday)
                // const actorKnownFor = $('').text(response.known_for_department)
                // const actorBirthplace = $('').text(response.place_of_birth)

                // the 'w' in the url below indicates the size of the image
                const actorImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500/' + response.profile_path)
                // $('body').append(actorImage)
            })
        }
    }
   retreiveData();
   
    
})