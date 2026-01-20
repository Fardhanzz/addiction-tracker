// Data dan State Aplikasi
let userData = {
    email: "",
    addictionType: "",
    addictionDisplayName: "Addiction",
    startDate: new Date().toISOString().split('T')[0],
    winStreak: 0,
    totalDays: 0,
    relapseCount: 0,
    history: {},
    lastCheck: null,
    notificationTime: "12:00",
    lastNotificationDate: null,
    theme: "dark"
};

// Motivasi berdasarkan progress
const motivationMessages = {
    perfect: [
        "Outstanding! You've reached 100% freedom!",
        "You are the inspiration! Maintain your achievement!",
        "Perfect! You've conquered your addiction!"
    ],
    high: [
        "Almost there! You're on the right path!",
        "Just a little more! You're strong!",
        "Your consistency is amazing! Keep going!"
    ],
    medium: [
        "You're halfway there! Keep up the spirit!",
        "Every day is a new opportunity. You can do it!",
        "Don't give up! You're stronger than your addiction."
    ],
    low: [
        "Fight your urges! You can do better!",
        "Every small step matters. Don't stop!",
        "You have the power to change. Believe in yourself!"
    ]
};

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    initEventListeners();
    checkExistingUser();
    updateGreeting();
    generateCalendar(new Date());
    setupTheme();
    setupNotificationHandlers();
    
    // Setup dropdown change listeners
    setupDropdownListeners();
});

// Muat data dari localStorage
function loadUserData() {
    const savedData = localStorage.getItem('addictionTrackerData');
    if (savedData) {
        userData = JSON.parse(savedData);
        
        // Apply saved theme
        if (userData.theme) {
            document.body.classList.remove('dark-theme', 'light-theme');
            document.body.classList.add(userData.theme + '-theme');
        }
    }
}

// Simpan data ke localStorage
function saveUserData() {
    // Save current theme
    userData.theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('addictionTrackerData', JSON.stringify(userData));
}

// Setup tema
function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleLogin = document.getElementById('themeToggleLogin');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleLogin) {
        themeToggleLogin.addEventListener('click', toggleTheme);
    }
}

// Toggle tema
function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
    
    saveUserData();
}

// Setup dropdown listeners
function setupDropdownListeners() {
    // Notification time dropdown
    const notificationTimeSelect = document.getElementById('notificationTime');
    const customTimeContainer = document.getElementById('customTimeContainer');
    
    if (notificationTimeSelect) {
        notificationTimeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customTimeContainer.style.display = 'block';
            } else {
                customTimeContainer.style.display = 'none';
                userData.notificationTime = this.value;
            }
        });
    }
    
    // Update notification time dropdown
    const updateNotificationTimeSelect = document.getElementById('updateNotificationTime');
    const updateCustomTimeContainer = document.getElementById('updateCustomTimeContainer');
    
    if (updateNotificationTimeSelect) {
        updateNotificationTimeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                updateCustomTimeContainer.style.display = 'block';
            } else {
                updateCustomTimeContainer.style.display = 'none';
            }
        });
    }
    
    // Custom time inputs
    const customTimeInput = document.getElementById('customTime');
    const updateCustomTimeInput = document.getElementById('updateCustomTime');
    
    if (customTimeInput) {
        customTimeInput.addEventListener('change', function() {
            if (this.value) {
                userData.notificationTime = this.value;
            }
        });
    }
    
    if (updateCustomTimeInput) {
        updateCustomTimeInput.addEventListener('change', function() {
            if (this.value) {
                userData.notificationTime = this.value;
            }
        });
    }
}

// Cek apakah user sudah login
function checkExistingUser() {
    if (userData.email) {
        showDashboard();
        updateDashboard();
        setupDailyNotification();
    } else {
        showLogin();
    }
}

