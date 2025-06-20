import { LightningElement } from 'lwc';

export default class CartLwc extends LightningElement {

    handleAddMoreProducts() {
        // Dispatch event to parentLwc to show products
        const event = new CustomEvent('showcomponent', {
            detail: 'products', // ya 'addOrder' based on your setup
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    handleCheckout() {
        // Logic to handle checkout
        const event = new CustomEvent('showcomponent', {
            detail: 'invoice', // ya 'addOrder' based on your setup
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}
