import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ProductPage extends LightningElement {
    @track allProducts = [];
    @track selectedProducts = [];
    @track oldSelectedProducts = [];

    currentPage = 1;
    pageSize = 5;

    @wire(getProducts)
    wiredProducts({ data, error }) {
        if (data) {
            this.allProducts = data;

            // Restore previous selection
            const saved = localStorage.getItem('selectedProducts');
            if (saved) {
                this.selectedProducts = JSON.parse(saved);
            }
        }
        if (error) {
            console.error('Error fetching products:', error);
        }
    }

    get columns() {
        return [
            { label: 'Name', fieldName: 'Name' },
            { label: 'Price', fieldName: 'Price__c', type: 'currency' },
            { label: 'Available', fieldName: 'Available_Unit__c', type: 'number' }
        ];
    }

    get pagedProducts() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.allProducts.slice(start, start + this.pageSize);
    }

    get selectedRowIds() {
        return this.selectedProducts.map(item => item.Id);
    }

    get isDisabled() {
        return this.selectedProducts.length === 0;
    }

    handleSelection(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedProducts = selectedRows;
        localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
    }

    nextPage() {
        const maxPage = Math.ceil(this.allProducts.length / this.pageSize);
        if (this.currentPage < maxPage) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    goToCart() {
        localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
        this.dispatchEvent(new CustomEvent('gotocart', { bubbles: true }));
    }
}
