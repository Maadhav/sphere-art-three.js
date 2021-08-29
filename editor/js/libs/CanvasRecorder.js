
const MIME = 'video/webm';
const MIME_CODEC = 'video/webm; codecs="vp8"';
const FILE_EXT = 'webm';


class CanvasRecorder {
  constructor() {
    this.recordedBlobs_ = [];
    this.mediaRecorder_ = null;

    this.video_ = null;
    this.canvas_ = null;
  }

  isSupported() {
    return 'MediaSource' in window && MediaSource.isTypeSupported(MIME_CODEC);
  }

  initialize(canvas, video) {
    this.canvas_ = canvas;
    this.video_ = video;

    if (!this.isSupported()) {
      return Promise.reject(new Error('Browser not supported. (MediaSource).'));
    }

    if (this.isSupported()) {
      const mediaSource = new MediaSource();
      mediaSource.addEventListener('sourceopen', this.handleSourceOpen_.bind(this, mediaSource));
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(`Codec (${MIME_CODEC}) not supported.`));
    }
  }

  handleSourceOpen_(mediaSource) {
    mediaSource.addSourceBuffer(MIME_CODEC);
  }

  start() {
    if (!this.isSupported()) {
      return Promise.reject('Canvas recording is not supported in your browser.');
    }

    const options = {
      mimeType: MIME,
      videoBitsPerSecond: 3000 * 1000,
    };

    return new Promise((resolve, reject) => {
      this.stream_ = this.canvas_.captureStream(60);
      this.recordedBlobs_ = [];
      try {
        this.mediaRecorder_ = new MediaRecorder(this.stream_, options);
      } catch (err) {
        return reject(err);
      }

      this.mediaRecorder_.onstop = this.handleStop_.bind(this);
      this.mediaRecorder_.ondataavailable = this.handleDataAvailable_.bind(this);
      this.mediaRecorder_.start(100);

      resolve();
    });
  }

  handleStop_() {
    this.video_.src = window.URL.createObjectURL(this.toBlob());
  }

  handleDataAvailable_(event) {
    if (event.data && event.data.size > 0) {
      this.recordedBlobs_.push(event.data);
    }
  }

  stop() {
    this.mediaRecorder_.stop();
    return Promise.resolve();
  }

  getMime() {
    return MIME;
  }

  getFilename() {
    return `whiteboard.${FILE_EXT}`;
  }

  toBlob() {
    return new Blob(this.recordedBlobs_, {type: MIME});
  }

  download() {
    return new Promise((resolve, reject) => {
      const blob = this.toBlob()
      const url = window.URL.createObjectURL(blob);
     
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = this.getFilename();
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        resolve();
      }, 100);
    });
  }
}