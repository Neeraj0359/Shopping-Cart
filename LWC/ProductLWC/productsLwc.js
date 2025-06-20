import { LightningElement, track } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import getProductCount from '@salesforce/apex/ProductController.getProductCount';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Price', fieldName: 'Price__c', type: 'currency' },
    { label: 'Product Code', fieldName: 'ProductCode', type: 'text' },
    { label: 'Available Units', fieldName: 'Available_Units__c', type: 'number' }
];

export default class ProductsLwc extends LightningElement {
    @track products = [];
    columns = COLUMNS;

    pageSize = 5;
    currentPage = 1;
    totalRecords = 0;
    totalPages = 0;

    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    connectedCallback() {
        this.loadProducts();
    }

    loadProducts() {
        getProductCount()
            .then(count => {
                this.totalRecords = count;
                this.totalPages = Math.ceil(count / this.pageSize);
                return getProducts({
                    limitSize: this.pageSize,
                    offsetSize: (this.currentPage - 1) * this.pageSize
                });
            })
            .then(result => {
                this.products = result;
            })
            .catch(error => {
                console.error('Error loading products', error);
            });
    }

    handleNext() {
        if (!this.isLastPage) {
            this.currentPage++;
            this.loadProducts();
        }
    }

    handlePrevious() {
        if (!this.isFirstPage) {
            this.currentPage--;
            this.loadProducts();
        }
    }

    handleFirst() {
        this.currentPage = 1;
        this.loadProducts();
    }

    handleLast() {
        this.currentPage = this.totalPages;
        this.loadProducts();
    }

    handleGoToCart() {
        const evt = new CustomEvent('showcomponent', {
            detail: 'cart',
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(evt);
    }
}
