
/* ======= Model ======= */

var model = {
    currentCat: null,
    AdminViewOn : false,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};



/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();

        adminView.init();
        //adminView.cancel();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    startAdmin: function(){

        
       adminView.render();
       model.AdminViewOn = true;

    },



     //getAdminMode: function() {
     //       return model.AdminViewOn;
    //    },

    updateCat: function(name,image,clicks)
    {
    model.currentCat.name = name;
    model.currentCat.imgSrc = image;
    model.currentCat.clickCount = clicks;

    }

} ;




//},



/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();

    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    adminView.cancel();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    },

    };


var adminView = {



    init: function(){

      $("#button").click(function(){   
            //adminView.render();
            octopus.startAdmin();

        })

    },

    render: function(){


        //$("#button").click(function(){


     var inputDiv = $('<div class="input_holder"></div>');
     var form = $('<form><br> <input type="text" id="box_name"> <br> <input type="text" id="box_img"><br><input type="text" id="box_clicks"><br></form>');
    
     $("#p1").append(inputDiv); 
     $(".input_holder").append(form);


    var currentCat = octopus.getCurrentCat();
    var currentName = currentCat.name;
    var currentImg = currentCat.imgSrc;
    var currentClicks = currentCat.clickCount;

    $("#box_name").attr("value", currentName);
    $("#box_img").attr("value", currentImg) ;
    $("#box_clicks").attr("value", currentClicks);

     $('form').append($('<input type="button" id ="cancel" value="cancel">'));

     var newValue = $("box_name").val();
     $("button").hide();



       $("#cancel").click(function(){
       adminView.cancel();



   })
         $('form').append($('<br><input type="button" id ="update" value="Update">'));
       
     



       $("#update").click(function(){
       adminView.update();
   })
    //      })




},

cancel: function(){


    //console.log('Event target: ', event.target);


      $("div").remove(".input_holder");
      $("button").show();

  },    


update: function(){

    //console.log("Hello");
   
    var newName = $("#box_name").val();
    var newImage = $("#box_img").val();
    var newClicks = $("#box_clicks").val();

    octopus.updateCat(newName,newImage,newClicks);
   
    //console.log(newName);
 
    adminView.cancel();


}

};


// make it go!
octopus.init();

