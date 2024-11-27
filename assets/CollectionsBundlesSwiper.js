if (!customElements.get("collection-bundles-swiper")) {
  class CollectionBundlesSwiper extends HTMLElement {
    constructor() {
      super();
      this.cache = {}; // Cache to store fetched results
    }

    connectedCallback() {
      this.initSwiper(); // Initialize swiper when connected
      this.preloadProducts(); // Preload all product data
      this.setupButtonListeners(); // Set up event listeners
    }

    disconnectedCallback() {
      this.destroySwiper(); // Cleanup swiper instance
    }

    async fetchProductData(url) {
      const response = await fetch(url);
      return response.text();
    }

    extractTemplate(responseText) {
      const html = new DOMParser().parseFromString(responseText, "text/html");
      return html.querySelector("#CardsCollection");
    }

    toggleActiveButton(buttons, index) {
      buttons.forEach((btn) =>
        btn.classList.remove("collection-bundles-swiper__nav-link--active")
      );
      buttons[index].classList.add("collection-bundles-swiper__nav-link--active");
    }

    preloadProducts() {
      const buttons = this.querySelectorAll(".collection-bundles-swiper__nav-link");
      buttons.forEach(async (button) => {
        const url = button.getAttribute("url");
        if (!this.cache[url]) {
          try {
            const responseText = await this.fetchProductData(url);
            const template = this.extractTemplate(responseText);
            this.cache[url] = Array.from(template.content.children); // Cache product nodes
          } catch (error) {
            console.error(`Failed to preload products for URL ${url}:`, error);
          }
        }
      });
    }

    setupButtonListeners() {
      const buttons = this.querySelectorAll(".collection-bundles-swiper__nav-link");
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          this.toggleActiveButton(buttons, index);
          const url = button.getAttribute("url");
          if (this.cache[url]) {
            this.renderProducts(this.cache[url]); // Render from cache
          } else {
            console.error(`No cached data available for URL: ${url}`);
          }
        });
      });
    }

    renderProducts(products) {
      const wrapper = this.querySelector(".collection-bundles-swiper__wrapper");
      wrapper.innerHTML = ""; // Clear current content
    
      // Use a DocumentFragment to append all products at once
      const fragment = document.createDocumentFragment();
      products.forEach((product) => {
        fragment.appendChild(product.cloneNode(true)); // Append clones to the fragment
      });
    
      wrapper.appendChild(fragment); // Append the fragment to the wrapper
      this.destroySwiper();
      this.initSwiper();
    }
    

    initSwiper() {
      this.swiper = new Swiper(
        this.querySelector(".collection-bundles-swiper__products"),
        {
          slidesPerView: 4,
          spaceBetween: 20,
          navigation: {
            nextEl: ".collection-bundles-swiper__swiper-button-next",
            prevEl: ".collection-bundles-swiper__swiper-button-prev",
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

  customElements.define("collection-bundles-swiper", CollectionBundlesSwiper);
}
