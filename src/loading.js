
export default class Loading {

    static getLoadingIcon() {
        let url = 'http://www.w3.org/2000/svg';

        let svg = document.createElementNS(url, 'svg');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid');

        let rect = document.createElementNS(url, 'rect');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', '20');
        rect.setAttribute('height', '20');
        rect.setAttribute('fill', 'none');
        svg.appendChild(rect);

        let animate = document.createElementNS(url, 'animateTransform');
        animate.setAttribute('attributeName', 'transform');
        animate.setAttribute('type', 'rotate');
        animate.setAttribute('values', '0 50 50;180 50 50;360 50 50;');
        animate.setAttribute('keyTimes', '0;0.5;1');
        animate.setAttribute('dur', '1s');
        animate.setAttribute('repeatCount', 'indefinite');
        animate.setAttribute('begin', '0s');

        let circle = document.createElementNS(url, 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '40');
        circle.setAttribute('stroke-dasharray', '163 88');
        circle.setAttribute('stroke', '#698ebf');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke-width', '20');
        circle.appendChild(animate);
        svg.appendChild(circle);

        return svg;
    }


    static getLikeElement(likeNum) {
        let btn = document.createElement('button');
        btn.classList.add('core-like-btn');

        let i = document.createElement('i');
        btn.appendChild(i);

        let span = document.createElement('span');
        span.innerHTML = likeNum;
        btn.appendChild(span);

        let url = 'http://www.w3.org/2000/svg';
        let svg = document.createElementNS(url, 'svg');
        svg.setAttribute('width', '12');
        svg.setAttribute('height', '12');
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid');
        i.appendChild(svg);

        let path = document.createElementNS(url, 'path');
        path.setAttribute('d', 'M 5 0 H 95 C 80 0, 105 -2, 97 5 L 60 40 L 60 105 C 60 110, 59 111, 56 108  L 45 97 C 43 95, 40 92, 40 90 L 40 40 L 3 5 C 1 3, 2 0, 5 0');
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'black');
        svg.appendChild(path);

        return btn;
    }
}