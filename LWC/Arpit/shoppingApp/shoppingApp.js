import { LightningElement, track } from 'lwc';

export default class ShoppingApp extends LightningElement {
    @track showProducts = true;
    @track showCart = false;
    @track showInvoice = false;
    @track showOrders = false;
    @track showOrderConfirmation = false;

    handleGoToCart() {
        this.resetPages();
        this.showCart = true;
    }

    handleGoToProducts() {
        this.resetPages();
        this.showProducts = true;
    }

    handleGoToInvoice() {
        this.resetPages();
        this.showInvoice = true;
    }

    handleOrderPlaced() {
        this.resetPages();
        this.showOrderConfirmation = true;
    }
    handleViewOrders() {
    this.resetPages();
    this.showOrders = true;
    }

    resetPages() {
        this.showProducts = false;
        this.showCart = false;
        this.showInvoice = false;
        this.showOrders = false;
        this.showOrderConfirmation = false;

    }
    
}
