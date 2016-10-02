
import Chart from 'chart.js';

class ModalChart {

    constructor(stat) {
        this.stat = stat;
    }

    get element() {
        let canvas = document.createElement('canvas');
        canvas.style.width = 490;
        canvas.style.height = 300;
        let ctx = canvas.getContext('2d');
        let pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: data
        });
    }
}

export default class Modal {

    static MODAL_CLASS = 'core-modal';

    static MODAL_MASK_CLASS = 'core-mask';

    static MODAL_DIALOG_CLASS = 'core-dialog';

    static MODAL_TITLE_CLASS = 'core-dialog-title';

    static MODAL_CLOSE_BTN_CLASS = 'core-close-btn';

    static MODAL_CONTENT_CLASS = 'core-dialog-content';

    static MODAL_CONTENT_EXPERT_CLASS = 'core-dialog-content-expert';

    static MODAL_TITLE_TEXT = '分析器';

    static setModal(stat) {
        Modal._setMask();
        Modal._setWrapper(stat);
    }

    static removeModal() {
        let modals = document.querySelectorAll(Modal.MODAL_CLASS);
        modals.forEach((node) => {
            node.remove();
        });
    }

    static _setMask() {
        let mask = document.createElement('div');
        mask.classList.add(Modal.MODAL_MASK_CLASS);
        mask.classList.add(Modal.MODAL_CLASS);
        document.body.appendChild(mask);
    }

    static _setWrapper(stat) {
        let wrapper = document.createElement('div');
        wrapper.classList.add(Modal.MODAL_CLASS);
        wrapper.appendChild(Modal._getModalDialog(stat));
        document.body.appendChild(wrapper);
    }

    static _getModalDialog(stat) {
        let dialog = document.createElement('div');
        dialog.classList.add(Modal.MODAL_DIALOG_CLASS);
        dialog.appendChild(Modal._getModalTitle());
        dialog.appendChild(Modal._getModalContent(stat));
        return dialog;
    }

    static _getModalTitle() {
        let title = document.createElement('div');
        title.classList.add(Modal.MODAL_TITLE_CLASS);

        let text = document.createElement('span');
        text.innerText = Modal.MODAL_TITLE_TEXT;
        title.appendChild(text);

        let closeBtn = document.createElement('button');
        closeBtn.classList.add(Modal.MODAL_CLOSE_BTN_CLASS);
        closeBtn.addEventListener('click', () => {
            Modal.removeModal();
        });
        title.appendChild(closeBtn);

        return title;
    }

    static _getModalContent(stat) {
        let content = document.createElement('div');
        content.classList.add(Modal.MODAL_CONTENT_CLASS);

        let modalChart = new ModalChart(stat);
        content.appendChild(modalChart.element);
        content.appendChild(Modal._getModalExperts(stat));
        return content;
    }

    static _getModalExperts(stat) {
        let list = document.createElement('div');
        list.classList.add(Modal.MODAL_CONTENT_EXPERT_CLASS);

        let expertList = stat.expertList;
        expertList.forEach((expert) => {
            list.appendChild(expert);
        });
        return list;
    }
}