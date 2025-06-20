import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {
    showOrders = true;
    showCart = false;
    showInvoice = false;
    showOrderSuccess = false;
    showProducts = false;

    connectedCallback() {
        this.template.addEventListener('showcomponent', this.handleShowComponent);
    }

    handleShowComponent = (event) => {
        const componentName = event.detail;

        // Reset all flags to false
        this.showOrders = false;
        this.showCart = false;
        this.showInvoice = false;
        this.showOrderSuccess = false;
        this.showProducts = false;

        // Activate the requested component
        switch (componentName) {
            case 'cart':
                this.showCart = true;
                break;
            case 'invoice':
                this.showInvoice = true;
                break;
            case 'orders':
                this.showOrders = true;
                break;
            case 'orderSuccess':
                this.showOrderSuccess = true;
                break;
            case 'products':
                this.showProducts = true;
                break;
        }
    }
}