document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const serverCards = document.querySelectorAll('.server-card');

    searchBar.addEventListener('input', function() {
        const filter = searchBar.value.toLowerCase();
        serverCards.forEach(function(card) {
            const text = card.textContent.toLowerCase();
            if (text.includes(filter)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

function sortServers() {
    const container = document.querySelector('.servers');
    const serverCards = Array.from(document.querySelectorAll('.server-card'));

    serverCards.sort((a, b) => {
        return b.getAttribute('data-member-count') - a.getAttribute('data-member-count');
    });

    serverCards.forEach(card => container.appendChild(card));
}
