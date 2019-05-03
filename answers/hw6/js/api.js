let cursor = '';
let isLoading = true;


document.addEventListener('DOMContentLoaded', function(){
    addData();

    window.addEventListener('scroll', function(){
        if (document.documentElement.scrollTop + window.innerHeight > document.documentElement.scrollHeight - 300) {
            if (!isloading) {
                addData();
            }
        }    
    });
});

function addData() {
    getData((err, str) => {
        const {data} = str;
        const $container = document.querySelector('.container');
        
        for (let value of data) {
            const div = document.createElement('div');
            $container.insertBefore(div, $container.firstChild);
            div.outerHTML = getChannel(value);
        }
        
        isloading = false;
        cursor = str.pagination.cursor;
        console.log(cursor);
    });
}

function getData(cb) {
    const clientId = 'vlz78wiq1xp89tgx30udue2a8ztniq';
    const limit = 30;

    var request = new XMLHttpRequest({first: limit, after: cursor});
    request.open('GET', 'https://api.twitch.tv/helix/streams/?first=' + limit + '&after=' + cursor, true);
    request.setRequestHeader('Client-ID', clientId);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = JSON.parse(request.responseText);
            cb(null, resp);
            console.log(resp);
            fillSpace();
        }
    }
    request.send();
}

function getChannel(value) {
    return `
        <div class="channel">
            <div class="channel-img">
                <img src="${value.thumbnail_url.replace(/{width}x{height}/, '300x300')}" alt="channel-image">
            </div>
            <div class="info">
                <div class="streamer-img">
                    <img src="https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png" alt="streamer" onload='this.style.opacity = 1'>
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


function fillSpace() {
    const div = document.createElement('div');
    div.setAttribute('class', 'channel');
    const add = document.querySelector('.fillSpace');
    add.appendChild(div);
    add.appendChild(div);
}



