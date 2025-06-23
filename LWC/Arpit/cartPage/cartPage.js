import { LightningElement, track } from 'lwc';

export default class CartPage extends LightningElement {
    @track cartProducts = [];

    connectedCallback() {
        const stored = localStorage.getItem('selectedProducts');
        if (stored) {
            this.cartProducts = JSON.parse(stored).map(prod => ({
                ...prod,
                quantity: prod.quantity || 1
            }));

            localStorage.setItem('selectedProducts', JSON.stringify(this.cartProducts));
        }
    }

    get columns() {
        return [
            { label: 'Name', fieldName: 'Name' },
            { label: 'Price', fieldName: 'Price__c', type: 'currency' },
            { label: 'Available', fieldName: 'Available_Unit__c', type: 'number' },
            {
                label: 'Quantity',
                fieldName: 'quantity',
                type: 'number'
            },
            {
                type: 'button',
                typeAttributes: {
                    label: 'Remove',
                    name: 'remove',
                    variant: 'destructive'
                }
            }
        ];
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'remove') {
            this.cartProducts = this.cartProducts.filter(item => item.Id !== row.Id);
            localStorage.setItem('selectedProducts', JSON.stringify(this.cartProducts));
        }
    }

    handleAddMore() {
        this.dispatchEvent(new CustomEvent('gotoproducts', { bubbles: true }));
    }

    goToInvoice() {
        const invalid = this.cartProducts.find(p => p.quantity < 1 || p.quantity > p.Available_Unit__c);
        if (invalid) {
            alert(`Invalid quantity for product: ${invalid.Name}`);
            return;
        }

        localStorage.setItem('confirmedOrder', JSON.stringify(this.cartProducts));
        this.dispatchEvent(new CustomEvent('gotoinvoice', { bubbles: true }));
    }
}
