// Global app state
let currentScreen = 'home';
let imageCache = {
    games_feed: [],
    ip_feed: [],
    topics_feed: [],
    new_feed: []
};

// Available images based on directory scan
const availableImages = {
    games_feed: {
        blippi: ['oi3kwdxc3gqwyaglnacqh4cbgvsw.jpeg', 'whci7srvo2jvcrxk834jervj29nf.jpeg'],
        disney: ['vyzt5961fe52ooj0gr03ibi1mxo9.png'],
        lingokids: ['lrn9grunmnz73ppficks58rfn4an.jpeg', 'sj9c03d4vfbu0ukg0ob3q6aerkio.jpeg', 'vww2of3qii3bb1cjal9i2n5obuqj.jpeg'],
        pocoyo: ['qf6i5h7u7ipra7vjhmdar2lzevey.jpeg', 'v1dguo4j4hv3jqrggi5e7vxruklh.jpeg']
    },
    ip_feed: {
        blippi: ['16gzwt1z8awkhryivyiza1is85h1.jpeg'],
        lingokids: ['o50jtswuoh8k8x4kxy37yhiesbvq.jpeg', 'qtbn3r2kpevfoa9hityje3go0hqy.jpeg', 'ur9hp54ugj6z00sjjrjemtr1qb18.jpeg', 'wlsuq5qk0etz9jugk6yh2ghcfivo.jpeg'],
        pocoyo: ['m3ujlg7f0dg7nrtppdqin9xlt80t.jpeg']
    },
    topics_feed: {
        blippi: [],
        lingokids: ['art.png', 'engineering.png', 'english.png', 'literacy.png', 'math.png', 'science.jpeg'],
        pocoyo: []
    },
    new_feed: {
        blippi: ['oi3kwdxc3gqwyaglnacqh4cbgvsw.jpeg', 'whci7srvo2jvcrxk834jervj29nf.jpeg'],
        disney: ['vyzt5961fe52ooj0gr03ibi1mxo9.png'],
        lingokids: ['lrn9grunmnz73ppficks58rfn4an.jpeg', 'sj9c03d4vfbu0ukg0ob3q6aerkio.jpeg', 'vww2of3qii3bb1cjal9i2n5obuqj.jpeg'],
        pocoyo: ['qf6i5h7u7ipra7vjhmdar2lzevey.jpeg', 'v1dguo4j4hv3jqrggi5e7vxruklh.jpeg']
    }
};

// Sample data for demonstration
const sampleData = {
    games_feed: [
        { name: 'Animal Learning', tag: 'Animals', ip: 'lingokids' },
        { name: 'Math Fun', tag: 'Math', ip: 'lingokids' },
        { name: 'Letter Games', tag: 'Reading', ip: 'blippi' },
        { name: 'Color World', tag: 'Colors', ip: 'pocoyo' },
        { name: 'Shape Quest', tag: 'Shapes', ip: 'lingokids' },
        { name: 'Number Adventure', tag: 'Math', ip: 'blippi' },
        { name: 'Word Builder', tag: 'Reading', ip: 'lingokids' },
        { name: 'Music Maker', tag: 'Music', ip: 'pocoyo' },
        { name: 'Art Studio', tag: 'Creativity', ip: 'disney' },
        { name: 'Science Lab', tag: 'Science', ip: 'blippi' }
    ],
    ip_feed: [
        { name: 'Lessons', description: 'Interactive learning lessons', ip: 'lingokids' },
        { name: 'Lectoescritura', description: 'Reading and writing skills', ip: 'lingokids' },
        { name: 'Matemáticas', description: 'Fun math activities', ip: 'lingokids' },
        { name: 'Blippi Adventures', description: 'Educational videos and games', ip: 'blippi' },
        { name: 'Pocoyo World', description: 'Colorful learning experiences', ip: 'pocoyo' },
        { name: 'Story Time', description: 'Interactive storytelling', ip: 'lingokids' }
    ],
    topics_feed: [
        { name: 'Counting', category: 'Math', ip: 'lingokids' },
        { name: 'Sorting', category: 'Logic', ip: 'blippi' },
        { name: 'Creativity', category: 'Arts', ip: 'pocoyo' },
        { name: 'Subtraction', category: 'Math', ip: 'lingokids' },
        { name: 'Reading', category: 'Language', ip: 'blippi' },
        { name: 'Colors', category: 'Basic Skills', ip: 'pocoyo' }
    ],
    new_feed: [
        { name: 'Space Adventure', tag: 'Science', ip: 'blippi' },
        { name: 'Ocean Explorer', tag: 'Nature', ip: 'pocoyo' },
        { name: 'Kitchen Fun', tag: 'Life Skills', ip: 'lingokids' },
        { name: 'Garden Party', tag: 'Nature', ip: 'pocoyo' },
        { name: 'Robot Builder', tag: 'STEM', ip: 'blippi' },
        { name: 'Dance Party', tag: 'Music', ip: 'lingokids' },
        { name: 'Magic Show', tag: 'Creativity', ip: 'disney' },
        { name: 'Sports Day', tag: 'Physical', ip: 'lingokids' },
        { name: 'Weather Watch', tag: 'Science', ip: 'blippi' },
        { name: 'Cooking Class', tag: 'Life Skills', ip: 'lingokids' }
    ]
};

