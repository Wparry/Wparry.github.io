var gallery = document.getElementById("gallery");

fetch("assets/gallery.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    // Check that the value of `json` is an array
    if (Array.isArray(json)) {
      json.forEach(function(el) {
        // Create a new gallery item container (a link to the image)...
        var galleryItem = document.createElement('a');

        // Give this div a class name
        galleryItem.setAttribute('class', 'gallery-item');

        // Add the href attribute to the anchor
        galleryItem.setAttribute('href', el.url);

        // Open the image in a new tab
        galleryItem.setAttribute('target', '_blank');

        // Create an image element...
        var image = document.createElement('img');

        // Set some attributes...
        image.setAttribute('src', el.url);        // The url of the image
        image.setAttribute('alt', el.caption);    // The alternative text
        image.setAttribute('title', el.caption);  // The tooltip

        // Create a caption element...
        var caption = document.createElement('caption');

        // Add text content to caption
        caption.innerText = el.caption;

        // Append the image and caption to our gallery item container
        galleryItem.appendChild(image);
        galleryItem.appendChild(caption);

        // Append the gallery item to our gallery element
        gallery.appendChild(galleryItem);
      });
    } else {
      console.error('JSON data is not an array');
    }
  })
  .catch(function(error) {
    console.error('Error fetching JSON data:', error);
  });
