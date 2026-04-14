// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected tab
    const tab = document.getElementById(tabName);
    if (tab) {
        tab.classList.add('active');
    }
    
    // Update breadcrumb
    const breadcrumbMap = {
        'overview': 'Overview',
        'fundamentals': 'Cybersecurity Fundamentals',
        'infosec': 'Information Security',
        'threats': 'Threats & Attacks',
        'enterprise': 'Enterprise Security',
        'encryption': 'Encryption',
        'defense': 'Defensive Security',
        'offensive': 'Offensive Security',
        'career': 'Career Paths',
        'interactive': 'Interactive Labs',
        'glossary': 'Glossary',
        'resources': 'Resources'
    };
    document.getElementById('breadcrumb-current').textContent = breadcrumbMap[tabName] || tabName;
}

// Risk calculator
function calculateRisk() {
    const checkboxes = document.querySelectorAll('.interactive-section input[type="checkbox"]');
    let count = 0;
    checkboxes.forEach(cb => { if (cb.checked) count++; });
    
    const riskResult = document.getElementById('risk-result');
    riskResult.style.display = 'block';
    
    let riskLevel, color, recommendation;
    if (count === 0) {
        riskLevel = 'LOW ✅';
        color = 'var(--secondary)';
        recommendation = 'Good! Continue protecting your information.';
    } else if (count === 1) {
        riskLevel = 'MODERATE 🟡';
        color = 'var(--accent)';
        recommendation = 'Be cautious. Basic phishing/spam vulnerability.';
    } else if (count === 2) {
        riskLevel = 'HIGH 🔴';
        color = 'var(--danger)';
        recommendation = 'Serious risk. Identity theft possible.';
    } else {
        riskLevel = 'CRITICAL 🔴🔴';
        color = 'var(--danger)';
        recommendation = 'Full identity compromise. Immediate action needed!';
    }
    
    riskResult.innerHTML = `<div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; border-left: 4px solid ${color};">
        <h4 style="margin-top: 0; color: ${color};">Risk Level: ${riskLevel}</h4>
        <p>${recommendation}</p>
    </div>`;
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Show/hide scroll button
window.addEventListener('scroll', function() {
    const scrollBtn = document.querySelector('.scroll-top');
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Add fade-in animation to cards
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.grid-card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });
});
