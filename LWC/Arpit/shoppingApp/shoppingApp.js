import { LightningElement, track } from 'lwc';

export default class ShoppingApp extends LightningElement {
    @track currentPage = 'product';
    @track selectedProducts = [];
    @track updatedCart = [];

    handleGoToCart(event) {
        this.selectedProducts = event.detail.selectedProducts;
        this.currentPage = 'cart';
    }

    handleAddMore() {
        this.currentPage = 'product';
    }

    handleProceedToInvoice(event) {
        this.updatedCart = event.detail.updatedCart;
        this.currentPage = 'invoice';
    }

    handlePlaceOrder() {
        this.placedOrders = [...this.updatedCart];
    this.currentPage = 'confirmation';
    }

    handleViewOrders() {
        this.currentPage = 'orders';
    }

    handleReorder(event) {
        const reorderedItem = event.detail.item;
        this.selectedProducts = [reorderedItem];
        this.currentPage = 'cart';
    }

    get isProductPage() {
        return this.currentPage === 'product';
    }

    get isCartPage() {
        return this.currentPage === 'cart';
    }

    get isInvoicePage() {
        return this.currentPage === 'invoice';
    }

    get isConfirmationPage() {
        return this.currentPage === 'confirmation';
    }

    get isOrdersPage() {
        return this.currentPage === 'orders';
    }
}
