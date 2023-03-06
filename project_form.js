const firebaseConfig = {
    apiKey: "AIzaSyCSLg5Ooq5K1EmcTBXx_Lk0SFK7HaHzt4E",
    authDomain: "portfolio-projects-b9bae.firebaseapp.com",
    databaseURL: "https://portfolio-projects-b9bae-default-rtdb.firebaseio.com",
    projectId: "portfolio-projects-b9bae",
    storageBucket: "portfolio-projects-b9bae.appspot.com",
    messagingSenderId: "146270954213",
    appId: "1:146270954213:web:7d22911b86a0ed69c2ea0c"
  };
// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB=firebase.database().ref('portfolio')

document.getElementById("project-form").addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault();
  var title=getElementVal('title');
  var discription=getElementVal('description');
  var image=getElementVal('image');
  
  saveProject(title,discription,image);

  // enable alert
  document.querySelector('.alert').style.display="block";

  setTimeout(()=>{
    document.querySelector('.alert').style.display="none";

  },3000);

  // reset the form
  document.getElementById("project-form").reset();
}

const saveProject=(title,discription,image)=>{
    var newContactForm=contactFormDB.push();

    newContactForm.set({
        title:title,
        discription:discription,
        image:image

    });
};

const getElementVal=(id)=>{
    return document.getElementById(id).value;
}