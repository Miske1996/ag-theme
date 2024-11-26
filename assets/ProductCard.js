if (!customElements.get("product-card")) {
    class ProductCard extends HTMLElement {
      connectedCallback() {
        this.openProductQuickAdd(); // Initialize swiper when connected
      }
  
      disconnectedCallback() {
      }
  
     
  
      openProductQuickAdd(){
        const openSource = this.querySelector(".product-card__link");
        const productMenu = this.querySelector(".product-card__menu");
        openSource.addEventListener('click',(e)=>{
          if(e.target !== productMenu && !productMenu.classList.contains("product-card__menu--open")){
            productMenu.classList.add('product-card__menu--open');
          }else if(e.target !== productMenu && productMenu.classList.contains("product-card__menu--open")){
            productMenu.classList.remove('product-card__menu--open');
          }
        })
        openSource.addEventListener('mouseleave',()=>{
          if(productMenu.classList.contains("product-card__menu--open")){
            productMenu.classList.remove('product-card__menu--open');
          }
        })
      }
    }
    customElements.define("product-card", ProductCard);
  }
  