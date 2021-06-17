$(document).ready(function() {
   
    let 
        onQuantityButtonClick = function(event) {
            let 
                $button = $(this),
                $form = $button.closest('form'),
                $quantity = $form.find('.js-quantity-field'),
                quantityValue = parseInt($quantity.val()),
                max = $quantity.attr('max') ? parseInt($quantity.attr('max')) : null;  

            if ($button.hasClass('plus') && (max === null || quantityValue + 1 <= max)) {
                // do something for plus click
                $quantity.val(quantityValue + 1).change();
                console.log("clicked plus");
            }
            else if ($button.hasClass('minus')) {
                // do something for minus click
                $quantity.val(quantityValue - 1).change();
                console.log("clicked minus");

            }
        },
        onQuantityFieldChange = function(event) {
            let 
                $field = $(this),
                $form = $field.closest('form'),
                $quantityText = $form.find('.js-quantity-text'),
                shouldDisableMinus = parseInt(this.value) === 1,
                shouldDisablePlus = parseInt(this.value) === parseInt($field.attr('max')),
                $minusButton = $form.find('.js-quantity-button.minus');
                $plusButton = $form.find('.js-quantity-button.plus');
    
            // set the text of the quantity text element to the value of the field
            $quantityText.text(this.value);
    
            if(shouldDisableMinus) {
                $minusButton.prop('disabled', true);
            }
            // if button is currently disabled
            else if ($minusButton.prop('disabled') === true) {
                // enable the button 
                $minusButton.prop('disabled', false);
            }
    
            if(shouldDisablePlus) {
                $plusButton.prop('disabled', true);
            }
            // if button is currently disabled
            else if ($plusButton.prop('disabled') === true) {
                // enable the button 
                $plusButton.prop('disabled', false);
            }
        },
        onVariantRadioChange = function(event) { 
            let  
                $radio = $(this),
                $form = $radio.closest('form'),
                max = $radio.attr('data-inventory-quantity'),
                $quantity = $form.find('.js-quantity-field'),
                $addToCartButton = $form.find('#add-to-cart-button');
            
            if ($addToCartButton.prop('disabled') === true) {
                $addToCartButton.prop('disabled', false);
            }
    
    
            $quantity.attr('max', max);
    
           if (parseInt($quantity.val()) > max) {
               $quantity.val(max).change();
           }
        },
        onAddToCart = function(event) {
            event.preventDefault(); // gets the event and not execute the behavior. prevents going to the cart after adding item
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: $(this).serialize(),  // send data to the url using the form using serialize()
                dataType: 'json',
                success:  onCartUpdated,
                error: onError
            })
        },
        onCartUpdated = function() {
            alert('cart is updated');
        },
        onError = function(XMLHttpRequest, textStatus) {
            let data = XMLHttpRequest.responseJSON;
            alert(data.status + ' - ' + data.message + ': ' + data.description);
        };


    // Increase or decrease the quantity
    $(document).on('click', '.js-quantity-button', onQuantityButtonClick);
    
    // Disable or enable quantity buttons 
    $(document).on('change', '.js-quantity-field', onQuantityFieldChange);

    // update the quantity of the selected radio button
    $(document).on('change', '.js-variant-radio', onVariantRadioChange);

    $(document).on('submit', '#add-to-cart-form', onAddToCart);
});
