document.addEventListener('DOMContentLoaded', function () {

  // Images container
  var images = document.getElementById('carouselImages');

  // Image caption
  var caption = document.getElementById('carouselCaption');

  // Previous image button
  var prev = document.getElementById('carouselPrev');

  // Next image button
  var next = document.getElementById('carouselNext');

  fetch("assets/galleryCarousel.json")

    .then(function (res) {//then when it gets a response

      res.json().then(function (json) {

        json.forEach(function (el, i) {//for every json object

          var image = document.createElement('img');//create image variable

          //set some attributes
          image.setAttribute('src', el.url);        //get the image url
          image.setAttribute('alt', el.caption);    //get the caption
          image.setAttribute('title', el.caption);  //get the caption

          //image set to where all images stored
          images.appendChild(image);

        });

        setupCarousel(json);//after all images are stored, setup the carousel
      });
    });

  function setupCarousel(json) {//accepts json as argument

    var imageCount = images.childElementCount;//int of elements in array

    var currentImage = 1;//image in view

    var image = document.querySelector('.carousel-images img');//used to get width of image on website

    var imageWidth = image.offsetWidth;//the width of image on web

    function updateImageWidth() {//this function is used to update the width of the image on the website
      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
      image = document.querySelector('.carousel-images img');
      imageWidth = image.offsetWidth;
    }

    window.addEventListener('resize', updateImageWidth);//function is called on whenever the window changes size

    prev.addEventListener('click', function () {//previous button on carousel

      updateImageWidth();
      
      if (currentImage != 1) {//if image not first image in JSON array

        --currentImage;//decrement the the currentImage

        images.style.left = imageWidth - (currentImage * imageWidth) + 'px';//correct image will be displayed from the array by moving the joint image left
      }


      caption.innerText = json[currentImage - 1].caption;// Update caption
    });

    next.addEventListener('click', function () {//next button on carousel

      updateImageWidth();

      if (currentImage != imageCount) {//if image is not equal to amount of images(9)

        ++currentImage;//increment the the currentImage


        images.style.left = imageWidth - (currentImage * imageWidth) + 'px';//correct image will be displayed from the array by moving the joint image right
      }


      caption.innerText = json[currentImage - 1].caption;// Update caption

    });


    caption.innerText = json[currentImage - 1].caption;// Update caption
  }
});