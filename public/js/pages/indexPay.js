$(document).ready(function() {

    var bookId = $('.bookId').val() || "593fe46df6cbf12730eb6335";
    var price = $('#count-price').text() || $('.relPrice').val() || $('.cartPrice').val() || $('.onePrice').text() || 100;
    var count = $('#priceb').val() || $('.cartCount').val() || 1;
    var bookTitle = $('#bookTitle').val() || $('.bookTitle').val();
    $('.pay').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/user/order/pay/' + bookId,
            data: {
                bookId: bookId,
                price: price,
                count: count,
                bookTitle: bookTitle
            }
        }).done(function(results) {
            if (results.success == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 3000)
            } else if (results.error == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 3000)
            }
        })
    })


})
