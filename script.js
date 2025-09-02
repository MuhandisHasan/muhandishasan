document.addEventListener('DOMContentLoaded', function() {

    // --- NEW: Dynamic Shape Generation ---
    const shapeContainer = document.getElementById('shape-container');
    // 'square' is the default style for .bg-shape, so we don't need a class for it
    const shapeTypes = ['circle', 'triangle', 'square']; 
    const numberOfShapes = 35; // You can easily change this number

    function createShapes() {
        for (let i = 0; i < numberOfShapes; i++) {
            const shape = document.createElement('div');
            shape.classList.add('bg-shape');

            // 1. Randomly choose a shape type from the array
            const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            if (randomType !== 'square') {
                shape.classList.add(randomType);
            }

            // 2. Randomize the size of the shape (from 20px to 120px)
            const size = Math.random() * (120 - 20) + 20;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;

            // 3. Randomize the starting horizontal position
            shape.style.left = `${Math.random() * 100}%`;
            
            // 4. Randomize the animation duration for varied speeds (20s to 50s)
            shape.style.animationDuration = `${Math.random() * (20 - 5) + 5}s`;
            
            // 5. Randomize the animation delay so they don't all start at once (0s to 30s)
            shape.style.animationDelay = `${Math.random() * 30}s`;
            
            // 6. Set the initial top position to be just off-screen
            shape.style.top = `-${size}px`;

            shapeContainer.appendChild(shape);
        }
    }
    
    // Create the shapes when the page loads
    createShapes(); 


    // --- Get all the necessary elements from the DOM (Existing Code) ---
    const seeWorksButton = document.querySelector('a[href="#works"]');
    const portfolioSection = document.getElementById('works');
    const detailView = document.querySelector('.project-detail-view');
    const closeButton = document.querySelector('.close-button');
    const projectCards = document.querySelectorAll('.project-card');

    // --- Slider-specific elements ---
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // --- Detail view elements ---
    const detailImage = document.getElementById('detail-image');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');

    // --- Slider Logic ---
    let currentIndex = 0;
    let visibleCards = window.innerWidth > 900 ? 2 : 1;
    const totalCards = projectCards.length;

    function updateSlider() {
        const cardWidth = projectCards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(sliderTrack).gap);
        const moveDistance = (cardWidth + gap) * currentIndex;
        sliderTrack.style.transform = `translateX(-${moveDistance}px)`;
        updateButtons();
    }

    function updateButtons() {
        // Disable prev button if at the start
        prevBtn.disabled = currentIndex === 0;
        prevBtn.classList.toggle('disabled', currentIndex === 0);

        // Disable next button if at the end
        const endReached = currentIndex >= totalCards - visibleCards;
        nextBtn.disabled = endReached;
        nextBtn.classList.toggle('disabled', endReached);
    }
    
    // Slider button event listeners
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalCards - visibleCards) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    // Recalculate slider on window resize
    window.addEventListener('resize', () => {
        visibleCards = window.innerWidth > 900 ? 2 : 1;
        // Adjust index if it's out of bounds after resize
        if (currentIndex > totalCards - visibleCards) {
            currentIndex = totalCards - visibleCards;
        }
        updateSlider();
    });


    // --- Section & Detail View Logic ---

    // Event Listener for the "See My Works" button
    seeWorksButton.addEventListener('click', function(event) {
        event.preventDefault();
        portfolioSection.classList.add('visible');
        // Initial setup for the slider when section becomes visible
        updateSlider(); 
    });

    // Logic to open a project's detail view
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const imageUrl = this.dataset.imageUrl;
            const title = this.dataset.title;
            const description = this.dataset.description;

            detailImage.src = imageUrl;
            detailTitle.textContent = title;
            detailDescription.textContent = description;
            
            portfolioSection.classList.add('detail-active'); // Hides slider
            detailView.classList.add('active'); // Shows detail view
        });
    });

    // Logic to close the detail view
    closeButton.addEventListener('click', function() {
        portfolioSection.classList.remove('detail-active'); // Shows slider again
        detailView.classList.remove('active'); // Hides detail view
    });

});