$(document).ready(function(){
    const NYTAPI = 'Vzp9bxJBwPxOUom0nJ0iuroOmy8wXd05';
    const NYTMovie = '';//we will need to grab the movie name from wherever it will be rendered on the page
    const NTYQueryMovies = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='+ NYTMovie + 'api-key=' + NYTAPI;
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
        })
        //uses that person ID to do an in depth search for movies
        function getMovieData(personID){
            const TMDBMovies = 'https://api.themoviedb.org/3/person/'+ personID + '/combined_credits?api_key='+ TMDBAPI + '&language=en-US';
            $.get(TMDBMovies, function(response){
                const movieArray = response.cast;
                const sortRating = movieArray.sort((a,b) => {
                    return b.vote_average - a.vote_average
                }).slice(0,3)
        
                console.log("SORTED___", sortRating);
            })
        }
    }
   
    
})