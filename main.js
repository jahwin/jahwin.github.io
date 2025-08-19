// Global variables
let currentZoom = 100;
let isFullscreen = false;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    initializePage();
});

// Initialize page functionality
function initializePage() {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Add escape key handler for fullscreen
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isFullscreen) {
            toggleFullscreen();
        }
    });

    // Add loading animation
    showLoadingAnimation();

    // Add window resize handler
    window.addEventListener('resize', handleWindowResize);

    console.log('Resume page initialized successfully!');
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + Plus: Zoom in
    if ((e.ctrlKey || e.metaKey) && e.key === '+') {
        e.preventDefault();
        zoomIn();
    }

    // Ctrl/Cmd + Minus: Zoom out
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
    }

    // Ctrl/Cmd + 0: Reset zoom
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        resetZoom();
    }

    // Ctrl/Cmd + D: Download
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadResume();
    }

    // F11: Toggle fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
}

// Download resume function
function downloadResume() {
    try {
        const link = document.createElement('a');
        link.href = 'assets/resume.pdf';
        link.download = 'Jahwin_Resume.pdf';
        link.target = '_blank';

        // Add some visual feedback
        showNotification('Downloading resume...', 'success');

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Track download (you can add analytics here)
        console.log('Resume downloaded');

    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const pdfContainer = document.querySelector('.resume-container');
    const fullscreenBtn = document.querySelector('.btn-secondary');

    try {
        if (!isFullscreen) {
            // Enter fullscreen
            pdfContainer.classList.add('fullscreen');
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
            isFullscreen = true;
            showNotification('Press ESC to exit fullscreen', 'info');
        } else {
            // Exit fullscreen
            pdfContainer.classList.remove('fullscreen');
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
            isFullscreen = false;
        }
    } catch (error) {
        console.error('Fullscreen toggle failed:', error);
        showNotification('Fullscreen mode not available', 'error');
    }
}

// Zoom functions
function zoomIn() {
    if (currentZoom < 200) {
        currentZoom += 10;
        updateZoom();
        showNotification(`Zoomed to ${currentZoom}%`, 'info');
    }
}

function zoomOut() {
    if (currentZoom > 50) {
        currentZoom -= 10;
        updateZoom();
        showNotification(`Zoomed to ${currentZoom}%`, 'info');
    }
}

function resetZoom() {
    currentZoom = 100;
    updateZoom();
    showNotification('Zoom reset to 100%', 'info');
}

function updateZoom() {
    const pdfViewer = document.getElementById('pdfViewer');
    const zoomLevel = document.querySelector('.zoom-level');

    if (pdfViewer && zoomLevel) {
        pdfViewer.style.transform = `scale(${currentZoom / 100})`;
        pdfViewer.style.transformOrigin = 'top center';
        zoomLevel.textContent = `${currentZoom}%`;
    }
}

// Print resume function
function printResume() {
    try {
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdfViewer) {
            // Try to print the PDF directly
            pdfViewer.contentWindow.print();
            showNotification('Opening print dialog...', 'success');
        } else {
            // Fallback: open PDF in new window for printing
            window.open('assets/resume.pdf', '_blank');
            showNotification('PDF opened in new tab for printing', 'info');
        }
    } catch (error) {
        console.error('Print failed:', error);
        // Fallback: open PDF in new window
        window.open('assets/resume.pdf', '_blank');
        showNotification('PDF opened in new tab', 'info');
    }
}

// Share resume function
function shareResume() {
    try {
        if (navigator.share) {
            // Use Web Share API if available
            navigator.share({
                title: 'Jahwin\'s Resume',
                text: 'Check out my professional resume',
                url: window.location.href
            }).then(() => {
                showNotification('Resume shared successfully!', 'success');
            }).catch((error) => {
                console.error('Share failed:', error);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
    } catch (error) {
        console.error('Share failed:', error);
        fallbackShare();
    }
}

// Fallback share function
function fallbackShare() {
    try {
        // Copy URL to clipboard
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link copied to clipboard!', 'success');
        });
    } catch (error) {
        console.error('Clipboard copy failed:', error);
        showNotification('Unable to share. Please copy the URL manually.', 'error');
    }
}

// Hide loading spinner when PDF loads
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        setTimeout(() => {
            spinner.style.opacity = '0';
            spinner.style.visibility = 'hidden';
        }, 1000);
    }
}

// Show loading animation
function showLoadingAnimation() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.opacity = '1';
        spinner.style.visibility = 'visible';
    }
}

// Handle window resize
function handleWindowResize() {
    // Adjust PDF viewer height on mobile
    const pdfWrapper = document.querySelector('.pdf-viewer-wrapper');
    if (pdfWrapper && window.innerWidth <= 768) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const availableHeight = window.innerHeight - headerHeight - 100;
        pdfWrapper.style.height = `${Math.max(400, availableHeight)}px`;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Get notification color based on type
function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#48bb78';
        case 'error': return '#f56565';
        case 'warning': return '#ed8936';
        default: return '#667eea';
    }
}

// Add smooth scrolling to navigation
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Performance monitoring
function monitorPerformance() {
    // Log page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Initialize performance monitoring
monitorPerformance();

// Export functions for debugging (optional)
if (typeof window !== 'undefined') {
    window.resumePageUtils = {
        downloadResume,
        toggleFullscreen,
        zoomIn,
        zoomOut,
        resetZoom,
        printResume,
        shareResume,
        showNotification
    };
}

// Add error handling for PDF loading
document.addEventListener('DOMContentLoaded', function () {
    const pdfViewer = document.getElementById('pdfViewer');

    if (pdfViewer) {
        pdfViewer.addEventListener('error', function () {
            hideLoading();
            showNotification('Unable to load PDF. Please try downloading instead.', 'error');
        });

        // Set a timeout for loading
        setTimeout(() => {
            if (document.getElementById('loadingSpinner').style.visibility !== 'hidden') {
                hideLoading();
            }
        }, 10000); // 10 second timeout
    }
});
