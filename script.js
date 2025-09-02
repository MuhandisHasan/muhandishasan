document.addEventListener('DOMContentLoaded', function() {

    // --- Get all the necessary elements from the DOM ---
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