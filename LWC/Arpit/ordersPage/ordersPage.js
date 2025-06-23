import { LightningElement, track } from 'lwc';

export default class OrdersPage extends LightningElement {
    @track orders = [];

    connectedCallback() {
        const stored = localStorage.getItem('orders');
        if (stored) {
            this.orders = JSON.parse(stored).map(item => ({
                ...item,
                total: item.Price__c * item.quantity
            }));
        } else {
            this.orders = [];
        }
    }

    get columns() {
        return [
            { label: 'Name', fieldName: 'Name' },
            { label: 'Price', fieldName: 'Price__c', type: 'currency' },
            { label: 'Quantity', fieldName: 'quantity', type: 'number' },
            { label: 'Total', fieldName: 'total', type: 'currency' }
        ];
    }

    orderMore() {
        this.dispatchEvent(new CustomEvent('gotoproducts', { bubbles: true }));
    }
}
