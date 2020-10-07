$(document).ready(function ($) {

    $('#gotosendnow').on('click', function () {
        $("#sdt").val($("#cus-phonenumber").val() || '');
    });

    function send(data) {
        $.ajax({
            url: 'http://142.54.171.234:1337/bdmt-users',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: true,
            success: function (msg) {
                console.log(msg)
            },
        });
    }

    $('#sendnowform').submit(function (event) {
        const inputs = $('#sendnowform :input')
        send({ mobile: $(inputs[2]).val(), name: $(inputs[1]).val(), email: $(inputs[0]).val() })
    })

    $('#sendnow').on('click', function () {
        const mobile = $('#sdt').val()
        const name = $('#name').val()
        const email = $('#email').val()

        $('#close').trigger('click')
        send({ mobile, name, email })
    })
})

