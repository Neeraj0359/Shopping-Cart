import { LightningElement, api, track } from 'lwc';

export default class CartPage extends LightningElement {
    @api items = [];
    @track draftValues = [];
    @track columns = [
        { label: 'Product Name', fieldName: 'Name', type: 'text' },
        { label: 'Price', fieldName: 'Price__c', type: 'currency' },
        { label: 'Available', fieldName: 'Available_Units__c', type: 'number' },
        {
            label: 'Quantity',
            fieldName: 'Quantity__c',
            type: 'number',
            editable: true
        }
    ];

    get showTable() {
        return this.items && this.items.length > 0;
    }

    handleSave(event) {
        const updatedFields = event.detail.draftValues;
        this.items = this.items.map(item => {
            const draft = updatedFields.find(d => d.Id === item.Id);
            return draft ? { ...item, ...draft } : item;
        });
        this.draftValues = [];
    }

    validateAndProceed() {
        for (let item of this.items) {
            if (item.Quantity__c < 1 || item.Quantity__c > item.Available_Units__c) {
                alert(`${item.Name}: Quantity must be between 1 and ${item.Available_Units__c}`);
                return;
            }
        }

        this.dispatchEvent(new CustomEvent('nextstep', {
            detail: { updatedCart: this.items }
        }));
    }

    addMoreProducts() {
        this.dispatchEvent(new CustomEvent('addmore'));
    }
}
