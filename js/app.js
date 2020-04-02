'use strict';

//courtesy of chase, yvette, keith and in class efforts

const filter = [];

function Image(image) {
  this.image_url = image.image_url;
  this.title = image.title;
  this.description = image.description;
  this.keyword = image.keyword;
  this.horns = image.horns;
  filter.push(this);

}

Image.prototype.render = function () {
  let container = $(`<div></div>`).clone();
  container.append(`<h2>${this.title}</h2><p>${this.description}</p><img src="${this.image_url}"/><p>${this.horns}</p>`);
  return container;
};

const keywords = [];
function makeMyMenu(image) {
  let $menu = $('.dropdown');
  let $createOptions = $('<option>');
  $createOptions.text(image.keyword);
  $createOptions.val(image.keyword);
  if (!keywords.includes(image.keyword)) {
    keywords.push(image.keyword);
    $menu.append($createOptions);
  }
}


const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

let images = null;

$.ajax('data/page-1.json', ajaxSettings).then(function (data) {
  images = data;
  renderImages('default');
  images.forEach(image => makeMyMenu(image));
});

function renderImages(filter) {
  $('main').empty();
  images.forEach((image) => {
    let displayImage = new Image(image);
    if (displayImage.keyword === filter) {
      $('main').append(displayImage.render());
    } else if (filter === 'default') {
      $('main').append(displayImage.render());
    }
  });
}


$('.dropdown').on('change', function() {
  let $this = $(this),
    filterValue = $this.val();
  renderImages(filterValue);
});




$('#pageOne').on('click', function() {
  $.ajax('data/page-1.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');
    images.forEach(image => makeMyMenu(image)); });

});

$('#pageTwo').on('click', function() {
  $.ajax('data/page-2.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');
    images.forEach(image => makeMyMenu(image)); });

});
