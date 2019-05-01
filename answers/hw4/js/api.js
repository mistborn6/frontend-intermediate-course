function getData(cb) {
    const clientId = 'vlz78wiq1xp89tgx30udue2a8ztniq';
    const Limit = 20;

    $.ajax({
        url: 'https://api.twitch.tv/helix/streams',
        method: 'get',
        headers: {
            'Client-ID': clientId,
        },
        success: (response) => {
            console.log(response);
            cb(null, response);
            fillSpace();
            removeLoading();
        }
    })
}

getData((err, str) => {
    const {data} = str;
    const $container = $('.container');

    for (let value of data) {
        $container.prepend(getChannel(value));
    }
})

function getChannel(value) {
    return `
        <div class="channel">
            <div class="channel-img">
                <img src="${value.thumbnail_url.replace(/{width}x{height}/, '300x300')}" alt="channel-image">
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


function fillSpace() {
    $('.fillSpace').append($('<div class="channel"></div><div class="channel"></div>'));
}

function removeLoading() {
    $('.loading').remove();
}

