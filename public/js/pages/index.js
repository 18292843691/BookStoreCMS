//轮播图
$('.carousel').carousel({
    interval: 3000,
    pause: 'hover',
    wrap: true,
    keyboard: true
})
$('.right').click(function() {
    $('.carousel').carousel('next')
})
$('.left').click(function() {
    $('.carousel').carousel('prev')
})
$('.slide-to-one').click(function() {
    $('.carousel').carousel(0)
})
$('.slide-to-two').click(function() {
    $('.carousel').carousel(1)
})
$('.slide-to-three').click(function() {
    $('.carousel').carousel(2)
})
$('.slide-to-four').click(function() {
    $('.carousel').carousel(3)
})

$('.pay').on('click', function() {

        var _bookId = $('.bookId').val();
        var _count = 1;
        var _price = $('.relPrice').val();

        var bookId = _bookId
            
        $.ajax({
            type: 'POST',
            url: '/user/index/pay/' + bookId,
            data: {
                bookId: _bookId,
                price: _price,
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