
import Chart from 'chart.js';

class ModalChart {

    constructor(stat) {
        this.stat = stat;
    }

    _getData() {
        let data = {};
        data['labels'] = ['大V', '小V', '高级', '普通', '四零', '匿名'];
        data['datasets'] = [];

        let dataset = {};
        dataset['data'] = [];
        dataset['data'].push(this.stat.expert);
        dataset['data'].push(this.stat.senior);
        dataset['data'].push(this.stat.middle);
        dataset['data'].push(this.stat.junior);
        dataset['data'].push(this.stat.zero);
        dataset['data'].push(this.stat.anonymous);

        dataset['backgroundColor'] = ['#FF6384', '#FFDE63', '#63D4FF', '#6385FF', '#F0F0F0', '#575757'];
        data['datasets'].push(dataset);
        return data;
    }

    createChart(canvas) {
        let ctx = canvas.getContext('2d');
        let data = this._getData();
        let pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data
        });
    }
}

export default class Modal {

    static MODAL_CLASS = 'core-modal';

    static MASK_CLASS = 'core-mask';

    static WRAPPER_CLASS = 'core-wrapper';

    static DIALOG_CLASS = 'core-dialog';

    static TITLE_CLASS = 'core-dialog-title';

    static CLOSE_BTN_CLASS = 'core-close-btn';

    static CONTENT_CLASS = 'core-dialog-content';

    static HIDDEN_CLASS = 'core-hidden';

    static CONTENT_HEADER_CLASS = 'core-dialog-content-header';

    static CONTENT_FOOTER_CLASS = 'core-dialog-content-footer';

    static CONTENT_TAB_CLASS = 'core-dialog-content-tab';

    static CONTENT_ACTIVE_TAB_CLASS = 'core-dialog-content-active-tab';

    static TABS = ['大V用户', '小V用户', '优秀回答者', '认证用户'];

    static CONTENT_LIST_CLASS = 'core-dialog-content-list';

    static TITLE_TEXT = '分析器';

    static setModal(stat) {
        Modal._setMask();
        Modal._setWrapper(stat);
    }

    static removeModal() {
        let modals = document.querySelectorAll('.' + Modal.MODAL_CLASS);
        modals.forEach((node) => {
            node.remove();
        });
    }

    static _setMask() {
        let mask = document.createElement('div');
        mask.classList.add(Modal.MASK_CLASS);
        mask.classList.add(Modal.MODAL_CLASS);
        document.body.appendChild(mask);
    }

    static _setWrapper(stat) {
        let wrapper = document.createElement('div');
        wrapper.classList.add(Modal.WRAPPER_CLASS);
        wrapper.classList.add(Modal.MODAL_CLASS);
        document.body.appendChild(wrapper);
        Modal._setDialog(stat, wrapper);
    }

    static _setDialog(stat, wrapper) {
        let dialog = document.createElement('div');
        dialog.classList.add(Modal.DIALOG_CLASS);
        wrapper.appendChild(dialog);

        Modal._setTitle(dialog);
        Modal._setContent(stat, dialog);
    }

    static _setTitle(dialog) {
        let title = document.createElement('div');
        title.classList.add(Modal.TITLE_CLASS);

        let text = document.createElement('span');
        text.innerText = Modal.TITLE_TEXT;
        title.appendChild(text);

        let closeBtn = document.createElement('button');
        closeBtn.classList.add(Modal.CLOSE_BTN_CLASS);
        closeBtn.innerHTML = 'X';
        closeBtn.addEventListener('click', () => {
            Modal.removeModal();
        });
        title.appendChild(closeBtn);
        dialog.appendChild(title);
    }

    static _setContent(stat, dialog) {
        let content = document.createElement('div');
        content.classList.add(Modal.CONTENT_CLASS);
        dialog.appendChild(content);

        let canvas = document.createElement('canvas');
        canvas.style.width = 490;
        canvas.style.height = 300;
        content.appendChild(canvas);

        let chart = new ModalChart(stat);
        chart.createChart(canvas);

        content.appendChild(Modal._getHeader());
        content.appendChild(Modal._getAuthorList(stat, 'expertList', [Modal.CONTENT_LIST_CLASS]));
        content.appendChild(Modal._getAuthorList(stat, 'seniorList', [Modal.CONTENT_LIST_CLASS, Modal.HIDDEN_CLASS]));
        content.appendChild(Modal._getAuthorList(stat, 'bestList', [Modal.CONTENT_LIST_CLASS, Modal.HIDDEN_CLASS]));
        content.appendChild(Modal._getAuthorList(stat, 'identityList', [Modal.CONTENT_LIST_CLASS, Modal.HIDDEN_CLASS]));
        content.appendChild(Modal._getFooter());
    }

    static _getHeader() {
        let header = document.createElement('ul');
        header.classList.add(Modal.CONTENT_HEADER_CLASS);

        let icon = document.createElement('i');
        icon.classList.add('zg-icon', 'zg-icon-feedlist');
        header.appendChild(icon);

        for (let i=0;i<Modal.TABS.length;i++) {
            header.appendChild(Modal._getTab(i));
        }
        return header;
    }

    static _getFooter() {
        let footer = document.createElement('div');
        footer.classList.add(Modal.CONTENT_FOOTER_CLASS);
        return footer;
    }

    static _getTab(i) {
        let tab = document.createElement('li');
        let text = document.createElement('span');
        text.innerText = Modal.TABS[i];
        tab.appendChild(text);
        if (i===0) {
            tab.classList.add(Modal.CONTENT_ACTIVE_TAB_CLASS);
        }
        tab.setAttribute('index', i.toString());
        tab.classList.add(Modal.CONTENT_TAB_CLASS);
        tab.addEventListener('click', (e) => {
            Modal._onTabClick(e.target);
            return false;
        });
        return tab;
    }

    static _onTabClick(target) {
        let parent = target.parentElement;
        if (parent) {
            let tabs = parent.querySelectorAll('.' + Modal.CONTENT_TAB_CLASS);
            let index = Number.parseInt(target.getAttribute('index'));
            let authorList = document.querySelectorAll('.' + Modal.CONTENT_LIST_CLASS);
            if (tabs && authorList && authorList[index]) {
                tabs.forEach((node) => {
                    node.classList.remove(Modal.CONTENT_ACTIVE_TAB_CLASS);
                });
                target.classList.add(Modal.CONTENT_ACTIVE_TAB_CLASS);
                authorList.forEach((list) => {
                    list.classList.add(Modal.HIDDEN_CLASS);
                });
                authorList[index].classList.remove(Modal.HIDDEN_CLASS);
            }
        }
    }

    static _getAuthorList(stat, listPropertyName, classNames) {
        let list = document.createElement('div');
        if (classNames) {
            classNames.forEach((className) => {
                list.classList.add(className);
            });
        }

        let authorList = stat[listPropertyName];
        let authorHtml = '';
        if (authorList) {
            authorList.forEach((author) => {
                authorHtml = authorHtml.concat(author['data']);
            });
        }
        list.innerHTML = authorHtml;
        return list;
    }
}