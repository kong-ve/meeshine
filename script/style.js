function openCamera() {
    api.getPicture({
        sourceType: 'camera',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 50,
        targetWidth: 100,
        targetHeight: 100,
        saveToPhotoAlbum: false
    }, function(ret, err) {
        if (ret) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function openCart() {
    var footer = 　$api.byId('footer')
    var body_h = api.winHeight;
    var footer_h = $api.offset(footer).h;
    api.openFrame({
        name: 'shoppingcart',
        url: './html/shopCart.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: body_h - footer_h
        },
        bounces: true,
        bgColor: 'rgba(0,0,0,0.3)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });

}

function myInfoMes() {
    api.ajax({
            url: 'http://wstmart.anaf.cn/apihome/users/index',
            method: 'get',
        },
        function(ret, err) {
            // console.log(JSON.stringify(ret));
            if (ret.status == 1) {
                var list = ret.data;
                api.setGlobalData({
                    key: 'userMesg',
                    value: JSON.stringify(ret.data)
                });
            } else if (ret.status == -999) {
                api.setGlobalData({
                    key: 'userMesg',
                    value: ''
                });
            }
        })
    }

    function isLogin(obj, url, index) {

        api.ajax({
            url: 'http://wstmart.anaf.cn/apihome/users/index',
            method: 'get',
        }, function(ret, err) {
            // console.log(JSON.stringify(ret));
            if (err) {
                toast.fail({
                    title: '网络出现问题',
                    duration: 2000
                });
                return false;
            }
            if (ret.status == 1) {
              myInfoMes();
                var frames = api.frames();
                for (var i = 0; i < frames.length; i++) {
                    api.setFrameAttr({
                        name: frames[i].name,
                        hidden: true
                    })
                }
                var footer = 　$api.byId('footer');
                var body_h = api.winHeight;
                var footer_h = $api.offset(footer).h;
                var footerAct = $api.dom(footer, '.aui-bar-tab-item.aui-active');
                $api.removeCls(footerAct, 'aui-active');
                $api.addCls($api.byId(obj), 'aui-active');
                api.openFrame({
                    name: index,
                    url: url,
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: body_h - footer_h
                    },
                    pageParam: {
                        // top: headerPos.h,
                        footer: body_h - footer_h,
                        foot: footer_h,
                    },
                    bounces: false,
                    bgColor: 'rgba(0,0,0,0.3)',
                    vScrollBarEnabled: false,
                    hScrollBarEnabled: false,
                    scrollEnabled: index == 'myinfo' ? true : false

                });
                setTimeout(function() {
                    var frames = api.frames();
                    // for (var i = 0; i < frames.length; i++) {
                    // console.log(window.childNode)
                    api.sendFrameToBack({
                        from: index
                    });
                    api.setFrameAttr({
                            name: index,
                            hidden: false
                        })
                        // }
                }, 1000)
            } else if (ret.status == -999) {
                api.openWin({
                    name: 'login',
                    url: './html/login_win.html',
                });
            }

        });
    }

    function randomSwitchBtn(obj, url, index) {
        // $api.text($api.byId('aui-header'), name);
        if (index != 'home') {
            isLogin(obj.id, url, index);
        } else {
            var frames = api.frames();
            for (var i = 0; i < frames.length; i++) {
                api.setFrameAttr({
                    name: frames[i].name,
                    hidden: true
                })
            }
            var footer = 　$api.byId('footer')
            var body_h = api.winHeight;
            var footer_h = $api.offset(footer).h;
            var footerAct = $api.dom(footer, '.aui-bar-tab-item.aui-active');
            $api.removeCls(footerAct, 'aui-active');
            $api.addCls(obj, 'aui-active');
            api.openFrame({
                name: index,
                url: url,
                rect: {
                    x: 0,
                    y: 0,
                    w: 'auto',
                    h: body_h - footer_h
                },
                pageParam: {
                    // top: headerPos.h,
                    footer: body_h - footer_h,
                    foot: footer_h,
                },
                bounces: false,
                bgColor: 'rgba(0,0,0,0.3)',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false,
                scrollEnabled: index == 'myinfo' ? true : false

            });
            setTimeout(function() {
                var frames = api.frames();
                // for (var i = 0; i < frames.length; i++) {
                // console.log(window.childNode)
                api.sendFrameToBack({
                    from: index
                });
                api.setFrameAttr({
                        name: index,
                        hidden: false
                    })
                    // }
            }, 1000)
        }
    }
