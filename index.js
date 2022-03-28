let loggedoutlinks = document.querySelectorAll('.loggedout');
let loggedinlinks = document.querySelectorAll('.loggedin');

let content = document.querySelector('#content');

// functions

function configureNav(user){
  // check if user is signed in
  if(user) {
    document.querySelector('#welcome').innerHTML = `Signed in as: ${auth.currentUser.email}`
    document.querySelector('#message').innerHTML = "";
    // show all loggedin links
    loggedinlinks.forEach((link) => {
      link.classList.remove('is-hidden');
    })
    
    // hide all loggedout links
    loggedoutlinks.forEach((link) => {
      link.classList.add('is-hidden');
    })
  }
  // if no user is signed in
  else{
    document.querySelector('#welcome').innerHTML = "";
    document.querySelector('#message').innerHTML = "please log in to view the listings";
    // show all the loggedout links
    loggedoutlinks.forEach((link) => {
      link.classList.remove('is-hidden');
    })

    // hide all loggedin links
    loggedinlinks.forEach((link) => {
      link.classList.add('is-hidden');
    })
  }
}

// get the data from firebase

db.collection('listings').get().then((data) => {
  let listings = data.docs;
  let listingsLink = document.querySelector("#listingsLink");
  let listinghtml = `
  <div class="section">
  <div class="container">
      <div class="columns">
          <div class="column is-2">
          </div>
          <!-- main content -->
          <div class="column is-8">
              <h1 class="is-size-3 pb-4"> Listings </h1>
              <p> If you don't see what you're looking for, check back later, new listings are being added everyday! </p>
          </div>
          <div class="column is-2">
          </div>
      </div>
  </div>
  </div>`;

    listings.forEach((listing) => {
      listinghtml += `
      <div class="container pb-6">
          <div class="columns">
              <div class="column is-2">
              </div>
  
              <!-- main content -->
              <div class="column is-8">
                      <!-- listing card -->
                      <div>
                        <div class="card">
                           <div class="card-image">
                             <figure class="image is-3by1.5">
                               <img src="${listing.data().url}" alt="listingImage">
                             </figure>
                           </div>
                           <div class="card-content">
                             <div class="media">
                               <div class="media-content">
                               <div class="columns">
                                  <div class="column is-6">
                                    <p class="title is-3">${listing.data().year} ${listing.data().make} ${listing.data().model}</p>
                                  </div>
                                  <div class="column is-6">
                                    <p class="title is-3 has-text-right">$${listing.data().price}</p>
                                  </div>
                                </div>
                               </div>
                             </div>
                             <div class="columns">
  
                                 <!-- specifications table -->
  
                               <div class="column is-6">
                                   <div class="message is-black">
                                       <div class="message-header">
                                           <p>Specifications</p>
                                       </div>
                                       <div class="message-body">
                                         <div class="table-container">
  
                                             <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth px-6">
                                                 <tr>
                                                   <th class="has-text-right">Mileage</th>
                                                   <td>${listing.data().mileage}</td> 
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Body Style</th>
                                                   <td>${listing.data().body}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Exterior Color</th>
                                                   <td>${listing.data().exterior}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Interior Color</th>
                                                   <td>${listing.data().interior}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Engine</th>
                                                   <td>${listing.data().engine}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Drive</th>
                                                   <td>${listing.data().drive}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Transmission</th>
                                                   <td>${listing.data().trans}</td>
                                                 </tr>
                                             </table>
                                             </div>
                                       </div>
                                   </div>
                               </div>
                               
                                 <!-- tabbed content -->
                                   <div class="column is-6">
                                   <div class="tabs is-boxed is-fullwidth link-active-black is-centered">
                                       <ul>
                                       <li data-target="more-info">
                                           <a class="has-text-black has-text-weight-semibold">Description/Contact Information</a>
                                       </li>
                                       </ul>
                                   </div>
  
                                   <!-- tabs -->
  
                                   <div class="has-background-white" id="tab-content">
                                       
                                       <!-- request more info tab -->
  
                                       <div id="more-info" class="is-active">
                                          <p class="has-text-black">Posted By: ${listing.data().email}</p>
                                          <p class="has-text-black">Phone: ${listing.data().phone}</p>
                                          <p class="has-text-black pt-3">Description:</p>
                                          <p class="has-text-black">${listing.data().desc}</p>
                                       </div>
                                    </div>    
                                </div>  
                                </div>
                            </div>
                            </div>
                    </div>       
            </div>
            <div class="column is-2">
            </div>
        </div>
    </div>`

      let listingsPage = document.querySelector("#body");
      listingsLink.addEventListener('click', () => {
        document.querySelector('#content').innerHTML = "";

        listingsPage.innerHTML = listinghtml;
      })
    })
})

