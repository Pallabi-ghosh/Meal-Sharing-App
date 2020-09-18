"use strict"

window.handleHomeRequest = () => {
    function renderMeals() {
        fetch("/api/meals")
            .then(response => response.json())
            .then(meals => {
                document.head.innerHTML = `
                  <link rel="stylesheet" href="index.css" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                  <title>Foodieee-app</title>`;

                // <!--THIS IS HEADER. COMMENTS NOT DISPLAYED IN BROWSER-->
                document.body.innerHTML = `
                <body>
                                  <header>
                                      <div class="navigation-bar">
                        <div class="logo">
                            <img alt="logo" src="images/burger.svg">
                        </div>
                        <nav class="navbar">
                <li class="nav-info"><a class="nav-link" href="/"> Home</a></li>
                <li class="nav-meals"><a class="nav-link" href="meals"> Meals </a></li>
                <li class="nav-reservation"><a class="nav-link" href="reservations"> Reservations</a></li>
                <li class="nav-review"><a class="nav-link" href="reviews"> Reviews </a></li>
            </nav>
        </div>
        <section class="firststep">
        <div class="intro">
            <div class="heading_1">
                <h1>foodieee</h1>
            </div>
            <div class="header">
                <p> You can find your favourite meals here!</p>
            </div>
            <section>
                <div class="search-container">
                <input type="text" class="search" placeholder="Search">
                    <button id="submit">Fetch Posts</button>
                    <form class="add-meals-form"></form>
                </div>
            </section>
        </div>
    </section> 
    <div id="container">
  <div class="container-fluid">
      <h2> Our Story</h2>
    <div class="sidebar1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante facilisis bibendum dolor feugiat at. Duis sed dapibus leo nec ornare diam commodo nibh.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante facilisis bibendum dolor feugiat at. Duis sed dapibus leo nec ornare.
                </p>
            </div>
      </div>
      <div class="team-img"><img src="images/home.jpg" alt="..."></div>
        <div class="about__bg">
            </div>
</div>
    <section id="about">
    <h2>Meet Our Chef</h2>
    <div class="sidebar1">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante facilisis bibendum dolor feugiat at. Duis sed dapibus leo nec ornare diam commodo nibh.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante facilisis bibendum dolor feugiat at. Duis sed dapibus leo nec ornare.
                </p>
            </div>
            <div class="team-img"><img src="images/chef.jpg" alt="..."></div>
        <div class="about__bg">
            
        </div>
    </section>
    <div class="meals">
  <ul class="grid">
    <li class="small"></li>
                    </ul>                                                     
                  </div> 
                  </header>                                                 
                                    <footer>
                        <div class="container2">
                            <p>Copyright &copy; Pallabi Ghosh Das</p>
                        </div> 
                        </footer>
                        </body>
                                     `;

                let mealsDiv = document.querySelector('.meals ul');
                mealsDiv.innerHTML = meals.map(meal => {
                    return `<li>
                    <img class="logo" src="https://source.unsplash.com/user/erondu/600x300?${meal.title}" alt="picture of meal title">
                                          <h3>${meal.title}</h3>
                            
                </li>`
                }).join('')

                const search = document.querySelector('.search');
                search.addEventListener('input', () => {
                    let searchedValue = search.value;
                    mealsDiv.innerHTML = meals.map(meal => {
                        if (meal.title.toUpperCase().includes(searchedValue.toUpperCase())) {
                            return `<li>
                            <a href="meals" data-navigo>
                            <img class="logo" src="images/04.jpg?${meal.title}" alt="picture of meal title">                         
                            <h3>${meal.title}</h3>
                            <h4><i class="fa fa-eur" style="font-size:24px;"></i>  ${meal.price}</h4><br>
                          </li>`
                        }
                    }).join('')
                })
            })
    }
    renderMeals()
        // if any links are added to the dom, use this function
        // make the router handle those links.
    router.updatePageLinks();
};