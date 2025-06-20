import { LightningElement } from 'lwc';

export default class OrderSuccessLwc extends LightningElement {
    handleViewOrders() {
        const event = new CustomEvent('showcomponent', {
            detail: 'orders',
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}