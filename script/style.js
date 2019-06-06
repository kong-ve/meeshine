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
        bounces: false,
        bgColor: 'rgba(0,0,0,0.3)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });

}

function myInfoMes() {
  var token = localStorage.getItem('token');
  if(!token){
    localStorage.setItem('userMesg', '');
    return ;
  }
    api.ajax({
            url: 'http://wstmart.anhy.net/api.php?_d=userstate',
            method: 'get',
            headers:{
              Cookie:token
            }
        },
        function(ret, err) {
            if(err){
              console.log(JSON.stringify(err))
              localStorage.setItem('userMesg', '');
              return ;
            }
            if (ret) {
                var list = ret;
                console.log(JSON.stringify(list))
                localStorage.setItem('userMesg', JSON.stringify(ret));
                  localStorage.setItem('userId', ret.id);

              }
        })
    }
    function isLogin(obj, url, index) {
      console.log(1);
      var token = localStorage.getItem('token');
      console.log(token);
      if(token){
        // api.ajax({
        //     url: 'http://wstmart.anhy.net/index.php?dispatch=auth.token_login&token='+token+'&redirect_url=http://wstmart.anhy.net/api.php?_d=userstate',
        //     method: 'get',
        // }, function(ret, err) {
        //     // console.log(JSON.stringify(ret));
        //     if (err) {
        //       // alert(JSON.stringify(ret));
        //         toast.fail({
        //             title: '网络出现问题',
        //             duration: 2000
        //         });
        //         return false;
        //     }
        //     if (ret) {
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
                    reload:index == 'myinfo' ? true : false,
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
            // }

        // });
      }else{
        api.openWin({
            name: 'login',
            url: './html/login_win.html',
        });
      }
    }

    function randomSwitchBtn(obj, url, index) {
        // $api.text($api.byId('aui-header'), name);
        if (index != 'home') {
            isLogin(obj.id, url, index);
        } else {
            var frames = api.frames();
            for (var i = 0; i < frames.length; i++) {
              if(frames[i].name == 'home'){
                api.execScript({
                    frameName: frames[i].name,
                    script: 'stopMusic();'
                });

              }
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
