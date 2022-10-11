let SearchInput = document.getElementById('search-input');
let MovieData = document.getElementById('moviedata')
let btn = document.getElementById('btn');

MovieData.innerHTML="<h2>Search Movie name on search box</h2>"

btn.addEventListener('click', () => {
    console.log(SearchInput.value)
    GetInputaVlue = SearchInput.value;
   

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a1ce5217f4mshf903431d8cda75ep175079jsn1efbd9f5f6f9',
            'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
        }
    };

    fetch(`https://movies-app1.p.rapidapi.com/api/movies?query=${GetInputaVlue}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response.results)

            let html = "";
            let countryOrigin;
            let watchMovie;
            for (let val of response.results) {
                console.log(val)

                countryOrigin=val.countries.map((val)=>{return val.name})
                watchMovie=val.embedUrls.map((val)=>{return `<a href=${val.url} target="_blank">${val.server}</a>`})
                
                html += `<div class="image-box"> <img src=${val.image}></div><div class="movie-title"><span>${val.titleOriginal}</span></div><div class="movie-rating">${val.rating} IMDb</div><div class="description-box"><p>${val.description}</p></div>
                <div class="countrie"><span>${countryOrigin}</span></div><div class="movie-release">${val.release}</div><div class="watchMovieBox">Watch Movie:${watchMovie}</div>`
            }

            MovieData.innerHTML=html;

            if(MovieData.innerHTML===''){
                MovieData.innerHTML="<h2>No movie found!</h2>"
            }


        })
        .catch(err => console.error(err));


})