const createMeal = () => {
    document.querySelector('.error').textContent = ''

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const location = document.getElementById('location').value
    const when = document.getElementById('when').value
    const max_reservations = document.getElementById('max_reservations').value
    const price = document.getElementById('price').value
    const created_date = document.getElementById('created_date').value

    if (title == '' || description == '' || location == '' || when == '' || max_reservations == '' || price == '' || created_date == '') {
        document.querySelector('.error').textContent = 'Please enter all fields'
    } else {
        fetch(`/api/meals`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    'title': title,
                    'description': description,
                    'location': location,
                    'when': when,
                    'max_reservations': max_reservations,
                    'price': price,
                    'created_date': created_date
                })
            })
            .then(response => {
                console.log(response);
                if (response.status == '200') {
                    alert('Meal created successfully')
                } else {
                    console.log('Error creating meal');
                }
            })
    }
}
window.handleMealsRequest = () => {
    function renderMeals() {
        fetch("/api/meals")
            .then(response => response.json())
            .then(meals => {
                document.head.innerHTML = `
                    <link rel="stylesheet" href="meals.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    <link href="images/Group.png" rel="icon">
                    <title>Meals</title>
                    `;

                document.body.innerHTML = `
                <body>
                <!-- Navigation Bar -->
                <div class="navbar">
                   <a href="/">Home</a>
                   <a href="meals">Meals</a>
                   <a href="reservations">Reservations</a>
                   <a href="reviews">Review</a>
                </div>
                <div class="meals">
                   <h1>Our Specials</h1>
                   <div class="search-container">
                      <input type="text" class="search" placeholder="Search">
                      <button id="submit">search meals</button>
                      <form class="add-meals-form"></form>
                   </div>
                   <ul></ul>
                </div>
                <br><br>
                <section>
                   <div class="totalbox border">
                      <h2>Create Your Own Meal</h2>
                      <form method="POST" class="loginForm">
                         <label for="title">Title:</label><br>
                         <input type="text" id="title" name="title" value=""><br>
                         <label for="description">Description:</label><br>
                         <input type="text" id="description" name="description" value=""><br><br>
                         <label for="location">Location:</label><br>
                         <input type="text" id="location" name="location" value=""><br><br>
                         <label for="when">When:</label><br>
                         <input type="text" placeholder="yyyy-mm-dd" id="when" name="when" value=""><br><br>
                         <label for="max_reservations">Maximum reservations:</label><br>
                         <input type="text" id="max_reservations" name="max_reservations" value=""><br><br>
                         <label for="price">Price:</label><br>
                         <input type="text" id="price" name="price" value=""><br><br>
                         <label for="created_date">Created date:</label><br>
                         <input type="text" placeholder="yyyy-mm-dd" id="created_date" name="created_date" value=""><br><br>
                      </form>
                      <div class='error'></div>
                      <button class="loginbtn" onclick="createMeal()">Create meal</button>                                     
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
                            <h4><i class="fa fa-eur" style="font-size:24px;"></i>  ${meal.price}</h4>
                            <a href='meal/${meal.price}'><strong>book now<strong></a><br><br>
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
                                    <h4><i class="fa fa-eur" style="font-size:24px;"></i>  ${meal.price}</h4>
                                    <a href='meal/${meal.price}'><strong>book now<strong></a><br><br>
                                </li>`
                        }
                    }).join('')
                })
            })
    }
    renderMeals()

}