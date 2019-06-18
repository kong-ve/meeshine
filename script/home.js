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

function IS_star(videoId) {
    api.ajax({
        url: 'http://mv.anhy.net/api.php?_d=VideoStar',
        method: 'get',
        data: {
            values: {
                video_id: videoId
            },
        },
        headers: {
            'Content-Type': 'application/json',
            // "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOjJlZWJjZDljNGZhOWU4MzZmZjJmZWM1ZDdkZDBmMzlj",
        },
    }, function(ret, err) {

        if (ret) {
            var el = $api.byId('likeBtn');
            if (ret.status == 1) {
                $api.css($api.dom(el, '.icon-heart'), 'color:red;');
            } else {
                $api.removeAttr($api.dom(el, '.icon-heart'), 'style');
            }
        } else {
            // console.log(JSON.stringify(err));
        }
    });

}

function hideModel() {
    var el = $api.byId('model-aui');
    if (paneName != '') {
        api.closeFrame({
            name: paneName
        });
        // $api.removeCls(document.body, paneName+'Show');
        // $api.addCls(document.body, paneName+'Hide');
        setTimeout(function() {
            $api.addCls($api.byId('model-show'), 'aui-hide');
            paneName = '';
            document.getElementById('userBtn').style.display = 'block';
            document.getElementById('likeBtn').style.display = 'block';
            document.getElementById('shareBtn').style.display = 'block';
            document.getElementById('commitBtn').style.display = 'block';
            document.getElementById('shopcartBtn').style.display = 'block';
        }, 100)

        // document.getElementById('sellBtn').style.display = 'block';
    }
}

function searchForm() {
    var val = $api.val($api.byId('search-input'));
    selectVideo(val);
}

function selectVideo(str_sel) {
    api.ajax({
        url: 'http://mv.anhy.net/apihome/video/video_list',
        method: 'post',
        data: {
            values: {
                str: str_sel,
                search_type: 0
            },
        },
        headers: {
            'Content-Type': 'application/json',
            // "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOjJlZWJjZDljNGZhOWU4MzZmZjJmZWM1ZDdkZDBmMzlj",
        },
    }, function(ret, err) {
        if (ret) {
            // alert(JSON.stringify(ret));
            stopMusic();
            hideSelect();
            api.openWin({
                name: 'productList_win',
                url: './productList_win.html',
                pageParam: {
                    dataList: ret.data
                }
            });

        } else {
            alert(JSON.stringify(err));
        }
    });

}

