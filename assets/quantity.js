

  if (!customElements.get("quantity-selector")) {
    class Quantity extends HTMLElement {
    connectedCallback() {
      const minus = this.querySelector(".js-qte-minus");
      const plus = this.querySelector(".js-qte-plus");
      const display = this.querySelector(".js-qte-input");

      if (display.value > 1) {
        minus.disabled = false;
      }

      const dispatchQtyEvent = (amount) => {
        if (amount < display.value) {
          const eventQty = new CustomEvent("changeQuantityPlus", {
            bubbles: true,
            detail: {
              id: this.getAttribute("data-variant-id"),
              qty: display.value - amount,
            },
          });
          this.dispatchEvent(eventQty);
        } else {
          const eventQty = new CustomEvent("changeQuantity", {
            bubbles: true,
            detail: {
              id: this.getAttribute("data-variant-key"),
              qty: display.value,
            },
          });
          this.dispatchEvent(eventQty);
        }
      };

      minus.addEventListener("click", (e) => {
        e.stopPropagation();
        const amount = parseInt(display.value, 10);
        display.value = amount - 1;
        if (amount - 1 === 1) {
          minus.disabled = true;
        }
        dispatchQtyEvent(amount);
      });

      plus.addEventListener("click", (e) => {
        e.stopPropagation();
        const amount = parseInt(display.value, 10);
        if (amount === 1) {
          minus.disabled = false;
        }
        display.value = amount + 1;
        dispatchQtyEvent(amount);
      });

      display.addEventListener("change", () => {
        const amount = parseInt(display.value, 10);
        if (display.value < 1) {
          display.value = 1;
          minus.disabled = true;
        }
        if (display.value > 1) {
          minus.disabled = false;
        }
        dispatchQtyEvent(amount);
      });
    }
  }
    customElements.define("quantity-selector", Quantity);
  }