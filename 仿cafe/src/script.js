var is_xs = window.matchMedia('(max-width: 768px)').matches;

$(function () {
    var nav_pistion = $('nav').offset().top;
    var nav_end = $('section:nth-of-type(4)').offset().top;
    $(window).scroll(function () {
        // 1.每次滚动的时候，检查滚动条位置
        // 2.滚动条位置 大于 nav-position并且 小于 nav-end 则加fixed
        // 3.此外不加fixed
        var scroll_position = document.documentElement.scrollTop || document.body.scrollTop;
        if (scroll_position > 0) {
            // 按钮菜单显示
            $('body button.btn').slideDown('fast');
            // 花的渐变效果
            $('.topleft, .topright, .bottomleft, .bottomright').addClass('change')
            if (scroll_position > nav_pistion && scroll_position < nav_end) {
                $('nav').addClass('fixed');
            }else {
                $('nav').removeClass('fixed');
            }
        } else {
            $('body button.btn').slideUp('fast');
            $('.topleft, .topright, .bottomleft, .bottomright').removeClass('change')
        }
    })
    // 菜单按钮特效及内容
    $('body >button').click(function () {
        $('div.maskmenu').show();
        // 隐藏按钮和禁用滚动条
        $('body >button.btn').hide();
        $(document.body).css({
            "overflow-x": "hidden",
            "overflow-y": "hidden"
        });
        // 给x添加监视
        $('div.maskmenu button').click(function () {
            $('div.maskmenu').hide()
            $(document.body).css({
                "overflow-x": "auto",
                "overflow-y": "auto"
            });
        })
        // 给按钮菜单下的li添加
        $('div.maskmenu li').click(function () {
            $('div.maskmenu').hide();
            $(document.body).css({
                "overflow-x": "auto",
                "overflow-y": "auto"
            });
        })
    })
    // 大屏幕下去掉手风琴效果
    $('section:nth-of-type(3) div div').removeClass('collapse')
    // 菜单点击滑动调整
    $('section:nth-of-type(2) nav li').click(function (e) {
        e.preventDefault();
        //    1.找到点击li下的a的href里的菜单名
        //    2.获取菜单条位置的scrolltop
        //    3.获取菜单项的scrolltop
        //    4.设置滑动效果
        var menu_name = $(this).children('a').attr('href')
        var start = $(window).scrollTop();
        
        var end = $('section:nth-of-type(3) ' + menu_name)[0].offsetTop;
        // 修正位置
        end -= 100;
        // 执行频率20 执行次数1000/20 每次的路程
        var amove = (end - start) * 20 / 1000;

        var th = setInterval(function () {
            var p = $(window).scrollTop()
            if(end > start){
                p += amove
                $(window).scrollTop(p)
            } else {
                p -= amove
                $(window).scrollTop(p)
            }

            if (p >= end) {
                clearInterval(th)
            }
        }, 20)
    })

    if (is_xs) {// 小屏幕下的js
        // 将图片移动到一起
        $('div.bg').remove().insertBefore('section:last')
        // 显示手风琴效果
        $('section:nth-of-type(3) >div >div').addClass('collapse')
    }
})


