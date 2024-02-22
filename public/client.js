$(document).ready(function() {
    $('#addItemForm').submit(function(event) {
        event.preventDefault();
        const product_name = $('#product_name').val();
        const price = $('#price').val();
        const quantity = $('#quantity').val();

        const newItem = {
            product_name: product_name,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        };

        $.ajax({
            type: 'POST',
            url: '/cart',
            contentType: 'application/json',
            data: JSON.stringify(newItem),
            success: function(response) {
                alert('Item added to cart successfully');
                $('#addItemForm')[0].reset();
                fetchCartItems(); 
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
