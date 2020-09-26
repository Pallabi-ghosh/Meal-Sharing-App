//RenderReviews function
function renderReviews(meals) {
    const section = document.querySelector("section");
    const div = document.createElement("div");
    div.setAttribute("class", "review-div");

    meals.forEach((review) => {
        const ul = document.createElement("ul");
        const li = document.createElement("li");

        li.innerHTML = `Name : ${Object.values(review.name).join(
			""
		)} <br> Meal Number : ${review.meal_id}<br>Title : ${Object.values(
			review.title
		).join("")} <br> Description : ${Object.values(review.description).join(
			""
		)}`;
        ul.appendChild(li);
        div.appendChild(ul);
    });

    section.appendChild(div);
}

//Reviews route handler
window.handleReviewsRequest = () => {
    document.body.innerHTML = `
    
    <body>
    <!-- Navigation Bar -->
    <div class="navbar">
       <a href="/">Home</a>
       <a href="meals">Meals</a>
       <a href="reservations">Reservations</a>
       <a href="reviews">Review</a>
    </div>
    `;

    // make sure the backend api works before working with it here
    fetch("/api/review")
        .then((response) => response.json())
        .then(renderReviews);
};