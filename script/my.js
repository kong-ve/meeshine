function bigBg() {
    document.addEventListener('touchstart', function(event) {
        yx = event.changedTouches[0].clientY;
    })
    document.addEventListener('touchmove', function(event) {
        // event.preventDefault();
        if (touchMove == false) {
            var height = document.getElementById('main').querySelector('.bg').querySelector('img').height;
            if (yx == 0) {
                yx = event.changedTouches[0].clientY;
                var y = height;
            } else {
                if (yx < event.changedTouches[0].clientY) {
                    var y = height + 1;
                    document.getElementById('main').querySelector('.bg').querySelector('img').style.height = (y) + 'px';
                }
            }
        }
    })
    document.addEventListener('touchend', function(event) {
        if (touchMove == false) {
            if (yx < event.changedTouches[0].clientY) {
                var height = document.getElementById('main').querySelector('.bg').querySelector('img').height;
                var y = height + 1;
                document.getElementById('main').querySelector('.bg').querySelector('img').style.height = (y) + 'px';
            }
            document.getElementById('main').querySelector('.bg').querySelector('img').style.height = '';
        }
    })
}

function LoginOut() {
    api.ajax(
      {
        url: 'http://wstmart.anaf.cn/apihome/users/logout',
        method: 'get',
    },
    function(ret, err) {
        if (ret.status == 1) {
            toast.success({
                title: ret.msg,
                duration: 2000
            });
            api.rebootApp();

        } else {
            toast.fail({
                title: ret.msg,
                duration: 2000
            });
        }
    }
  );

}

function EditInfo() {
    api.openWin({
        name: 'EditInfo',
        url: './information_win.html',
    });

}

function userInfo() {
  var data =  JSON.parse(api.getGlobalData({key: 'userMesg'}));
  var list = data;
  var style=document.createElement('style');
style.innerHTML="#message::before{background: url(../image/suipai/suipai1.png) no-repeat;background-size:cover;}";//添加样式内容的话也可以用上面提到过的`insertRule`,相对例子里的硬编码会更优雅点。
document.head.appendChild(style);
  for (var key in list) {
      if (list[key]) {
          if (document.getElementById(key))
              $api.text($api.byId(key), list[key]);
      }
    }
}

function stopbg(e) {
    touchMove = true;
    api.addEventListener({
        name: 'swiperight'
    }, function(ret, err) {
        $api.css($api.byId('right-pane'), 'animation: phide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.css($api.byId('main'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.addCls($api.byId('model'), 'aui-hide');
        $api.css($api.byId('model'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.removeCls(document.querySelector('html'), 'noscroll');
        $api.css($api.byId('felx-btn'), 'animation: Btnhide 0.5s ease-in-out 0s 1 alternate forwards;');
        firstClick = true;
        api.removeEventListener({
            name: 'swiperight'
        });
        api.removeEventListener({
            name: 'tap'
        });
        api.addEventListener({
            name: 'swipeleft'
        }, function(ret, err) {
            openMenu();
            api.removeEventListener({
                name: 'swipeleft'
            });

        });
        bigBg();
    });

    $api.addEvt($api.byId('model'), 'tap', function(ret, err) {
        console.log(this);
        $api.css($api.byId('main'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.css($api.byId('right-pane'), 'animation: phide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.addCls($api.byId('model'), 'aui-hide');
        $api.css($api.byId('model'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.removeCls(document.querySelector('html'), 'noscroll');
        $api.css($api.byId('felx-btn'), 'animation: Btnhide 0.5s ease-in-out 0s 1 alternate forwards;');
        firstClick = true;
        $api.rmEvt($api.byId('main'), 'tap');
        api.removeEventListener({
            name: 'swiperight'
        });
        api.addEventListener({
            name: 'swipeleft'
        }, function(ret, err) {
            openMenu();
            api.removeEventListener({
                name: 'swipeleft'
            });
        });
        bigBg();
    })
}
 function stopMenu() {
   firstClick = false;
   $api.css($api.byId('right-pane'), 'animation: phide 0.5s ease-in-out 0s 1 alternate forwards;');
   $api.css($api.byId('main'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
   $api.addCls($api.byId('model'), 'aui-hide');
   $api.css($api.byId('model'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
   $api.css($api.byId('felx-btn'), 'animation: Btnhide 0.5s ease-in-out 0s 1 alternate forwards;');
   $api.removeCls(document.querySelector('html'), 'noscroll');
   api.removeEventListener({
       name: 'swiperight'
   });
   api.removeEventListener({
       name: 'tap'
   });
   api.addEventListener({
       name: 'swipeleft'
   }, function(ret, err) {
       openMenu();
       api.removeEventListener({
           name: 'swipeleft'
       });

   });
   bigBg();
 }
function openMenu() {
    // $api.removeCls($api.byId('right-pane'),'aui-hide');
    if (!firstClick) {
        firstClick = true;
          stopbg();
        $api.css($api.byId('main'), 'animation: show 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.css($api.byId('right-pane'), 'animation: pshow 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.addCls(document.querySelector('html'), 'noscroll');
        $api.css($api.byId('felx-btn'), 'animation: Btnshow 0.5s ease-in-out 0s 1 alternate forwards;');

        $api.removeCls($api.byId('model'), 'aui-hide');
        $api.css($api.byId('model'), 'animation: show 0.5s ease-in-out 0s 1 alternate forwards;');

    } else {
        firstClick = false;
        $api.css($api.byId('right-pane'), 'animation: phide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.css($api.byId('main'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.addCls($api.byId('model'), 'aui-hide');
        $api.css($api.byId('model'), 'animation: hide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.css($api.byId('felx-btn'), 'animation: Btnhide 0.5s ease-in-out 0s 1 alternate forwards;');
        $api.removeCls(document.querySelector('html'), 'noscroll');
        api.removeEventListener({
            name: 'swiperight'
        });
        api.removeEventListener({
            name: 'tap'
        });
        api.addEventListener({
            name: 'swipeleft'
        }, function(ret, err) {
            openMenu();
            api.removeEventListener({
                name: 'swipeleft'
            });

        });
        bigBg();

    }

}

function login() {
    api.openWin({
        name: 'login',
        url: './login_win.html'
    });

}
