var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;

}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

function getCurrentImageIndex() {
  "use strict";
  var thumbnailArray = getThumbnailsArray();
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  for (var i = 0; i < thumbnailArray.length; i++) {
    if (thumbnailArray[i].getAttribute("data-image-url") == detailImage.getAttribute("src")) {
      return i;
    }
  }
  return -1;
}
/*exported next prev*/
function next() {
  "use strict";
  var thumbnailArray = getThumbnailsArray();
  var nextImage = (getCurrentImageIndex() + 1) % thumbnailArray.length;
  setDetails(imageFromThumb(thumbnailArray[nextImage]), titleFromThumb(thumbnailArray[nextImage]));
}

function prev() {
  "use strict";
  var thumbnailArray = getThumbnailsArray();
  var prevImage = (getCurrentImageIndex() - 1 + thumbnailArray.length) % thumbnailArray.length;
  setDetails(imageFromThumb(thumbnailArray[prevImage]), titleFromThumb(thumbnailArray[prevImage]));
}


initializeEvents();
