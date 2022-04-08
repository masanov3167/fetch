const header = document.createElement("header");
header.classList.add("header");
document.body.appendChild(header);

const brand = document.createElement("a");
brand.setAttribute("href", "./index.html");
brand.textContent = "OMDb API";
brand.classList.add("brand");
header.appendChild(brand);

const form = document.createElement("form");
form.setAttribute("method", "POST");
form.setAttribute("autocomplate", "off");
form.classList.add("form");
header.appendChild(form);

const formInput = document.createElement("input");
formInput.setAttribute("type","text");
formInput.setAttribute("maxlength","20");
formInput.setAttribute("aria-label", "type the name of the movie here");
formInput.setAttribute("placeholder", "type the film's name..");
formInput.setAttribute("required", "true");
formInput.classList.add("form-input");
form.appendChild(formInput);

const formBtn = document.createElement("button");
formBtn.setAttribute("type", "submit");
formBtn.textContent = "Search";
formBtn.classList.add("form-btn");
form.appendChild(formBtn);

const main = document.createElement("main");
main.classList.add("main");
document.body.appendChild(main);

const list = document.createElement("ol");
list.classList.add("list");
main.appendChild(list);

const API_KEY = "181b7d87";

let films;
const modalArr = [];

const modal = document.createElement("div");
modal.classList.add("modal");
document.body.appendChild(modal);

const modalLoader = document.createElement("img");
modalLoader.classList.add("modal-loader");
modalLoader.setAttribute("src", "https://acegif.com/wp-content/uploads/loading-78.gif");

const modalImg = document.createElement("img");
modalImg.classList.add("modal-img");

const modalBody = document.createElement("div");
modalBody.classList.add("modal-body");

const modalTitle = document.createElement("h3");
modalBody.appendChild(modalTitle); 

const modalYear = document.createElement("time");
modalBody.appendChild(modalYear);

const modalRate = document.createElement("p");
modalBody.appendChild(modalRate);

const modalReleased = document.createElement("p");
modalBody.appendChild(modalReleased);

const modalRuntime = document.createElement("time");
modalBody.appendChild(modalRuntime);

const modalGenre = document.createElement("p");
modalBody.appendChild(modalGenre);

const modalDirector = document.createElement("p");
modalBody.appendChild(modalDirector);

const modalWriter = document.createElement("p");
modalBody.appendChild(modalWriter);

const modalActors = document.createElement("p");
modalBody.appendChild(modalActors);

const modalLanguage = document.createElement("p");
modalBody.appendChild(modalLanguage);

const modalCountry = document.createElement("p");
modalBody.appendChild(modalCountry);

const modalAwards = document.createElement("p");
modalBody.appendChild(modalAwards);

const modalType = document.createElement("p");
modalBody.appendChild(modalType);

const modalPlot = document.createElement("p");
modalPlot.classList.add("modal-plot");
modalBody.appendChild(modalPlot);

const modalRatings = document.createElement("p");
modalRatings.classList.add("modal-ratings");
modalBody.appendChild(modalRatings);

const ratingList = document.createElement("ol");
ratingList.classList.add("rating-list");
modalBody.appendChild(ratingList);

form.addEventListener("submit", evt =>{
    evt.preventDefault();
    const val = formInput.value;

    async function nom(){
                                   
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${val}`);
        const data = await response.json();
        films = data.Search;
        renderFilms(films, list)
        formInput.value = "";
  };
  nom();
})

list.addEventListener("click", evt =>{
    if(evt.target.matches(".more")){
        modal.innerHTML = null;
        modal.appendChild(modalLoader);
        modalLoader.classList.remove("display-none");
        main.style.opacity = 0.2;
        modal.classList.add("show");
        const btnId = evt.target.dataset.moreId;

        const find = films.find(a => a.imdbID == btnId);

            async function name(){
                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${find.Title}&plot=full`);
                const data = await res.json();

                 setTimeout( () =>{
                    modalLoader.classList.add("display-none");
                    
                    modal.appendChild(modalImg);
                    modalImg.setAttribute("src", data.Poster);
                    modalImg.addEventListener("error", () =>{
                        modalImg.setAttribute("src", "https://picsum.photos/250/300");
                    });

                    modal.appendChild(modalBody);
                    modalTitle.innerHTML = `<span class="white">Title: </span>${data.Title}`;
                    modalYear.innerHTML = `<span class="white">Year: </span>${data.Year}`;
                    modalRate.innerHTML = `<span class="white">Rated: </span>${data.Rated}`;
                    modalReleased.innerHTML = `<span class="white">Released: </span>${data.Released}`;
                    modalRuntime.innerHTML = `<span class="white">Run time: </span>${data.Runtime}`;
                    modalGenre.innerHTML = `<span class="white">Genres: </span>${data.Genre}`;
                    modalDirector.innerHTML = `<span class="white">Director: </span>${data.Director}`;
                    modalWriter.innerHTML = `<span class="white">Writer: </span>${data.Writer}`;
                    modalActors.innerHTML = `<span class="white">Actors: </span>${data.Actors}`;
                    modalPlot.innerHTML = `<span>More info</span>${data.Plot}`;
                    modalLanguage.innerHTML = `<span class="white">Language: </span>${data.Language}`;
                    modalCountry.innerHTML = `<span class="white">Country: </span>${data.Country}`;
                    modalAwards.innerHTML = `<span class="white">Awards: </span>${data.Awards}`;
                    modalRatings.innerHTML = `<span class="white">Ratings: </span>`;

                    data.Ratings.forEach(a =>{
                        let Rating = document.createElement("li");
                        Rating.innerHTML = `<p></p><span class="white">Source: </span>${a.Source} </p>
                        <p class="value">  <span class="white">Value: </span>${a.Value}</p>`
                        ratingList.appendChild(Rating);
                    });
                    modalType.innerHTML = `<span class="white">Type: </span>${data.Type}`;
                 }, 1000);
            }
            name();
    }
    else{
        main.style.opacity = 1;
        modal.classList.remove("show");
        modal.innerHTML = null;
    }
})
