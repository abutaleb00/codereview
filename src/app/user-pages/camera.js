const camera = (function () {
  let width = 0;
  let height = 0;

  const createObjects = function () {
    const video = document.createElement("video");
    video.id = "video";
    video.width = width;
    video.height = height;
    video.style.width = "100%";
    video.style.height = "auto";
    video.autoplay = true;
    // document.body.appendChild(video);
    document.getElementById("web_came").appendChild(video);

    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    // document.body.appendChild(canvas);
    document.getElementById("web_src").appendChild(canvas);
  };

  return {
    video: null,
    context: null,
    canvas: null,

    startCamera: function (w = 300, h = 200) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        width = w;
        height = h;

        createObjects();

        this.video = document.getElementById("video");
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");

        (function (video) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
              video.srcObject = stream;
              video.play();
            });
        })(this.video);
      }
    },

    takeSnapshot: function () {
      this.context.drawImage(this.video, 0, 0, width, height);
      var imgData = this.canvas.toDataURL();
      return imgData;
    },

    stopCamera: function () {
      const video = document.querySelector("video");
      if (video === null || video === undefined) {
        if (document.getElementById("web_came") !== null)
          document.getElementById("web_came").innerHTML = "";
        if (document.getElementById("web_src") !== null)
          document.getElementById("web_src").innerHTML = "";
        return;
      }
      // A video's MediaStream object is available through its srcObject attribute
      const mediaStream = video.srcObject;
      // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
      const tracks = mediaStream.getTracks();
      // Or stop all like so:
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
      document.getElementById("web_came").innerHTML = "";
      document.getElementById("web_src").innerHTML = "";
    },
  };
})();

export default camera;
