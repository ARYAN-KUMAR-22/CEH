// ============================================
// JAVASCRIPT FUNCTIONALITY FOR 9_CEH COURSE
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSidebar();
    setupAttackCardListeners();
    setupSimulationSteps();
    displayCourseProgress();
});

// ============================================
// TAB NAVIGATION SYSTEM
// ============================================

function initTabs() {
    const defaultTab = 'intro';
    showTab(defaultTab);
}

function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
        
        // Update breadcrumb
        const breadcrumb = document.querySelector('.breadcrumb-current');
        if (breadcrumb) {
            breadcrumb.textContent = getTabName(tabId);
        }

        // Trigger animation for content
        selectedTab.style.animation = 'none';
        setTimeout(() => {
            selectedTab.style.animation = '';
        }, 10);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getTabName(tabId) {
    const names = {
        'intro': 'Module Overview',
        'priv-arch': 'Privilege Architecture',
        'horizontal-priv': 'Horizontal Escalation',
        'vertical-priv': 'Vertical Escalation',
        'payload-binding': 'Payload Binding',
        'uac-bypass': 'UAC Bypass',
        'exe-binding': 'EXE Binding Methods',
        'stealth-payloads': 'Stealth Payload Delivery',
        'session-mgmt': 'Session Management',
        'ids-ips': 'IDS/IPS Detection',
        'web-servers': 'Web Server Types',
        'apache': 'Apache HTTP Server',
        'iis-nginx': 'IIS vs NGINX',
        'ftp-basics': 'FTP Fundamentals',
        'ftp-deployment': 'FTP Deployment',
        'auth-methods': 'Advanced Authentication',
        'summary': 'Completion & Achievement'
    };
    return names[tabId] || 'Content';
}

// Alias for backward compatibility with HTML onclick handlers
function switchTab(tabId) {
    return showTab(tabId);
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================

function initSidebar() {
    // Add click handlers to all section links
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            if (tabId) {
                showTab(tabId);
                // Highlight active link
                sidebarLinks.forEach(l => l.style.borderBottom = 'none');
                link.style.borderBottom = '2px solid #00d4ff';
            }
        });
    });

    // Add scroll to top button
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// ATTACK CARD EXPANSION
// ============================================

function setupAttackCardListeners() {
    const attackCards = document.querySelectorAll('.attack-card');
    attackCards.forEach(card => {
        card.addEventListener('click', function() {
            const details = this.querySelector('.attack-details');
            const isActive = details.style.display === 'block';
            
            // Close other cards
            attackCards.forEach(other => {
                const otherDetails = other.querySelector('.attack-details');
                if (otherDetails) otherDetails.style.display = 'none';
            });

            // Toggle current card
            if (!isActive) {
                details.style.display = 'block';
                details.style.animation = 'slideDownFade 0.3s ease-out';
            }
        });
    });
}

// ============================================
// SIMULATION STEPS INTERACTION
// ============================================