function GetVideoList(List, container, swipe, foot_h,destroy) {

    List.map(function(v, i) {

        var el = document.createElement('div');
        var el_child = document.createElement('video');

        el.className = 'swipe-box';
        el_child.src = v.goods_video_url;
        el_child.id = v.id;
        el_child.poster = v.imageUrl || 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/bc281dfcaf750de7acd9c8e9224e237b.png';
        el_child.autoplay = true;
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
        user_name.innerText = v.nickname || '用户' + v.number;
        div_text.appendChild(user_name);
        var text_span = document.createElement('span');
        text_span.className = "ui-text";
        text_span.style.cssVal = "display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden;";
        text_span.innerText = v.content || '暂无介绍';
        div_text.appendChild(text_span);
        if (api.safeArea.top != 44) {
            div_text.style.bottom = (foot_h + 40) + 'px';
        } else {
            div_text.style.bottom = (foot_h + 10) + 'px';
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
        if(destroy){
        document.querySelector(container).querySelector('.swipe').appendChild(el);
      }else{
        container.querySelector(swipe).appendChild(el);
      }
    })

    pages = document.querySelectorAll('.swipe-box');
    console.warn(pages.length);

    if(!destroy){
    slip = Slip(container, 'y').webapp(pages).start(function(event) {
        page = this.page;
        // 事件对象
        moveIsTrue = false;
        // 当前坐标值

    }).move(function(event) {
        moveIsTrue = true;
        document.getElementById('userBtn').style.display = 'none';
        $api.removeCls($api.dom(document.getElementById('userBtn'), '.add-user'), 'showSuccess')
        $api.removeAttr($api.dom(document.getElementById('userBtn'), '.add-user'), 'hidden')
        document.getElementById('likeBtn').style.display = 'none';
        $api.removeAttr($api.dom(document.getElementById('likeBtn'), '.icon-heart'), 'style');
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
          console.log(JSON.stringify(this))
            if (this.page   == (this.pageNum-1) && moveIsTrue) {
                p++;
                userVideo(api.pageParam.foot, $api.byId('container'), p);
                console.log('userVideo')
            } else {
                $api.byId(userData[page].id).pause();
                page = this.page;

                if (document.getElementById(userData[this.page].id).muted == true) {
                    document.getElementById(userData[this.page].id).currentTime = 0;
                    document.getElementById(userData[this.page].id).muted = false;
                }
                $api.byId(userData[this.page].id).play();
                pages[this.page].querySelector('.play-video').className = 'play-video hide-video icon iconfont icon-play';

            }
            if (moveIsTrue && (page + 1) == userData.length) {
                IS_star(userData[this.page].id);
                document.getElementById('userBtn').querySelector('.img-user').querySelector('img').src = userData[this.page].imageUrl || '../image/suipai/bg.jpg';
                $api.text($api.dom($api.byId('likeBtn'), '.icon-number'), userData[this.page].star_sum);
                $api.text($api.dom($api.byId('shareBtn'), '.icon-number'), userData[this.page].share_sum);
                $api.text($api.dom($api.byId('commitBtn'), '.icon-number'), userData[this.page].comment_sum);
                $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'), 'sold:' + 0);

            }

        }
        setTimeout(function() {
            document.getElementById('userBtn').style.display = 'block';
            document.getElementById('likeBtn').style.display = 'block';
            document.getElementById('shareBtn').style.display = 'block';
            document.getElementById('commitBtn').style.display = 'block';
            document.getElementById('shopcartBtn').style.display = 'block';
            // document.getElementById('sellBtn').style.display = 'block';
        }, 500)
    });
    Slip(container, "x").slider().end(function() {
        if (moveIsTrue == true) {
            return false;
        }
        if (this.orient.indexOf('right') != -1 && this.orient.indexOf('left') == -1) {
            LefePaneOpen();
        }
        if (this.orient.indexOf('left') != -1 && this.orient.indexOf('right') == -1) {
            RightPaneOpen()
        }
    });
  }else{
    console.log('start')
    slip.destroy();
    slip = Slip(document.querySelector(container), 'y').webapp(pages).start(function(event) {
        page = this.page;
        // 事件对象
        moveIsTrue = false;
        // 当前坐标值
    }).move(function(event) {
        moveIsTrue = true;
        document.getElementById('userBtn').style.display = 'none';
        $api.removeCls($api.dom(document.getElementById('userBtn'), '.add-user'), 'showSuccess')
        $api.removeAttr($api.dom(document.getElementById('userBtn'), '.add-user'), 'hidden')
        document.getElementById('likeBtn').style.display = 'none';
        $api.removeAttr($api.dom(document.getElementById('likeBtn'), '.icon-heart'), 'style');
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
          console.log(JSON.stringify(this))
            if (this.page  == (this.pageNum-1) && moveIsTrue) {
                p++;
                userVideo(api.pageParam.foot, $api.byId('slip'), p);
                console.log('add')
            } else {
                $api.byId(userData[page].id).pause();
                page = this.page;

                if (document.getElementById(userData[this.page].id).muted == true) {
                    document.getElementById(userData[this.page].id).currentTime = 0;
                    document.getElementById(userData[this.page].id).muted = false;
                }
                $api.byId(userData[this.page].id).play();
                pages[this.page].querySelector('.play-video').className = 'play-video hide-video icon iconfont icon-play';

            }
            if (moveIsTrue && (page + 1) == userData.length) {
                IS_star(userData[this.page].id);
                document.getElementById('userBtn').querySelector('.img-user').querySelector('img').src = userData[this.page].imageUrl || '../image/suipai/bg.jpg';
                $api.text($api.dom($api.byId('likeBtn'), '.icon-number'), userData[this.page].star_sum);
                $api.text($api.dom($api.byId('shareBtn'), '.icon-number'), userData[this.page].share_sum);
                $api.text($api.dom($api.byId('commitBtn'), '.icon-number'), userData[this.page].comment_sum);
                $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'), 'sold:' + 0);

            }

        }
        setTimeout(function() {
            document.getElementById('userBtn').style.display = 'block';
            document.getElementById('likeBtn').style.display = 'block';
            document.getElementById('shareBtn').style.display = 'block';
            document.getElementById('commitBtn').style.display = 'block';
            document.getElementById('shopcartBtn').style.display = 'block';
            // document.getElementById('sellBtn').style.display = 'block';
        }, 500)
    });
    Slip(document.querySelector(container), "x").slider().end(function() {
        if (moveIsTrue == true) {
            return false;
        }
        if (this.orient.indexOf('right') != -1 && this.orient.indexOf('left') == -1) {
            LefePaneOpen();
        }
        if (this.orient.indexOf('left') != -1 && this.orient.indexOf('right') == -1) {
            RightPaneOpen()
        }
    });

  }
    toast.hide();
}

