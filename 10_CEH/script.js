// ============================================
// JAVASCRIPT FUNCTIONALITY FOR 10_CEH COURSE
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSidebar();
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

        // Trigger animation
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
        'ftp-security': 'FTP Security Principles',
        'ftp-anon': 'Anonymous FTP Setup',
        'ftp-localuser': 'Local User FTP',
        'web-overview': 'Web Server Overview',
        'apache-setup': 'Apache Installation',
        'apache-config': 'Apache Configuration',
        'php-mysql': 'PHP & MySQL',
        'ssh-setup': 'SSH Configuration',
        'ssh-auth': 'SSH Authentication',
        'iis-setup': 'IIS on Windows',
        'rdp-protocol': 'RDP Protocol',
        'logging': 'Logging & Monitoring',
        'hardening': 'Security Hardening',
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
    const progress = localStorage.getItem('ceh10_progress');
    
    if (!progress) {
        // Initialize progress
        const initialProgress = {
            sections_completed: [],
            last_visited: new Date().toISOString(),
            quiz_scores: {},
            notes: {}
        };
        localStorage.setItem('ceh10_progress', JSON.stringify(initialProgress));
    }
}

function markSectionComplete(sectionId) {
    const progress = JSON.parse(localStorage.getItem('ceh10_progress') || '{}');
    if (!progress.sections_completed) {
        progress.sections_completed = [];
    }
    
    if (!progress.sections_completed.includes(sectionId)) {
        progress.sections_completed.push(sectionId);
    }
    
    progress.last_visited = new Date().toISOString();
    localStorage.setItem('ceh10_progress', JSON.stringify(progress));
    
    // Update UI
    updateProgressBar();
}

function updateProgressBar() {
    const progress = JSON.parse(localStorage.getItem('ceh10_progress') || '{}');
    const completed = progress.sections_completed ? progress.sections_completed.length : 0;
    const total = 15; // Total sections for 10_CEH
    const percentage = Math.round((completed / total) * 100);
    
    // Update progress display if element exists
    const progressDisplay = document.querySelector('.progress-percentage');
    if (progressDisplay) {
        progressDisplay.textContent = `${percentage}%`;
    }
}

// ============================================
// GLOSSARY
// ============================================

function showGlossary(term) {
    const glossary = {
        'FTP': 'File Transfer Protocol - Standard method for transferring files over networks',
        'SSH': 'Secure Shell - Encrypted remote terminal access protocol',
        'Apache': 'Popular open-source web server software',
        'IIS': 'Internet Information Services - Microsoft web server for Windows',
        'MySQL': 'Relational database management system',
        'PHP': 'Server-side scripting language for web applications',
        'RDP': 'Remote Desktop Protocol - Graphical remote access for Windows',
        'Port': 'Communication endpoint on a network interface'
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
