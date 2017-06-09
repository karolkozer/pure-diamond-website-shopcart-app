$(document).ready(function() {
    
    var productController = (function() {
        
        var data = {
            shoppCart: [],
            total: 0,
        }
        
        function calculateTotal() {
            var sum = 0;
            
            $.each(data.shoppCart, function(index, element) {
                sum += element.price * element.qty;
            });
            
            data.total = sum;
        }
        
        return {
            
            addItem: function(item) {
                
                var itemInCart = false;
                
                // Loop through shopcart array 
                // If item is in the cart increase qty
                $.each(data.shoppCart, function(index, element) {
                    if(item.id === element.id) {
                        element.qty = parseInt(element.qty) + 1;
                        itemInCart = true;
                    }
                });
                
                // If item is not in the cart - add to shop array
                if(!itemInCart) {
                    data.shoppCart.push(item);
                }
                
                console.log(data.shoppCart);
            },
            
            removeItem: function(itemToDelete) {
                
                data.shoppCart.splice(itemToDelete, 1);
            },
            
            changeItemQty: function(input, item) {
                
                // Loop through shoppcart array
                // Set input value to qty
                $.each(data.shoppCart, function(index, element) {
                    if(item.id === element.id) {
                        element.qty = input;
                    }
                });
            },
            
            calculate: function() {
                calculateTotal();
            },
            
            checkShopCart: function(fn) {
                
                if(data.shoppCart.length === 0) {
                    fn();
                }
                
            },
            
            getData: function() {
                return {
                    shopCart: data.shoppCart,
                    totalPrice: data.total,
                    subtotal: data.subtotal
                }
            },
            
            test: function() {
                return data;
            }
        }
        
    })();
    
    var UIController = (function() {
        
        var DOMstrings = {
            btnAdd: ".js--add-btn",
            changeQuantity: ".js--change-quantity",
            btnRemoveItem: ".js--remove-item",
            cartNotification: ".js--cart-notification",
            cartItems: ".js--cart-items",
            shopBagIcon: ".js--shop-cart-bag",
            slidingCart: ".js--sliding-shopcart",
            cartItems: ".js--cart-items",
            closeSlidingCart: ".js--close-sliding-shopcart",
            totalPrice: ".js--total-price"
        };
        
        function formatCurrencyNumber(num) {
            
            var format = (num / 100).toFixed(2);
                
            return "$" + format;
        }
        
        
        return {
            
            displayItems: function(shopcart, total) {
                
                var html = "";
                
                $.each(shopcart, function(index, element) {
                    var subTotal = element.price * element.qty;
                    
                    html += '<ul class="item"><li><p class="item-name">%name%</p><p class="item-company">%company%</p><p class="item-subtotal-price">%subtotal%</p></li><li><p class="item-qty">Quantity</p><input type="number" value="%qty%" min="1" data-id="%id%" class="change-qty js--change-quantity"></li><li><button class="btn btn-remove-item js--remove-item">Remove</button></li></ul>'
                    
                    html = html.replace("%name%", element.name);
                    html = html.replace("%company%", element.company);
                    html = html.replace("%qty%", element.qty);
                    html = html.replace("%id%", element.id);
                    html = html.replace("%subtotal%", formatCurrencyNumber(subTotal));
                }); 
                
                $(DOMstrings.cartItems).html(html);
                $(DOMstrings.totalPrice).text(formatCurrencyNumber(total));
            },
            
            slideShopCart: function() {
                
                $(DOMstrings.slidingCart).toggleClass("slide");
            },
            
            addcartNotification: function() {
                
                $(DOMstrings.cartNotification).addClass("show-notification");
                
            },
            
            removecartNotification: function() {
                
                $(DOMstrings.cartNotification).removeClass("show-notification");
                
            },
            
            getDOM: function() {
                return DOMstrings;
            }
        }
        
    })();
    
    
    
    var AppController = (function(productCrtl, UICrtl) {
        var DOM;
        
        DOM = UICrtl.getDOM();
        
        var calculatePrice = function() {
            productCrtl.calculate();
        }
        
        var displayItems = function() {
            
            var shopCart = productCrtl.getData().shopCart;
            var totalPrice = productCrtl.getData().totalPrice;
            
            UICrtl.displayItems(shopCart, totalPrice);
        }
        
        var crtlChangeItemQty = function() {
            
            // 1. Get Item
            var item = $(this.dataset)[0]
            
            // 2. Get Input value
            var input = $(this).val();
            
            // 3. Change the value
            productCrtl.changeItemQty(input, item);
            
            // 4. Calcualte Price
            calculatePrice();
            
            // 5. Display Items
            displayItems();
        }
        
        var crtlRemoveItem = function() {
            
            // 1. Get the btn index
            var btnRemove = $(this).index(this);
            console.log(btnRemove);
            
            // 2. Remove item from the shopcart array
            productCrtl.removeItem();
            
            // 3. Calcualte Price
            calculatePrice();
            
            // 4. Display to UI
            displayItems();
            
            // 5. Check if cart is empty, remove notification
            productCrtl.checkShopCart(UICrtl.removecartNotification);
            
        }
        
        var crtlAddItem = function(e) {
            e.preventDefault();
            // 1. Get Item dataset
            var item = $(this.dataset)[0];
            
            // 2. Add dataset to the shopping cart Array
            productCrtl.addItem(item);
            
            // 3. Calcualte
            calculatePrice();
             
            // 4. Display items to the UI cart
            displayItems();
            
            // 5. Add Notification
            UICrtl.addcartNotification();
            
        }
        
        var setUpEventListeners = function() {
            $(DOM.btnAdd).on("click", crtlAddItem);
            
            $(DOM.cartItems).on("change", DOM.changeQuantity, crtlChangeItemQty);
            
            $(DOM.cartItems).on("click", DOM.btnRemoveItem, crtlRemoveItem);
            
            $(DOM.shopBagIcon).on("click", function(e){
                e.preventDefault();
                UICrtl.slideShopCart();
            });
            
            $(DOM.closeSlidingCart).on("click", function(e){
                e.preventDefault();
                UICrtl.slideShopCart();
            });
        }
        
        return {
            init: function() {
                console.log("App is working");
                setUpEventListeners();
            }
        }
        
    })(productController, UIController);
    
    AppController.init();
    
});