function VideoPlaying() {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
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
    if (paneName == '') {
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
    } else {
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
    if (paneName == '') {
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
            scrollEnabled: false,
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

    } else {
        hideModel();
    }
}

function addFlow(vl, el) {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    api.ajax({
        url: 'http://mv.anhy.net/api.php?_d=VideoStar',
        method: 'post',
        data: {
            values: {
                id: vl
            },
        },
        headers: {
            'Content-Type': 'application/json',
            // "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOjJlZWJjZDljNGZhOWU4MzZmZjJmZWM1ZDdkZDBmMzlj",
        },
    }, function(ret, err) {
        if (ret) {
            alert(JSON.stringify(ret));
            if (ret.status == 1) {
                $api.addCls($api.dom(el, '.add-user'), 'showPlish');
                setTimeout(function() {
                    $api.removeCls($api.dom(el, '.add-user'), 'showPlish');
                    $api.css($api.dom(el, '.add-user'), 'color:#000;background:#fff;');
                    $api.addCls($api.dom(el, '.add-user'), 'showSuccess');
                    setTimeout(function() {
                        $api.removeAttr($api.dom(el, '.add-user'), 'style');
                        $api.attr($api.dom(el, '.add-user'), 'hidden', 'hidden');
                    }, 500)
                }, 500)
            } else if (ret.status == -999) {
                api.openWin({
                    name: 'login',
                    url: './login_win.html',
                });

            }
        } else {
            alert(JSON.stringify(err));
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
        $api.addCls($api.byId('com-show'), 'aui-hide');
    }, 100)

}

function openCom() {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    playingVideo();
    $api.removeCls($api.byId('com-show'), 'aui-hide');
    api.openFrame({
        name: 'comments',
        url: './comments.html',
        animation: {
            type: "movein", //动画类型（详见动画类型常量）
            subType: "from_bottom", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        rect: {
            y: api.frameHeight / 2,
            x: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
            video: userData[page].id
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0.3)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true,
    });
    api.addEventListener({
        name: 'swipedown'
    }, function(ret, err) {
        hideCom();
        api.removeEventListener({
            name: 'swipedown'
        });
    });

}

function remFlow(vl) {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    api.ajax({
        url: 'http://mv.anhy.net/api.php?_d=follow',
        method: 'post',
        data: {
            values: {
                id: vl
            },
        },
        headers: {
            'Content-Type': 'application/json',
            // "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOjJlZWJjZDljNGZhOWU4MzZmZjJmZWM1ZDdkZDBmMzlj",
        },
    }, function(ret, err) {
        if (ret) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function heartLike() {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    add_star(userData[page].id);
}

function hideSell() {
    $api.addCls($api.byId('sell-model-show'), 'aui-hide');
    api.closeFrame({
        name: 'sellDtail'
    });
    stopMusic()
}

function onAddFL(d) {
    var el = d;
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    if (!$api.hasCls($api.dom(el, '.add-user'), 'showSuccess')) {
        addFlow($api.attr(el, 'data-id'), el);

    }

}

function add_star(id) {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    var el = document.getElementById('likeBtn');
    var urls = 'http://mv.anhy.net/api.php?_d=VideoStar';
    var type = 'post';
    if ($api.dom(el, '.icon-heart').style.color == 'red') {
        urls = 'http://mv.anhy.net/api.php?_d=VideoStar/11';
        type = 'delete';
    }
    console.log('add_star');
    api.ajax({
        url: urls,
        method: type,
        data: {
            body: JSON.stringify({
                video_id: id
            }),
        },
        headers: {
            'Content-Type': 'application/json',
            // "Authorization":"Basic YWRtaW5AYWRtaW4uY29tOjJlZWJjZDljNGZhOWU4MzZmZjJmZWM1ZDdkZDBmMzlj",
        },
    }, function(ret, err) {
        console.log(JSON.stringify(ret))
        console.error(JSON.stringify(err))
        if (ret) {

            if ($api.dom(el, '.icon-heart').style.color != 'red') {
                $api.css($api.dom(el, '.icon-heart'), 'color:red;');
                $api.text($api.dom(el, '.icon-number'), Number($api.text($api.dom(el, '.icon-number'))) + 1);
            } else {
                $api.removeAttr($api.dom(el, '.icon-heart'), 'style');
                $api.text($api.dom(el, '.icon-number'), Number($api.text($api.dom(el, '.icon-number'))) - 1);
            }
        } else {
            api.openWin({
                name: 'login',
                url: './login_win.html',
            });
            // alert(JSON.stringify(err));
        }
    });

}

function userVideo(footer_h, container, l) {
  // console.log(l)
  toast.loading({
    title:"加载中",
    duration:2000
})
    api.ajax({
        url: 'http://mv.anhy.net/api.php?_d=VideoContent&page=' + (l + 1),
        method: 'get',
    }, function(ret, err) {
        // alert(JSON.stringify(ret));
        if (err || ret.length < 1) {

            if (userData[0]) {
                // alert(JSON.stringify(ret));

                var list = [{
                    nickname: 1,
                    number: Math.random()*50000,
                    id: new Date().getTime() + 6,
                    imageUrl: '',
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,

                    goods_video_url: 'http://www.verzweiflung.cn/1.mp4',
                }];
                    for (var i = 0; i < list.length; i++) {
                        userData.push(list[i]);
                    }
                    console.log('add');
                    GetVideoList(list, '#slip', '.swipe', footer_h,true);
                    $api.attr($api.dom($api.byId('userBtn'), 'img'), 'src', userData[page + 1].imgUrl || '../image/suipai/bg.jpg');
                    $api.text($api.dom($api.byId('likeBtn'), '.icon-number'), userData[page + 1].star_sum);
                    $api.text($api.dom($api.byId('shareBtn'), '.icon-number'), userData[page + 1].share_sum);
                    $api.text($api.dom($api.byId('commitBtn'), '.icon-number'), userData[page + 1].comment_sum);
                    $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'), 'sold:' + 0);
                      document.getElementById(list[0].id).play();
                    slip.jump(page+1);
                    page = page+1;

            } else {
                userData = [{
                    nickname: 1,
                    number: 1598531459891,
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,
                    id: new Date().getTime() + 1,
                    imageUrl: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/bc281dfcaf750de7acd9c8e9224e237b.png',
                    goods_video_url: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/abb9595e74647defe21d748e12f7a7c9.mp4',
                }, {
                    nickname: 1,
                    number: 1598531459895,
                    id: new Date().getTime() + 2,
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,
                    imageUrl: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/1a73dd6a90a52b2aad1aafefbf977e4c.png',
                    goods_video_url: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/00b2141bff87cfaa75498f66214aeb9e.mp4',
                }, {
                    nickname: 1,
                    number: 1598531459896,
                    id: new Date().getTime(),
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,
                    imageUrl: 'http://www.verzweiflung.cn/2.mp4',
                    goods_video_url: 'http://www.verzweiflung.cn/2.mp4',
                }, {
                    nickname: 1,
                    number: 1598531459897,
                    id: new Date().getTime() + 3,
                    imageUrl: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/ec65083dbdc6bb18a6318591ac6c15a5.png',
                    goods_video_url: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/9d9906ba474152307d7edca6bd72fbe2.mp4',
                }, {
                    nickname: 1,
                    number: 1598531459898,
                    id: new Date().getTime() + 4,
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,
                    imageUrl: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/51fc1ddde9790c96a6986b74342a15e3.png',
                    videoUrl: 'http://7z2dc9.com1.z0.glb.clouddn.com/apicloud/dc811d2c4d88b409063c7ea2065fe6a0.mp4',
                }, {
                    nickname: 1,
                    number: 1598531459899,
                    id: new Date().getTime() + 5,
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,
                    imageUrl: 'http://www.verzweiflung.cn/3.mp4',
                    goods_video_url: 'http://www.verzweiflung.cn/3.mp4',
                }, {
                    nickname: 1,
                    number: 1598531459894,
                    id: new Date().getTime() + 6,
                    imageUrl: '',
                    star_sum: 0,
                    share_sum: 0,
                    comment_sum: 0,

                    goods_video_url: 'http://www.verzweiflung.cn/1.mp4',
                }];
                GetVideoList(userData, container, '.swipe', footer_h);
                $api.attr($api.dom(document.getElementById('userBtn'), 'img'), 'src', userData[0].imgUrl || '../image/suipai/bg.jpg');
                $api.text($api.dom(document.getElementById('likeBtn'), '.icon-number'), userData[0].star_sum);
                $api.text($api.dom(document.getElementById('shareBtn'), '.icon-number'), userData[0].share_sum);
                $api.text($api.dom(document.getElementById('commitBtn'), '.icon-number'), userData[0].comment_sum);
                $api.text($api.dom(document.getElementById('shopcartBtn'), '.icon-number'), 0);
                document.getElementById(userData[0].id).muted = false;
            }
            return;
        } else {

            if (userData.length == 0) {
                userData = ret;
                IS_star(userData[0].id)
                GetVideoList(userData, container, '.swipe', footer_h);
                $api.attr($api.dom(document.getElementById('userBtn'), 'img'), 'src', userData[0].imgUrl || '../image/suipai/bg.jpg');
                $api.text($api.dom(document.getElementById('likeBtn'), '.icon-number'), userData[0].star_sum);
                $api.text($api.dom(document.getElementById('shareBtn'), '.icon-number'), userData[0].share_sum);
                $api.text($api.dom(document.getElementById('commitBtn'), '.icon-number'), userData[0].comment_sum);
                $api.text($api.dom(document.getElementById('shopcartBtn'), '.icon-number'), 0);
                document.getElementById(userData[0].id).muted = false;
            } else {
                var list = ret;
                if (list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        userData.push(list[i]);
                    }

                    Slip(container).destroy();
                    GetVideoList(list, container, '.swipe', footer_h);
                    IS_star(userData[page + 1].id);
                    $api.attr($api.dom($api.byId('userBtn'), 'img'), 'src', userData[page + 1].imgUrl || '../image/suipai/bg.jpg');
                    $api.text($api.dom($api.byId('likeBtn'), '.icon-number'), userData[page + 1].star_sum);
                    $api.text($api.dom($api.byId('shareBtn'), '.icon-number'), userData[page + 1].share_sum);
                    $api.text($api.dom($api.byId('commitBtn'), '.icon-number'), userData[page + 1].comment_sum);
                    $api.text($api.dom($api.byId('shopcartBtn'), '.icon-number'), 'sold:' + 0);


                }
            }
        }
    })

}

function openSell() {
    var l = {};
    if (userData.length > 0) {
        var detail = userData[page];
        l = {
            details: detail,
            video: detail.video_url,
            img: detail.imageUrl,
            id: detail.id,
            timestart: document.getElementById(detail.id).currentTime,
            frameNames: api.frameName,
            "ids": 'all'
        }
        playingVideo();
        stopMusic()
    } else {
        l = {
            "ids": 'all'
        }
    }

    api.openFrame({
        name: 'sellDtail',
        url: './addCartInfo.html',
        animation: {
            type: "movein", //动画类型（详见动画类型常量）
            subType: "from_bottom", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        rect: {
            y: api.frameHeight * 0.25,
            x: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: l,
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
    }, 1000)

}

function openMusic() {
    stopMusic()
}

function openShare() {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
    playingVideo();
    var share = document.getElementById('share');
    if (share.style.display == 'none') {
        share.style.display = 'block';
    } else {
        share.style.display = 'none';
    }
}

function myInfoMes() {
    var a =
        api.ajax({
                url: 'http://mv.anhy.net/api.php?_d=userstate',
                method: 'get',
            },
            function(ret, err) {
                if (ret) {
                    var list = ret;
                    localStorage.setItem('userMesg', JSON.stringify(ret));

                } else {
                    localStorage.setItem('userMesg', '');

                }
            })
}

function shareTos(id) {
    switch (id) {
        case 'facebook':
            var facebook = api.require('facebook');
            facebook.shareLinked({
                url: "" + userData[page].goods_video_url + "",
                imgUrl: "" + userData[page].goods_video_url + "",
                description: 'app 跨平台开发工具',
                title: 'APICloud',
                quote: 'very good'
            }, function(ret, err) {
                if (ret.status) {
                    api.alert({
                        msg: JSON.stringify(ret)
                    });
                } else {
                    api.alert({
                        msg: JSON.stringify(err)
                    });
                }
            });
            break;
        case 'googlePlus':
            var shareApi = api.require('ShareSDKPlus');
            var shareParams = {
                "text": "测试的文字",
                "imageUrl": "http://download.sdk.mob.com/206/4f8/dfc9ea27dd8bc4abfec865c38d/800_450_156.2.jpg",
                "title": "测试的标题",
                "titleUrl": "http://www.mob.com",
                "description": "测试的描述",
                "site": "ShareSDK",
                "siteUrl": "http://www.mob.com",
                "type": $sharesdk.ContentType.Auto
            };

            shareApi.shareContent({
                "platform": $sharesdk.PlatformID.GooglePlus,
                "shareParams": shareParams
            }, function(ret, err) {
                var state = ret.state;
                switch (state) {
                    case $sharesdk.ResponseState.Success:
                        api.toast({
                            msg: "分享成功",
                            location: 'middle'
                        });
                        break;
                    case $sharesdk.ResponseState.Fail:
                        api.toast({
                            msg: "分享失败",
                            location: 'middle'
                        });
                        break;
                    case $sharesdk.ResponseState.Cancel:
                        api.toast({
                            msg: "取消分享",
                            location: 'middle'
                        });
                        break;
                    default:
                }
            });
            break;
    }

}

function stopMusic() {
    if (userData.length < 1) {
        console.log('err');
        return;
    }
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

function searchShow(el) {
    $api.removeCls($api.byId('search'), 'aui-hide');
    $api.addCls($api.byId('aui-header'), 'aui-hide');
    $api.removeCls($api.byId('select-show'), 'aui-hide');
    // $api.addEvt($api.byId('search'), 'keydown', searchKeyDown);

}

function searchKeyDown(e) {
    if (e.keyCode == "13") {
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
    if (api.frameName == 'home') {
        stopMusic()
    } else if (api.frameName == 'localList') {
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

function select_product() {
    var productList = $api.byId('selectProduct');
    var html = '<section class="aui-content aui-padded-l-5 aui-padded-r-10 aui-padded-t-5">' +
        '<div class="aui-row aui-row-padded" >' +
        '<div class="aui-col-xs-6" onclick="openSell(\'all\')">' +
        '<div class="aui-card-list">' +
        '<div class="aui-card-list-content">' +
        '<img src="../image/demo1.png">' +
        '</div>' +
        '<div class="aui-card-list-header aui-font-size-14">APICloud AUI前端框架</div>' +
        '</div>' +
        '</div>' +
        '<div class="aui-col-xs-6" onclick="openSell(\'all\')">' +
        '<div class="aui-card-list">' +
        '<div class="aui-card-list-content">' +
        '<img src="../image/demo1.png">' +
        '</div>' +
        '<div class="aui-card-list-header aui-font-size-14">APICloud AUI前端框架</div>' +
        '</div>' +
        '</div>' +
        '<div class="aui-col-xs-6" onclick="openSell(\'all\')">' +
        '<div class="aui-card-list">' +
        '<div class="aui-card-list-content">' +
        '<img src="../image/demo1.png">' +
        '</div>' +
        '<div class="aui-card-list-header aui-font-size-14">APICloud AUI前端框架</div>' +
        '</div>' +
        '</div>' +
        '<div class="aui-col-xs-6" onclick="openSell(\'all\')">' +
        '<div class="aui-card-list">' +
        '<div class="aui-card-list-content">' +
        '<img src="../image/demo1.png">' +
        '</div>' +
        '<div class="aui-card-list-header aui-font-size-14">APICloud AUI前端框架</div>' +
        '</div>' +
        '</div>' +
        '<div class="aui-col-xs-6" onclick="openSell(\'all\')">' +
        '<div class="aui-card-list">' +
        '<div class="aui-card-list-content">' +
        '<img src="../image/demo1.png">' +
        '</div>' +
        '<div class="aui-card-list-header aui-font-size-14">APICloud AUI前端框架</div>' +
        '</div>' +
        '</div>' +
        '<div class="aui-col-xs-6" onclick="openSell(\'all\')">' +
        '<div class="aui-card-list">' +
        '<div class="aui-card-list-content">' +
        '<img src="../image/demo1.png">' +
        '</div>' +
        '<div class="aui-card-list-header aui-font-size-14">APICloud AUI前端框架</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';
    $api.append(productList, html);
    $api.removeCls(document.getElementById('product-show'), 'aui-hide');
    $api.removeCls(productList, 'aui-hide');
}

function hideproduct() {
    $api.addCls(document.getElementById('product-show'), 'aui-hide');
    $api.removeCls($api.byId('selectProduct'), 'aui-hide');
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