// Color schemes for different IPs
const ipColors = {
    lingokids: ['#ff9a9e', '#fecfef'],
    blippi: ['#4fc3f7', '#29b6f6'],
    pocoyo: ['#ffd54f', '#ffca28'],
    disney: ['#9c27b0', '#e1bee7']
};

// Helper function to get random image path
function getRandomImagePath(feedType, ip) {
    const images = availableImages[feedType] && availableImages[feedType][ip];
    if (images && images.length > 0) {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        return `${feedType}/${ip}/${randomImage}`;
    }
    return null;
}

// Helper function to get all available images for a feed type
function getAllAvailableImages(feedType) {
    const allImages = [];
    const feedImages = availableImages[feedType];
    
    if (feedImages) {
        Object.keys(feedImages).forEach(ip => {
            feedImages[ip].forEach(image => {
                allImages.push({
                    path: `${feedType}/${ip}/${image}`,
                    ip: ip,
                    filename: image
                });
            });
        });
    }
    
    return allImages;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Lingokids App Loading...');
    initializeApp();
});

function initializeApp() {
    // Try to load images from folders, fall back to sample data
    loadImageAssets().then(() => {
        populateFeeds();
        setupEventListeners();
    });
}

async function loadImageAssets() {
    // In a real implementation, this would scan the folders for images
    // For now, we'll simulate this and use placeholders
    console.log('Loading image assets...');
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Since we can't actually scan folders in a browser environment,
    // we'll use the sample data and create placeholder images
    console.log('Using sample data and placeholders');
}

function populateFeeds() {
    populateGamesFeed();
    populateIPFeed();
    populateTopicsFeed();
    populateNewFeed();
}

function populateGamesFeed() {
    const container = document.getElementById('games-feed');
    const games = sampleData.games_feed;
    
    container.innerHTML = '';
    
    games.forEach((game, index) => {
        const gameElement = createGameElement(game, index);
        container.appendChild(gameElement);
    });
}

function populateIPFeed() {
    const container = document.getElementById('ip-feed');
    const ips = sampleData.ip_feed;
    
    container.innerHTML = '';
    
    ips.forEach((ip, index) => {
        const ipElement = createIPElement(ip, index);
        container.appendChild(ipElement);
    });
}

function populateTopicsFeed() {
    const container = document.getElementById('topics-feed');
    const topics = sampleData.topics_feed;
    
    container.innerHTML = '';
    
    topics.forEach((topic, index) => {
        const topicElement = createTopicElement(topic, index);
        container.appendChild(topicElement);
    });
}

function populateNewFeed() {
    const container = document.getElementById('new-feed');
    const newItems = sampleData.new_feed;
    
    container.innerHTML = '';
    
    newItems.forEach((item, index) => {
        const newElement = createNewElement(item, index);
        container.appendChild(newElement);
    });
}

function createGameElement(game, index) {
    const element = document.createElement('div');
    element.className = 'feed-item game-item';
    element.onclick = () => navigateTo(`Playing: ${game.name}`);
    
    const colors = ipColors[game.ip] || ipColors.lingokids;
    const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    // Try to get a real image from the available images
    const imagePath = getRandomImagePath('games_feed', game.ip);
    
    if (imagePath) {
        element.innerHTML = `
            <img src="${imagePath}" alt="${game.name}" class="game-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="placeholder-cover" style="background: ${gradient}; display: none;">
                🎮
            </div>
            <div class="game-tag">${game.tag}</div>
        `;
    } else {
        element.innerHTML = `
            <div class="placeholder-cover" style="background: ${gradient};">
                🎮
            </div>
            <div class="game-tag">${game.tag}</div>
        `;
    }
    
    return element;
}

function createIPElement(ip, index) {
    const element = document.createElement('div');
    element.className = 'feed-item ip-item';
    element.onclick = () => navigateTo(`${ip.name} Hub`);
    
    const colors = ipColors[ip.ip] || ipColors.lingokids;
    const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    // Try to get a real image from the available images
    const imagePath = getRandomImagePath('ip_feed', ip.ip);
    
    if (imagePath) {
        element.innerHTML = `
            <img src="${imagePath}" alt="${ip.name}" class="ip-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="placeholder-cover" style="background: ${gradient}; display: none;">
                📚
            </div>
        `;
    } else {
        element.innerHTML = `
            <div class="placeholder-cover" style="background: ${gradient};">
                📚
            </div>
        `;
    }
    
    return element;
}

