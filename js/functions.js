function renderFilms(array, obj){
    obj.innerHTML = null;
    
    array.forEach(movies =>{
        let moviesItem = document.createElement("li");
        moviesItem.classList.add("list-item");
        obj.appendChild(moviesItem);
   
        let moviesItemImg = document.createElement("img");
        moviesItemImg.classList.add("list-item-img");
        moviesItemImg.setAttribute("src", movies.Poster);
        moviesItemImg.addEventListener("error", () =>{
            moviesItemImg.setAttribute("src", "http://picsum.photos/300/300")
        })
        moviesItem.appendChild(moviesItemImg);
   
        let moviesItemBody = document.createElement("div");
        moviesItemBody.classList.add("list-item-body");
        moviesItem.appendChild(moviesItemBody);
   
        let moviesItemBodyTitle = document.createElement("h3");
        moviesItemBodyTitle.textContent = movies.Title;
        moviesItemBodyTitle.classList.add("list-item-body-title");
        moviesItemBody.appendChild(moviesItemBodyTitle);

        let moviesItemBodyMore = document.createElement("button");
        moviesItemBodyMore.textContent ="More";
        moviesItemBodyMore.classList.add("more");
        moviesItemBodyMore.dataset.moreId = movies.imdbID;
        moviesItemBody.appendChild(moviesItemBodyMore);
      });
 
   
}