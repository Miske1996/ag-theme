if (!customElements.get("collection-videos-swiper")) {
    class CollectionVideosSwiper extends HTMLElement {
      connectedCallback() {
        this.initSwiper(); // Initialize swiper when connected
      }
  
      disconnectedCallback() {
        // Cleanup the swiper instance and remove event listeners when disconnected
        this.destroySwiper();
      }
  
      // Initialize Swiper only if the screen width is above 1024px
      initSwiper() {
         // eslint-disable-next-line no-undef
         this.swiper = new Swiper(this.querySelector(".collection-videos-swiper__products"), {
          slidesPerView: "auto",
          spaceBetween: 10,
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
    customElements.define("collection-videos-swiper", CollectionVideosSwiper);
  }
  