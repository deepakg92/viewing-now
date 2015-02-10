

url = ""

function getCurrentTabUrl() {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  var callback = function(result) {
    document.getElementById('log').innerHTML = result.response;
  };

  

  chrome.tabs.query(queryInfo, function(tabs) {

    var tab = tabs[0];
    var newURL = tab.url;
    $.get('http://nvaidya-ld1.linkedin.biz:5050/viewers?articleId='+newURL, callback)
    document.getElementById('url').innerHTML = newURL;
    if(url!=newURL) {
      var data = {articleId: url , viewerId:"satiwari"};
      $.post('http://nvaidya-ld1.linkedin.biz:5050/removeViewer', data, callback);
      url = newURL;
      var data = {articleId: newURL , viewerId:"satiwari"};
      $.post('http://nvaidya-ld1.linkedin.biz:5050/addViewer', data, callback);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var intervalID = setInterval(getCurrentTabUrl, 1000);
});

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};