function MyInfo() {
  var data =  JSON.parse(api.getGlobalData({key: 'userMesg'}));
  var list = data;
  for (var key in list) {
      if (list[key]) {
          if (key == 'sex') {
              var sex = '保密';
              switch (list[key]) {
                  case 1:
                      sex = '男';
                      break;
                  case 2:
                      sex = '女';
                      break;
              }
              $api.text($api.byId(key), sex);
          } else {
            if(document.getElementById(key))
              $api.text($api.byId(key), list[key]);
          }
      }
  }
}
function openSexList() {
  api.actionSheet({
    // cancelTitle: '这里是取消按钮',
    buttons: ['保密', '男', '女']
}, function(ret, err) {
  console.log(JSON.stringify(ret));
    var index = ret.buttonIndex;
    if(index == 4){
      return false;
    }
    var id = index-1;
    api.ajax({
        url: 'http://wstmart.anhy.net/apihome/users/edit',
        method: 'post',
        data: {
            values: {
                sex: index
            },
        }
    },function(ret, err){
        if (ret) {
            alert( JSON.stringify( ret ) );
        } else {
            alert( JSON.stringify( err ) );
        }
    });

});
}
function openDate() {
  var age = Number($api.text($api.byId('age')));
var text = new Date();
var ageyear = (text.getFullYear()-age)+'-'+(text.getMonth()+1)+'-'+(text.getDate()>10?text.getDate():'0'+text.getDate());
console.log(text.getFullYear()+'-'+(text.getMonth()+1)+'-'+(text.getDate()>10?text.getDate():'0'+text.getDate()))
var dat = text.getFullYear()+'-'+(text.getMonth()+1)+'-'+(text.getDate()>10?text.getDate():'0'+text.getDate());
api.openPicker({
    type: 'date',
    date:ageyear,
    maxDate:dat,
    title: '出生日期'
}, function(ret, err) {
    if (ret) {
        alert(JSON.stringify(ret));
    } else {
        alert(JSON.stringify(err));
    }
});
}
function openEdit(type,title) {
  var tx = $api.text($api.byId(type));
  api.openWin({
      name: 'editMes',
      url: './editForm.html',
      pageParam: {
          name: type,
          val:tx,
          titles:title
      }
  });

}
function openArea() {
    var UIActionSelector = api.require('UIActionSelector');
    UIActionSelector.open({
        datas: 'widget://res/city.json',
        layout: {
            row: 5,
            col: 3,
            height: 30,
            size: 12,
            sizeActive: 14,
            rowSpacing: 5,
            colSpacing: 10,
            maskBg: 'rgba(0,0,0,0.2)',
            bg: '#fff',
            color: '#888',
            colorActive: '#f00',
            colorSelected: '#f00'
        },
        animation: true,
        cancel: {
            text: '取消',
            size: 12,
            w: 90,
            h: 35,
            bg: '#fff',
            bgActive: '#ccc',
            color: '#888',
            colorActive: '#fff'
        },
        ok: {
            text: '确定',
            size: 12,
            w: 90,
            h: 35,
            bg: '#fff',
            bgActive: '#ccc',
            color: '#888',
            colorActive: '#fff'
        },
        title: {
            text: '请选择',
            size: 12,
            h: 44,
            bg: '#eee',
            color: '#888'
        },
        fixedOn: api.frameName
    }, function(ret, err) {
        if (ret) {
            alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}

function saveImg() {
  FNImageClip.save({
    destPath: 'fs://image/bg-pic.jpg',
    copyToAlbum: false,
    quality: 1
}, function(ret, err) {
    if (ret) {
        console.log(JSON.stringify(api.fsDir + '/' + 'image/bg-pic.jpg'));
        $api.dom('.imgLogo').src = '';
          $api.dom('.imgLogo').src = api.fsDir + '/' + 'image/bg-pic.jpg'
        FNImageClip.close();
    } else {
        alert(JSON.stringify(err));
    }
  })
}
function LogoClip() {

    api.actionSheet({
    cancelTitle: '取消',
    buttons: ['相机', '图片']
    }, function(ret, err) {
      console.log(JSON.stringify(ret))
        var index = ret.buttonIndex == 1 ? 'camera' : 'album';
        api.getPicture({
            sourceType: index,
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'url',
            allowEdit: true,
            quality: 100,
            // targetWidth: 100,
            // targetHeight: 100,
            saveToPhotoAlbum: false
        }, function(ret, err) {
            // console.warn(JSON.stringify(ret));
            if (ret) {
              api.execScript({
                  name: 'EditInfo',
                  script: 'saveImg();'
              });

                FNImageClip.open({
                    rect: {
                        x: 0,
                        y: 0,
                        w: api.winWidth,
                        h: api.winHeight*0.7
                    },
                    srcPath: ret.data,
                    isMinWidth: true,
                    isMinHeight: true,
                    highDefinition:false,
                    style: {
                        mask: 'rgba(0,0,0,0.5)',
                        clip: {
                            w: 80,
                            h: 80,
                            x: api.winWidth / 2,
                            y: api.winHeight / 2,
                            borderColor: '#0f0',
                            borderWidth: 1,
                            appearance: 'circular'
                        }
                    },
                    mode: 'clip',
                    fixedOn: api.frameName
                }, function(ret, err) {
                    if (ret) {
                        console.log(JSON.stringify(ret));
                    } else {
                        console.error(JSON.stringify(err));
                    }
                });
            } else {
                console.error(JSON.stringify(err));
            }
        });
    });


}
