
id = ""
url = ""

function getCurrentTabUrl() {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  var callbackLog = function(result) {
    document.getElementById('log').innerHTML = result.response;
  };

  var callbackUrl = function(result) {
    document.getElementById('url').innerHTML = result.response;
  };

  var callbackResult = function(result) {
    document.getElementById('result').innerHTML = 'Viewing now: ' + result.response;
  };
  

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var newURL = tab.url;
    $.get('http://dgopinat-ld1.linkedin.biz:5050/viewers?articleId='+newURL, callbackResult);      
    
    //document.getElementById('url').innerHTML = newURL;
    if(url!=newURL) {
      //document.getElementById('log').innerHTML = url;
      var data = {articleId: url , viewerId:id};
      $.post('http://dgopinat-ld1.linkedin.biz:5050/removeViewer', data);
      url = newURL;
      var data = {articleId: newURL , viewerId:id};
      $.post('http://dgopinat-ld1.linkedin.biz:5050/addViewer', data);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var intervalID = setInterval(getCurrentTabUrl, 100);
  id = makeid();
});

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = makeid();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
    function useToken(userid) {
        return userid;
    }
});

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};