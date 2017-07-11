$(function() {

    //表单不符合规则时，禁用提交按钮
    $('#submit-login').attr('disabled', 'disabled')
    $('#register-submit').attr('disabled', 'disabled')

    $('#signupPassword').on('keyup', function() {
        var val = $('#signupPassword').val();
        $('#signupPasswordT').val(val);
    })


    if (($('#loginName').val() != '') && ($('#loginPassword').val() != '')) {
        $('#submit-login').attr('disabled', null)
    }

    $('#signupPassword').on('blur', function() {
        if ($('#signupPassword').val() !== $('#signupPasswordT').val()) {
            $('.pwdshow').addClass('text-danger').html('俩次输入密码不一致')
            $('#register-submit').attr('disabled', 'disabled')
        } else if ($('#signupPassword').val() == $('#signupPasswordT').val()) {
            $('.pwdshow').addClass('text-success').html('恭喜你密码输入正确')
            if (($('#signupName').val() != '') && ($('#signupPassword').val() != '') && ($('#signupPasswordT').val() != '')) {
                $('#register-submit').attr('disabled', null)
            } else {
                $('#register-submit').attr('disabled', 'disabled')
            }
        }
    })

    $('#signupPasswordT').on('blur', function() {
        if ($('#signupPassword').val() !== $('#signupPasswordT').val()) {
            $('.pwdshow').addClass('text-danger').html('俩次输入密码不一致')
            $('#register-submit').attr('disabled', 'disabled')
        } else if ($('#signupPassword').val() == $('#signupPasswordT').val()) {
            $('.pwdshow').addClass('text-success').html('恭喜你密码输入正确')
            $('#register-submit').attr('disabled', null)
        }
    })


    //用户名输入完成后AJAX验证用户是否存在  

    $('#loginName').on('focusout', function() {
        var username = $('#loginName').val();
        $.ajax({
            type: 'POST',
            url: '/user/istrue',
            data: {
                username: username
            }
        }).done(function(callback) {
            if (callback.success && callback.success == 1) {
                $('#usershow').removeClass('text-danger').addClass('text-success').html('用户名输入正确')
                $('#submit-login').attr('disabled', null)
            }
            if (callback.error && callback.error == 1) {
                $('#usershow').removeClass('text-success').addClass('text-danger').html('该用户不存在')
                $('#submit-login').attr('disabled', 'disabled')
            }
        })
    })

    //禁用密码框复制粘贴
    $('input:password').bind('cut copy paste', function(e) {
        if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
            event.preventDefault();
        } else {
            e.preventDefault();
            //return false;
        }
    })

    $('#login-form').submit(function() {
        if (!($('#checkbox').attr('checked'))) {
            $('#checkedpwd').remove();
        }

        if (!($('#checklogin').attr('checked'))) {
            $('#checkedlogin').remove();
        }

        if (($('#checklogin').attr('checked'))) {
            $('#checklogin').attr('checked', 'checked');
        }
    })

    //如果用户勾选记住登陆状态，则自动登录
    if (($('#loginName').val() != '') && ($('#loginPassword').val() != '') && ($('#checklogin').attr('checked'))) {
        $('#login-form').submit();
    }

    //完成付款--> 由于pay.js加载不出来，暂且移在这里
    $('#finishedPay').on('click', function() {
        var orderId = $('.orderId').val();
        $.ajax({
            type: 'POST',
            url: '/user/order/finishedpay/' + orderId,
            data: {
                orderId: orderId
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
