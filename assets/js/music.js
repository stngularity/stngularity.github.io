const tracksCount = document.getElementById("tracks_count");

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

class AudioPlayer {
    constructor(selector) {
        this.tracks = [];
        this.play = document.querySelector(selector).querySelector("#play");
        this.download = document.querySelector(selector).querySelector("#download");
        this.download.disabled = true;
        this.upload = document.querySelector(selector).querySelector("#upload");
        this.globalAudio = null;
    }

    load() {
        (async () => {
            const response = await fetch("/assets/music/meta.json");
            if(!response.ok) {
                console.error(`[Music] Failed to get tracks (${response.status} ${response.statusText})`);
                return;
            }
    
            this.tracks = (await response.json())["elements"];
            console.debug(`[Music] Found ${this.tracks.length} tracks`);
            tracksCount.textContent = this.tracks.length;
        })();
    }

    setup() {
        this.load()

        this.play.onclick = () => {
            const track = this.tracks[getRandom(0, this.tracks.length-1)];
            let audio = null;
            if(this.globalAudio === null && track["type"] === "local_file")
                audio = new Audio(`/assets/music/${track["filename"]}`);

            if(this.globalAudio === null && audio === null) {
                console.error(`[Music] Failed to play /assets/music/${track["filename"]}`);
                return;
            }

            if(this.globalAudio !== null) {
                const action = this.globalAudio.paused ? "play" : "pause";
                switch(action) {
                    case "play":
                        this.globalAudio.play();
                        play.querySelector(".icon").innerHTML = `<use href="/assets/images/icons/pause.svg#img"/>`;
                        console.debug("[Music] Audio is playing now");
                        return;
                    
                    case "pause":
                        this.globalAudio.pause();
                        play.querySelector(".icon").innerHTML = `<use href="/assets/images/icons/play.svg#img"/>`;
                        console.debug("[Music] Audio is paused now");
                        return;
                }
            }

            this.globalAudio = audio;
            console.debug(`[Music] Try to play music`);
            audio.addEventListener("canplaythrough", () => {
                console.debug(`[Music] Play ${audio.src}`);
                audio.play();
                play.querySelector(".icon").innerHTML = `<use href="/assets/images/icons/pause.svg#img"/>`;
                this.download.disabled = false;
            });

            audio.addEventListener("ended", () => {
                console.debug(`[Music] Audio is ended`);
                this.globalAudio = null;
                play.querySelector(".icon").innerHTML = `<use href="/assets/images/icons/play.svg#img"/>`;
                this.download.disabled = true;
            });
        }

        this.download.onclick = () => {
            if(this.globalAudio === null) {
                console.error("[Music] Please, click \"play\" button first");
                return;
            }

            const download = document.createElement("a");
            download.target = "_blank";
            download.rel = "noopener noreferrer";
            download.href = this.globalAudio.src;
            const path = this.globalAudio.src.split("/");
            download.download = path[(path.length-1)]
            
            document.body.appendChild(download);
            download.click();
            download.remove();
            console.debug(`[Music] Download action runs for ${download.download} file`);
        }

        this.upload.onclick = () =>
            window.open("https://github.com/stngularity/stngularity.github.io/tree/main/assets/music", "_blank");
    }
}