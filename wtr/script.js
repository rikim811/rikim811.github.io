document.addEventListener('DOMContentLoaded', function() {
    populateBookSelect();
    toggleBookSelect();  // Ensure the correct elements are shown/hidden on load
    document.getElementById('testamentSelect').addEventListener('change', toggleBookSelect);
});

document.getElementById('randomizeBtn').addEventListener('click', function() {
    const testament = document.getElementById('testamentSelect').value;
    const section = document.getElementById('sectionSelect').value;
    const book = document.getElementById('bookSelect').value;
    fetchChapter(testament, section, book);
});

function fetchChapter(testament, section, book) {
    if (book === 'random' || testament !== 'specific') {
        const books = getBooksBySection(testament, section);
        if (!books || books.length === 0) {
            console.error('No books found for the selected section');
            return;
        }
        const randomBook = books[Math.floor(Math.random() * books.length)];
        book = randomBook;
    }

    const bookFile = `data/${book.toLowerCase().replace(/ /g, '-')}.json`;
    
    fetch(bookFile)
        .then(response => response.json())
        .then(data => {
            if (!data[book]) {
                console.error('Book data not found in JSON file');
                return;
            }
            const chapter = getRandomKey(data[book]);
            const summary = data[book][chapter];

            displayChapter(book, chapter, summary);
        })
        .catch(error => console.error('Error fetching the chapter:', error));
}

function toggleBookSelect() {
    const testament = document.getElementById('testamentSelect').value;
    const sectionSelect = document.getElementById('sectionSelect');
    const bookSelect = document.getElementById('bookSelect');

    if (testament === 'specific') {
        sectionSelect.style.display = 'none';
        bookSelect.style.display = 'inline';
    } else if (testament === 'category') {
        sectionSelect.style.display = 'inline';
        bookSelect.style.display = 'none';
        document.getElementById('bookSelect').value = 'random';
    } else {
        sectionSelect.style.display = 'none';
        bookSelect.style.display = 'none';
        document.getElementById('bookSelect').value = 'random';
    }
}

function populateBookSelect() {
    const bookSelect = document.getElementById('bookSelect');
    bookSelect.innerHTML = '<option value="random">Random Book</option>';

    const books = [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', 
        '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 
        'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 
        'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 
        'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 
        'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', 
        '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', 
        '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', 
        '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ];

    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book;
        option.textContent = book;
        bookSelect.appendChild(option);
    });
}

function getBooksBySection(testament, section) {
    const bibleBooks = {
        whole: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'],
        ot: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
        nt: ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']
    };

    const sections = {
        law: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
        historical: ['Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther'],
        poetic: ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Songs'],
        prophets: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
        maprophets: ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel'],
        miprophets: ['Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
        gospels: ['Matthew', 'Mark', 'Luke', 'John'],
        letters: ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude'],
    };

    if (testament === 'whole') {
        return bibleBooks.whole;
    } else if (testament === 'ot') {
        return bibleBooks.ot;
    } else if (testament === 'nt') {
        return bibleBooks.nt;
    } else {
        return sections[section] || [];
    }
}

function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}

function displayChapter(book, chapter, summary) {
    const chapterTitle = document.getElementById('chapterTitle');
    const chapterSummary = document.getElementById('chapterSummary');

    const bookAbbreviations = {
        'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM', 'Deuteronomy': 'DEU',
        'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT', '1 Samuel': '1SA', '2 Samuel': '2SA',
        '1 Kings': '1KI', '2 Kings': '2KI', '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR',
        'Nehemiah': 'NEH', 'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Proverbs': 'PRO',
        'Ecclesiastes': 'ECC', 'Song of Songs': 'SNG', 'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM',
        'Ezekiel': 'EZK', 'Daniel': 'DAN', 'Hosea': 'HOS', 'Joel': 'JOL', 'Amos': 'AMO', 'Obadiah': 'OBA',
        'Jonah': 'JON', 'Micah': 'MIC', 'Nahum': 'NAM', 'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG',
        'Zechariah': 'ZEC', 'Malachi': 'MAL', 'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN',
        'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL',
        'Ephesians': 'EPH', 'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH', '2 Thessalonians': '2TH',
        '1 Timothy': '1TI', '2 Timothy': '2TI', 'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS',
        '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN', '3 John': '3JN', 'Jude': 'JUD',
        'Revelation': 'REV'
    };

    const bookAbbreviation = bookAbbreviations[book] || book.toUpperCase().substring(0, 3);
    chapterTitle.innerHTML = `<a href="https://www.bible.com/bible/116/${bookAbbreviation}.${chapter}.NLT" target="_blank">${book} ${chapter}</a>`;
    chapterSummary.innerText = summary;
}
