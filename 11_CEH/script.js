// ============================================
// JAVASCRIPT FUNCTIONALITY FOR 11_CEH COURSE
// Web Shells & SQL Injection
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing tabs...');
    initTabs();
    initSidebar();
    setupSimulationSteps();
    displayCourseProgress();
    console.log('Initialization complete');
});

// ============================================
// TAB NAVIGATION SYSTEM
// ============================================

function initTabs() {
    const defaultId = 'intro';
    showTab(defaultId);
    
    // Highlight initial sidebar link
    const initialLink = document.querySelector(`.sidebar-links a[data-tab="${defaultId}"]`);
    if (initialLink) {
        initialLink.classList.add('active');
    }
}

function showTab(tabId) {
    console.log('Switching to tab:', tabId);
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
        console.log('Tab activated:', tabId);
        
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
    } else {
        console.error('Tab not found:', tabId);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getTabName(tabId) {
    const names = {
        'intro': 'Module Overview',
        'webshell-intro': 'Web Shell Basics',
        'php-system': 'system() Function',
        'php-shell': 'shell_exec() Function',
        'php-exec': 'exec() & passthru()',
        'rce-overview': 'RCE Overview',
        'rce-runtime': 'Runtime Execution',
        'rce-payload': 'Payload Delivery',
        'rce-scenarios': 'Attack Scenarios',
        'sql-intro': 'SQL Injection Intro',
        'sql-examples': 'Attack Examples',
        'sql-enumeration': 'Database Enumeration',
        'sql-tools': 'sqlmap Tool',
        'sql-prevention': 'Prevention Strategies',
        'defense': 'Defense Strategies',
        'summary': 'Module Completion'
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
    // Use event delegation on sidebar container instead of individual links
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) {
        console.warn('Sidebar element not found');
        return;
    }
    
    // Single event listener on sidebar (event delegation)
    sidebar.addEventListener('click', function(e) {
        // Check if clicked element is a link with data-tab
        let link = e.target;
        if (link.tagName !== 'A') {
            link = link.closest('a');
        }
        
        if (!link || !link.hasAttribute('data-tab')) {
            return;
        }
        
        // Prevent default link behavior
        e.preventDefault();
        e.stopPropagation();
        
        const tabId = link.getAttribute('data-tab');
        console.log('Navigation clicked:', tabId);
        
        // Switch to tab
        showTab(tabId);
        
        // Highlight active link via CSS class
        const allLinks = sidebar.querySelectorAll('.sidebar-links a');
        allLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        
    }, false);
    
    // Handle scroll to top button separately
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, false);
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
    const progress = localStorage.getItem('ceh11_progress');
    
    if (!progress) {
        // Initialize progress
        const initialProgress = {
            sections_completed: [],
            last_visited: new Date().toISOString(),
            quiz_scores: {},
            notes: {}
        };
        localStorage.setItem('ceh11_progress', JSON.stringify(initialProgress));
    }
}

function markSectionComplete(sectionId) {
    const progress = JSON.parse(localStorage.getItem('ceh11_progress') || '{}');
    if (!progress.sections_completed) {
        progress.sections_completed = [];
    }
    
    if (!progress.sections_completed.includes(sectionId)) {
        progress.sections_completed.push(sectionId);
    }
    
    progress.last_visited = new Date().toISOString();
    localStorage.setItem('ceh11_progress', JSON.stringify(progress));
    
    // Update UI
    updateProgressBar();
}

function updateProgressBar() {
    const progress = JSON.parse(localStorage.getItem('ceh11_progress') || '{}');
    const completed = progress.sections_completed ? progress.sections_completed.length : 0;
    const total = 12; // Total sections for 11_CEH
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
        'RCE': 'Remote Code Execution - Ability to run arbitrary commands on target system',
        'SQL Injection': 'Inserting malicious SQL code into application input',
        'Web Shell': 'Script uploaded to web server for remote command execution',
        'PHP': 'Server-side scripting language vulnerable to RCE',
        'System Command': 'OS-level instruction executed by web server',
        'Database': 'Structured data storage accessed via SQL queries',
        'Payload': 'Exploit code or malicious data sent to target',
        'Persistence': 'Maintaining access to system after initial compromise'
    };

    if (glossary[term]) {
        alert(`${term}:\n\n${glossary[term]}`);
    }
}

// ============================================
// DARK MODE TOGGLE (if needed later)
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
// COPY CODE TO CLIPBOARD
// ============================================

function copyCode(element) {
    const code = element.innerText;
    navigator.clipboard.writeText(code).then(() => {
        // Show success message
        const originalText = element.innerText;
        element.innerText = '✓ Copied!';
        setTimeout(() => {
            element.innerText = originalText;
        }, 2000);
    });
}
