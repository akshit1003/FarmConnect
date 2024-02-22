$(document).ready(function() {
    $('#addItemForm').submit(function(event) {
        event.preventDefault();
        const productName = $('#productName').val();
        const price = $('#price').val();
        const quantity = $('#quantity').val();

        $.ajax({
            type: 'POST',
            url: '/cart',
            contentType: 'application/json',
            data: JSON.stringify({ productName, price, quantity }),
            success: function(response) {
                alert('Item added to cart successfully');
                $('#addItemForm')[0].reset();
            },
            error: function(err) {
                console.error('Error adding item to cart:', err);
                alert('Failed to add item to cart');
            }
        });
    });

    function fetchCartItems() {
        $.get('/cart', function(cartItems) {
            $('#cartItems').empty();
            cartItems.forEach(function(item) {
                $('#cartItems').append(`<div>${item.product_name} - $${item.price} - Quantity: ${item.quantity}</div>`);
            });
        });
    }

    fetchCartItems();
});
