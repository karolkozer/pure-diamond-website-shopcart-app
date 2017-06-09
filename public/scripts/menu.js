$(document).ready(function() {
    
    var DOMstring =  {
        menuBtn: ".js--menu-btn",
        mobileMenu: ".js--mobile-menu",
        mobileNav: ".js--mobile-nav > li"
    }
    
    
    // Open and close Menu
    $(DOMstring.menuBtn).on("click", function() {
        $(this).toggleClass("open-menu");
        $(DOMstring.mobileMenu).toggleClass("show-mobile-menu");
        
        $(DOMstring.mobileNav).each(function(index) {
            
            setTimeout(function() {
                $(DOMstring.mobileNav).eq(index).toggleClass("show-mobile-nav");
            }, 150 * (index + 1));
            
        });
        
    });
    
    
    
});