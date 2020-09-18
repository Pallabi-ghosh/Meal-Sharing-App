window.handleMealsRequest = () => {
    function renderMeals() {
        fetch("/api/meals")
            .then(response => response.json())
            .then(meals => {
                document.head.innerHTML = `
                      <link rel="stylesheet" href="meals.css" />
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                      <title>Meals</title>
                      `;

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
<div id="container">

<span class="input">
  <input type="text" class="input__field" id="input-1" />
  <label for="input-1" class="input__label">
    <span class="input__label-content">First Name</span>
</label>
</span>

<span class="input">
  <input type="text" class="input__field" id="input-2" />
  <label for="input-2" class="input__label">
    <span class="input__label-content">Last Name</span>
  </label>
</span>

<span class="input">
  <input type="text" class="input__field" id="input-3" />
  <label for="input-3" class="input__label">
    <span class="input__label-content">Phone Number</span>
  </label>
</span>

<span class="input">
  <input type="text" class="input__field" id="input-4" />
  <label for="input-4" class="input__label">
    <span class="input__label-content">Email Address</span>
  </label>
</span>

<span class="input message">
  <textarea class="input__field" id="input-5"></textarea>
  <label for="input-5" class="input__label">
    <span class="input__label-content">Message</span>
  </label>
</span>

<button id="send-button" type="button">Send</button>

</div>            
  </section>
    </header>
    </body>
`;

                let mealsDiv = document.querySelector('.meals ul')
                mealsDiv.innerHTML = meals.map(meal => {
                    return `<li>
                              <img class="logo" src="https://source.unsplash.com/user/erondu/600x300?${meal.title}" alt="picture of meal title">
                              <h3>${meal.title}</h3><br>
                              <h4><i class="fa fa-map-marker" style="font-size:24px;"></i>  ${meal.location}</h4>
                              <a href='meal/${meal.id}'><strong>See details<strong></a><br><br>
                          </li>`
                }).join('')

                const search = document.querySelector('.search');
                search.addEventListener('input', () => {
                    let searchedValue = search.value
                    mealsDiv.innerHTML = meals.map(meal => {
                        if (meal.title.toUpperCase().includes(searchedValue.toUpperCase())) {
                            return `<li>
                                      <img class="logo" src="https://source.unsplash.com/user/erondu/600x300?${meal.title}" alt="picture of meal title">
                                      <h3>${meal.title}</h3><br>
                                      <h4><i class="fa fa-map-marker" style="font-size:24px;"></i>  ${meal.location}</h4>
                                      <a href='meal/${meal.id}'><strong>See details<strong></a><br><br>
                                  </li>`
                        }
                    }).join('')
                })
            })
    }
    renderMeals()
}