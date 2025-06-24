import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';

export default class ProductPage extends LightningElement {
    @track allProducts = [];
    @track filteredProducts = [];
    @track selectedProducts = [];

    searchKey = '';
    pageSize = 5;
    currentPage = 1;

    @wire(getProducts)
    wiredProducts({ data, error }) {
        if (data) {
            // Disable selection for 0 unit products
            this.allProducts = data.map(prod => ({
                ...prod,
                isDisabled: prod.Available_Unit__c === 0
            }));
            this.filteredProducts = [...this.allProducts];

            const saved = localStorage.getItem('selectedProducts');
            if (saved) {
                this.selectedProducts = JSON.parse(saved);
            }
        } else if (error) {
            console.error('Error:', error);
        }
    }

    get columns() {
        return [
            { label: 'Name', fieldName: 'Name' },
            { label: 'Price', fieldName: 'Price__c', type: 'currency' },
            { label: 'Available', fieldName: 'Available_Unit__c', type: 'number' }
        ];
    }

    // Search
    handleSearch(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.currentPage = 1;
        this.filteredProducts = this.allProducts.filter(prod =>
            prod.Name.toLowerCase().includes(this.searchKey)
        );
    }

    // Pagination logic
    get pagedProducts() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredProducts.slice(start, start + this.pageSize);
    }

    nextPage() {
        const maxPage = Math.ceil(this.filteredProducts.length / this.pageSize);
        if (this.currentPage < maxPage) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    get selectedRowIds() {
        const currentIds = this.pagedProducts.map(p => p.Id);
        return this.selectedProducts
            .filter(item => currentIds.includes(item.Id))
            .map(item => item.Id);
    }

    handleSelection(event) {
        const newSelected = event.detail.selectedRows;
        const currentPageIds = this.pagedProducts.map(p => p.Id);

        // Remove old selections for current page
        this.selectedProducts = this.selectedProducts.filter(
            item => !currentPageIds.includes(item.Id)
        );

        // Add new selections
        this.selectedProducts = [...this.selectedProducts, ...newSelected];

        localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
    }

    goToCart() {
        localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
        this.dispatchEvent(new CustomEvent('gotocart', { bubbles: true }));
    }

    get isDisabled() {
        return this.selectedProducts.length === 0;
    }
}
