if (!customElements.get("products-description-swiper")) {
  class ProductsDescription extends HTMLElement {
    constructor() {
      super();
      this.cache = {}; // Cache to store fetched results
    }

    connectedCallback() {
      this.initSwiper(); // Initialize swiper when connected
    }

    disconnectedCallback() {
      this.destroySwiper(); // Cleanup swiper instance
    }


    initSwiper() {
      this.swiper = new Swiper(
        this.querySelector(".product-description-swiper__swiper"),
        {
          slidesPerView: "1",
          navigation: {
            nextEl: ".product-description-swiper__swiper-button-next",
            prevEl: ".product-description-swiper__swiper-button-prev",
          },
        }
      );
    }

    destroySwiper() {
      if (this.swiper) {
        this.swiper.destroy(true, true); // Destroy swiper instance
        this.swiper = null; // Reset swiper reference
      }
    }
  }

  customElements.define("products-description-swiper", ProductsDescription);
}
