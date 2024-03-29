const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
//const KEY = '21909790-803f1f281ca802045b2f36488';

// show images 
const showImages = (images) => {
 // console.log(images);
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  toggleSpinner();
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}

const getImages = (query) => {
  toggleSpinner();
  fetch(`https://pixabay.com/api/?key=21909790-803f1f281ca802045b2f36488&q=${query}&image_type=photo`)
    .then(response => response.json())
    .then(data =>{
      //console.log(data);
      showImages(data.hits)    //Bug Fixed
    })
    
  //  .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    // alert('Hey, Already added !')
    element.classList.remove('added')  //Bug Fixed
    sliders.pop(img);
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
   const timer=document.getElementById('doration').value || 1000; //Bug Fixed

   if(timer<0){                   //Bug Fixed
     alert("Set Duration Positive value & Reload Page");
     return;
   }                                   
    const duration = timer || 1000;
    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
      src="${slide}"
      alt="">`;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
   

}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
 // const KEY = '21909790-803f1f281ca802045b2f36488';
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search').value;
  const result = search.replace(" ","+");
  //console.log(result);
  getImages(result)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})


document.getElementById('search')
.addEventListener("keyup", function(event) {
  document.getElementById("search-btn").click(); //Bug Fixed
});


//spinner

const toggleSpinner=()=>{
  const spinner=document.getElementById('spiner');
  spinner.classList.toggle('d-none');
}