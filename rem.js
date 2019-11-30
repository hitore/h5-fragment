;(function() {

    function setRem() {
        let uiWidth = 375;
        let proportion = 100;
        let width = document.body.clientWidth || document.documentElement.clientWidth;
        let height = document.body.clientHeight || document.documentElement.clientHeight;
        
        // 适应横屏
        if (width > height) {
            width = height;
        }

        let fontSize =  (width > 750 ? 750 : width) / uiWidth * proportion;
        document.documentElement.style.fontSize = fontSize + 'px';
    }

    let resize = 'orientationchange' in window ? 'orientationchange' : 'resize';

    window.addEventListener(resize, setRem);
    window.addEventListener('DOMContentLoaded', setRem);
})();
