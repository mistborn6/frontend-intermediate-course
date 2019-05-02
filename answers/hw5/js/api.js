let cursor;
let isLoading = true;


$(document).ready(function(e){
    addData();

    $(document).scroll(function(e){
        if ($(window).scrollTop() + $(window).height() == $(this).height() - 300) {
            if (!isloading) {
                addData();
            }
        }    
    });
});

function addData() {
    getData((err, str) => {
        const {data} = str;
        const $container = $('.container');
        
        for (let value of data) {
            $container.prepend(getChannel(value));
        }
        
        isloading = false;
        cursor = str.pagination.cursor;
        console.log(cursor);
    });
}


function getData(cb) {
    const clientId = 'vlz78wiq1xp89tgx30udue2a8ztniq';
    const limit = 20;

    $.ajax({
        url: 'https://api.twitch.tv/helix/streams',
        method: 'get',
        data: {
            first: limit,
            after: cursor,
        },
        headers: {
            'Client-ID': clientId,
        },
        success: (response) => {
            console.log(response);
            cb(null, response);
            fillSpace();

        }
    })
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
    $('.fillSpace').append($('<div class="channel"></div><div class="channel"></div>'));
}