function setupSimulationSteps() {
    const simSteps = document.querySelectorAll('.sim-step');
    simSteps.forEach(step => {
        const header = step.querySelector('.step-header');
        const content = step.querySelector('.step-content');
        
        if (header) {
            header.addEventListener('click', function() {
                // Toggle current step
                if (content) {
                    content.classList.toggle('active');
                    
                    // Rotate toggle icon
                    const icon = header.querySelector('.toggle-icon');
                    if (icon) {
                        icon.style.transform = content.classList.contains('active') ? 
                            'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        }
    });
}

// ============================================
// COURSE PROGRESS TRACKING
// ============================================

function displayCourseProgress() {
    // Check if progress data exists in localStorage
    const progress = localStorage.getItem('ceh9_progress');
    
    if (!progress) {
        // Initialize progress
        const initialProgress = {
            sections_completed: [],
            last_visited: new Date().toISOString(),
            quiz_scores: {},
            notes: {}
        };
        localStorage.setItem('ceh9_progress', JSON.stringify(initialProgress));
    }
}

function markSectionComplete(sectionId) {
    const progress = JSON.parse(localStorage.getItem('ceh9_progress') || '{}');
    if (!progress.sections_completed) {
        progress.sections_completed = [];
    }
    
    if (!progress.sections_completed.includes(sectionId)) {
        progress.sections_completed.push(sectionId);
    }
    
    progress.last_visited = new Date().toISOString();
    localStorage.setItem('ceh9_progress', JSON.stringify(progress));
    
    // Update UI
    updateProgressBar();
}

function updateProgressBar() {
    const progress = JSON.parse(localStorage.getItem('ceh9_progress') || '{}');
    const completed = progress.sections_completed ? progress.sections_completed.length : 0;
    const total = 17; // Total sections for 9_CEH
    const percentage = Math.round((completed / total) * 100);
    
    // Update progress display if element exists
    const progressDisplay = document.querySelector('.progress-percentage');
    if (progressDisplay) {
        progressDisplay.textContent = `${percentage}%`;
    }
}

// ============================================
// CODE COPY FUNCTIONALITY
// ============================================

function copyCode(button) {
    const codeBlock = button.previousElementSibling;
    if (codeBlock) {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy Code';
            }, 2000);
        });
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function searchContent(query) {
    const tabContents = document.querySelectorAll('.tab-content');
    query = query.toLowerCase();

    tabContents.forEach(content => {
        const text = content.textContent.toLowerCase();
        if (text.includes(query)) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
}

// ============================================
// GLOSSARY POPUP
// ============================================

function showGlossary(term) {
    const glossary = {
        'CEH': 'Certified Ethical Hacker - A professional certification validating cybersecurity expertise',
        'Privilege Escalation': 'Techniques to gain higher-level access than initially granted',
        'UAC': 'User Account Control - Windows security feature requiring explicit permission',
        'Payload Binding': 'Fusing malicious code with legitimate executables for stealth',
        'IDS': 'Intrusion Detection System - Monitors network for suspicious activity',
        'IPS': 'Intrusion Prevention System - Actively blocks detected attacks',
        'Web Server': 'Software that processes HTTP requests and delivers web content',
        'FTP': 'File Transfer Protocol - Standard method for transferring files over networks'
    };

    if (glossary[term]) {
        alert(`${term}:\n\n${glossary[term]}`);
    }
}

// ============================================
// DARK MODE TOGGLE
// ============================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============================================
// BOOKMARKING SYSTEM
// ============================================

function bookmarkSection(sectionId, sectionName) {
    let bookmarks = JSON.parse(localStorage.getItem('ceh9_bookmarks') || '[]');
    
    if (!bookmarks.find(b => b.id === sectionId)) {
        bookmarks.push({ id: sectionId, name: sectionName, timestamp: new Date().toISOString() });
        localStorage.setItem('ceh9_bookmarks', JSON.stringify(bookmarks));
        alert(`Bookmarked: ${sectionName}`);
    } else {
        alert('Already bookmarked!');
    }
}

function getBookmarks() {
    return JSON.parse(localStorage.getItem('ceh9_bookmarks') || '[]');
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl+B to bookmark
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        const currentTab = document.querySelector('.tab-content.active');
        if (currentTab) {
            bookmarkSection(currentTab.id, getTabName(currentTab.id));
        }
    }

    // Ctrl+/ for search
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const search = prompt('Search content:');
        if (search) searchContent(search);
    }
});

// ============================================
// ANIMATION OBSERVERS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and boxes
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.info-card, .concept-box, .tool-card, .scenario-card');
    elements.forEach(el => observer.observe(el));
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getRandomColor() {
    const colors = ['#00d4ff', '#00ff88', '#ff00ff', '#ffaa00', '#ff4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ============================================
// EXPORT/PRINT FUNCTIONALITY
// ============================================

function exportAsHTML() {
    const content = document.querySelector('.tab-content.active');
    if (content) {
        const html = content.outerHTML;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ceh9_content.html';
        a.click();
    }
}

function printContent() {
    const content = document.querySelector('.tab-content.active');
    if (content) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(content.outerHTML);
        printWindow.document.close();
        printWindow.print();
    }
}

// ============================================
// TIMER FOR LAB EXERCISES
// ============================================

class LabTimer {
    constructor(duration = 3600) {
        this.duration = duration;
        this.elapsed = 0;
        this.isRunning = false;
        this.startTime = null;
    }

    start() {
        this.isRunning = true;
        this.startTime = Date.now();
    }

    stop() {
        this.isRunning = false;
    }

    reset() {
        this.elapsed = 0;
        this.isRunning = false;
        this.startTime = null;
    }

    getElapsed() {
        if (this.isRunning && this.startTime) {
            this.elapsed += Date.now() - this.startTime;
            this.startTime = Date.now();
        }
        return this.elapsed;
    }

    formatTime(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor(ms / (1000 * 60 * 60));
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

// ============================================
// QUIZ SYSTEM
// ============================================

class QuizSystem {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
    }

    submitAnswer(answer) {
        this.answers.push(answer);
    }

    calculateScore(correctAnswers) {
        for (let i = 0; i < correctAnswers.length; i++) {
            if (this.answers[i] === correctAnswers[i]) {
                this.score++;
            }
        }
        return (this.score / correctAnswers.length) * 100;
    }

    saveScore(quizName) {
        const progress = JSON.parse(localStorage.getItem('ceh9_progress') || '{}');
        if (!progress.quiz_scores) progress.quiz_scores = {};
        progress.quiz_scores[quizName] = this.calculateScore();
        localStorage.setItem('ceh9_progress', JSON.stringify(progress));
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff'};
        color: #000;
        border-radius: 4px;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showTab,
        markSectionComplete,
        bookmarkSection,
        LabTimer,
        QuizSystem
    };
}