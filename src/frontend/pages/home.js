"use strict"

window.handleHomeRequest = () => {
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
            <li class="nav-add"><a class="nav-link" href="addMeals"> NewMeal </a></li>
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
   </header>
   <footer>
      <div class="container2">
         <p>Copyright &copy; Pallabi Ghosh Das</p>
      </div>
   </footer>
</body>
 `;
    // if any links are added to the dom, use this function
    // make the router handle those links.
    router.updatePageLinks();
};