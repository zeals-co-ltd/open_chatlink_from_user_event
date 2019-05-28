var cookiesArray = document.cookie.split('; ');
console.log(cookiesArray);


const jsonParseCookieVal = cookieKey => {
  var cookieVal = decodeURIComponent(((document.cookie + ';').match(cookieKey + '=([^¥S;]*)') || [])[1])
  if (cookieVal == 'undefined') {
    return undefined;
  } else {
    return JSON.parse(cookieVal);
  }
}


//get condition for current page *************

// 特定のcookieのkeyからJSONをparseする
let jsonVal = jsonParseCookieVal('fanp_chatlink_conditions')
console.log(jsonVal);

var currentPath = location.pathname;

// forEeach がBreakできないそうなので someを使用
jsonVal.paterns.some(function (element) {
  var regex = new RegExp(element.path_regexp);
  var isCurrent = regex.test(currentPath);
  if (isCurrent) {
    currentChatlinks = element.page_chatlinks
    // パターンにマッチした瞬間にループ抜ける（本来の使い方とは若干ずれるらしい）
    // 他にも書き方あるので要検討
    return true;
  }
})

console.log(currentChatlinks);


//transition count func *************

var transitionVal = jsonParseCookieVal('transition_count');
var transitionCount = !transitionVal ? 0 : Number(transitionVal);

var currentHost = location.origin;
var referrerUrl = document.referrer;
var hostRegex = new RegExp('^' + currentHost);
isSameHost = hostRegex.test(referrerUrl);
if (isSameHost) {
  transitionCount += 1;
  document.cookie = `transition_count=${transitionCount}`;
  console.log('同じところで遷移');
} else {
  console.log('外部から遷移');
}

console.log('現在の遷移数', transitionCount)


// modal dom *************

var closeContentArr = [
  "<div class='fanp-modal-overLay fanp-modal-close'>",
  "モーダル",
  "</div>"
];
var modalTag = document.createElement('div');
modalTag.innerHTML = closeContentArr.join('');
modalTag.id = 'fanp-modal';


// open modal func *************

const statusCondProcessExec = isExeced => {
  isExeced ? console.log('もう実行できない') : console.log('まだ実行できる')
}

function openModal() {
  if (isCondProcessExec == true) {
    console.log('1度しか実行できません')
    return;
  }
  document.body.appendChild(modalTag);
  isCondProcessExec = true;
}

var refRegexConditionFunc = function (conditionVal) {
  console.log('refRegexです');
  var refRegex = new RegExp(conditionVal)
  var refUrl = document.referrer
  if (refRegex.test(refUrl)) {
    openModal();
  } else {
    console.log('パターンにマッチしませんでした')
  }
}
var waitForConditionFunc = function (conditionVal) {
  console.log('wait_for です');
  setTimeout(() => {
    openModal();
    statusCondProcessExec(isCondProcessExec);
  }, conditionVal * 1000);
}
var transitionCountConditionFunc = function (conditionVal) {
  console.log('transition_countです');
  if (transitionCount >= conditionVal) {
    openModal();
  }
}

var isCondProcessExec = false

var conditionProcess = function (condition) {
  switch (condition[0]) {
    case 'ref_regex':
      refRegexConditionFunc(condition[1]);
      break;
    case 'wait_for':
      waitForConditionFunc(condition[1]);
      break;
    case 'transition_count':
      transitionCountConditionFunc(condition[1]);
  }
}

if (!currentChatlinks.modal) {
  console.log('modal ないで！！！');
} else {
  conditionProcess(Object.entries(currentChatlinks.modal.conditions)[0])
}

statusCondProcessExec(isCondProcessExec)


// banner open func

// util? (ピクセルトラッキングのこと)
function appendImg(eventData) {
  var imgElement = document.createElement('img');
  imgElement.src = fanpLogUrl + createParamaters(eventData);
  imgElement.hidden = 'hidden';
  document.body.appendChild(imgElement);
}

// main
// var n = document.getElementById('fanp-tag-plugin');

currentURL = document.URL;
// chatLinkId = n.getAttribute('data-chat-link-id');

if (!currentChatlinks.banner) {
  console.log('banner ないで！！！');
} else {
  console.log('bannerあります');
  // 特定のHTML要素に img URLぶち込む
  fanpBannerImgTag = document.getElementById('fanp-banner-img-tag');
  fanpBannerImgTag.src = currentChatlinks.banner.img_url;
}