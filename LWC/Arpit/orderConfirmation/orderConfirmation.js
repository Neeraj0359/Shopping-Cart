import { LightningElement } from 'lwc';

export default class OrderConfirmation extends LightningElement {
    handleViewOrders() {
        this.dispatchEvent(new CustomEvent('vieworders', { bubbles: true }));
    }
}
