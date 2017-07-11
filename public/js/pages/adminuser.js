$(function() {
    $('.del').click(function(e) {

        var confirm = window.confirm('三思而后行')

        if(confirm) {
            var target = $(e.target);
            var id = target.data('id');
            var tr = $('.item-id-' + id);

            $.ajax({
                type: 'DELETE',
                url: 'list/delete/' + id,
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
    $('.update').click(function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        var role = $('.item-id-' + id + ' .role').val();

        $.ajax({
            type: 'POST',
            url: 'list/update/id?' + id + '?role' + role,
            data: {
                id: id,
                role: role
            }
        }).done(function(results) {
            if (results.success == 1) {
                role.val() = $('.role').val();
            }
        })
    })
})
