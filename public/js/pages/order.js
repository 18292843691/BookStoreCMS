(function() {
    
    $('.del').click(function(e) {

        var confirm = window.confirm('三思而后行')
        if (confirm) {
            var target = $(e.target);
            var id = target.data('id');
            var tr = $('.item-id-' + id);

            $.ajax({
                type: 'DELETE',
                url: '/user/order/delete/' + id,
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
    $('.alert-topay').on('click', function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var userId = $('.item-user-' + id).val();
        var _orderId = $('.item-order-' + id).val();
        $.ajax({
            type: 'POST',
            url: '/admin/order/alert/',
            data: {
                userId: userId,
                orderId: _orderId           
            }
        }).done(function(results) {
            if (results.success == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 2000)

                
            } else if (results.error == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 2000)

               
            }
        })
    })

    $('.single-send').on('click', function(e) {
       
        var target = $(e.target);
        var id = target.data('id');
        var userId = $('.item-user-' + id).val();
        var _orderId = $('.item-order-' + id).val();      

        $.ajax({
            type: 'POST',
            url: '/admin/order/send/',
            data: {
                orderId:_orderId,
                userId: userId              
            }
        }).done(function(results) {
            if (results.success == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 2000)

            } else if (results.error == 1) {
                $('.alert').addClass('text-success').html(results.mes).show();
                var time = setTimeout(function() {
                    $('.alert').hide().removeClass('alert-success');
                }, 2000)
                $('.single-send').html('发货成功');
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

