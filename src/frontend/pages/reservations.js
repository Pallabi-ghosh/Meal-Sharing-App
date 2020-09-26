//render function
function renderReservations(reservations) {
    const container = document.querySelector(".container")
    const div = document.createElement("div");
    reservations.forEach((reservation) => {
        const ul = document.createElement("ul");
        const li = document.createElement("li");

        li.innerHTML = `Name : ${Object.values(reservation.name).join("")} <br> Email : ${Object.values(reservation.email).join("")}
        <br> Phone Number : ${reservation.phone} <br> Number of people : ${reservation.number_of_guests}`;
        ul.appendChild(li);
        div.appendChild(ul);
    });

    container.appendChild(div);
}


//reservations route handler
window.handleReservationsRequest = () => {
    document.head.innerHTML = `
                    <link rel="stylesheet" href="meals.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    <link href="images/Group.png" rel="icon">
                    <title>Reservations</title>
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
                  <h1> All Resevations</h1>
                  <div class="search-container">
                    <form class="add-meals-form"></form>
                </div>
                <!-- Features Section -->
                <div id="features" class="text-center">
                    <div class="row">
                      <div class="col-xs-12 col-sm-4">
                        <div class="features-item">
                          <h3>Lorem ipsum dolor</h3>
                          <img src="images/01.jpg" class="img-responsive" alt="">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo.</p>
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <div class="features-item">
                          <h3>Consectetur adipiscing</h3>
                          <img src="images/04.jpg" class="img-responsive" alt="">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo.</p>
                        </div>
                      </div>
                      <div class="col-xs-12 col-sm-4">
                        <div class="features-item">
                          <h3>Duis sed dapibus</h3>
                          <img src="images/02.jpg" class="img-responsive" alt="">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      
      
      `;

    fetch("/api/reservations")
        .then((response) => response.json())
        .then(renderReservations)

};