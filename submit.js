import { initializeApp } from "firebase/app";

window.onload=function() {
  
    const beforeImageInput = document.getElementById("before-image");
    const afterImageInput = document.getElementById("after-image");
    const beforePreview = document.getElementById("before-preview");
    const afterPreview = document.getElementById("after-preview");
  
  beforeImageInput.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      beforePreview.src = reader.result;
      beforePreview.style.display = 'block';
    });
    reader.readAsDataURL(file);
  });
  
  afterImageInput.addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      afterPreview.src = reader.result;
      afterPreview.style.display = 'block';
    });
    reader.readAsDataURL(file);
  });
  
  const submitButton = document.getElementById("submit-button");
  const beforeImageInput1 = document.getElementById("before-image");
  const afterImageInput1 = document.getElementById("after-image");
  beforeImageInput1.addEventListener('change', validateImages);
  afterImageInput1.addEventListener('change', validateImages);

  // Get a reference to your Firebase database

  var firebaseConfig = {
    apiKey: "AIzaSyDgg5KaiFOs__y8YdO920u1rsrcLPIyaMY",
    authDomain: "trash-dash-89853.firebaseapp.com",
    projectId: "trash-dash-89853",
    storageBucket: "trash-dash-89853.appspot.com",
    messagingSenderId: "136021772416",
    appId: "1:136021772416:web:f24ddf428d20fc167a3e65",
    measurementId: "G-EY5LZR9264"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase database
  // var database = firebase.firestore();
  
  const database = firebase.database();

  beforeImageInput.addEventListener('change', validateImages);
  afterImageInput.addEventListener('change', validateImages);

  submitButton.addEventListener('click', () => {
    // Get the marker position from your Google Map
    const markerPosition = marker.getPosition();

    // Get the before and after images
    const beforeImage = beforeImageInput.files[0];
    const afterImage = afterImageInput.files[0];

    // Create a new Firebase database reference for this submission
    const newSubmissionRef = database.ref().push();

    // Upload the before and after images to Firebase Storage
    const beforeImageRef = firebase.storage().ref().child(`images/${newSubmissionRef.key}-before.jpg`);
    const afterImageRef = firebase.storage().ref().child(`images/${newSubmissionRef.key}-after.jpg`);
    beforeImageRef.put(beforeImage);
    afterImageRef.put(afterImage);

    // Save the marker position and image URLs to the Firebase database
    newSubmissionRef.set({
      markerPosition: {
        lat: markerPosition.lat(),
        lng: markerPosition.lng(),
      },
      beforeImageURL: `https://firebasestorage.googleapis.com/v0/b/YOUR_STORAGE_BUCKET_NAME/o/images%2F${newSubmissionRef.key}-before.jpg`,
      afterImageURL: `https://firebasestorage.googleapis.com/v0/b/YOUR_STORAGE_BUCKET_NAME/o/images%2F${newSubmissionRef.key}-after.jpg`,
    });

    // Clear the image inputs and disable the submit button
    beforeImageInput.value = '';
    afterImageInput.value = '';
    submitButton.disabled = true;
  });

  
  function validateImages() {
    if (beforeImageInput1.files.length > 0 && afterImageInput1.files.length > 0) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
}

