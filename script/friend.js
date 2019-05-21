function getFriendList() {
  api.ajax({
    url:'http://wstmart.anhy.net/apihome/users/get_follonw',
    method:'get',
    data:{
      values:{
        is_friend:1
      }
    }
  },function(ret, err){
    console.log(JSON.stringify(ret));
    if(ret){
      if(ret.status == 1){
        AddList(ret.data);
      }
    }else{
      alert(JSON.stringify(err));
    }
  })
}
function openFriend() {
  api.openWin({
      name: 'firend_List',
      url: './add_friend_list.html',
  });

}
function AddList(list) {
  console.log(JSON.stringify(list));
  var html= '';
  list.map(function (el,index) {
    html+= '<li class="aui-list-item aui-list-item-middle">'+
        '<div class="aui-media-list-item-inner">'+
          '  <div class="aui-list-item-media" style="width: 3rem;height:3rem;">'+
            '    <img src="../image/suipai/bg.jpg" class="aui-img-round">'+
          '  </div>'+
          '  <div class="aui-list-item-inner">'+
              '  <div class="aui-list-item-text">'+
              '      <div class="aui-list-item-title aui-font-size-18 color-snow">'+el.nickname+'</div>'+
              '  </div>'+
              '  <div class="aui-btn aui-btn-danger" id="btn_right">关注</div>'+
              '  <div class="aui-list-item-text">'+
                    '通讯录好友 '+(el.phone||el.nickname)+''+
              '  </div>'+
                '<div class="aui-list-item-text">'+
                    '作品:'+(el.avatar||0)+' 粉丝:200'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</li>';
  })

  $api.append($api.dom($api.byId('ListFriends'),'ul'),html)
}