// mobile menu
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#navbar');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
});


// tabs
const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active');

        const target = tab.dataset.target;
        tabContentBoxes.forEach(box => {
            if (box.getAttribute('id') == target) {
                box.classList.remove('is-hidden');
            }   else {
                box.classList.add('is-hidden');
            }
        });
    })
})


// logo home button
let logoBtn = document.querySelector("#logo");
let logoBody = document.querySelector('#body');
let logoHtml = `
    <div id="main">
        <div id="body">
        </div>
        <div id="content">
            <figure class="image">
                <img src="images/mercedes1.jpg">
              </figure>
        </div>
    </div>`;
let logoPage = document.querySelector('#body');
logoBtn.addEventListener('click', () => {

  document.querySelector('#content').innerHTML = "";

  homePage.innerHTML = logoHtml;

})

// home button
let homeBtn = document.querySelector("#home");
let homeBody = document.querySelector('#body');
let homeHtml = `
    <div id="main">
        <div id="body">
        </div>
        <div id="content">
            <figure class="image">
                <img src="images/mercedes1.jpg">
              </figure>
        </div>
    </div>`;
let homePage = document.querySelector('#body');
homeBtn.addEventListener('click', () => {

  document.querySelector('#content').innerHTML = "";

  homePage.innerHTML = homeHtml;

})


// about us button
let aboutUsBtn = document.querySelector("#aboutus");
let aboutUsBody = document.querySelector('#body');
let aboutHtml = `
<div class="section">
<div class="container">
    <div class="columns">
        <div class="column is-1 p-6">
        </div>
        <!-- main content -->
        <div class="column is-10  p-6">
            <h1 class="is-size-3 has-text-left"> Our Story</h1>
            <img class="py-4  " src="images/carage1.jpg" alt="garage">
            <div class="text">
            <p class="has-text-left">
                Here at Autobahn, we love automobiles of all kinds and we're looking to provide the best experience possible when it comes to buying and selling them.
                You can view our collection of listings or create your own within moments of creating an account with us.
                No matter the make or model, all vehicles listed on this site have been fully certified by the seller who posted the listing.
            </p>
            <p class="has-text-left mt-2">
                If you're ever met with a bad experience or disappointed, please contact us right away through the form at the bottom of the page so we can make it right. We want to make sure that you can purchase 
                or sell your next vehicle with a peace of mind.
            </p>
            </div>
        </div>
        <div class="column is-1 p-6">
        </div>
    </div>
</div>
</div>`;
let aboutUsPage = document.querySelector('#body');
aboutUsBtn.addEventListener('click', () => {

  document.querySelector('#content').innerHTML = "";

  aboutUsPage.innerHTML = aboutHtml;

})

// post listing button
let listingbutton = document.querySelector("#listingbutton");
let listingmodal = document.querySelector("#listingmodal");
let listingbg = document.querySelector("#listingbg");
listingbutton.addEventListener('click', () => {
  listingmodal.classList.add('is-active');
});

listingbg.addEventListener('click', () => {
  listingmodal.classList.remove('is-active');
});


// sign in/up button
let signupbutton = document.querySelector("#signinbtn");
let signupmodal = document.querySelector("#signupmodal");
let signupbg = document.querySelector("#signupbg");
signupbutton.addEventListener('click', () => {
  signupmodal.classList.add('is-active');
});

signupbg.addEventListener('click', () => {
  signupmodal.classList.remove('is-active');
});

// signing up users

let signUpForm = document.querySelector("#signUpForm");

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let email = document.querySelector('#email_').value;
  let password = document.querySelector('#password_').value;

  auth.createUserWithEmailAndPassword(email, password).then(() => {
    alert("Account has been created successfully");

    // close the modal
    signupmodal.classList.remove('is-active');

    // reset the form
    signUpForm.reset();

  })
  .catch((error) => {
    console.log(error.message);
    let signUpError = document.querySelector('#signUpError');
    signUpError.innerHTML = `<p>${error.message}</p>`;
  });
})

