import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class OrderConfirmation extends LightningElement {
    @api products = [];

    connectedCallback() {
        this.showToast();
    }

    get productCount() {
        return this.products ? this.products.length : 0;
    }

    showToast() {
        const evt = new ShowToastEvent({
            title: 'Order Placed',
            message: 'Your order was placed successfully!',
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    handleViewOrders() {
        this.dispatchEvent(new CustomEvent('vieworders'));
    }
}
