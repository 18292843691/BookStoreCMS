(function() {
    var price = $('#book-price').val();
    $('#count-price').html(price);

    // $('#priceb').val() = 1;
    $('#priceb').on('change', function() {
        var count = $('#priceb').val();
        $('#count-price').html(count * price);
    });

    $('.join-cart').on('click', function(e) {
        var bookId = $('#bookId').val(),
            count = $('#priceb').val(),
            price = ($('#book-price').val() * count);
        // e.preventDefault(); 
        $.ajax({
            type: 'POST',
            url: '/user/cart/new/' + bookId,
            dataType: 'jsonp',
            data: {
                bookId: bookId,
                price: price,
                count: count
            }
        }).done(function(results) {
            if (results.success && results.success == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 4000)
            } else if (results.error && results == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 4000)
            }
        })
    })
})()
