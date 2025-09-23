// BACK TO TOP BUTTON 
        class BrandHubBackTopButton extends HTMLElement {
          constructor() {
            super();
        
            // Attach shadow DOM to encapsulate styles and markup
            const shadow = this.attachShadow({ mode: 'open' }); 
        
            // Create the button structure
            shadow.innerHTML = `
              <style>
                /* Style for the back-to-top button */
                button {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  background-color: rgb(255, 193, 7);
                  color: white;
                  border: none;
                  border-radius: 50%;
                  width: 50px;
                  height: 50px;
                  font-size: 24px;
                  cursor: pointer;
                  display: none; /* Initially hidden */
                  z-index: 9999;
                }
        
                button:hover {
                  background-color:rgb(0, 0, 0);
                }
              </style>
        
              <!-- Button Markup -->
              <button aria-label="Scroll to top">↑</button>
            `;
        
            // Get the button element
            const button = shadow.querySelector('button');  
        
            // Show/hide the button based on scroll position
            window.addEventListener('scroll', () => {
              if (window.scrollY > 300) {
                button.style.display = 'block'; // Show button when scrolled down
              } else {
                button.style.display = 'none'; // Hide button when at the top
              }
            });
        
            // Scroll to top when the button is clicked
            button.addEventListener('click', () => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scrolling effect
              });
            });
          }
        }
        
        // Register the custom element
        customElements.define('brandhub-back-top-button', BrandHubBackTopButton);




        // CHECKOUT JAVASCRIPT for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

