if (!customElements.get("collection-products-swiper")) {
    class CollectionProductsSwiper extends HTMLElement {
      connectedCallback() {
        this.initSwiper(); // Initialize swiper when connected
      }
  
      disconnectedCallback() {
        // Cleanup the swiper instance and remove event listeners when disconnected
        this.destroySwiper();
      }
  
      // Initialize Swiper only if the screen width is above 1024px
      initSwiper() {
        console.log(this.swiper)
         // eslint-disable-next-line no-undef
         this.swiper = new Swiper(this.querySelector(".collection-products-swiper__products"), {
          slidesPerView: "4",
          spaceBetween: 20,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      }
  
      // Destroy the swiper instance if it exists
      destroySwiper() {
        if (this.swiper) {
          this.swiper.destroy(true, true); // Destroy swiper instance
          this.swiper = null; // Reset the swiper reference
          this.classList.remove("swiper");
        }
      }
  

    }
    customElements.define("collection-products-swiper", CollectionProductsSwiper);
  }
  