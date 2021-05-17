'use strict';
let attempts = 0;
let maxAttempts = 25;
let attempte1 = document.getElementById('attempts');
let products = [];
let productimagesNames = [];
let productsClicks = [];
let productsViews = [];


function Productsimage(productName) {
    
    this.productName =productName.split('.')[0];
    this.source = 'img/' + productName;
    this.clicks = 0;
    this.views = 0;
    products.push(this);
    
   productimagesNames.push(this.productName);
}



let Productimage= ['bag.jpg' ,  'banana.jpg', 'bathroom.jpg','boots.jpg', 'breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];
for (let i = 0; i < Productimage.length; i++) {
    new Productsimage(Productimage[i]);
}

function randomImage() {
    
    return Math.floor(Math.random() * products.length);
}


let leftimagee = document.getElementById('leftImage');
let centerimagee= document.getElementById('centerImage');

let rightimagee= document.getElementById('rightImage');

let leftImgi;
let centerImgi;
let rightImgi;

function renderimg() {
    leftImgi = randomImage();
    centerImgi=randomImage();
    rightImgi = randomImage();

    while (leftImgi === centerImgi || leftImgi === rightImgi || rightImgi ===centerImgi  ){
        leftImgi = randomImage();
        centerImgi=randomImage();
    rightImgi = randomImage();

    }
    
   leftimagee.setAttribute('src',products[leftImgi].source);
   leftimagee.setAttribute('title', products[leftImgi].source);
   products[leftImgi].views++;

   rightimagee.setAttribute('src',products[rightImgi].source);
   rightimagee .setAttribute('title',products[rightImgi].source);
   products[rightImgi].views++;

   centerimagee.setAttribute('src',products[centerImgi].source);
   centerimagee .setAttribute('title',products[centerImgi].source);
   products[centerImgi].views++;
  

    attempte1.textContent = attempts;
    
}
renderimg();

leftimagee.addEventListener('click', numberclick);
centerimagee.addEventListener('click',numberclick );

rightimagee.addEventListener('click', numberclick);

function numberclick(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        console.log(event.target.id)
        if (event.target.id === 'leftImage') {
            products[leftImgi].clicks++;
        } else if (event.target.id === 'centerImage') {
            products[centerImgi].clicks++;
        }else if (event.target.id === 'rightImage') {
            products[rightImgi].clicks++;}


        renderimg();
    } else {
        let ule1 = document.getElementById('submit');
        let lie1;
        for (let i = 0; i < products.length; i++) {
            lie1 = document.createElement('li');
            ule1.appendChild(lie1);
            lie1.textContent = `${products[i].productName} had was seen  ${products[i].views} times and had ${products[i].clicks} vote .`
           productsClicks.push(products[i].clicks);
           productsViews.push(products[i].views);
        }

       leftimagee.removeEventListener('click', numberclick);
       centerimagee.removeEventListener('click', numberclick);
       
       rightimagee.removeEventListener('click', numberclick);
       chartRender();
    }
}

function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels:productimagesNames,
            datasets: [{
                label: '# of Clicks',
                data: productsClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 3
            }, {
                label: '# of Views',
                data: productsViews,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [ 'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}