//import audioFile from "./Calm.mp3";
import "./MediaPlayer.css";

function MediaPlayer() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=4214056838/size=small/bgcol=ffffff/linkcol=0687f5/track=4220673475/transparent=true/" seamless><a href="https://creativeisaiah.bandcamp.com/album/novas-journey">Nova&#39;s Journey by creativeisaiah</a></iframe>
            `
      }}
    />
  );
}

export default MediaPlayer;
