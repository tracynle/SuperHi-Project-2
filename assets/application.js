$(document).ready(function() {

    // Increase or decrease the quantity
    $(document).on('click', '.js-quantity-button', function(event) {
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
    });
    
    // Disable or enable quantity buttons 
    $(document).on('change', '.js-quantity-field', function(event) {
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
    });

    // update the quantity of the selected radio button
    $(document).on('change', '.js-variant-radio', function(event) { 
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
    });
});