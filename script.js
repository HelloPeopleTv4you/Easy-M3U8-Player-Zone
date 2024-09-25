let player; // Global player variable

document.getElementById('play-button').addEventListener('click', function() {
    const url = document.getElementById('stream-url').value;
    const playerType = document.getElementById('player-select').value;
    
    const playerContainer = document.getElementById('player-container');
    playerContainer.innerHTML = ''; // Clear previous player

    if (playerType === 'videojs') {
        // Dispose of the previous Video.js player if it exists
        if (player) {
            player.dispose();
        }

        // Create Video.js player
        const videoElement = document.createElement('video');
        videoElement.id = 'video-player';
        videoElement.className = 'video-js';
        videoElement.controls = true;
        videoElement.preload = 'auto';
        videoElement.width = '100%';
        videoElement.height = '300px';

        const sourceElement = document.createElement('source');
        sourceElement.src = url;
        sourceElement.type = 'application/x-mpegURL';

        videoElement.appendChild(sourceElement);
        playerContainer.appendChild(videoElement);

        // Initialize Video.js
        player = videojs('video-player', {}, function() {
            this.src({ type: "application/x-mpegURL", src: url });
            this.play(); // Automatically play the video
        });
    } else if (playerType === 'jwplayer') {
        playerContainer.innerHTML = `<div id="jwplayer-container" style="width: 100%; height: 300px;"></div>`;
        const jwplayerScript = document.createElement('script');
        jwplayerScript.src = 'https://cdn.jwplayer.com/libraries/your_jwplayer_key.js'; // Replace with your JW Player key
        document.body.appendChild(jwplayerScript);
        jwplayerScript.onload = function() {
            jwplayer("jwplayer-container").setup({
                file: url,
                width: "100%",
                height: "100%"
            });
        };
    } else if (playerType === 'clapper') {
        // Implement Clapper Player initialization
        playerContainer.innerHTML = `<div id="clapper-container" style="width: 100%; height: 300px;"></div>`;
        // Example: clapperPlayer.setup(...)
    } else if (playerType === 'shaka') {
        // Implement Shaka Player initialization
        playerContainer.innerHTML = `<div id="shaka-container" style="width: 100%; height: 300px;"></div>`;
        // Example: shakaPlayer.load(url)
    } else {
        alert("Please select a valid player.");
    }
});
