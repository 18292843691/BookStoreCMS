(function() {
    $('.del').click(function(e) {

        var confirm = window.confirm('三思而后行')
        if (confirm) {
            var target = $(e.target);
            var id = target.data('id');
            var tr = $('.item-id-' + id);

            $.ajax({
                type: 'DELETE',
                url: '/admin/book/cart/delete/' + id,
                data: {
                    id: id
                }
            }).done(function(results) {
                if (results.success == 1) {
                    if (tr.length > 0) {
                        tr.remove()
                    }
                }
            })
        }
    })

     $('.pay').on('click', function(e) {

        var bookId = $('.bookId').val();
        var target = $(e.target);
        var id = target.data('id');
        var price = $('.item-price-' + id).val();
        var _count = $('.item-count-' + id).val();
        var _onePrice = $('.onePrice-'+ id).text();

        $.ajax({
            type: 'POST',
            url: '/user/cart/pay/' + bookId,
            data: {
                bookId: bookId,
                price: _onePrice,
                count: _count,
                isBuy: false
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

     
   $('.count').on('change', function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var price = $('.item-price-' + id).val();
        var count = $('.item-count-' + id).val();
        var onePrice = $('.onePrice-'+ id)
        onePrice.html(count * price);
    })
})()