// Setup event listeners
function initEventListeners() {
    // Login button
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    
    // Google login button
    document.getElementById('googleLogin').addEventListener('click', handleGoogleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Daily check buttons
    document.getElementById('yesBtn').addEventListener('click', () => handleDailyCheck('success'));
    document.getElementById('noBtn').addEventListener('click', () => handleDailyCheck('relapse'));
    
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => navigateCalendar(-1));
    document.getElementById('nextMonth').addEventListener('click', () => navigateCalendar(1));
    
    // Update notification settings
    document.getElementById('updateNotificationBtn').addEventListener('click', updateNotificationSettings);
    
    // Reset progress
    document.getElementById('resetProgressBtn').addEventListener('click', showResetConfirmation);
    document.getElementById('confirmReset').addEventListener('click', resetProgress);
    document.getElementById('cancelReset').addEventListener('click', () => {
        document.getElementById('resetModal').classList.remove('active');
    });
}

// Setup notification handlers
function setupNotificationHandlers() {
    // Modal buttons
    const modalYesBtn = document.getElementById('modalYesBtn');
    const modalNoBtn = document.getElementById('modalNoBtn');
    const snoozeModalBtn = document.getElementById('snoozeModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    if (modalYesBtn) {
        modalYesBtn.addEventListener('click', () => {
            handleDailyCheck('success');
            closeModal();
        });
    }
    
    if (modalNoBtn) {
        modalNoBtn.addEventListener('click', () => {
            handleDailyCheck('relapse');
            closeModal();
        });
    }
    
    if (snoozeModalBtn) {
        snoozeModalBtn.addEventListener('click', () => {
            snoozeNotification();
            closeModal();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
}

// Handle login
function handleLogin() {
    const email = document.getElementById('email').value;
    const addictionType = document.getElementById('addictionType').value;
    
    if (!email) {
        alert('Please enter your email!');
        return;
    }
    
    if (!addictionType) {
        alert('Please select an addiction type!');
        return;
    }
    
    // Get addiction display name
    const addictionSelect = document.getElementById('addictionType');
    const selectedOption = addictionSelect.options[addictionSelect.selectedIndex];
    const addictionDisplayName = selectedOption.text;
    
    // Handle notification time
    const timeSelect = document.getElementById('notificationTime');
    let notificationTime = timeSelect.value;
    
    if (notificationTime === 'custom') {
        const customTime = document.getElementById('customTime').value;
        if (!customTime) {
            alert('Please select a custom time!');
            return;
        }
        notificationTime = customTime;
    }
    
    // Reset user data
    userData = {
        email: email,
        addictionType: addictionType,
        addictionDisplayName: addictionDisplayName,
        startDate: new Date().toISOString().split('T')[0],
        winStreak: 0,
        totalDays: 0,
        relapseCount: 0,
        history: {},
        lastCheck: null,
        notificationTime: notificationTime,
        lastNotificationDate: null,
        theme: userData.theme || "dark"
    };
    
    // Save data
    saveUserData();
    
    // Show dashboard
    showDashboard();
    updateDashboard();
    setupDailyNotification();
    
    // Show welcome modal
    showModal('Welcome to AddictionTracker!', `Begin your journey toward freedom from ${addictionDisplayName.toLowerCase()}. Every small step is a giant leap!`);
}

// Handle Google login (simulation)
function handleGoogleLogin() {
    // For MVP, simulate Google login
    const email = `user${Math.floor(Math.random() * 1000)}@gmail.com`;
    const addictionType = "smoking";
    const addictionDisplayName = "Smoking/Tobacco";
    
    document.getElementById('email').value = email;
    document.getElementById('addictionType').value = addictionType;
    
    // Trigger login
    userData = {
        email: email,
        addictionType: addictionType,
        addictionDisplayName: addictionDisplayName,
        startDate: new Date().toISOString().split('T')[0],
        winStreak: 0,
        totalDays: 0,
        relapseCount: 0,
        history: {},
        lastCheck: null,
        notificationTime: "12:00",
        lastNotificationDate: null,
        theme: userData.theme || "dark"
    };
    
    saveUserData();
    showDashboard();
    updateDashboard();
    setupDailyNotification();
    
    showModal('Welcome to AddictionTracker!', `Begin your journey toward freedom from ${addictionDisplayName.toLowerCase()}. Every small step is a giant leap!`);
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear notification interval
        if (window.notificationInterval) {
            clearInterval(window.notificationInterval);
        }
        
        // Reset user data (keep theme)
        const currentTheme = userData.theme || "dark";
        userData = {
            email: "",
            addictionType: "",
            addictionDisplayName: "Addiction",
            startDate: new Date().toISOString().split('T')[0],
            winStreak: 0,
            totalDays: 0,
            relapseCount: 0,
            history: {},
            lastCheck: null,
            notificationTime: "12:00",
            lastNotificationDate: null,
            theme: currentTheme
        };
        
        saveUserData();
        showLogin();
    }
}

// Handle daily check
function handleDailyCheck(result) {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already checked in today
    if (userData.history[today]) {
        alert('You have already checked in today. Come back tomorrow!');
        return;
    }
    
    // Update history
    userData.history[today] = result;
    
    // Update stats
    if (result === 'success') {
        userData.winStreak++;
        userData.totalDays++;
        
        // Check for streak notifications
        if (userData.winStreak % 7 === 0) {
            showModal(
                '🎉 Weekly Achievement!',
                `You've reached ${userData.winStreak} consecutive days addiction-free! Outstanding!`
            );
        }
    } else {
        userData.winStreak = 0;
        userData.relapseCount++;
        userData.totalDays++;
    }
    
    // Update last check
    userData.lastCheck = today;
    
    // Save data
    saveUserData();
    
    // Update dashboard
    updateDashboard();
    
    // Show feedback
    if (result === 'success') {
        showModal('🎊 Today\'s Victory!', 'You successfully avoided your addiction today! Keep it up!');
    } else {
        showModal('🔄 Fresh Start', 'It\'s okay, every day is a new chance. Try again tomorrow!');
    }
}

// Update notification settings
function updateNotificationSettings() {
    const select = document.getElementById('updateNotificationTime');
    
    if (select.value === 'custom') {
        const customTime = document.getElementById('updateCustomTime').value;
        if (customTime) {
            userData.notificationTime = customTime;
        } else {
            alert('Please select a custom time!');
            return;
        }
    } else {
        userData.notificationTime = select.value;
    }
    
    saveUserData();
    setupDailyNotification();
    
    // Show confirmation
    alert('Notification settings updated!');
    
    // Update display
    document.getElementById('nextCheckTime').textContent = formatTimeForDisplay(userData.notificationTime);
}

// Format waktu untuk display
function formatTimeForDisplay(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`;
}

// Setup daily notification
function setupDailyNotification() {
    // Clear existing notification
    if (window.notificationInterval) {
        clearInterval(window.notificationInterval);
    }
    
    // Check if user has already checked in today
    const today = new Date().toISOString().split('T')[0];
    if (userData.history[today]) {
        return;
    }
    
    // Parse notification time
    const [notifyHour, notifyMinute] = userData.notificationTime.split(':').map(Number);
    
    // Function to check if it's notification time
    function checkNotificationTime() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Check if it's notification time
        if (currentHour === notifyHour && currentMinute === notifyMinute) {
            // Check if we already showed notification today
            if (userData.lastNotificationDate !== today) {
                showDailyNotification();
                userData.lastNotificationDate = today;
                saveUserData();
            }
        }
    }
    
    // Check every minute
    window.notificationInterval = setInterval(checkNotificationTime, 60000);
    
    // Initial check
    checkNotificationTime();
}

// Show daily notification
function showDailyNotification() {
    const modal = document.getElementById('notificationModal');
    modal.classList.add('active');
}

// Snooze notification
function snoozeNotification() {
    // Snooze for 1 hour
    setTimeout(() => {
        if (!userData.history[new Date().toISOString().split('T')[0]]) {
            showDailyNotification();
        }
    }, 60 * 60 * 1000);
}

// Navigasi kalender
let currentCalendarDate = new Date();

function navigateCalendar(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    generateCalendar(currentCalendarDate);
}

// Generate calendar
function generateCalendar(date) {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';
    
    // Update month display
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    document.getElementById('currentMonth').textContent = monthYear;
    
    // Add day headers
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const startingDay = firstDay.getDay();
    
    // Get days in month
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Add empty cells for days before first day
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        
        // Create date string for comparison
        const cellDate = new Date(date.getFullYear(), date.getMonth(), day);
        const dateString = cellDate.toISOString().split('T')[0];
        
        // Check if today
        const isToday = dateString === todayString;
        
        // Check if day has history
        if (userData.history[dateString]) {
            dayCell.classList.add(userData.history[dateString]);
        }
        
        if (isToday) {
            dayCell.classList.add('today');
        }
        
        // Check if future date
        if (cellDate > today) {
            dayCell.classList.add('future');
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

// Update greeting berdasarkan waktu
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = '';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    document.getElementById('greeting').textContent = `${greeting}, Space Warrior!`;
}

// Update dashboard dengan data user
function updateDashboard() {
    // Update user info
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userAddiction').textContent = userData.addictionDisplayName;
    
    // Update notification time
    document.getElementById('nextCheckTime').textContent = formatTimeForDisplay(userData.notificationTime);
    
    // Update notification settings dropdown
    const updateSelect = document.getElementById('updateNotificationTime');
    if (updateSelect) {
        // Cari option yang sesuai dengan waktu notifikasi user
        const options = Array.from(updateSelect.options);
        const matchingOption = options.find(opt => opt.value === userData.notificationTime);
        
        if (matchingOption) {
            updateSelect.value = userData.notificationTime;
            document.getElementById('updateCustomTimeContainer').style.display = 'none';
        } else {
            // Jika tidak ditemukan, gunakan custom
            updateSelect.value = 'custom';
            document.getElementById('updateCustomTimeContainer').style.display = 'block';
            document.getElementById('updateCustomTime').value = userData.notificationTime;
        }
    }
    
    // Calculate progress percentage
    const totalEntries = Object.keys(userData.history).length;
    const successEntries = Object.values(userData.history).filter(v => v === 'success').length;
    const progressPercentage = totalEntries > 0 ? Math.round((successEntries / totalEntries) * 100) : 0;
    
    // Update progress circle
    const progressCircle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (progressPercentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    // Update progress text
    document.getElementById('progressPercent').textContent = `${progressPercentage}%`;
    
    // Update progress message based on percentage
    let message = "";
    let subMessage = "";
    
    if (progressPercentage === 100) {
        message = "PERFECT! 🎉";
        subMessage = "You are completely free!";
    } else if (progressPercentage >= 80) {
        message = "Almost There!";
        subMessage = "Keep going, just a little more!";
    } else if (progressPercentage >= 50) {
        message = "Great Progress!";
        subMessage = "You're on the right track!";
    } else if (progressPercentage > 0) {
        message = "Keep Fighting!";
        subMessage = "Fight your urges, you can do better!";
    } else {
        message = "Ready for Launch!";
        subMessage = "Your journey begins today!";
    }
    
    document.getElementById('progressMessage').textContent = message;
    document.getElementById('progressSubMessage').textContent = subMessage;
    
    // Update stats
    document.getElementById('winStreak').textContent = `${userData.winStreak} days`;
    document.getElementById('totalDays').textContent = `${userData.totalDays} days`;
    document.getElementById('relapseCount').textContent = `${userData.relapseCount} times`;
    document.getElementById('successRate').textContent = `${progressPercentage}%`;
    
    // Update today's status
    const today = new Date().toISOString().split('T')[0];
    const todayStatus = document.getElementById('todayStatus');
    
    if (userData.history[today]) {
        if (userData.history[today] === 'success') {
            todayStatus.textContent = "Victory! 🎉";
            todayStatus.className = "status-success";
        } else {
            todayStatus.textContent = "Relapsed";
            todayStatus.className = "status-relapse";
        }
    } else {
        todayStatus.textContent = "Pending Check-In";
        todayStatus.className = "status-pending";
    }
    
    // Update last check
    if (userData.lastCheck) {
        const lastCheckDate = new Date(userData.lastCheck);
        const today = new Date();
        const diffTime = Math.abs(today - lastCheckDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let lastCheckText = "";
        if (diffDays === 0) lastCheckText = "Today";
        else if (diffDays === 1) lastCheckText = "Yesterday";
        else lastCheckText = `${diffDays} days ago`;
        
        document.getElementById('lastCheck').textContent = lastCheckText;
    } else {
        document.getElementById('lastCheck').textContent = "Never";
    }
    
    // Update motivation text
    updateMotivationText();
}

// Update motivation text
function updateMotivationText() {
    const totalEntries = Object.keys(userData.history).length;
    const successEntries = Object.values(userData.history).filter(v => v === 'success').length;
    const progressPercentage = totalEntries > 0 ? Math.round((successEntries / totalEntries) * 100) : 0;
    
    let motivationCategory = "";
    
    if (progressPercentage === 100) motivationCategory = "perfect";
    else if (progressPercentage >= 80) motivationCategory = "high";
    else if (progressPercentage >= 50) motivationCategory = "medium";
    else motivationCategory = "low";
    
    const messages = motivationMessages[motivationCategory];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    document.getElementById('motivationText').textContent = randomMessage;
}

// Show login screen
function showLogin() {
    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('dashboard').classList.remove('active');
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
}

// Show modal
function showModal(title, message) {
    const modal = document.getElementById('notificationModal');
    const modalHeader = modal.querySelector('.modal-header h3');
    const modalBody = modal.querySelector('.modal-body p');
    
    if (modalHeader) modalHeader.textContent = title;
    if (modalBody) modalBody.textContent = message;
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => modal.classList.remove('active'));
}

// Show reset confirmation
function showResetConfirmation() {
    document.getElementById('resetModal').classList.add('active');
}

// Reset progress
function resetProgress() {
    // Reset user data but keep email, addiction type, and theme
    userData = {
        email: userData.email,
        addictionType: userData.addictionType,
        addictionDisplayName: userData.addictionDisplayName,
        startDate: new Date().toISOString().split('T')[0],
        winStreak: 0,
        totalDays: 0,
        relapseCount: 0,
        history: {},
        lastCheck: null,
        notificationTime: userData.notificationTime,
        lastNotificationDate: null,
        theme: userData.theme || "dark"
    };
    
    // Save data
    saveUserData();
    
    // Update dashboard
    updateDashboard();
    
    // Close modal
    closeModal();
    
    // Show confirmation
    alert('All progress has been reset. Your journey starts fresh!');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal();
        }
    });
});

// Demo data for testing
function initDemoData() {
    // Only for demo if no data exists
    if (!userData.email && Object.keys(userData.history).length === 0) {
        // Create sample data for last 30 days
        const today = new Date();
        for (let i = 30; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            
            // 80% chance of success, 20% chance of relapse
            const isSuccess = Math.random() > 0.2;
            userData.history[dateString] = isSuccess ? 'success' : 'relapse';
        }
        
        // Update stats based on history
        const historyValues = Object.values(userData.history);
        userData.winStreak = 7; // Sample streak 7 days
        userData.totalDays = historyValues.length;
        userData.relapseCount = historyValues.filter(v => v === 'relapse').length;
        userData.lastCheck = today.toISOString().split('T')[0];
        
        saveUserData();
    }
}

// Initialize demo data for testing
initDemoData();