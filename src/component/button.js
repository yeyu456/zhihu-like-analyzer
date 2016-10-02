
const URL = 'http://www.w3.org/2000/svg';

class LoadingIcon {

    static LOADING_CLASS = 'core-like-loading';

    static getIcon() {
        let svg = LoadingIcon._getSvg();
        LoadingIcon._setRect(svg);

        let animate = LoadingIcon._getAnimate();
        LoadingIcon._setCircle(svg, animate);

        return LoadingIcon._getElement(svg);
    }

    static _getSvg() {
        let svg = document.createElementNS(URL, 'svg');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid');
        return svg;
    }

    static _setRect(svg) {
        let rect = document.createElementNS(URL, 'rect');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', '20');
        rect.setAttribute('height', '20');
        rect.setAttribute('fill', 'none');
        svg.appendChild(rect);
    }

    static _getAnimate() {
        let animate = document.createElementNS(URL, 'animateTransform');
        animate.setAttribute('attributeName', 'transform');
        animate.setAttribute('type', 'rotate');
        animate.setAttribute('values', '0 50 50;180 50 50;360 50 50;');
        animate.setAttribute('keyTimes', '0;0.5;1');
        animate.setAttribute('dur', '1s');
        animate.setAttribute('repeatCount', 'indefinite');
        animate.setAttribute('begin', '0s');
        return animate;
    }

    static _setCircle(svg, animate) {
        let circle = document.createElementNS(URL, 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '40');
        circle.setAttribute('stroke-dasharray', '163 88');
        circle.setAttribute('stroke', '#698ebf');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke-width', '20');
        circle.appendChild(animate);
        svg.appendChild(circle);
    }

    static _getElement(svg) {
        let i = document.createElement('i');
        i.appendChild(svg);
        i.classList.add(LoadingIcon.LOADING_CLASS);
        return i;
    }
}

class FilterIcon {

    static FILTER_CLASS = 'core-like-filter';

    static getIcon() {
        let svg = FilterIcon._getSvg();
        FilterIcon._setPath(svg);

        return FilterIcon._getElement(svg);
    }

    static _getSvg() {
        let svg = document.createElementNS(URL, 'svg');
        svg.setAttribute('width', '12');
        svg.setAttribute('height', '12');
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid');
        return svg;
    }

    static _setPath(svg) {
        let path = document.createElementNS(URL, 'path');
        path.setAttribute('d', 'M 5 0 H 95 C 80 0, 105 -2, 97 5 L 60 40 L 60 105 C 60 110, 59 111, 56 108  L 45 97 C 43 95, 40 92, 40 90 L 40 40 L 3 5 C 1 3, 2 0, 5 0');
        path.setAttribute('fill', 'rgb(105, 142, 191)');
        svg.appendChild(path);
    }

    static _getElement(svg) {
        let i = document.createElement('i');
        i.classList.add(FilterIcon.FILTER_CLASS);
        i.appendChild(svg);
        return i;
    }
}

export default class Button {

    static ANALYZING_EVENT = 'analyzing';

    static ANALYZED_EVENT = 'analyzed';

    static BUTTON_CLASS = 'core-like-btn';

    static NUM_CLASS = 'core-like-num';

    static BUTTON_TEXT = '分析';

    static getAnalyzeButton(analyzingUrl, analyzingCallback) {
        let btn = document.createElement('button');
        btn.classList.add(Button.BUTTON_CLASS);

        //过滤图标
        btn.appendChild(FilterIcon.getIcon());

        //点赞数文本
        btn.appendChild(Button._getLikeNum());

        //加载图标
        let loadingIcon = Button._getLoadingIcon();
        btn.appendChild(loadingIcon);

        //初始显示的文本
        let dispText = Button._getDispText();
        btn.appendChild(dispText);

        //点击触发分析事件
        let cb = analyzingCallback.bind(btn, analyzingUrl, btn);
        btn.addEventListener('click', () => {
            loadingIcon.dispatchEvent(new Event(Button.ANALYZING_EVENT));
            dispText.dispatchEvent(new Event(Button.ANALYZING_EVENT));
            cb();
        }, {once: true});

        return btn;
    }

    static _getLikeNum() {
        let span = document.createElement('span');
        //默认点赞数为0
        span.innerHTML = 0;
        span.classList.add(Button.NUM_CLASS);

        span.style.display = 'none';
        span.addEventListener(Button.ANALYZED_EVENT, (e) => {
            e.target.style.display = 'inline';
        }, {once: true});

        return span;
    }

    static _getLoadingIcon() {
        let loadingIcon = LoadingIcon.getIcon();

        loadingIcon.style.display = 'none';
        loadingIcon.addEventListener(Button.ANALYZING_EVENT, (e) => {
            e.target.style.display = 'inline';
        }, {once: true});
        loadingIcon.addEventListener(Button.ANALYZED_EVENT, (e) => {
            e.target.style.display = 'none';
        }, {once: true});

        return loadingIcon;
    }

    static _getDispText() {
        let text = document.createElement('span');
        text.innerText = Button.BUTTON_TEXT;

        text.addEventListener(Button.ANALYZING_EVENT, (e) => {
            e.target.style.display = 'none';
        }, {once: true});
        return text;
    }
}