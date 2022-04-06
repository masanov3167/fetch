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
modal.classList.add("modal", "display-none");
document.body.appendChild(modal);

const modalTitle = document.createElement("h3");
modalTitle.classList.add("modal-title"); 
modal.appendChild(modalTitle);

const modalYear = document.createElement("time");
modal.appendChild(modalYear);

const modalType = document.createElement("p");
modalType.classList.add("modal-type");
modal.appendChild(modalType);

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
        main.style.opacity = 0.2;
        modal.classList.remove("display-none");
        const btnId = evt.target.dataset.moreId;

        const find = films.find(a => a.imdbID == btnId);
        modalArr.push(find);

        modalArr.forEach(a => {
            modalTitle.innerHTML = `<span class="movies-span">Title:</span> ${a.Title}`;
            modalYear.innerHTML = `<span class="movies-span">Year:</span> ${a.Year}`;
            modalType.innerHTML = `<span class="movies-span">Type:</span> ${a.Type}`;
        })
    }
    else{
        main.style.opacity = 1;
        modal.classList.add("display-none");
    }
})
