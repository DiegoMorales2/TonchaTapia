const images = [
    'url("assets/images/IMG_1610.jpg")',  // Consider converting HEIC to JPG or PNG
    'url("assets/images/IMG_1611.jpg")',
    'url("assets/images/IMG_1614.jpg")',
    'url("assets/images/lp_image_2.jpg")',  // Consider converting HEIC to JPG or PNG
    'url("assets/images/lp_image_3.jpg")',
    'url("assets/images/lp_image_4.jpg")',
    'url("assets/images/lp_image_5.jpg")',  // Consider converting HEIC to JPG or PNG
    'url("assets/images/lp_image.jpg")',
    // Add more image URLs as needed
  ];
  
  let currentIndex = 0;
  
  const backgroundDiv = document.getElementById('backgroundfloat');
  backgroundDiv.style.backgroundImage = images[currentIndex];
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    backgroundDiv.style.backgroundImage = images[currentIndex];
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    backgroundDiv.style.backgroundImage = images[currentIndex];
  }
  