$(function() {
    // alert($)
    var $ul = $('.banner-3d ul'),
        hw = $ul.width() / 2,
        hh = $ul.height() / 2,
        xc = $ul.offset().left + hw,
        yc = $ul.offset().top + hh;

    $('.banner-3d ul').hover(function() {
            $(this).on('mousemove', function(event) {
                var event = event || window.event,

                    pX = event.pageX,
                    pY = event.pageY,

                    distX = pX - xc,
                    distY = pY - yc,

                    LiDegY = distX / hw * 6,
                    LiDegX = -distY / hh * 6,
                    // console.log('LiDegY=====' + LiDegY);
                    // console.log('LiDegX=====' + LiDegX);

                    bgMaskX = -distX / hw * 30,
                    bgMaskY = -distY / hh * 15,
                    // console.log('bgMaskX=====' + bgMaskX);
                    // console.log('bgMaskY=====' + bgMaskY);

                    bgPhoneX = -distX / hw * 26,
                    bgPhoneY = -distY / hh * 6,
                    // console.log('bgPhoneX=====' + bgPhoneX);
                    // console.log('bgPhoneY=====' + bgPhoneY);

                    bgHeaderPX = distX / hw * 40,
                    bgHeaderPY = distY / hh * 10;
                // console.log('bgHeaderPX=====' + bgHeaderPX);
                // console.log('bgHeaderPY=====' + bgHeaderPY);


                $(this).find('li').css('transform', 'rotateX(' + LiDegX + 'deg) rotateY(' + LiDegY + 'deg)');

                $(this).find('.mask-shadow-3d').css({
                    opacity: '1',
                    transform: 'translate3d(' + bgMaskX + 'px, ' + bgMaskY + 'px, 0)',
                    transiton: 'opacity 0s'
                })

                $(this).find('.bg-phone').css('transform', 'translate3d(' + bgPhoneX + 'px, ' + bgPhoneY + 'px, 0)');
                $(this).find('.bg-headphones').css('transform', 'translate3d(' + bgHeaderPX + 'px, ' + bgHeaderPY + 'px, 0)');
            })
        },
        function() {
            $(this).find('li').css('transform', 'rotateX(0deg) rotateY(0deg)');

            $(this).find('.mask-shadow-3d').css({
                opacity: '0'
            });

            $(this).find('.bg-phone,.bg-headphones').css('transform', 'translate3d(0, 0, 0)');

            $(this).unbind('mousemove');
        })
})

1017735262
