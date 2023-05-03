var gallery = document.getElementById('gallery');//holds all images in container.

var game = document.getElementById('game');//this could be any image.


fetch("assets/gallery3x3Gallery.json")//fetch JSON file

.then(function(res) {//then when it gets a response

  res.json().then(function(json) {

    json.forEach(function(el) {//for every json object

      var galleryItem = document.createElement('a');//creates anchor

      galleryItem.setAttribute('class', 'gallery-item');//be able to acces the element in css
      
      var image = document.createElement('img');//create image variable

      //set some attributes
      image.setAttribute('src', el.url);        //get the image url
      image.setAttribute('alt', el.caption);    //get the caption
      image.setAttribute('title', el.caption);  //get the caption

      var caption = document.createElement('caption'); //create caption var
      
      caption.innerText = el.caption; //fill the caption var
      
      var tempImage = document.createElement('img'); // create a temp image that will change depending on which image the user clicks in gallery

      tempImage.setAttribute('class', 'gameImage');//give the img a class to get in css
        
      galleryItem.addEventListener('click', function() { //when you click on an image...
        while (game.firstChild) {//this removes the previous temp image that was there
            game.removeChild(game.firstChild);
          }
        tempImage.setAttribute('src', el.url);//when you click on an image, the image will be copied and placed underneath the gallery for the rules section

        var rnd = Math.floor(Math.random() * 10); //generate random number between 0-9 
        var rules = el.rules;                     //get access to property 'rules' from JSON file
        var randRules = rules[rnd];               //uses random int to get an element from array using its index
        var ruleDesc = randRules.rule;            //gets the rule desc from JSON file
        var nameOfRule = randRules.ruleName;      //gets the rule name from JSON file

        //changes the rule name, rule desc, and img each time the galleryimage is clicked
        document.getElementById("nameOfRule").innerText = nameOfRule;
        document.getElementById("ruledesc").innerText = ruleDesc;
        document.getElementById("nameOfGame").innerText = el.caption;
        game.appendChild(tempImage);
      });

      tempImage.addEventListener('click', function() { //changes the rule name, rule desc, and img each time the tempImage is clicked
        var rnd = Math.floor(Math.random() * 10);
        var rules = el.rules;
        var randRules = rules[rnd];
        var ruleDesc = randRules.rule;
        var nameOfRule = randRules.ruleName;
        document.getElementById("nameOfRule").innerText = nameOfRule;
        document.getElementById("ruledesc").innerText = ruleDesc;
        document.getElementById("nameOfGame").innerText = el.caption;

      });
         
      //append image and caption to gallery item
      galleryItem.appendChild(image);
      galleryItem.appendChild(caption);
      
      // Append the gallery item to our gallery element
      gallery.appendChild(galleryItem);
    });
  });
});