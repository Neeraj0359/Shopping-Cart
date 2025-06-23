import { LightningElement, api, track } from 'lwc';

export default class InvoicePage extends LightningElement {
    @api invoiceItems = [];
    @track columns = [
        { label: 'Product Name', fieldName: 'Name', type: 'text' },
        { label: 'Price (₹)', fieldName: 'Price__c', type: 'currency' },
        { label: 'Quantity', fieldName: 'Quantity__c', type: 'number' },
        { label: 'Subtotal (₹)', fieldName: 'subtotal', type: 'currency' }
    ];

    get processedItems() {
        return this.invoiceItems.map(item => ({
            ...item,
            subtotal: item.Price__c * item.Quantity__c
        }));
    }

    get totalAmount() {
        return this.invoiceItems.reduce((sum, item) => {
            return sum + item.Price__c * item.Quantity__c;
        }, 0);
    }

    handlePlaceOrder() {
        // Dispatch event to parent
        this.dispatchEvent(new CustomEvent('placeorder'));
    }
}
