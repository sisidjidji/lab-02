'use strict';


const templateId = '#jackalope-template';

function Animal(data) {
  for (let key in data) {
    console.log(key);
    this[key] = data[key];
  }
}


Animal.prototype.render = function () {
  let templateHtml = $(templateId).html();
  let html = Mustache.render(templateHtml, this);
  return html;
};

const keywords = [];
function makeMyMenu(animal) {
  let $menu = $('.dropdown');
  let $createOptions = $('<option>');
  $createOptions.text(animal.keyword);
  $createOptions.val(animal.keyword);
  if (!keywords.includes(animal.keyword)) {
    keywords.push(animal.keyword);
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
  images.forEach(animal => makeMyMenu(animal));
});

function renderImages(filter) {
  $('#main-section').empty();
  images.forEach((animal) => {
    let displayImage = new Animal(animal);
    if (displayImage.keyword === filter) {
      $('#main-section').append(displayImage.render());
    } else if (filter === 'default') {
      $('#main-section').append(displayImage.render());
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
    images.forEach(animal => makeMyMenu(animal)); });

});

$('#pageTwo').on('click', function() {
  $.ajax('data/page-2.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');
    images.forEach(animal => makeMyMenu(animal)); });

});


$('.sort').on('click', function() {


});


function sortByHorn(x,y){
  let horn1=x.horn;
  let horn2=y.horn;
  if(horn1>horn2){
    return 1;
  }
  else if(horn1<horn2){
    return -1;
  }
  else {
    if(horn1===0)
      return 0;
  }
}

