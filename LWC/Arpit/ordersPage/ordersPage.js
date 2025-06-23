import { LightningElement, api, track } from 'lwc';

export default class OrdersPage extends LightningElement {
    _orders = [];
    @track filteredOrders = [];
    @track selectedLetter = '';
    @track columns;

    connectedCallback() {
        this.setColumns();
    }

    @api
    get orders() {
        return this._orders;
    }

    set orders(value) {
        this._orders = value || [];
        this.filteredOrders = [...this._orders]; // ✅ safe to copy when available
    }

    setColumns() {
        this.columns = [
            { label: 'Product Name', fieldName: 'Name', type: 'text' },
            { label: 'Price (₹)', fieldName: 'Price__c', type: 'currency' },
            { label: 'Quantity', fieldName: 'Quantity__c', type: 'number' },
            {
                type: 'button',
                typeAttributes: {
                    label: 'Order Again',
                    name: 'order_again',
                    variant: 'brand'
                }
            }
        ];
    }

    get alphabetOptions() {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
            label: letter,
            value: letter
        }));
    }

    handleFilterChange(event) {
        this.selectedLetter = event.detail.value;
        this.filteredOrders = this._orders.filter(order =>
            order.Name.startsWith(this.selectedLetter)
        );
    }

    resetFilter() {
        this.selectedLetter = '';
        this.filteredOrders = [...this._orders];
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'order_again') {
            this.dispatchEvent(new CustomEvent('reorder', {
                detail: { item: row }
            }));
        }
    }
}
