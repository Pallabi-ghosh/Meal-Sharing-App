"use strict"

window.handleHomeRequest = () => {
    document.head.innerHTML = `
                  <link rel="stylesheet" href="index.css" />
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                  <link href="images/Group.png" rel="icon">
                  <title>Foodieee-app</title>`;

    // <!--THIS IS HEADER. COMMENTS NOT DISPLAYED IN BROWSER-->
    document.body.innerHTML = `
    <body>

<!-- Header -->
<div class="header">
  <h1>Foodiee</h1>
  <p>You can<b>find your</b> favourite meals here!</p>
</div>

<!-- Navigation Bar -->
<div class="navbar">
<a href="/">Home</a>
<a href="meals">Meals</a>
<a href="reservations">Reservations</a>
<a href="reviews">Review</a>
</div>

<!-- The flexible grid (content) -->
<div class="row">
  <div class="side">
    <h2>About Us</h2>
    <div class="fakeimg"><img src="images/home.jpg"style="height:200px;"></div>
    <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    <h3>Our Specials</h3>
    <div class="img"><img src="images/3.jpg"style="height:80px;"></div><br>
    <div class="img"><img src="images/2.jpg"style="height:80px;"></div><br>
    <div class="img"><img src="images/04.jpg"style="height:95px;"></div><br>
    <div class="img"><img src="images/1.jpg"style="height:80px;"></div>
  </div>
  <div class="main">
    <h2>Our Story</h2>
    <h5>Title description, Dec 7, 2017</h5>
    <div class="fakeimg"><img src="images/restaurant.jpg"style="width:90%;"></div>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <br>
    <h2>Meet Our Chef</h2>
    <h5>Title description, Sep 2, 2017</h5>
    <div class="fakeimg"><img src="images/chef.jpg2.jpg" style="width:90%;"></div>
    <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
  </div>
</div>
  <div id="form-div">
    <form class="form" id="form1">
      
      <p class="name">
        <input name="name" type="text" class="validate[required,custom[onlyLetter],length[0,100]] feedback-input" placeholder="Name" id="name" />
      </p>
      
      <p class="email">
        <input name="email" type="text" class="validate[required,custom[email]] feedback-input" id="email" placeholder="Email" />
      </p>
      
      <p class="text">
        <textarea name="text" class="validate[required,length[6,300]] feedback-input" id="comment" placeholder="Comment"></textarea>
      </p>
      
      
      <div class="submit">
        <input type="submit" value="SEND" id="button-blue"/>
        <div class="ease"></div>
      </div>
    </form>
  </div>

<!-- Footer -->
<div class="footer">
  <p>Copyright &copy; Pallabi Ghosh Das</p>
</div>

</body>
</html>
 `;
    // if any links are added to the dom, use this function
    // make the router handle those links.
    router.updatePageLinks();
};