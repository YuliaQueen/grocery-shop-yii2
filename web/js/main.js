jQuery(document).ready(function ($) {
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
    });

    var navoffeset = $(".agileits_header").offset().top;
    $(window).scroll(function () {
        var scrollpos = $(window).scrollTop();
        if (scrollpos >= navoffeset) {
            $(".agileits_header").addClass("fixed");
        } else {
            $(".agileits_header").removeClass("fixed");
        }
    });

    $(".dropdown").hover(
        function () {
            $('.dropdown-menu', this).stop(true, true).slideDown("fast");
            $(this).toggleClass('open');
        },
        function () {
            $('.dropdown-menu', this).stop(true, true).slideUp("fast");
            $(this).toggleClass('open');
        }
    );

    $(document).ready(function () {
        /*
            var defaults = {
            containerID: 'toTop', // fading element id
            containerHoverID: 'toTopHover', // fading element hover id
            scrollSpeed: 1200,
            easingType: 'linear'
            };
        */

        $().UItoTop({easingType: 'easeOutQuart'});

    })


    $('#example').okzoom({
        width: 150,
        height: 150,
        border: "1px solid black",
        shadow: "0 0 5px #000"
    })


});

$(window).load(function () {
    $('.flexslider').flexslider({
        animation: "slide",
        start: function (slider) {
            $('body').removeClass('loading');
        }
    });
});


/* Cart*/

function showCart(cart) {
    $('#modal-cart .modal-body').html(cart);
    $('#modal-cart').modal();
    let cartSum = $('#cart-sum').text() ? 'Сумма: ' + $('#cart-sum').text() : 'Cart is empty';
    if (cartSum) {
        $('.cart-sum').text(cartSum);
    }
}

//очистка всей корзины
function clearCart() {
    $.ajax({
            url: 'cart/clear-cart',
            type: 'GET',
            success: function (res) {
                if (!res) {
                    alert('Ошибка! Попробуйте позже!')
                }
                showCart(res);
            },
            error: function () {
                alert('error')
            }
        }
    );
};

//добавление товара в корзину
$('.add-to-cart').on('click', function () {

    let id = $(this).data('id')
    $.ajax({
            url: 'cart/add',
            data: {id: id},
            type: 'GET',
            success: function (res) {
                if (!res) {
                    alert('Ошибка добавления товара! Попробуйте позже!')
                }
                showCart(res);
            },
            error: function () {
                alert('error')
            }
        }
    );
    return false;
});


//удаление товара из корзины по клику на крестик
$('#modal-cart .modal-body').on('click', '.del-item', function () {
    let id = $(this).data('id');

    $.ajax({
            url: 'cart/del-item',
            data: {id: id},
            type: 'GET',
            success: function (res) {
                if (!res) {
                    alert('Ошибка удаления товара! Попробуйте позже!')
                }
                showCart(res);
            },
            error: function () {
                alert('error')
            }
        }
    );
});

// $('.value-plus').on('click', function(){
//     var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)+1;
//     divUpd.text(newVal);
// });
//
// $('.value-minus').on('click', function(){
//     var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)-1;
//     if(newVal>=1) divUpd.text(newVal);
// });

/* // Cart*/





