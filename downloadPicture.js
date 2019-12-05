function downloadPicture(url, name = null) {
  let picUrl = url;
  let blobUrl = null;
  let base64Data = null;

  download();

  function download() {
    fetch(picUrl, {
      mode: 'cors',
    }).then(function(res) {
      return res.blob();
    }).then(function(res) {
      blobUrl = window.URL.createObjectURL(res);
      getBase64Image();
    }).catch(console.log);
  }

  function getBase64Image() {
    if (!blobUrl) return;
    let img = new Image();
    img.src = blobUrl;

    img.onload = function() {
      let width = img.width;
      let height = img.height;

      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      base64Data = canvas.toDataURL();
      gotoDownload();
    }
  }

  function gotoDownload() {
    if (!base64Data) return;

    let a = document.createElement('a');
    a.href = base64Data;
    a.download = name || 'pic_' + new Date().getTime() + '.png';
    a.click();
    a = null;
  }
}