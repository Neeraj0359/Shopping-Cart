import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ProductPage extends LightningElement {
    @track products = [];
    @track pagedProducts = [];
    @track searchKey = '';
    @track selectedProducts = [];

    pageSize = 10;
    currentPage = 1;
    totalPages = 1;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Price', fieldName: 'Price__c', type: 'currency' },
        { label: 'Available Units', fieldName: 'AvailableUnits__c', type: 'number' }
    ];

    get disableCartButton() {
        return this.selectedProducts.length === 0;
    }

    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.updatePagination();
        } else {
            console.error(error);
        }
    }

    updatePagination() {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        const filtered = this.products.filter(p => p.Name.toLowerCase().includes(this.searchKey.toLowerCase()));
        this.totalPages = Math.ceil(filtered.length / this.pageSize);
        this.pagedProducts = filtered.slice(start, end);
    }
    

    handleSearch(event) {
        this.searchKey = event.target.value;
        this.currentPage = 1;
        this.updatePagination();
    }

    handleSelection(event) {
        this.selectedProducts = event.detail.selectedRows;
    }

    goToCart() {
        const event = new CustomEvent('gotocart', {
            detail: { selectedProducts: this.selectedProducts }
        });
        this.dispatchEvent(event);
    }

    handleFirst() {
        this.currentPage = 1;
        this.updatePagination();
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
        }
    }

    handleNext() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagination();
        }
    }

    handleLast() {
        this.currentPage = this.totalPages;
        this.updatePagination();
    }
    
}