// signing in users

let signInForm = document.querySelector("#signInForm");

signInForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      alert("Welcome " + userCredentials.user.email + " with the ID " + userCredentials.user.uid + ", you have successfully signed in")

      // close the modal
      signupmodal.classList.remove('is-active');

      // reset
      signUpForm.reset();
      location.reload()
    })
    .catch((error) => {
      console.log(error.message);
      let signInError = document.querySelector("#signInError");
      signInError.innerHTML = `<p>${error.message}</p>`
    })
})

// sign out button

let signoutbtn = document.querySelector("#signoutbtn");

signoutbtn.addEventListener('click', () => {
  auth.signOut()
    .then((msg) => {
      alert("You have successfully signed out");
      location.reload()
    })
})

// authentication status

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user is now signed in');
    configureNav(user);
  } else {
    console.log('user is now signed out');
    configureNav();
  }
})

let contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // grab the contact form details
  let contactName = document.querySelector('#contactName').value;
  let contactEmail = document.querySelector('#contactEmail').value;
  let contactInquiry = document.querySelector('#contactInquiry').value;

  // contact form object
  let contactDetails = {
    name: contactName,
    email: contactEmail,
    inquiry: contactInquiry,
  }

  db.collection('inquiries').add(contactDetails).then((data) => {
    alert(`Inquiry successfully posted! The id for your inquiry is ${data.id}. We will get back to you soon.`)
  })

})

// storing listings to firebase

let submitListingForm = document.querySelector('#listingform');

submitListingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log('Successfully submitted listing');

  // grabbing the listing details
  let listingPhone = document.querySelector('#listingPhone').value;
  let listingMake = document.querySelector('#listingMake').value;
  let listingEngine = document.querySelector("#listingEngine").value; 
  let listingModel = document.querySelector('#listingModel').value;
  let listingYear = document.querySelector('#listingYear').value;
  let listingMileage = document.querySelector('#listingMileage').value;
  let listingExColor = document.querySelector('#listingExColor').value;
  let listingIntColor = document.querySelector('#listingIntColor').value;
  let listingTrans = document.querySelector("#listingTrans").value;
  let listingDrive = document.querySelector("#listingDrive").value;
  let listingBody = document.querySelector('#listingBody').value;
  let listingPrice = document.querySelector("#listingPrice").value;
  let listingDesc = document.querySelector('#listingDesc').value;
  let formCheck = document.getElementById('verify');

  // verify all fields have been filled out or marked

  if (listingPhone == "") {
      alert("Please provide a phone number");
      return false;
    }

  if (listingMake == "") {
    alert("Please provide the make of your vehicle");
    return false;
  }

  if (listingModel == "") {
    alert("Please provide the model of your vehicle");
    return false;
  }

  if (listingBody == "") {
    alert("Please provide the body type for your vehicle");
    return false;
  }  

  if (listingEngine == "") {
    alert("Please provide the engine or number of cylinders for your vehicle");
    return false;
  }

  if (listingTrans == "") {
    alert("Please provide the transmission of your vehicle");
    return false;
  } 

  if (listingDrive == "") {
    alert("Please provide the drive of your vehicle");
    return false;
  }  

  if (listingYear == "") {
    alert("Please provide the year of your vehicle");
    return false;
  }

  if (listingMileage == "") {
    alert("Please provide the mileage of your vehicle");
    return false;
  }

  if (listingExColor == "") {
    alert("Please provide the exterior color of your vehicle");
    return false;
  }  

  if (listingIntColor == "") {
    alert("Please provide the interior color of your vehicle");
    return false;
  }  

  if (listingPrice == "") {
    alert("Please provide the price you would like to list you vehicle at");
    return false;
  }  

  if (listingDesc == "") {
    alert("Please provide a description for your vehicle");
    return false;
  }  

  if (formCheck.checked == false) {
    alert("Please verify your information by checking the box");
    return false;
  }

  // upload image to firebase
  let file = document.querySelector("#listing_image").files[0];

  let image = new Date() + "_" + file.name;

  const task = ref.child(image).put(file);

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {

    // combining the details to form an object
      let listingDetails = {
        email: auth.currentUser.email,
        phone: listingPhone,
        make: listingMake,
        engine: listingEngine,
        model: listingModel,
        year: listingYear,
        mileage: listingMileage,
        exterior: listingExColor,
        interior: listingIntColor,
        trans: listingTrans,
        drive: listingDrive,  
        body: listingBody,
        price: listingPrice,
        desc: listingDesc,
        url: url
      }
      // add listing details to firebase

      db.collection('listings').add(listingDetails).then((data) => {
        console.log('listing has been added!');

        // close the modal
        listingmodal.classList.remove('is-active');
        
        // reset the form
        submitListingForm.reset();
        alert(`Your vehicle has been successfully added to our collection of listings! Listing ID: "${data.id} (Note: it may take a moment for your listing to be published)`)
        location.reload()
        })
      })

})

