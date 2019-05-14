import _ from 'lodash';
const I18N = {
    en: require('./lang-en.js'),
    zh: require('./lang-zh.js'),
};

let cursor = '';
let isLoading = true;
let LANG = 'zh';
const limit = 21;

function changeLang(lang) {
    document.querySelector('.title').innerHTML = I18N[lang].TITLE;
    document.querySelector('.container').innerHTML = '';
    cursor = '';
    LANG = lang;
    addData(lang);
}

document.addEventListener('DOMContentLoaded', function(){
    addData(LANG);

    let timer;

    window.addEventListener('scroll', function(){
        if (timer) {
            window.clearTimeout(timer);
        }

        timer = window.setTimeout(function() {
            if (document.documentElement.scrollTop + window.innerHeight > document.documentElement.scrollHeight - 300 && (!isLoading)) {
                addData(LANG);
            }
        }, 100);    
    });

    document.querySelector('.change_en').addEventListener('click', () => {
        changeLang('en');
    });

    document.querySelector('.change_zh').addEventListener('click', () => {
        changeLang('zh');
    });
    
});

function addData(lang) {
    getData(lang, (err, str) => {
        const {data} = str;
        const $container = document.querySelector('.container');
        const div = document.createElement('div');
        
        for (let value of data) {
            $container.appendChild(div);
            div.outerHTML = getChannel(value);
        }

        div.setAttribute('class', 'channel');
        
        
        isLoading = false;
        cursor = str.pagination.cursor;
        console.log(cursor);
    });
}

function getData(lang, cb) {
    const clientId = 'vlz78wiq1xp89tgx30udue2a8ztniq';

    var request = new XMLHttpRequest({first: limit, after: cursor});
    request.open('GET', `https://api.twitch.tv/helix/streams/?first=${limit}&after=${cursor}&language=${lang}`, true);
    request.setRequestHeader('Client-ID', clientId);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = JSON.parse(request.responseText);
            cb(null, resp);
            console.log(resp);
            // fillSpace();
        }
    }
    request.send();
}

function getChannel(value) {
    return `
        <div class="channel">
            <div class="channel-img">
                <img src="${value.thumbnail_url.replace(/{width}x{height}/, '300x300')}" alt="channel-image" onload="this.style.opacity = 1">
            </div>
            <div class="info">
                <div class="streamer-img">
                    <img src="https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png" alt="streamer">
                </div>
                <div class="intro">
                    <div class="title">
                        ${value.title}
                    </div>
                    <div class="name">
                        ${value.user_name}
                    </div>
                </div>
            </div>
        </div>`;
}


// function fillSpace() {
//     const div = document.createElement('div');
//     div.setAttribute('class', 'channel');
//     const add = document.querySelector('.container').lastElementChild;
//     console.log(add);
//     add.appendChild(div);
//     add.appendChild(div);
// }



