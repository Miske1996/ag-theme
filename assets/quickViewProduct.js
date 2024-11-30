

if (!customElements.get("quick-view-product")) {
    class QuickViewProduct extends HTMLElement {
    connectedCallback() {
        this.defaultVariantId = this.getAttribute("default-variant-id");
        this.cart = document.querySelector("cart-drawer")
        this.handleAddDefaultVariant();
    }

    handleAddDefaultVariant(){
        const quickAdd = this.querySelector(".quick-view-drawer__atc");
        quickAdd.addEventListener('click',(e) => {
            
                const qte = this.querySelector(".js-qte-input").value
                this.cart.updateCart({
                    id: this.defaultVariantId,
                    quantity: qte
                })
        })
    }

  }
    customElements.define("quick-view-product", QuickViewProduct);
  }