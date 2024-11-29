if (!customElements.get("product-card")) {
    class ProductCard extends HTMLElement {
      connectedCallback() {
        this.product = JSON.parse(this.querySelector('#p-data').innerHTML);
        this.openProductQuickAdd()
        this.handleQuickAddButton();
        this.updateBorders(this);
      }
  
      disconnectedCallback() {
      }
      

      handleQuickAddButton(){
        const QuickAddButton = this.querySelector('.product-card__quick-atc');
        const loadingSpinner = QuickAddButton.querySelector('.loading__spinner');
        QuickAddButton.addEventListener('click', () => this.handleQuickAddClick(QuickAddButton, loadingSpinner));
      }
      async handleQuickAddClick(QuickAddButton, loadingSpinner) {
        const productUrl = `/products/${this.product.data.handle}`;
        this.toggleLoadingState(QuickAddButton, loadingSpinner, true);

        try {
          const responseText = await this.fetchProductData(productUrl);
          const template = this.extractTemplate(responseText);
          if (template) {
            this.appendTemplateContent(template);
            document.body.classList.add("overflow-hidden");
            this.addCloseDrawerTriggers(document.querySelector(`.quick-view-product`))
            this.updateBorders(document.querySelector(`.quick-view-product`));
            this.addOpenAnimation(document.querySelector(`.quick-view-drawer`));
            // this.initializeDrawer();
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.toggleLoadingState(QuickAddButton, loadingSpinner, false);
        }
      }
      async fetchProductData(url) {
        const response = await fetch(url);
        return response.text();
      }
      extractTemplate(responseText) {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        return html.querySelector(`#QuickViewProduct-${this.product.data.id}`);
      }

      appendTemplateContent(template) {
        document.body.appendChild(template.content);
      }
      addOpenAnimation(element){
        setTimeout(() => {
          element.style.setProperty('--transform-value','0%')
        }, 300);
      }
      addCloseDrawerTriggers(element){
        const xClose = element.querySelector(".quick-view-drawer__close");
        const overlay = element.querySelector(".quick-view-product__overlay");
        [xClose,overlay].forEach((el) => {
          el.addEventListener('click',(e) =>{
            e.preventDefault();
            e.stopPropagation();
            element.querySelector(".quick-view-drawer").style.setProperty('--transform-value','0%');
            setTimeout(() => {
              document.removeChild(element);
            }, 500);
          })
        })
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
      openProductQuickAdd(){
        const openSource = this.querySelector(".product-card__link");
        this.productMenu = this.querySelector(".product-card__menu");
        openSource.addEventListener('click',(e)=>{
          if(e.target !== this.productMenu && !this.productMenu.classList.contains("product-card__menu--open")){
            this.productMenu.classList.add('product-card__menu--open');
          }else if(!this.productMenu.contains(e.target) && this.productMenu.classList.contains("product-card__menu--open")){
            this.productMenu.classList.remove('product-card__menu--open');
          }
        })
        openSource.addEventListener('mouseleave',()=>{
          if(this.productMenu.classList.contains("product-card__menu--open")){
            this.productMenu.classList.remove('product-card__menu--open');
          }
        })
      }
      // Function to update label borders
       updateBorders(element) {
        const radioInputs = element.querySelectorAll('input');
        console.log(radioInputs)
        // Iterate through all radio inputs
        const updateLabel = () => {
          radioInputs.forEach((input) => {
            const label = input.parentElement; // Parent label
            if (input.checked) {
              label.classList.add("label--active");
            } else {
              label.classList.remove("label--active");
            }
          });
        }
        updateLabel();
        // Add event listeners to all radio inputs
        radioInputs.forEach((input) => {
          input.addEventListener('change', updateLabel);
        });
      }

      

    }
    customElements.define("product-card", ProductCard);
  }
  