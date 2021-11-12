let currentId = 0;
let moviesInfo = [];
$("button").on("click", function (evt) {
  $("#error_msg").empty();
  evt.preventDefault();
  //alert("button clicked");
  let title = $('#titleName').val();
  let rating = $('#rating').val();
  //console.log("title " + title + " Rating " + rating);
  if( title.length < 2){
    $("#error_msg").text("Movie Title has to be minimum 2 characters");
    return;
  }
  if ( +rating <0 || +rating >10){
    $("#error_msg").text("Rating has to be between 0 and 10");
    return;
  }
  currentId++;
  let movieData = { title, rating, currentId };
  moviesInfo.push(movieData);
  let table = $('#movie-table-body');
  table.append(createHTMLMovieData(movieData));
  $("#new-movie-form").trigger("reset");
  
});

//$("tbody").on('click', ".btn.btn-danger", function(evt){
$("tbody").on("click", ".btn.btn-danger", function(evt) {
  evt.target.closest("tr").remove();
  let deleteId = $(evt.target).data("delete");
 
  let indexToDelete = moviesInfo.findIndex(function(movie) {
    return movie.currentId === deleteId;
  });
  moviesInfo.splice(indexToDelete, 1);
});

// when an arrow is clicked, 
$(".fas").on("click", function(evt){
  let direction = $(evt.target).hasClass("fa-sort-down") ? "down": "up";
  let keyToSortBy = $(evt.target).attr("id");
  let sortedMovies = sortBy(moviesInfo, keyToSortBy, direction);
  
  //Empty the table
  $("#movie-table-body").empty();
  for(let movie of sortedMovies){
    const HTMLtoAppend = createHTMLMovieData(movie);
    //console.log("HTML" + HTMLtoAppend);
    $("#movie-table-body").append(HTMLtoAppend);
   
  }
  //console.log("**************************");
 
  $(evt.target).toggleClass("fa-sort-down");
  $(evt.target).toggleClass("fa-sort-up");

});

/* accepts an array of objects and a key and sorts by that key */

function sortBy(array, keyToSortBy, direction) {
  let sortedArray =  array.sort(function(a, b) {
    // since rating is a number, we have to convert these strings to numbers
    //cast to number
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (  a[keyToSortBy] > b[keyToSortBy] ){
      //sort in ascending order
      return direction === "up" ? 1: -1;
    } else if (a[keyToSortBy] < b[keyToSortBy] ){
      return direction === "down" ? 1: -1;
    } else {
      return 0;
    }
  });
  return sortedArray;
}

function createHTMLMovieData(data){
  let htmlData = `<tr>
                    <td>${data.title}</td>
                    <td>${data.rating}</td>
                    <td>
                      <button class="btn btn-danger" data-delete=${data.currentId}>Delete</button>
                    </td>`
  return htmlData;

}