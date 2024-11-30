if (!customElements.get("cart-drawer")) {
  class Cart extends HTMLElement {
    connectedCallback() {
      this.cartInitOpen();
      this.cartInitClose();
      this.initQuantityChanges();
    }

    disconnectedCallback() {}

    initQuantityChanges() {
      this.addEventListener("changeQuantityPlus", (e) => {
        this.querySelector(".cart-items").classList.add("cart-items--loading");
        const idItem = e.detail.id
        const updates = {};
        updates[idItem] = e.detail.qty;
        console.log(updates)
        this.updateCartValue(updates).finally(() => {
          this.querySelector(".cart-items").classList.remove(
            "cart-items--loading"
          );
        });
      });
      this.addEventListener("changeQuantity", (e) => {
        this.querySelector(".cart-items").classList.add("cart-items--loading");
        const idItem = e.detail.id
        const updates = {};
        updates[idItem] = e.detail.qty;
        console.log(updates)
        this.updateCartValue(updates).finally(() => {
          this.querySelector(".cart-items").classList.remove(
            "cart-items--loading"
          );
        });
      });
    }

    async updateCart(object) {
      const formData = {
        items: [object],
      };
      // this.loading(true)
      try {
        const response = await fetch(
          `${window.Shopify.routes.root}cart/add.js?sections=cart,header`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const responseJson = await response.json();

        if (!response.ok) {
          throw {
            message: responseJson.message,
            status: responseJson.status,
          };
        }

        this.updateUI(responseJson.sections);
        document.querySelectorAll(".js-open-cart")[0].click();
      } catch (error) {
        console.log(error);
      }
    }

    async updateCartCard(object) {
      const formData = {
        items: [object],
      };
      // this.loading(true)
      try {
        const response = await fetch(
          `${window.Shopify.routes.root}cart/add.js?sections=cart,header`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const responseJson = await response.json();

        if (!response.ok) {
          throw {
            message: responseJson.message,
            status: responseJson.status,
          };
        }
        this.updateUI(responseJson.sections);
      } catch (error) {
        console.log(error);
      }
    }

    async updateCartValue(updates) {
        try {
          const response = await fetch(
            `${window.Shopify.routes.root}cart/update.js?sections=cart,header`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ updates }),
            }
          );
          const responseJson = await response.json();
  
          if (!response.ok) {
            throw {
              message: responseJson.message,
              status: responseJson.status,
            };
          }
          this.updateUI(responseJson.sections);
        } catch (error) {
          console.log(error);
        }
      }
    updateUI(sections) {
      const htmlHeader = new DOMParser().parseFromString(
        sections.header,
        "text/html"
      );
      const htmlCart = new DOMParser().parseFromString(
        sections.cart,
        "text/html"
      );

      document.querySelector(".cart-drawer__footer-total").innerHTML =
        htmlCart.querySelector(".cart-drawer__footer-total").innerHTML;
      document.querySelector(".cart-drawer__header-total-items").innerHTML =
        htmlCart.querySelector(".cart-drawer__header-total-items").innerHTML;
      document.querySelector(".cart-items__wrapper").innerHTML =
        htmlCart.querySelector(".cart-items__wrapper").innerHTML;
      document.querySelector(".shipping-progress__text").innerHTML =  htmlCart.querySelector(".shipping-progress__text").innerHTML;
      document.querySelector(".shipping-progress__bar-inner").style.setProperty("--width",htmlCart.querySelector(".shipping-progress__bar-inner").style.getPropertyValue('--width'))
    }
    cartInitOpen() {
      const triggers = document.querySelectorAll(".js-open-cart");
      const cart = this.querySelector(".cart-drawer__main");
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          cart.parentElement.style.visibility = "visible";
          cart.style.setProperty("--transform-value", "0%");
          cart.parentElement
            .querySelector(".cart-drawer__overlay")
            .style.setProperty("--opacity", "1");
          document.body.classList.add("overflow-hidden");
        });
      });
    }
    cartInitClose() {
      const triggers = document.querySelectorAll(".js-close-cart");
      const cart = this.querySelector(".cart-drawer__main");
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          cart.parentElement.style.visibility = "hidden";
          cart.style.setProperty("--transform-value", "100%");
          cart.parentElement
            .querySelector(".cart-drawer__overlay")
            .style.setProperty("--opacity", "0");
          document.body.classList.remove("overflow-hidden");
        });
      });
    }
  }
  customElements.define("cart-drawer", Cart);
}
