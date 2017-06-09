$(document).ready(function() {
    
    var DOM = {
        handBag: ".js--hand-bag",
        heroTextBox: ".js--hero-text-box",
        sectionProducts: ".js--section-products",
        sectionSale: ".js--promo-section",
        sectionBook: ".js--book-service",
        item: ".item-box",
        bag: ".js--bag",
        sunglasses: ".js--sunglasses",
        lipstick: ".js--lipstick",
        lipstickPackage: ".js--lipstick-package",
        texBox: ".js--tex-box"
    }
    
    $(window).scroll(function() {
        
        // Distance from the top
        var WindowScroll = $(this).scrollTop();
        
        
        // ----- Animate Header Hand Bag ----
        $(DOM.handBag).css({
            "transform": "translate(-" + WindowScroll / 8 + "px, " + WindowScroll / 5 + "px)"
        });
        
        
        // ---- Animate Items ----
        // How far section product is far from the top of the DOM
        if(WindowScroll > $(DOM.sectionProducts).offset().top - ($(window).height() / 3.3)) {
            
            $(DOM.item).each(function(index) {
                
                setTimeout(function() {
                   $(DOM.item).eq(index).addClass("show"); 
                }, 200 * (index + 1));
            });   
        }
        
        
        // ---- Animate Promo Section ----
        if(WindowScroll > $(DOM.sectionSale).offset().top -($(window).height() / 1.2)) {
//            console.log("Sale");
            
            var moveBag = ((WindowScroll - $(DOM.sectionSale).offset().top + ($(window).height() / 3.5)) / 75);
//            console.log(moveBag);
            
            var move = (WindowScroll - $(DOM.sectionSale).offset().top + ($(window).height() / 0.9)) / 16;
//            console.log(move);
            
            $(DOM.bag).css({
                "transform": "translateY(-" + moveBag +"%)"
            })
            
            $(DOM.sunglasses).css({
                "transform": "translateX(-" + move / 1.5 +"%)"
            })
            
            $(DOM.lipstick).css({
                "transform": "translate(-" + move / 2 +"%, -" + move +"%)"
            })
            
            $(DOM.lipstickPackage).css({
                "transform": "translate(650%, -" + move * 3.5 + "%)"
            })
            
        }
        
        // ---- Animate Book Service ----
        if(WindowScroll > $(DOM.sectionBook).offset().top - $(window).height() / 4.3) {
        
             $(DOM.texBox).addClass("show-text");
        }

        
    });

});