function createTopicElement(topic, index) {
    // Try to use real images first, cycling through available topics
    const allTopicImages = getAllAvailableImages('topics_feed');
    let imagePath = null;
    let topicName = topic.name;
    
    if (allTopicImages.length > 0) {
        const imageIndex = index % allTopicImages.length;
        const imageData = allTopicImages[imageIndex];
        imagePath = imageData.path;
        // Extract name from filename (remove extension and title case)
        topicName = imageData.filename.replace(/\.[^/.]+$/, '').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    const element = document.createElement('div');
    element.className = 'feed-item topic-item';
    element.onclick = () => navigateTo(`${topicName} Activities`);
    
    const colors = ipColors[topic.ip] || ipColors.lingokids;
    const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    const icons = {
        'Counting': '🔢',
        'Sorting': '🔄',
        'Creativity': '🎨',
        'Subtraction': '➖',
        'Reading': '📖',
        'Colors': '🌈',
        'Art': '🎨',
        'Engineering': '⚙️',
        'English': '📝',
        'Literacy': '📚',
        'Math': '🔢',
        'Science': '🔬'
    };
    
    if (imagePath) {
        element.innerHTML = `
            <img src="${imagePath}" alt="${topicName}" class="topic-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="placeholder-cover" style="background: ${gradient}; display: none;">
                ${icons[topicName] || '🎯'}
            </div>
            <div class="topic-title">${topicName}</div>
        `;
    } else {
        element.innerHTML = `
            <div class="placeholder-cover" style="background: ${gradient};">
                ${icons[topicName] || '🎯'}
            </div>
            <div class="topic-title">${topicName}</div>
        `;
    }
    
    return element;
}

function createNewElement(item, index) {
    const element = document.createElement('div');
    element.className = 'feed-item new-item';
    element.onclick = () => navigateTo(`Playing: ${item.name}`);
    
    const colors = ipColors[item.ip] || ipColors.lingokids;
    const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    // Try to get a real image from the available images
    const imagePath = getRandomImagePath('new_feed', item.ip);
    
    const icons = {
        'Science': '🔬',
        'Nature': '🌿',
        'Life Skills': '🏠',
        'STEM': '🤖',
        'Music': '🎵',
        'Creativity': '✨',
        'Physical': '⚽'
    };
    
    if (imagePath) {
        element.innerHTML = `
            <img src="${imagePath}" alt="${item.name}" class="new-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="placeholder-cover" style="background: ${gradient}; display: none;">
                ${icons[item.tag] || '🆕'}
            </div>
            <div class="game-tag">${item.tag}</div>
        `;
    } else {
        element.innerHTML = `
            <div class="placeholder-cover" style="background: ${gradient};">
                ${icons[item.tag] || '🆕'}
            </div>
            <div class="game-tag">${item.tag}</div>
        `;
    }
    
    return element;
}

function setupEventListeners() {
    // Navigation mode switching
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Rewards widget interaction
    document.querySelector('.rewards-widget').addEventListener('click', function() {
        navigateTo('Daily Rewards');
    });
    
    // Profile avatar interaction
    document.querySelector('.profile-avatar').addEventListener('click', function() {
        navigateTo('Profile Settings');
    });
}

// Navigation functions
function navigateTo(screenName) {
    console.log(`Navigating to: ${screenName}`);
    showDummyScreen(screenName);
}

function showDummyScreen(title) {
    const dummyScreen = document.getElementById('dummy-screen');
    const dummyTitle = document.getElementById('dummy-title');
    const dummyMessage = document.getElementById('dummy-message');
    
    dummyTitle.textContent = title;
    
    if (title.startsWith('Playing:')) {
        dummyMessage.textContent = 'Game Loading...';
    } else {
        dummyMessage.textContent = `Welcome to ${title}`;
    }
    
    dummyScreen.classList.remove('hidden');
    currentScreen = 'dummy';
}

function goBack() {
    const dummyScreen = document.getElementById('dummy-screen');
    dummyScreen.classList.add('hidden');
    currentScreen = 'home';
}

function switchMode(mode) {
    console.log(`Switching to mode: ${mode}`);
    
    // Update navigation active state
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[onclick="switchMode('${mode}')"]`).classList.add('active');
    
    // In a real app, this would switch content
    // For now, we'll just show a mode change message
    if (mode !== 'home') {
        navigateTo(`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`);
    }
}

// Utility functions
function getRandomColor() {
    const colors = [
        '#ff9a9e', '#fecfef', '#667eea', '#764ba2',
        '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3',
        '#ffd89b', '#19547b', '#4fc3f7', '#29b6f6'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Touch and scroll enhancements for mobile
function addTouchSupport() {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    document.querySelectorAll('.feed-scroll').forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });
}

// Initialize touch support when DOM is ready
document.addEventListener('DOMContentLoaded', addTouchSupport);

// Sample function to simulate loading images from folders
async function scanImageFolder(folderPath) {
    // In a real implementation, this would use a backend service
    // to scan the folder structure and return available images
    console.log(`Scanning folder: ${folderPath}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return empty array for now (no images loaded)
    return [];
}

// Animation utilities
function animateElement(element, animation) {
    element.style.animation = animation;
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    }, { once: true });
}

// Progress tracking for rewards
function updateDailyProgress(completed, total) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    const percentage = (completed / total) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `Daily Goal: ${completed}/${total} activities`;
    
    if (completed >= total) {
        // Animate completion
        animateElement(document.querySelector('.rewards-widget'), 'pulse 0.5s ease-in-out');
    }
}

console.log('Lingokids App JavaScript Loaded');
