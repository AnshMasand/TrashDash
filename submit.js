
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
  
  function validateImages() {
    if (beforeImageInput1.files.length > 0 && afterImageInput1.files.length > 0) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  }

  