import { LightningElement } from 'lwc';

export default class InvoiceLwc extends LightningElement {
    handlePlaceOrder() {
        const event = new CustomEvent('showcomponent', {
            detail: 'orderSuccess', // ya 'addOrder' based on your setup
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}