// search box (model)
let search_button = document.querySelector("#search_button");

search_button.addEventListener('click', () => {

  let search_box = document.querySelector("#search_box").value;

  db.collection('listings').where('model', '==', search_box).get().then((data) =>{
  let listings = data.docs;
  // let listingsLink = document.querySelector("#search_button");
  let listinghtml = `
  <div class="section">
  <div class="container">
      <div class="columns">
          <div class="column is-2">
          </div>
          <!-- main content -->
          <div class="column is-8">
              <h1 class="is-size-3"> Listings </h1>
              <p> If you don't see what you're looking for, check back later, new listings are always being added everyday! </p>
          </div>
          <div class="column is-2">
          </div>
      </div>
  </div>
  </div>`;

    listings.forEach((listing) => {
      listinghtml += `
      <div class="container pb-6">
          <div class="columns">
              <div class="column is-2">
              </div>
  
              <!-- main content -->
              <div class="column is-8">
                      <!-- listing card -->
                      <div>
                        <div class="card pb-3">
                           <div class="card-image">
                             <figure class="image is-3by1.5">
                               <img src="${listing.data().url}" alt="listingImage">
                             </figure>
                           </div>
                           <div class="card-content">
                             <div class="media">
                               <div class="media-content">
                               <div class="columns">
                                  <div class="column is-6">
                                    <p class="title is-3">${listing.data().year} ${listing.data().make} ${listing.data().model}</p>
                                  </div>
                                  <div class="column is-6">
                                    <p class="title is-3 has-text-right">$${listing.data().price}</p>
                                  </div>
                                </div>
                               </div>
                             </div>
                             <div class="columns">
  
                                 <!-- specifications table -->
  
                               <div class="column is-6">
                                   <div class="message is-black">
                                       <div class="message-header">
                                           <p>Specifications</p>
                                       </div>
                                       <div class="message-body">
                                         <div class="table-container">
  
                                             <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth px-6">
                                                 <tr>
                                                   <th class="has-text-right">Mileage</th>
                                                   <td>${listing.data().mileage}</td> 
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Body Style</th>
                                                   <td>${listing.data().body}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Exterior Color</th>
                                                   <td>${listing.data().exterior}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Interior Color</th>
                                                   <td>${listing.data().interior}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Engine</th>
                                                   <td>${listing.data().engine}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Drive</th>
                                                   <td>${listing.data().drive}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Transmission</th>
                                                   <td>${listing.data().trans}</td>
                                                 </tr>
                                             </table>
                                             </div>
                                       </div>
                                   </div>
                               </div>
                               
                                 <!-- tabbed content -->
                                   <div class="column is-6">
                                   <div class="tabs is-boxed is-fullwidth link-active-black is-centered">
                                       <ul>
                                       <li data-target="more-info">
                                           <a class="has-text-black">Contact Information & Description</a>
                                       </li>
                                       </ul>
                                   </div>
  
                                   <!-- tabs -->
  
                                   <div class="has-background-white" id="tab-content">
                                       
                                       <!-- request more info tab -->
  
                                       <div id="more-info" class="is-active">
                                          <p class="has-text-black">Posted By: ${listing.data().email}</p>
                                          <p class="has-text-black">Phone: ${listing.data().phone}</p>
                                          <p class="has-text-black pt-3">Description:</p>
                                          <p class="has-text-black">${listing.data().desc}</p>
                                       </div>
                                    </div>    
                                </div>  
                                </div>
                            </div>
                            </div>
                    </div>       
            </div>
            <div class="column is-2">
            </div>
        </div>
    </div>`

      let listingsPage = document.querySelector("#body");
      search_button.addEventListener('click', () => {
        document.querySelector('#content').innerHTML = "";

        listingsPage.innerHTML = listinghtml;
      })
    })
})
})

