// Agregar la API de YouTube solo si no está ya cargada
if (!window.YT) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Lista para almacenar los reproductores de YouTube
var players = [];

// Función que se ejecuta cuando la API de YouTube está lista
function onYouTubeIframeAPIReady() {
    document.querySelectorAll('.youtube-video').forEach((iframe, index) => {
        var player = new YT.Player(iframe, {
            events: {
                'onReady': function(event) {
                    attachHoverEvents(event.target);
                }
            }
        });
        players.push(player);
    });
}

// Función para reproducir el video al pasar el mouse
function playVideo(event) {
    var iframe = event.target;
    var player = players.find(p => p.getIframe() === iframe);
    if (player) {
        player.playVideo();
    }
}

// Función para pausar el video al salir el mouse
function pauseVideo(event) {
    var iframe = event.target;
    var player = players.find(p => p.getIframe() === iframe);
    if (player) {
        player.pauseVideo();
    }
}

// Asignar eventos cuando el reproductor esté listo
function attachHoverEvents(player) {
    var iframe = player.getIframe();
    iframe.addEventListener('mouseover', playVideo);
    iframe.addEventListener('mouseout', pauseVideo);
}


