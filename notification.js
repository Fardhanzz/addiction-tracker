// Notification System for AddictionTracker

// Initialize notification system
document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }
    
    // Request permission for notifications
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted");
                setupBrowserNotifications();
            }
        });
    } else if (Notification.permission === "granted") {
        setupBrowserNotifications();
    }
    
    // Check for daily notification on page load
    if (userData && userData.email) {
        checkForDailyNotificationOnLoad();
    }
});

// Setup browser notifications
function setupBrowserNotifications() {
    // Check if user is logged in
    if (!userData || !userData.email) return;
    
    // Parse notification time
    const [notifyHour, notifyMinute] = userData.notificationTime.split(':').map(Number);
    
    // Function to check and show notification
    function checkAndShowBrowserNotification() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        // Check if already checked in today
        if (userData.history[today]) return;
        
        // Check if it's notification time
        if (now.getHours() === notifyHour && now.getMinutes() === notifyMinute) {
            showBrowserNotification();
        }
    }
    
    // Check every minute
    setInterval(checkAndShowBrowserNotification, 60000);
    
    // Initial check
    checkAndShowBrowserNotification();
}

// Show browser notification
function showBrowserNotification() {
    if (Notification.permission !== "granted") return;
    
    const options = {
        body: `Time for your daily ${userData.addictionDisplayName} check-in! Did you avoid your addiction today?`,
        icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png",
        badge: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png",
        tag: "addiction-tracker-daily",
        requireInteraction: true,
        actions: [
            {
                action: "success",
                title: "✅ Yes!"
            },
            {
                action: "relapse",
                title: "❌ No"
            }
        ]
    };
    
    const notification = new Notification("AddictionTracker Daily Check-in", options);
    
    // Handle notification click
    notification.onclick = function() {
        window.focus();
        showDailyNotification();
        this.close();
    };
    
    // Handle action buttons
    notification.addEventListener('click', function(event) {
        if (event.action === 'success') {
            handleDailyCheck('success');
        } else if (event.action === 'relapse') {
            handleDailyCheck('relapse');
        }
        notification.close();
    });
    
    // Auto close after 30 seconds
    setTimeout(() => notification.close(), 30000);
}

// Check for daily notification on page load
function checkForDailyNotificationOnLoad() {
    if (!userData || !userData.email) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    // Check if user hasn't checked in today
    if (!userData.history[today]) {
        const now = new Date();
        const [notifyHour, notifyMinute] = userData.notificationTime.split(':').map(Number);
        
        // Check if current time is past notification time
        if (now.getHours() > notifyHour || (now.getHours() === notifyHour && now.getMinutes() >= notifyMinute)) {
            // If it's been more than 5 minutes past notification time, show notification
            if (now.getMinutes() - notifyMinute > 5 || now.getHours() > notifyHour) {
                setTimeout(() => {
                    if (!userData.history[today]) {
                        showDailyNotification();
                    }
                }, 3000); // Show after 3 seconds
            }
        }
    }
}