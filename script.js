document.addEventListener('DOMContentLoaded', () => {
    const productPrice = 3500;
    const deliveryPriceElement = document.getElementById('delivery-price');
    const totalPriceElement = document.getElementById('total-price');
    const wilayaSelect = document.getElementById('wilaya');
    const form = document.querySelector('form');
    const loader = document.getElementById('loader');

    // Initially hide the loader
    loader.style.display = 'none';

    // Debugging: Check if elements are correctly found
    if (!deliveryPriceElement || !totalPriceElement || !wilayaSelect) {
        console.error('One or more elements not found in the DOM');
        return;
    }

    // Fetch the data from the JSON file
    fetch('data.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            // Check the fetched data
            console.log('Fetched data:', data);

            // Populate the select element with options
            Object.keys(data).forEach(wilaya => {
                const option = document.createElement('option');
                option.value = wilaya;
                option.textContent = wilaya;
                wilayaSelect.appendChild(option);
            });

            // Add event listener for select change
            wilayaSelect.addEventListener('change', function() {
                const selectedWilaya = this.value;
                if (data[selectedWilaya]) {
                    const deliveryPrice = data[selectedWilaya].delivery_price;

                    // Update the delivery price and total price
                    deliveryPriceElement.textContent = deliveryPrice;
                    totalPriceElement.textContent = productPrice + deliveryPrice;
                } else {
                    console.error('Selected wilaya not found in data');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
        });

    // Add event listener for form submission to show the loader
    form.addEventListener('submit', function() {
        loader.style.display = 'flex'; // Show the loader
    });
});
/* ----------------------------------*/
const Confettiful = function(el) {
    this.el = el;
    this.containerEl = null;
  
    this.confettiFrequency = 20; // Increased frequency for better coverage
    this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];
  
    this._setupElements();
    this._renderConfetti();
  };
  
  Confettiful.prototype._setupElements = function() {
    const containerEl = document.createElement('div');
    containerEl.classList.add('confetti-container');
    this.el.appendChild(containerEl);
    this.containerEl = containerEl;
  };
  
  Confettiful.prototype._renderConfetti = function() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = `${Math.floor(Math.random() * 10) + 10}px`; // Size of squares
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = `${Math.floor(Math.random() * 100)}%`; // Full width coverage
      const confettiTop = `-${confettiSize}`; // Start above view
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
  
      confettiEl.classList.add('confetti', `confetti--animation-${confettiAnimation}`);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.top = confettiTop;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;
      
      // Apply 3D rotation
      confettiEl.style.transform = `rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg)`;
  
      confettiEl.removeTimeout = setTimeout(() => {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 4000); // Adjusted timeout for more visibility
  
      this.containerEl.appendChild(confettiEl);
    }, 50); // Adjusted frequency for better dispersion
  };
  
  // Initialize Confetti
  window.confettiful = new Confettiful(document.querySelector('.js-container'));
  