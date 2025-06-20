import { LightningElement, track } from 'lwc';
import fetchOrders from '@salesforce/apex/OrderController.fetchOrders';
import getTotalCount from '@salesforce/apex/OrderController.getTotalCount';

const COLUMNS = [
    { label: 'PO Id', fieldName: 'Name', type: 'text' },
    { label: 'Status', fieldName: 'Status__c', type: 'text' },
    { label: 'Order Total', fieldName: 'Order_Total__c', type: 'currency' }
];

export default class OrdersLWC extends LightningElement {
    @track orders = [];
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
        this.loadOrders();
    }

    loadOrders() {
        getTotalCount()
            .then(count => {
                this.totalRecords = count;
                this.totalPages = Math.ceil(count / this.pageSize);
                return fetchOrders({
                    limitSize: this.pageSize,
                    offsetSize: (this.currentPage - 1) * this.pageSize
                });
            })
            .then(result => {
                this.orders = result;
            })
            .catch(error => {
                console.error('Error loading orders', error);
            });
    }

    handleNext() {
        if (!this.isLastPage) {
            this.currentPage++;
            this.loadOrders();
        }
    }

    handlePrevious() {
        if (!this.isFirstPage) {
            this.currentPage--;
            this.loadOrders();
        }
    }

    handleFirst() {
        this.currentPage = 1;
        this.loadOrders();
    }

    handleLast() {
        this.currentPage = this.totalPages;
        this.loadOrders();
    }

    handleAddOrder() {
        const event = new CustomEvent('showcomponent', {
            detail: 'products', // ya 'addOrder' based on your setup
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}
