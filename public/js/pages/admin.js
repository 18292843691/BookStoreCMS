jQuery.fn.extend({
    uploadPreview: function(opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            Img: "inputImg",
            Width: 100,
            Height: 100,
            ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            Callback: function() {}
        }, opts || {});
        _self.getObjectURL = function(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        _this.change(function() {
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种");
                    this.value = "";
                    return false
                }

                $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))

                opts.Callback()
            }
        })
    }
});


$(function() {
    $("#inputFile").uploadPreview({
        Img: "inputImg",
        Width: 100,
        Height: 100,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        Callback: function() {}
    });
});


$('#inputDouban').on('blur', function() {
    var douban = $(this)
    var id = douban.val()

    if (id) {
        $.ajax({
            url: 'https://api.douban.com/v2/book/' + id,
            cache: true,
            type: 'get',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'callback',
            success: function(data) {
                $('#inputCategory').val(data.tags[0].title)
                $('#inputTitle').val(data.title)
                $('#inputAuthor').val(data.author[0])
                $('#inputPublish').val(data.publisher)
                $('#inputPrice').val(parseInt(data.price))
                $('#inputImgName').val(data.title)
                $('#inputSummary').val(data.summary)
            }
        })
    }
})