// my listings button
  myListings.addEventListener('click', () => {
    db.collection('listings').where('email', '==', auth.currentUser.email).get().then((data) => {

  let listings = data.docs;
  let listinghtml = `
  <div class="section">
  <div class="container">
      <div class="columns">
          <div class="column is-2">
          </div>
          <!-- main content -->
          <div class="column is-8">
              <h1 class="is-size-3"> Your Current Listings: </h1>
          </div>
          <div class="column is-2">
          </div>
      </div>
  </div>
  </div>`;

    listings.forEach((listing) => {
      listinghtml += `
      <div class="section">
      <div class="container">
          <div class="columns">
              <div class="column is-2">
              </div>
  
              <!-- main content -->
              <div class="column is-8">
                      <!-- listing card -->
                      <div>
                        <div class="card">
                           <div class="card-image">
                             <figure class="image is-3by1.5">
                               <img src="${listing.data().url}" alt="listingImage">
                             </figure>
                           </div>
                           <div class="card-content">
                             <div class="media">
                               <div class="media-content">
                               <div class="columns">
                                  <div class="column is-6">
                                    <p class="title is-3">${listing.data().year} ${listing.data().make} ${listing.data().model}</p>
                                  </div>
                                  <div class="column is-6">
                                    <p class="title is-3 has-text-right">$${listing.data().price}</p>
                                  </div>
                                </div>
                               </div>
                             </div>
                             <div class="columns">
  
                                 <!-- specifications table -->
  
                               <div class="column is-6">
                                   <div class="message is-black">
                                       <div class="message-header">
                                           <p>Specifications</p>
                                       </div>
                                       <div class="message-body">
                                         <div class="table-container">
  
                                             <table class="table table is-bordered is-striped is-narrow is-hoverable is-fullwidth px-6">
                                                 <tr>
                                                   <th class="has-text-right">Mileage</th>
                                                   <td>${listing.data().mileage}</td> 
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Body Style</th>
                                                   <td>${listing.data().body}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Exterior Color</th>
                                                   <td>${listing.data().exterior}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Interior Color</th>
                                                   <td>${listing.data().interior}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Engine</th>
                                                   <td>${listing.data().engine}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Drive</th>
                                                   <td>${listing.data().drive}</td>
                                                 </tr>
                                                 <tr>
                                                   <th class="has-text-right">Transmission</th>
                                                   <td>${listing.data().trans}</td>
                                                 </tr>
                                             </table>
                                             </div>
                                       </div>
                                   </div>
                               </div>
                               
                                 <!-- tabbed content -->
                                   <div class="column is-6">
                                   <div class="tabs is-boxed is-fullwidth link-active-black is-centered">
                                       <ul>
                                       <li data-target="more-info">
                                           <a class="has-text-black has-text-weight-semibold">Description/Contact Information</a>
                                       </li>
                                       </ul>
                                   </div>
  
                                   <!-- tabs -->
  
                                   <div class="has-background-white" id="tab-content">
                                       
                                       <!-- request more info tab -->
  
                                       <div id="more-info" class="is-active">
                                          <p class="has-text-black">Posted By: ${listing.data().email}</p>
                                          <p class="has-text-black">Phone: ${listing.data().phone}</p>
                                          <p class="has-text-black pt-3">Description:</p>
                                          <p class="has-text-black">${listing.data().desc}</p>
                                       </div>
                                    </div>    
                                </div>  
                                </div>
                            </div>
                            </div>
                    </div>       
            </div>
            <div class="column is-2">
            </div>
        </div>
    </div>
  </div>`

      let listingsPage = document.querySelector("#body");
      myListings.addEventListener('click', () => {
        document.querySelector('#content').innerHTML = "";

        listingsPage.innerHTML = listinghtml;
      })
    })
})
})