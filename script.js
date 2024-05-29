document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Riki Official Website Loaded');

    // Countdown to birthday
    const birthday = new Date(new Date().getFullYear(), 7, 11); // August 11th
    const countdown = document.getElementById('countdown');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const distance = birthday - now;

        if (distance < 0) {
            birthday.setFullYear(birthday.getFullYear() + 1);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysSpan.textContent = days;
        hoursSpan.textContent = hours;
        minutesSpan.textContent = minutes;
        secondsSpan.textContent = seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to set the countdown

    // Search bar functionality
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function() {
        const filter = searchBar.value.toLowerCase();
        const versionColumns = document.querySelectorAll('.version-column p');

        versionColumns.forEach(function(version) {
            const text = version.textContent.toLowerCase();
            if (text.includes(filter)) {
                version.style.display = '';
            } else {
                version.style.display = 'none';
            }
        });
    });
});
