function checkPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function IS_star(videoId){
  api.ajax({
      url: 'http://wstmart.anaf.cn/apihome/video/is_star',
      method: 'get',
      data: {
          values: {
              video_id: videoId
          },
      }
  },function(ret, err){

      if (ret) {
        var el = $api.byId('likeBtn');
        if(ret.status == 1){
          $api.css($api.dom(el, '.icon-heart'),'color:red;');
        }else{
          $api.removeAttr($api.dom(el, '.icon-heart'),'style');
        }
      } else {
          console.log( JSON.stringify( err ) );
      }
  });

}
function hideModel() {
  var el = $api.byId('model-aui');
  if(paneName != ''){
    api.closeFrame({
        name: paneName
    });
    // $api.removeCls(document.body, paneName+'Show');
    // $api.addCls(document.body, paneName+'Hide');
  setTimeout(function(){
    $api.addCls($api.byId('model-show'), 'aui-hide');
    paneName = '';
    document.getElementById('userBtn').style.display = 'block';
    document.getElementById('likeBtn').style.display = 'block';
    document.getElementById('shareBtn').style.display = 'block';
    document.getElementById('commitBtn').style.display = 'block';
    document.getElementById('shopcartBtn').style.display = 'block';
  },100)

    // document.getElementById('sellBtn').style.display = 'block';
  }
}
function searchForm() {
  stopMusic();
  api.openWin({
      name: 'productList_win',
      url: './productList_win.html',
      pageParam: {
          name: 'test'
      }
  });

}
function GetVideoList(List, container, swipe, foot_h) {
    List.map(function(v, i) {
        var el = document.createElement('div');
        var el_child = document.createElement('video');

        el.className = 'swipe-box';
        el_child.src = v.goods_video_url;
        el_child.id = v.id;
        el_child.poster = v.imageUrl||'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/bc281dfcaf750de7acd9c8e9224e237b.png';
        el_child.autoplay = false;
        el_child.loop = true;
        el_child.type = 'video/mp4';
        el_child.muted = true;
        el_child.setAttribute('playsinline', 'true');
        el_child.setAttribute('webkit-playsinline', 'true');
        el_child.setAttribute('x5-video-player-type', "h5")
        el_child.setAttribute('x5-video-player-fullscreen', "portraint")
        el_child.setAttribute('webkit-playsinline', "true")
        el_child.setAttribute('playsinline', "true")
        el_child.setAttribute('raw-controls', "true")
        el_child.setAttribute('x-webkit-airplay', "true")
        el_child.setAttribute('x5-video-orientation', "portraint")
        el_child.className = 'video_max';
        el_child.codecs = "avc1.42E01E, mp4a.40.2"
        // var btn_shopping = document.createElement('div');
        // btn_shopping.className = 'shopBtn';
        // var i_shop = document.createElement('i');
        // i_shop.className = 'iconfont icon-shop-cart-white';
        // var span_shop = document.createElement('span');
        // span_shop.innerText = '123456789';
        // btn_shopping.appendChild(i_shop);
        // btn_shopping.appendChild(span_shop);
        var div_text = document.createElement('div');
        div_text.className = "sample_content ui-view";
        div_text.id = 'fixmessage_info';

        var user_name = document.createElement('h6');
        user_name.innerText = v.nickname||'用户'+v.number;
        div_text.appendChild(user_name);
        var text_span = document.createElement('span');
        text_span.className = "ui-text";
        text_span.style.cssVal = "display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;";
        text_span.innerText = v.content||'暂无介绍';
        div_text.appendChild(text_span);
        if (api.safeArea.top != 44) {
            div_text.style.bottom = (foot_h + 40) + 'px';
        } else {
            div_text.style.bottom = (foot_h+10) + 'px';
        }
        // div_text.style.bottom = (foot_h+10) + 'px';
        el.appendChild(el_child);
        // el.appendChild(btn_shopping);
        var i_el = document.createElement('i');
        i_el.className = 'play-video hide-video icon iconfont icon-play';
        el.appendChild(div_text);

        el.appendChild(i_el);
        // el.innerHTML = el.innerHTML + '<div id="userBtn" class="flex-btn" style="top:'+((i*api.frameHeight)+api.frameHeight*0.28)+'px" onclick="onAddFL(this)" data-id="'+v.user_id+'">'+
        //     '<div class="btnbox border-white">'+
        //         '<div class="img-user">'+
        //             '<img src="'+(v.imageUrl||'../image/suipai/bg.jpg')+'" />'+
        //         '</div>'+
        //         '<div class="add-user">'+
        //             '<i class="icon iconfont icon-plus" size="24"></i>'+
        //             '<i class="aui-iconfont aui-icon-correct aui-hide"></i>'+
        //         '</div>'+
        //
        //     '</div>'+
        // '</div>'+
        // '<div id="likeBtn" class="flex-btn" style="top:'+((i*api.frameHeight)+api.frameHeight*0.4)+'px" onclick="heartLike(this)">'+
        //     '<div class="btnbox">'+
        //         '<i class="icon iconfont icon-heart" size="24"></i>'+
        //         '<span class="icon-number">15</span>'+
        //     '</div>'+
        // '</div>'+
        // '<div id="shareBtn" class="flex-btn" style="top:'+((i*api.frameHeight)+api.frameHeight*0.5)+'px" onclick="openShare()">'+
        //     '<div class="btnbox">'+
        //         '<i class="icon iconfont icon-share-big" color="#fff" size="24"></i>'+
        //         '<span class="icon-number">15</span>'+
        //     '</div>'+
        // '</div>'+
        // '<div id="commitBtn" class="flex-btn" style="top:'+((i*api.frameHeight)+api.frameHeight*0.6)+'px" onclick="openCom()">'+
        //     '<div class="btnbox">'+
        //         '<i class="icon iconfont icon-ping" size="24"></i>'+
        //         '<span class="icon-number">15</span>'+
        //     '</div>'+
        // '</div>'+
        //
        // '<div id="shopcartBtn" class="flex-btn" style="top:'+((i*api.frameHeight)+api.frameHeight*0.9)+'px" onclick="openSell()">'+
        //     '<div class="btnbox bg">'+
        //         '<i class="icon iconfont icon-addShopcart" size="24"></i>'+
        //         '<span class="icon-number-top">15</span>'+
        //     '</div>'+
        // '</div>';
        container.querySelector(swipe).appendChild(el);
    })
    pages = document.querySelectorAll('.swipe-box');
    slip = Slip(container, 'y').webapp(pages).start(function(event) {
        page = this.page;
        // 事件对象
        moveIsTrue = false;
        // 当前坐标值

    }).move(function(event) {
        moveIsTrue = true;
        document.getElementById('userBtn').style.display = 'none';
        $api.removeCls($api.dom(document.getElementById('userBtn'),'.add-user'),'showSuccess')
        $api.removeAttr($api.dom(document.getElementById('userBtn'),'.add-user'),'hidden')
        document.getElementById('likeBtn').style.display = 'none';
        $api.removeAttr($api.dom(document.getElementById('likeBtn'), '.icon-heart'),'style');
        document.getElementById('shareBtn').style.display = 'none';
        document.getElementById('commitBtn').style.display = 'none';
        document.getElementById('shopcartBtn').style.display = 'none';
        // document.getElementById('sellBtn').style.display = 'none';
    }).end(function() {
        if (this.finger == null) {
            if (JSON.stringify(api.frames()).indexOf('leftPane') == -1 && JSON.stringify(api.frames()).indexOf('rightPane') == -1) {
                if (document.getElementById(userData[this.page].id).paused) {
                    document.getElementById(userData[this.page].id).play();
                    document.getElementById(userData[this.page].id).muted = false;

                    $api.removeCls(pages[this.page].querySelector('.play-video'), 'show-video');
                    $api.addCls(pages[this.page].querySelector('.play-video'), 'hide-video');
                } else {
                    document.getElementById(userData[this.page].id).pause();
                    $api.removeCls(pages[this.page].querySelector('.play-video'), 'hide-video');
                    $api.addCls(pages[this.page].querySelector('.play-video'), 'show-video');
                }
                return false;
            }
        } else {
          if((page+1) == userData.length && moveIsTrue){
            p++;
            userVideo(api.pageParam.foot,$api.byId('container'),p);
          }else{
            document.getElementById(userData[page].id).pause();
            page = this.page;

            if (document.getElementById(userData[this.page].id).muted == true) {
                document.getElementById(userData[this.page].id).currentTime = 0;
                document.getElementById(userData[this.page].id).muted = false;
            }
            document.getElementById(userData[this.page].id).play();
            pages[this.page].querySelector('.play-video').className = 'play-video hide-video icon iconfont icon-play';

        }
        if (moveIsTrue) {
          IS_star(userData[this.page].id);
            document.getElementById('userBtn').querySelector('.img-user').querySelector('img').src = userData[this.page].imageUrl || '../image/suipai/bg.jpg';
            $api.text($api.dom($api.byId('likeBtn'), '.icon-number'),userData[this.page].star_sum);
            $api.text($api.dom($api.byId('shareBtn'), '.icon-number'),userData[this.page].share_sum);
            $api.text($api.dom($api.byId('commitBtn'), '.icon-number'),userData[this.page].comment_sum);
            $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'),'sold:'+0);
            setTimeout(function() {
                document.getElementById('userBtn').style.display = 'block';
                document.getElementById('likeBtn').style.display = 'block';
                document.getElementById('shareBtn').style.display = 'block';
                document.getElementById('commitBtn').style.display = 'block';
                document.getElementById('shopcartBtn').style.display = 'block';
                // document.getElementById('sellBtn').style.display = 'block';
            }, 500)
        }
      }
    });
    Slip(container, "x").slider().end(function() {
      if(moveIsTrue == true){
        return false;
      }
        if (this.orient.indexOf('right') != -1 && this.orient.indexOf('left') == -1 ) {
            LefePaneOpen();
        }
        if (this.orient.indexOf('left') != -1 && this.orient.indexOf('right') == -1) {
            RightPaneOpen()
        }
    });


}
function VideoPlaying(){
  if (document.getElementById(userData[page].id).paused) {
      document.getElementById(userData[page].id).play();
      document.getElementById(userData[page].id).muted = false;

      $api.removeCls(pages[page].querySelector('.play-video'), 'show-video');
      $api.addCls(pages[page].querySelector('.play-video'), 'hide-video');
  } else {
      document.getElementById(userData[page].id).pause();
      $api.removeCls(pages[page].querySelector('.play-video'), 'hide-video');
      $api.addCls(pages[page].querySelector('.play-video'), 'show-video');
  }
}
function LefePaneOpen() {
  if(paneName == ''){
  api.openFrame({
      name: 'leftPane',
      url: './menu.html',
      rect: {
          x: 0,
          y: 0,
          w: api.frameWidth * 0.5,
          h: 'auto'
      },
      // animation:{
      //   type:'movein',
      //   subType:'from_left',
      //   duration:300
      // },
      bounces: true,
      bgColor: 'rgba(0,0,0,0)',
      vScrollBarEnabled: true,
      hScrollBarEnabled: true
  });
  paneName = 'leftPane';
  document.body.className = '';
  // $api.addCls(document.body, 'leftPaneShow');
  $api.removeCls($api.byId('model-show'), 'aui-hide');
  document.getElementById('userBtn').style.display = 'none';
  document.getElementById('likeBtn').style.display = 'none';
  document.getElementById('shareBtn').style.display = 'none';
  document.getElementById('commitBtn').style.display = 'none';
  document.getElementById('shopcartBtn').style.display = 'none';
  // $api.addEvt($api.byId('model-show'), 'swipeleft', hideModel);
  api.addEventListener({
          name: 'swipeleft'
      }, function(ret, err) {
          hideModel()
          });
        }else{
          hideModel();
        }
}
function playingVideo() {
  if (document.getElementById(userData[this.page].id).paused) {
      document.getElementById(userData[this.page].id).play();
      document.getElementById(userData[this.page].id).muted = false;

      $api.removeCls(pages[this.page].querySelector('.play-video'), 'show-video');
      $api.addCls(pages[this.page].querySelector('.play-video'), 'hide-video');
  }
}
function RightPaneOpen() {
  if(paneName == ''){
    api.openFrame({
        name: 'rightPane',
        url: './shopCart.html',
        rect: {
            x: api.frameWidth * 0.3,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        // animation:{
        //   type:'movein',
        //   subType:'from_right',
        //   duration:300
        // },
        bounces: false,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: false,
        scrollEnabled:false,
        hScrollBarEnabled: false
    });
    paneName = 'rightPane';
    document.body.className = '';
    document.getElementById('userBtn').style.display = 'none';
    document.getElementById('likeBtn').style.display = 'none';
    document.getElementById('shareBtn').style.display = 'none';
    document.getElementById('commitBtn').style.display = 'none';
    document.getElementById('shopcartBtn').style.display = 'none';
    // $api.addCls(document.body, 'rightPaneShow');
    $api.removeCls($api.byId('model-show'), 'aui-hide');
    // $api.addEvt($api.byId('model-show'), 'swiperight', hideModel);
    api.addEventListener({
            name: 'swiperight'
        }, function(ret, err) {
            hideModel();
            });

  }else{
    hideModel();
  }
}
function addFlow(vl) {
  api.ajax({
      url: 'http://wstmart.anaf.cn/apihome/users/follow',
      method: 'post',
      data: {
          values: {
              id: vl
          },
      }
  },function(ret, err){
      if (ret) {
          alert( JSON.stringify( ret ) );
      } else {
          alert( JSON.stringify( err ) );
      }
  });

}
function hideCom() {

  api.closeFrame({
      name: 'comments'
  });
api.execScript({
    frameName: 'home',
    script: 'removeEl();'
});


}
function removeEl() {
  setTimeout(function() {
    $api.addCls($api.byId('com-show'),'aui-hide');
  },100)

}
function openCom(){
  playingVideo();
  $api.removeCls($api.byId('com-show'),'aui-hide');
  api.openFrame({
      name: 'comments',
      url:'./comments.html',
      animation:{
        type:"movein",                //动画类型（详见动画类型常量）
  subType:"from_bottom",       //动画子类型（详见动画子类型常量）
  duration:300                //动画过渡时间，默认300毫秒
      },
      rect: {
          y: api.frameHeight/2,
          x: 0,
          w: 'auto',
          h:'auto'
      },
      pageParam:{
        video:userData[page].id
      },
      bounces: false,
      bgColor: 'rgba(0,0,0,0.3)',
      vScrollBarEnabled: true,
      hScrollBarEnabled: true,
  });
api.addEventListener({
    name:'swipedown'
}, function(ret, err){
   hideCom();
   api.removeEventListener({
       name: 'swipedown'
   });
});

}
function remFlow(vl) {
  api.ajax({
      url: 'http://wstmart.anaf.cn/apihome/users/unfollow',
      method: 'post',
      data: {
          values: {
              id: vl
          },
      }
  },function(ret, err){
      if (ret) {
          alert( JSON.stringify( ret ) );
      } else {
          alert( JSON.stringify( err ) );
      }
  });
}
function heartLike(){
  add_star(userData[page].id);
}

function hideSell(){
$api.addCls($api.byId('sell-model-show'), 'aui-hide');
api.closeFrame({
    name: 'sellDtail'
});
stopMusic()
}
function onAddFL(d) {
  var el = d;
  if(!$api.hasCls($api.dom(el,'.add-user'), 'showSuccess')){
    addFlow($api.attr(el,'data-id'));
      $api.addCls($api.dom(el,'.add-user'), 'showPlish');
      setTimeout(function(){
      $api.removeCls($api.dom(el,'.add-user'),'showPlish');
        $api.css($api.dom(el, '.add-user'),'color:#000;background:#fff;');
      $api.addCls($api.dom(el,'.add-user'), 'showSuccess');
      setTimeout(function () {
          $api.removeAttr($api.dom(el, '.add-user'),'style');
        $api.attr($api.dom(el,'.add-user'), 'hidden','hidden');
      },500)
    },500)
  }

}
function  add_star(id) {
  api.ajax({
      url: 'http://wstmart.anaf.cn/apihome/video/star',
      method: 'get',
      data: {
          values: {
              video_id: id
          },
      }
  },function(ret, err){

      if (ret) {
        var el = $api.byId('likeBtn');
        if(ret.status == 1){
          $api.css($api.dom(el, '.icon-heart'),'color:red;');
          $api.text($api.dom(el, '.icon-number'),Number($api.text($api.dom(el, '.icon-number')))+1);
        }else if(ret.status == 0){
          $api.removeAttr($api.dom(el, '.icon-heart'),'style');
          $api.text($api.dom(el, '.icon-number'),Number($api.text($api.dom(el, '.icon-number')))-1);
        }else if(ret.status == -999) {
          api.openWin({
              name: 'login',
              url: './login_win.html',
          });
        }
      } else {
          alert( JSON.stringify( err ) );
      }
  });

}
function userVideo(footer_h,container,l) {

  api.ajax({
    url:'http://wstmart.anaf.cn/apihome/video/video_list',
    method:'get',
    data:{
      values:{
        'page':l+1
      }
    }
  },function (ret,err) {

    if(userData.length == 0){
      userData = ret.data.data;
      IS_star(userData[0].id)
      GetVideoList(userData, container, '.swipe', footer_h);
      $api.attr($api.dom($api.byId('userBtn'), 'img'),'src',userData[0].imgUrl||'../image/suipai/bg.jpg');
      $api.text($api.dom($api.byId('likeBtn'), '.icon-number'),userData[0].star_sum);
      $api.text($api.dom($api.byId('shareBtn'), '.icon-number'),userData[0].share_sum);
      $api.text($api.dom($api.byId('commitBtn'), '.icon-number'),userData[0].comment_sum);
      $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'),0);
      setTimeout(function(){
        document.getElementById(userData[0].id).play();
        document.getElementById(userData[0].id).muted = false;
        userData.map(function(v, i) {
            if (i != 0) {
                document.getElementById(v.id).play();
            }
        })
      },500)
  }
  else{
    var list = ret.data.data;
    if(list.length > 0){
      for(var i =0;i<list.length;i++){
      userData.push(list[i]);
      }
      Slip(container).destroy();
        GetVideoList(list, container, '.swipe', footer_h);
        IS_star(userData[page+1].id);
        $api.attr($api.dom($api.byId('userBtn'), 'img'),'src',userData[page+1].imgUrl||'../image/suipai/bg.jpg');
        $api.text($api.dom($api.byId('likeBtn'), '.icon-number'),userData[page+1].star_sum);
        $api.text($api.dom($api.byId('shareBtn'), '.icon-number'),userData[page+1].share_sum);
        $api.text($api.dom($api.byId('commitBtn'), '.icon-number'),userData[page+1].comment_sum);
        $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'),'sold:'+0);
      Slip.jump(page+1);
    }
    }

})

}
function openSell() {
  playingVideo();
    var detail = userData[page];
stopMusic()
    api.openFrame({
        name: 'sellDtail',
        url:'./addCartInfo.html',
        animation:{
          type:"movein",                //动画类型（详见动画类型常量）
    subType:"from_bottom",       //动画子类型（详见动画子类型常量）
    duration:300                //动画过渡时间，默认300毫秒
        },
        rect: {
            y: api.frameHeight*0.25,
            x: 0,
            w: 'auto',
            h:'auto'
        },
        pageParam: {
            details: detail,
            video: detail.video_url,
            img: detail.imageUrl,
            id: detail.id,
            timestart: document.getElementById(detail.id).currentTime,
            frameNames:api.frameName,
            "ids":'all'
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0.3)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true,
    });

  $api.removeCls($api.byId('sell-model-show'), 'aui-hide');

    setTimeout(function() {
      api.bringFrameToFront({
          from: 'sellDtail'
      });
    },1000)

}
function openMusic(){
  stopMusic()
}
function openShare() {
  playingVideo();
    var share = document.getElementById('share');
    if (share.style.display == 'none') {
        share.style.display = 'block';
    } else {
        share.style.display = 'none';
    }
}
function myInfoMes() {
    api.ajax({
            url: 'http://wstmart.anaf.cn/apihome/users/index',
            method: 'get',
        },
        function(ret, err) {
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
function shareTos(id) {
    debugger
    if(id == 'facebook'){
      var facebook = api.require('facebook');
      facebook.isInstalled(function(ret, err) {
    if (ret.installed) {
        alert("当前设备已安装facebook客户端");
    } else {
        alert('当前设备未安装facebook客户端');
    }
});
    facebook.shareLinked({
        url: 'http://www.apicloud.com/',
        imgUrl: 'http://p6.sinaimg.cn/2823006341/180/51101340154713',
        description: 'app 跨平台开发工具',
        title: 'APICloud',
        quote: 'very good'
    }, function(ret, err){
         if(ret.status) {
           api.alert({msg:JSON.stringify(ret)});
         } else {
            api.alert({msg:JSON.stringify(err)});
         }
   });
}else{
  document.getElementById(userData[page].id).pause();
  var mobSharePlus = api.require('mobSharePlus');
  mobSharePlus.shareTo({
      target: id,
      title: '北京新鲜事',
      titleUrl: 'https://www.apicloud.com',
      text: '这里是测试的内容',
      imgPaths: [userData[page].imageUrl],
      url: 'https://www.apicloud.com',
  }, function(ret, err) {
      if (ret.status) {
          api.alert({
              msg: JSON.stringify(ret)
          });
      }
  })
  document.getElementById(userData[page].id).play();
}

}

function stopMusic() {
    if (document.getElementById(userData[page].id).muted) {
        document.getElementById(userData[page].id).muted = false;
    } else {
        document.getElementById(userData[page].id).muted = true;
    }
}
function hideSelect() {
  $api.addCls($api.byId('search'), 'aui-hide');
  $api.removeCls($api.byId('aui-header'), 'aui-hide');
  $api.addCls($api.byId('select-show'), 'aui-hide');
}
function searchShow(el){
  $api.removeCls($api.byId('search'), 'aui-hide');
  $api.addCls($api.byId('aui-header'), 'aui-hide');
  $api.removeCls($api.byId('select-show'), 'aui-hide');
$api.addEvt($api.byId('search'), 'keydown', searchKeyDown);

}
function searchKeyDown(e){
  if(e.keyCode == "13"){
    hideSelect()
  }
}
function switchLoading(obj, url, text) {
    var frames = api.frames();
    var header = $api.byId('aui-header');
    var param = api.pageParam;
    var headerPos = $api.offset(header);
    var body_h = api.frameHeight;
    var footer_h = param.height;
    // var headerAct = $api.dom(header, '.aui-active');
    // console.log(JSON.stringify(headerAct.length))
    // $api.removeCls(headerAct, 'aui-active');
    // $api.addCls(obj, 'aui-active');
    if(api.frameName == 'home'){
      stopMusic()
    }else if(api.frameName == 'localList'){
      api.execScript({
    frameName: 'home',
    script: 'openMusic();'
});
    }

    for (var i = 0; i < frames.length; i++) {
        if (frames[i].name == text) {
            api.bringFrameToFront({
                from: text
            });
            return;
        }
    }
    api.openFrame({
        name: text,
        url: url,
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: body_h
        },
        pageParam: {
            top: headerPos.h,
            height: body_h - headerPos.h - footer_h,
            name: text,
            parentsname: api.pageParam.name
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });
    setTimeout(function() {
        var frames = api.frames();
        api.bringFrameToFront({
            from: text
        });

    }, 100)
}

function openCamera() {
    var param = {
        resolutionMode: 2,
        ratioMode: 1,
        recordMode: 3,
        beautyStatus: true,
        beautyLevel: 80,
        isCameraBack: false,
        isNeedClip: true,
        minDuration: 2,
        maxDuration: 30,
        videoQuality: 2,
        gop: 5,
        frameRate: 25
    };
    var demo = api.require('quPaiModule');
    demo.record(param, function(ret, err) {
        if (ret.status) {
            api.openWin({
                name: 'addmyinfo',
                url: './addMyimageInfo_win.html',
                pageParam: {
                    img: ret.thumbnailPath,
                    video: ret.videoPath
                }
            });

            ret.videoPath;
            ret.image_path;
        }
        if (err) {
            alert(err.msg);
        }
    });
}
