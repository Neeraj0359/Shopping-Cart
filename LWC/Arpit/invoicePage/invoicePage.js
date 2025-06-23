import { LightningElement, track } from 'lwc';

export default class InvoicePage extends LightningElement {
    @track invoiceData = [];
    grandTotal = 0;

    connectedCallback() {
        const order = localStorage.getItem('confirmedOrder');
        if (order) {
            this.invoiceData = JSON.parse(order).map(item => ({
                ...item,
                total: item.Price__c * item.quantity
            }));

            this.grandTotal = this.invoiceData.reduce((sum, item) => sum + item.total, 0);
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

    placeOrder() {
        let orderCycles = JSON.parse(localStorage.getItem('orderCycles')) || [];

        // Reset if 5 orders already placed
        if (orderCycles.length >= 5) {
            orderCycles = [];
        }

        // Add current order to cycle
        orderCycles.push(this.invoiceData);
        localStorage.setItem('orderCycles', JSON.stringify(orderCycles));

        // Also flatten into one list for display
        const flatOrders = orderCycles.flat();
        localStorage.setItem('orders', JSON.stringify(flatOrders));

        // Cleanup temporary storage
        localStorage.removeItem('confirmedOrder');
        localStorage.removeItem('selectedProducts');

        // Navigate to order history
        this.dispatchEvent(new CustomEvent('orderplaced', { bubbles: true }));
    }
}
