"use strict"

const loc;
const button = document.querySelector('button');
const subInput = document.querySelector('input');
const result = document.querySelector('#result');
page.addEventListener("click", onload, false);

async function onload() {
    loc = document.querySelector(".searchBar").value.toLowerCase();
    fetch("/api/meals")
        .then((response) => response.json())
        .then((result) => {
            const listOfMeals = result.filter(
                (meal) => meal.title.toLowerCase() == inputValue
            );
            if (listOfMeals) {
                const jsonData = await response.json();
                result.innerHTML = renderList(jsonData);
            } else listOfMeals.map((item) => {
                const section = document.body.querySelector("section");
                const div = document.createElement("div");
                const ul = document.createElement("ul");
                const li = document.createElement("li");
                li.innerHTML = `<a href="meals/${item.id}"> ${Object.values(
                item.title
              )
                .join("")
                .toUpperCase()} : ${item.price} kr. </a>`;

                div.appendChild(ul);
                ul.appendChild(li);
                //section.appendChild(div)
                section.innerHTML = `<a href="meals/${item.id}">${Object.values(
                item.title
              )
                .join("")
                .toLocaleUpperCase()} : ${item.price} kr</a>`;
            });
        })
};





button.addEventListener('click', () => {
    onload(subInput.value);
});











window.handleHomeRequest = () => {
    fetch("/api/meals")
        .then((response) => response.json())
        .then((result) => {
            const section = document.querySelector("section");

            const p = document.createElement("p");
            p.innerHTML = ` SELECT YOUR MEAL :`;
            section.appendChild(p);

            result.forEach((element) => {
                const li = document.createElement("li");
                const ul = document.createElement("ul");
                li.innerHTML = `<a href="meals/${element.id}" >${Object.values(
					element.title
				)
					.join("")
					.toUpperCase()} : ${Object.values(element.price).join("")} kr.</a>`;
                ul.appendChild(li);
                section.appendChild(ul);
            });
        });
    document.body.innerHTML =
        ` <header>
        <section class="firststep">
            <div class="heading_1">
                <h1>Meal Sharing App</h1>
            </div>
            <p> You can find your favourite meals here!</p>
        </div>
        <div class="topnav">
           
                <li class="nav-item-bg-info"><a class="nav-link" href="/"> Home</a></li>
                <li class="nav-item"><a class="nav-link" href="meals"> Meals </a></li>
                <li class="nav-item"><a class="nav-link" href="reservations"> Reservations</a></li>
                <li class="nav-item"><a class="nav-link" href="reviews"> Reviews </a></li>
           
        </div>
        </header>
        <div class="search-container">
            <input class="searchBar" name="Meal_name" id="recomendationInput" placeholder="Meals Name..." onkeyup="matchingTitle()">
            <button type="submit" id="btn"></button>
        </div>
        <section> </section>
        <footer>
            <div class="container">
                <p>Copyright &copy; Pallabi Ghosh Das</p>
            </div>
        </footer>
    </div>
  `;





    // if any links are added to the dom, use this function
    // make the router handle those links.
    router.updatePageLinks();
};