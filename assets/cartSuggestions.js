if (!customElements.get("cart-suggestions")) {
    class CollectionProductsSwiper extends HTMLElement {
      connectedCallback() {
        this.cart = document.querySelector("cart-drawer")
        this.initSwiper(); // Initialize swiper when connected
        this.quickAddToCart();
      }
  
      disconnectedCallback() {
        // Cleanup the swiper instance and remove event listeners when disconnected
        this.destroySwiper();
      }
  
      // Initialize Swiper only if the screen width is above 1024px
      initSwiper() {
         // eslint-disable-next-line no-undef
         this.swiper = new Swiper(this.querySelector(".cart-suggestions__wrapper"), {
          slidesPerView: "auto",
          spaceBetween: 12,
          navigation: {
            nextEl: ".cart-suggestions__swiper-button-next",
            prevEl: ".cart-suggestions__swiper-button-prev",
          },
        });
      }
  
      // Destroy the swiper instance if it exists
      destroySwiper() {
        if (this.swiper) {
          this.swiper.destroy(true, true); // Destroy swiper instance
          this.swiper = null; // Reset the swiper reference
        }
      }
      toggleLoadingState(button, spinner, isLoading) {
        if (isLoading) {
          button.classList.add('loading');
          spinner.classList.remove('hidden');
        } else {
          button.classList.remove('loading');
          spinner.classList.add('hidden');
        }
      }
      quickAddToCart(){
        const atcs = this.querySelectorAll(".cart-card .cart-card__atc")
        atcs.forEach((atc) => {
          atc.addEventListener('click',() =>{
            const loadingSpinner = atc.querySelector('.loading__spinner');
            this.toggleLoadingState(atc, loadingSpinner, true);
            const variantId = atc.closest(".cart-card").getAttribute("variant-id");
                this.cart.updateCartCard({
                    id: variantId,
                    quantity: 1
                }).finally(() => {
                    this.toggleLoadingState(atc, loadingSpinner, false);
                })
          })
        })
      }
    }
    customElements.define("cart-suggestions", CollectionProductsSwiper);
  }
  