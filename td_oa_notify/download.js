;(function(){
  var url = "http://10.10.100.200";


  var $menuList = document.querySelectorAll('div.attach_div'),len,i;
  if($menuList&&(len=$menuList.length)>0){
    for(i= 0;i<len;i++){
      add_download_btn($menuList[i]);
    }
  }

  function add_download_btn($menu){
    var readBtnHtml = $menu.firstChild.outerHTML;
    var doc_url = readBtnHtml.match(/.*<a.*onclick=\"window.open\(\'\/module\/OC\/(.*).\'read.*/)[1];
    var $downloadBtn;
    if(doc_url){
      doc_url = url + '/inc/attach.php'+html_decode(doc_url);
      $downloadBtn =document.createElement('a');
      $downloadBtn.target='_blank';
      $downloadBtn.text = '超级下载';
      $downloadBtn.href =  doc_url;
      $menu.appendChild($downloadBtn);
    }
  }

  function html_encode(str)
  {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br/>");
    return s;
  }


  function html_decode(str)
  {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br\/>/g, "\n");
    return s;
  }
})();
