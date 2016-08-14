
(function(){
  var url = "http://10.10.100.200",
      smsArray;

  function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        callback&&callback(xhr.responseText);
      }
    }
    xhr.send();
  }

  function login(){
    var username = "";
    var passwd = btoa("1111");
    httpRequest(url + '/logincheck.php?UNAME='+username+'&PASSWORD='+passwd,function(text){
      alert(text);
    })
  }

  function show_notify(sms){
    var options = {
        'type':'basic',
        'iconUrl':'images/48.png',
        'requireInteraction':true,
        'title':sms.from_name,
        'message':sms.content
      };
    chrome.notifications.update(sms.sms_id,options,function(wasUpdated){
      if(!wasUpdated){
        chrome.notifications.create(sms.sms_id,options);
      }
    })
  }
  function notify() {
    httpRequest(url + '/general/status_bar/get_noc.php',function(text){
      var len;
      try{
        smsArray = JSON.parse(decodeURIComponent(text));
        if(smsArray&&(len=smsArray.length)>0){
          for(i=0;i<len;i++){
            show_notify(smsArray[i]);
          }
        }
        setTimeout(notify,1000*5);

      }catch(err){
        alert("请登陆通达OA");
        check_login_page();
        setTimeout(notify,1000*60);
      }
    })
  }

  function check_login_page(){
    chrome.tabs.query({url:url+'/'},function(pages){
      if(!pages||pages.length<=0){
        window.open(url);
      }
    });
  }
  function get_sms(id){
    var i = 0,sms,len = smsArray.length||0;
    for(i=0;i<len;i++){
     sms =  smsArray[i];
      if(sms.sms_id===id){
        return sms;
      }
    }
  }

  chrome.notifications.onClicked.addListener(function(id){
    var sms = get_sms(id);
    sms&&window.open(url+sms.url)
    httpRequest(url+"/general/status_bar/sms_submit.php?SMS_ID="+id);
    chrome.notifications.clear(id);
  })

  // login();
  setTimeout(notify,5000);

})();



