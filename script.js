document.getElementById('play-button').addEventListener('click', function() {
    const url = document.getElementById('stream-url').value;
    const playerType = document.getElementById('player-select').value;
    
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = ''; // Clear previous player

    if (playerType === 'videojs') {
        playerContainer.innerHTML = `<video id="video-player" class="video-js" controls preload="auto" width="100%" height="100%">
            <source src="${url}" type="application/x-mpegURL">
        </video>`;
        videojs("video-player").ready(function() {
            this.src({ type: "application/x-mpegURL", src: url });
        });
    } else if (playerType === 'jwplayer') {
        playerContainer.innerHTML = `<div id="jwplayer-container"></div>`;
        jwplayer("jwplayer-container").setup({
            file: url,
            width: "100%",
            height: "100%"
        });
        const jwplayerScript = document.createElement('script');
        jwplayerScript.src = 'https://cdn.jwplayer.com/libraries/your_jwplayer_key.js'; // Replace with your JW Player key
        document.body.appendChild(jwplayerScript);
    } else if (playerType === 'clapper') {
        // Add Clapper Player implementation
    } else if (playerType === 'shaka') {
        // Add Shaka Player implementation
    }
});

