if (!customElements.get("product-video-card")) {
    class ProductVideoCard extends HTMLElement {
      connectedCallback() {
        this.init(); // Initialize swiper when connected
      }
  
      disconnectedCallback() {
      }
  
     
  
      init(){
       
      }
    }
    customElements.define("product-video-card", ProductVideoCard);
  }
  