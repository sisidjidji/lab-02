'use strict';
function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}
const array = [];

Animal.prototype.render = function (container) {
  let $container = $(container);
  let $template = $container.find('.photo-template');
  let $animal = $template.clone();
  $animal.removeClass('photo-template');
  $animal.find('.animal-name').text(this.name);
  $animal.find('img.animal-image').attr('src', this.image_url);
  $animal.find('.animal-description').text(this.description);
  $animal.find('.animal-horns').text(this.horns);
  $animal.find('option').text(this.title);
  $container.append($animal);
  array.push(this.keyword);
};



const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};



console.log('aJax', ajaxSettings);
$.ajax('data/page-1.json', ajaxSettings)
  .then(function (data) {
    data.forEach(animal => {
      let actualAnimal = new Animal(animal);
      actualAnimal.render('main');

    });
    console.log(data);
    for (let i = 0; i < array.length; i++) {
      $('#selected').append(
        $('<option>').text(array[i]).val(i));
    }
  });



