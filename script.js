    let currentStep = 1;
let studyPreference = "Exam preparation";
const selectedGoals = new Set();
const selectedCourses = new Set();
const selectedAvailability = new Set();
const courseSuggestions = [
    "CSIT121",
    "MGNT110",
    "ACCY101",
    "BUS111"
];
const allPeopleData = [
    { name: "Aisha", initials: "AK", role: "Computer Science · Year 2", match: "94%", category: "Study", tags: ["Technology", "AI", "Design"], reasons: ["Same course", "3 shared interests", "Similar study style"] },
    { name: "Omar", initials: "OH", role: "Business Analytics · Year 3", match: "87%", category: "Casual", tags: ["Data", "Startups", "Sports"], reasons: ["2 shared interests", "Similar availability", "Both like networking"] },
    { name: "Maya", initials: "MC", role: "UX Design · Year 2", match: "84%", category: "Casual", tags: ["Design", "Music", "Film"], reasons: ["4 shared interests", "Similar study style", "Both like campus events"] },
    { name: "Liam", initials: "LW", role: "Software Engineering · Year 1", match: "91%", category: "Study", tags: ["Coding", "Algorithms", "Gaming"], reasons: ["Same faculty", "Weekend study routine", "Prefers peer programming"] },
    { name: "Sophia", initials: "SK", role: "Data Science · Year 3", match: "89%", category: "Study", tags: ["Python", "Statistics", "Coffee"], reasons: ["Library study partner", "Quiet environment", "Same evening schedule"] },
    { name: "Ethan", initials: "EB", role: "Digital Marketing · Year 2", match: "82%", category: "Casual", tags: ["Social Media", "Photography", "Fitness"], reasons: ["Frequent campus events", "Outdoor activities", "Shared club interests"] },
    { name: "Chloe", initials: "CD", role: "Marketing & PR · Year 2", match: "90%", category: "Casual", tags: ["Branding", "Content Creation", "Events"], reasons: ["Shared marketing modules", "Afternoon availability", "Active in campus societies"] },
    { name: "Daniel", initials: "DV", role: "Biological Sciences · Year 3", match: "88%", category: "Study", tags: ["Genetics", "Lab Research", "Hiking"], reasons: ["Quiet study preference", "Same library hours", "Focus study style"] },
    { name: "Hannah", initials: "HZ", role: "Psychology · Year 1", match: "85%", category: "Casual", tags: ["Cognition", "Reading", "Volunteering"], reasons: ["Peer study groups", "Shared campus clubs", "Collaborative format"] },
    { name: "Lucas", initials: "LM", role: "Finance & Accounting · Year 2", match: "89%", category: "Study", tags: ["Economics", "Excel", "Chess"], reasons: ["Exam prep focus", "Evening study routines", "Analytical background"] },
    { name: "Zara", initials: "ZP", role: "Fine Arts & Media · Year 3", match: "83%", category: "Casual", tags: ["Illustration", "Photography", "Exhibitions"], reasons: ["Creative projects", "Shared weekend availability", "Campus arts events"] },
    { name: "Marcus", initials: "MT", role: "Environmental Science · Year 2", match: "92%", category: "Study", tags: ["Ecology", "Sustainability", "Outdoors"], reasons: ["Group project experience", "Similar course electives", "Collaborative study"] },
    { name: "Elena", initials: "ER", role: "Journalism & Media · Year 1", match: "86%", category: "Casual", tags: ["Writing", "Podcasting", "Current Affairs"], reasons: ["Networking goals", "Frequent campus events", "Shared discussion groups"] }
];
let activeFilter = "All";
function renderPeopleGrid() {
    const grid = document.getElementById("peopleGrid");
    if (!grid) return;
    let filtered = allPeopleData.filter(person => {
        if (activeFilter === "All") return true;
        return person.category === activeFilter;
    });
    // Display first 4 in main page grid
    filtered = filtered.slice(0, 4);
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>No ${activeFilter} matches yet. Try another filter to see more students.</p>
                <button class="view-more-btn" onclick="resetPeopleFilter()">See all students →</button>
            </div>
        `;
        return;
    }
    grid.innerHTML = filtered.map(person => `
        <article class="person-card">
            <div>
                <div class="person-header">
                    <div class="person-avatar">${person.initials}</div>
                    <div>
                        <h3>${person.name}</h3>
                        <div class="person-role">${person.role}</div>
                    </div>
                </div>
                <div class="match-score">
                    ${person.match}
                    <small>MATCH</small>
                </div>
                <div class="tags">
                    ${person.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <div class="reasons-list">
                    ${person.reasons.map(r => `<div class="reason">${r}</div>`).join('')}
                </div>
            </div>
            <button class="primary-button" onclick="connect(this,'${person.name}')">
                Meet ${person.name} →
            </button>
        </article>
    `).join('');
}
function resetPeopleFilter() {
    activeFilter = "All";
    document.querySelectorAll('.class-tab').forEach(b => b.classList.remove('active'));
    const firstTab = document.querySelector('.class-tab');
    if (firstTab) firstTab.classList.add('active');
    renderPeopleGrid();
}
function filterPeople(cat, btn) {
    activeFilter = cat;
    document.querySelectorAll('.class-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPeopleGrid();
}
function toggleNotifDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById("notifDropdown");
    if (dropdown) {
        dropdown.classList.toggle("active");
    }
}
function clearNotifs() {
    const badge = document.querySelector(".notif-badge");
    if (badge) badge.style.display = "none";
    showToast("Notifications marked as read");
}
document.addEventListener("click", () => {
    const dropdown = document.getElementById("notifDropdown");
    if (dropdown && dropdown.classList.contains("active")) {
        dropdown.classList.remove("active");
    }
});
const dashboardConnections = [
    { name: "Aisha (AK)", role: "Computer Science<br>Year 2", initials: "AK" },
    { name: "Omar (OH)", role: "Business Analytics<br>Year 3", initials: "OH" },
    { name: "Maya (MC)", role: "UX Design<br>Year 2", initials: "MC" },
    { name: "Liam (LW)", role: "Software Engineering<br>Year 1", initials: "LW" },
    { name: "Sophia (SK)", role: "Data Science<br>Year 3", initials: "SK" }
];
const dashboardStudyGroups = [
    { title: "Database Systems", meta: "Wednesdays · 5:30 PM · Library" },
    { title: "Data Analytics Revision", meta: "Thursdays · 6:00 PM · Study Hall" },
    { title: "UX Design Team", meta: "Saturdays · 2:00 PM · Design Studio" }
];
const dashboardEvents = [
    { title: "AI & Innovation Night", meta: "Today · 6:30 PM · Innovation Hub" },
    { title: "Startup Pitch Night", meta: "Today · 5:00 PM · Entrepreneurship Ctr" },
    { title: "Design Thinking Workshop", meta: "Friday · 4:00 PM · Design Studio" }
];
const timetableDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timetableStartHour = 8;
const timetableEndHour = 21;
const timetableSlotHours = 0.5;
const dashboardScheduleEvents = [
    { day: "Mon", start: 18.5, duration: 1.5, title: "AI & Innovation Night", meta: "Innovation Hub", type: "event" },
    { day: "Tue", start: 17, duration: 1.5, title: "Startup Pitch Night", meta: "Entrepreneurship Ctr", type: "event" },
    { day: "Wed", start: 17.5, duration: 1.5, title: "Database Systems", meta: "Library · Study Group", type: "study" },
    { day: "Thu", start: 18, duration: 1.5, title: "Data Analytics Revision", meta: "Study Hall · Study Group", type: "study" },
    { day: "Fri", start: 16, duration: 1.5, title: "Design Thinking Workshop", meta: "Design Studio", type: "event" },
    { day: "Sat", start: 14, duration: 2, title: "UX Design Team", meta: "Design Studio · Study Group", type: "study" }
];
function formatTimetableHour(hour) {
    const h24 = Math.floor(hour);
    const minutes = Math.round((hour - h24) * 60);
    const period = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${minutes.toString().padStart(2, "0")} ${period}`;
}
function renderTimetable() {
    const grid = document.getElementById("timetableGrid");
    if (!grid) return;
    const totalSlots = Math.round((timetableEndHour - timetableStartHour) / timetableSlotHours);
    let html = "";
    html += `<div class="timetable-corner" style="grid-row:1; grid-column:1;"></div>`;
    timetableDays.forEach((day, i) => {
        html += `<div class="timetable-day-header" style="grid-row:1; grid-column:${i + 2};">${day}</div>`;
    });
    for (let i = 0; i < totalSlots; i++) {
        const hour = timetableStartHour + i * timetableSlotHours;
        const row = i + 2;
        if (i % 2 === 0) {
            html += `<div class="timetable-time-label" style="grid-row:${row} / ${row + 2}; grid-column:1;">${formatTimetableHour(hour)}</div>`;
        }
        for (let d = 0; d < timetableDays.length; d++) {
            html += `<div class="timetable-slot" style="grid-row:${row}; grid-column:${d + 2};"></div>`;
        }
    }
    dashboardScheduleEvents.forEach(ev => {
        const dayIndex = timetableDays.indexOf(ev.day);
        if (dayIndex === -1) return;
        const startSlot = Math.round((ev.start - timetableStartHour) / timetableSlotHours);
        const spanSlots = Math.round(ev.duration / timetableSlotHours);
        const rowStart = startSlot + 2;
        const rowEnd = rowStart + spanSlots;
        html += `
            <div class="timetable-event ${ev.type}" style="grid-row:${rowStart} / ${rowEnd}; grid-column:${dayIndex + 2};">
                <strong>${escapeHTML(ev.title)}</strong>
                <span>${escapeHTML(ev.meta)}</span>
            </div>
        `;
    });
    grid.innerHTML = html;
    grid.style.gridTemplateRows = `32px repeat(${totalSlots}, 22px)`;
}
function renderDashboard() {
    renderTimetable();
    const connList = document.getElementById("connectionsList");
    const connCount = document.getElementById("connectionsCount");
    const sgList = document.getElementById("studyGroupsList");
    const sgCount = document.getElementById("studyGroupsCount");
    const evList = document.getElementById("eventsList");
    const evCount = document.getElementById("eventsCount");
    if (connCount) connCount.textContent = dashboardConnections.length;
    if (sgCount) sgCount.textContent = dashboardStudyGroups.length;
    if (evCount) evCount.textContent = dashboardEvents.length;
    if (connList) {
        connList.innerHTML = dashboardConnections.map(c => `
            <div class="dash-item">
                <div class="dash-item-info">
                    <div class="person-avatar" style="width:36px; height:36px; font-size:11px;">${c.initials}</div>
                    <div>
                        <h4>${c.name}</h4>
                        <p>${c.role}</p>
                    </div>
                </div>
                <span style="font-size:11px; color:var(--mint); font-weight:700;">Connected</span>
            </div>
        `).join('');
    }
    if (sgList) {
        sgList.innerHTML = dashboardStudyGroups.map(s => `
            <div class="dash-item">
                <div>
                    <h4>${s.title}</h4>
                    <p>${s.meta}</p>
                </div>
                <span style="font-size:11px; color:var(--violet); font-weight:700;">Joined</span>
            </div>
        `).join('');
    }
    if (evList) {
        evList.innerHTML = dashboardEvents.map(e => `
            <div class="dash-item">
                <div>
                    <h4>${e.title}</h4>
                    <p>${e.meta}</p>
                </div>
                <span style="font-size:11px; color:var(--violet); font-weight:700;">Enrolled</span>
            </div>
        `).join('');
    }
}
function openPostModal() {
    document.getElementById("postModal").classList.add("active");
    document.body.style.overflow = "hidden";
}
function closePostModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById("postModal").classList.remove("active");
    document.body.style.overflow = "";
}
function handlePostSubmit(e) {
    e.preventDefault();
    const type = document.getElementById("postType").value;
    const title = document.getElementById("postTitle").value;
    const meta = document.getElementById("postMeta").value;
    if (type === "Casual") {
        const initials = title.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || "U";
        dashboardConnections.unshift({ name: title, role: meta, initials });
    } else if (type === "Study") {
        dashboardStudyGroups.unshift({ title, meta });
    } else if (type === "Event") {
        dashboardEvents.unshift({ title, meta });
    }
    renderDashboard();
    closePostModal();
    showToast(`New ${type.toLowerCase()} entry added to your dashboard!`);
    document.getElementById("postTitle").value = "";
    document.getElementById("postMeta").value = "";
}
/* =========================================================
   PAGE NAVIGATION
========================================================= */
function showPage(pageId) {
    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });
    const targetPage =
        document.getElementById(pageId);
    if (!targetPage) {
        return;
    }
    targetPage.classList.add("active");
    document
        .querySelectorAll(".nav-links button[data-page]")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === pageId
            );
        });
    document
        .querySelectorAll(".mobile-nav button[data-page]")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === pageId
            );
        });
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (pageId === "onboarding") {
        renderOnboarding();
    }
    if (pageId === "home") {
        renderPeopleGrid();
    }
    if (pageId === "dashboard") {
        renderDashboard();
    }
    setTimeout(() => {
        refreshRevealAnimations();
    }, 80);
}
function goToAbout() {
    const isLandingActive =
        document.getElementById("landing")
            .classList.contains("active");
    document
        .querySelectorAll(".nav-links button[data-page]")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.page === "about"
            );
        });
    if (!isLandingActive) {
        document
            .querySelectorAll(".page")
            .forEach(page => {
                page.classList.remove("active");
            });
        document
            .getElementById("landing")
            .classList.add("active");
        setTimeout(() => {
            refreshRevealAnimations();
            scrollToAboutSection();
        }, 80);
        return;
    }
    scrollToAboutSection();
}
function scrollToAboutSection() {
    const aboutSection =
        document.getElementById("about");
    if (!aboutSection) {
        return;
    }
    const navHeight = 34;
    const targetTop =
        aboutSection.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;
    window.scrollTo({
        top: targetTop,
        behavior: "smooth"
    });
}
function startOnboarding() {
    currentStep = 1;
    showPage("onboarding");
}
function renderOnboarding() {
    updateProgress();
    const content =
        document.getElementById("onboardingContent");
    if (currentStep === 1) {
        content.innerHTML = `
            <div class="step-label">
                STEP 1 OF 3
            </div>
            <h2>
                Enter your current courses
            </h2>
            <p class="onboarding-lead">
                Add the courses you're currently taking.
                This helps UniMate find students from
                the same classes.
            </p>
            <div class="course-input-wrapper">
                <input
                    id="courseInput"
                    class="course-input"
                    type="text"
                    placeholder="e.g. Database Systems"
                    onkeydown="handleCourseKey(event)">
                <button
                    class="add-course-button"
                    onclick="addCourse()">
                    + Add course
                </button>
            </div>
            ${
                courseSuggestions
                .filter(course => !selectedCourses.has(course))
                .length > 0
                ? `
                    <div class="course-suggestions">
                        <span class="course-suggestions-label">
                            Suggestion:
                        </span>
                        ${courseSuggestions
                            .filter(course => !selectedCourses.has(course))
                            .map(course => `
                                <button
                                    class="suggestion-chip"
                                    onclick="addSuggestedCourse('${escapeAttribute(course)}')">
                                    ${escapeHTML(course)}
                                    <span class="suggestion-plus">
                                        +
                                    </span>
                                </button>
                            `)
                            .join("")}
                    </div>
                  `
                : ""
            }
            <div class="course-list">
                ${Array.from(selectedCourses)
                    .map(course => `
                        <div class="course-chip">
                            <span>
                                ${escapeHTML(course)}
                            </span>
                            <button
                                onclick="removeCourse('${escapeAttribute(course)}')"
                                aria-label="Remove course">
                                ×
                            </button>
                        </div>
                    `)
                    .join("")}
            </div>
            ${
                selectedCourses.size === 0
                ? `
                    <p class="course-hint">
                        You can add multiple courses.
                    </p>
                  `
                : `
                    <p class="course-hint">
                        ${selectedCourses.size}
                        ${
                            selectedCourses.size === 1
                            ? "course"
                            : "courses"
                        }
                        added.
                    </p>
                  `
            }
            <div class="controls">
                <button
                    class="text-button"
                    onclick="showPage('landing')">
                    ← Back
                </button>
                <button
                    class="primary-button"
                    onclick="nextStep()">
                    Continue →
                </button>
            </div>
        `;
        return;
    }
    if (currentStep === 2) {
        const goals = [
            [
                "study",
                "Study partners",
                "Find people to study with"
            ],
            [
                "friends",
                "New friends",
                "Meet people who share your interests"
            ],
            [
                "network",
                "Networking",
                "Build your campus network"
            ],
            [
                "events",
                "Campus events",
                "Find things happening around you"
            ],
            [
                "clubs",
                "Clubs & communities",
                "Discover communities that fit you"
            ],
            [
                "projects",
                "Project teammates",
                "Find people to build with"
            ]
        ];
        content.innerHTML = `
            <div class="step-label">
                STEP 2 OF 3
            </div>
            <h2>
                What are you looking for?
            </h2>
            <p class="onboarding-lead">
                Choose anything that brings you to UniMate.
                You can select more than one.
            </p>
            <div class="option-grid">
                ${goals
                    .map(goal => `
                        <button
                            class="option-card ${
                                selectedGoals.has(goal[0])
                                ? "selected"
                                : ""
                            }"
                            onclick="toggleGoal('${goal[0]}')">
                            <strong>
                                ${goal[1]}
                            </strong>
                            <small>
                                ${goal[2]}
                            </small>
                        </button>
                    `)
                    .join("")}
            </div>
            <div class="controls">
                <button
                    class="text-button"
                    onclick="goBack()">
                    ← Back
                </button>
                <button
                    class="primary-button"
                    onclick="nextStep()">
                    Continue →
                </button>
            </div>
        `;
        return;
    }
    if (currentStep === 3) {
        const studyOptions = [
            "Exam preparation",
            "Focused study",
            "Projects",
            "Casual revision"
        ];
        const availabilityOptions = [
            "Early Mornings",
            "Mornings",
            "Afternoons",
            "Evenings",
            "Late Nights",
            "Weekdays",
            "Weekends"
        ];
        content.innerHTML = `
            <div class="step-label">
                STEP 3 OF 3
            </div>
            <h2>
                How do you like to study?
            </h2>
            <p class="onboarding-lead">
                Tell us how you prefer to study and when
                you're generally available.
            </p>
            <div class="range-row">
                <div class="range-label">
                    <span>
                        Independent
                    </span>
                    <span>
                        Collaborative
                    </span>
                </div>
                <input
                    class="range"
                    type="range"
                    min="0"
                    max="100"
                    value="75">
            </div>
            <div class="range-row">
                <div class="range-label">
                    <span>
                        Quiet
                    </span>
                    <span>
                        Social
                    </span>
                </div>
                <input
                    class="range"
                    type="range"
                    min="0"
                    max="100"
                    value="80">
            </div>
            <div class="preference-title">
                Study preference
            </div>
            <div class="chips">
                ${studyOptions
                    .map(option => `
                        <button
                            class="chip ${
                                studyPreference === option
                                ? "selected"
                                : ""
                            }"
                            onclick="selectStudyPreference('${option}')">
                            ${option}
                        </button>
                    `)
                    .join("")}
            </div>
            <div class="availability-section">
                <div class="preference-title">
                    General Availability
                </div>
                <p class="preference-subtitle">
                    When are you usually available to connect,
                    study or join activities?
                </p>
                <div class="chips">
                    ${availabilityOptions
                        .map(option => `
                            <button
                                class="chip ${
                                    selectedAvailability.has(option)
                                    ? "selected"
                                    : ""
                                }"
                                onclick="toggleAvailability('${option}')">
                                ${option}
                            </button>
                        `)
                        .join("")}
                </div>
            </div>
            <div class="controls">
                <button
                    class="text-button"
                    onclick="goBack()">
                    ← Back
                </button>
                <button
                    class="primary-button"
                    onclick="startMatching()">
                    Find my people →
                </button>
            </div>
        `;
    }
}
function updateProgress() {
    for (let i = 1; i <= 3; i++) {
        const bar =
            document.getElementById("progress" + i);
        if (bar) {
            bar.classList.toggle(
                "active",
                i <= currentStep
            );
        }
        const label =
            document.getElementById("progressLabel" + i);
        if (label) {
            label.classList.toggle(
                "active",
                i === currentStep
            );
        }
    }
}
function addCourse() {
    const input =
        document.getElementById("courseInput");
    if (!input) {
        return;
    }
    const course =
        input.value.trim();
    if (!course) {
        showToast("Enter a course first");
        return;
    }
    if (selectedCourses.has(course)) {
        showToast("That course is already added");
        input.value = "";
        return;
    }
    selectedCourses.add(course);
    renderOnboarding();
    setTimeout(() => {
        const newInput =
            document.getElementById("courseInput");
        if (newInput) {
            newInput.focus();
        }
    }, 50);
}
function handleCourseKey(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addCourse();
    }
}
function removeCourse(course) {
    selectedCourses.delete(course);
    renderOnboarding();
}
function addSuggestedCourse(course) {
    if (selectedCourses.has(course)) {
        return;
    }
    selectedCourses.add(course);
    renderOnboarding();
}
function escapeHTML(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function escapeAttribute(value) {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
}
function toggleGoal(goal) {
    if (selectedGoals.has(goal)) {
        selectedGoals.delete(goal);
    } else {
        selectedGoals.add(goal);
    }
    renderOnboarding();
}
function selectStudyPreference(preference) {
    studyPreference = preference;
    renderOnboarding();
}
function toggleAvailability(option) {
    if (selectedAvailability.has(option)) {
        selectedAvailability.delete(option);
    } else {
        selectedAvailability.add(option);
    }
    renderOnboarding();
}
function nextStep() {
    if (currentStep < 3) {
        currentStep++;
        renderOnboarding();
    }
}
function goBack() {
    if (currentStep > 1) {
        currentStep--;
        renderOnboarding();
    }
}
function startMatching() {
    const content =
        document.getElementById("onboardingContent");
    content.innerHTML = `
        <div class="matching">
            <div class="loader"></div>
            <div class="step-label">
                PERSONALISING YOUR CAMPUS
            </div>
            <h2>
                Finding your people.
            </h2>
            <div class="matching-list">
                <div>
                    <b>✓</b>
                    Matching your courses
                </div>
                <div>
                    <b>✓</b>
                    Finding compatible students
                </div>
                <div>
                    <b>✓</b>
                    Checking study preferences
                </div>
                <div>
                    <b>✓</b>
                    Matching your availability
                </div>
            </div>
        </div>
    `;
    setTimeout(() => {
        showPage("home");
        showToast(
            "Your UniMate is ready ✨"
        );
    }, 1800);
}
function connect(button, person) {
    button.textContent =
        "✓ Connected";
    button.style.background =
        "var(--mint)";
    showToast(
        `You and ${person} are now connected`
    );
}
function joinGroup(button) {
    button.textContent =
        "✓ You're in";
    button.style.background =
        "var(--mint)";
    showToast(
        "Database Systems added to your groups"
    );
}
function eventGoing(button) {
    button.textContent =
        "✓ I'm interested";
    button.style.background =
        "var(--mint)";
    showToast(
        "AI & Innovation Night added to your plans"
    );
}
let currentModalType = "";
function openExploreModal(type) {
    currentModalType = type;
    const modal = document.getElementById("exploreModal");
    const title = document.getElementById("exploreModalTitle");
    const label = document.getElementById("exploreModalLabel");
    const subtitle = document.getElementById("exploreModalSubtitle");
    const searchWrapper = document.getElementById("modalSearchWrapper");
    const searchInput = document.getElementById("studentSearchInput");
    if (searchInput) searchInput.value = "";
    if (type === "people") {
        label.textContent = "People you might click with";
        title.textContent = "More student matches";
        subtitle.textContent = "Discover more students with matching courses, goals, and study habits.";
        if (searchWrapper) searchWrapper.style.display = "block";
        renderModalStudentList(allPeopleData);
    } else {
        if (searchWrapper) searchWrapper.style.display = "none";
        renderModalOtherList(type);
    }
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}
function renderModalStudentList(students) {
    const list = document.getElementById("exploreList");
    list.innerHTML = students.map(p => `
        <div class="explore-item">
            <div class="explore-item-top">
                <div>
                    <h3>${p.name} (${p.initials})</h3>
                    <div class="explore-item-meta">${p.role} · ${p.category} Match</div>
                </div>
            </div>
            <p class="explore-item-description">${p.reasons.join(" • ")}</p>
            <div class="tags">
                ${p.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="explore-item-footer">
                <span>${p.match} match</span>
                <button onclick="exploreAction(this, '${p.name.replace(/'/g, "\\'")}')">Connect</button>
            </div>
        </div>
    `).join("");
}
function filterModalStudents() {
    const query = document.getElementById("studentSearchInput").value.toLowerCase();
    const filtered = allPeopleData.filter(p => {
        return p.name.toLowerCase().includes(query) ||
               p.role.toLowerCase().includes(query) ||
               p.tags.some(t => t.toLowerCase().includes(query));
    });
    renderModalStudentList(filtered);
}
function renderModalOtherList(type) {
    const list = document.getElementById("exploreList");
    const title = document.getElementById("exploreModalTitle");
    const label = document.getElementById("exploreModalLabel");
    const subtitle = document.getElementById("exploreModalSubtitle");
    let items = [];
    if (type === "events") {
        label.textContent = "Happening today";
        title.textContent = "More happening today";
        subtitle.textContent = "Discover events and activities happening around your campus.";
        items = [
            { name: "AI & Innovation Night", meta: "Today · 6:30 PM · Innovation Hub", description: "Meet students interested in AI, emerging technology and innovation.", tags: ["Technology", "Networking"], people: "23 students going" },
            { name: "Startup Pitch Night", meta: "Today · 5:00 PM · Entrepreneurship Centre", description: "Watch student founders pitch their ideas and meet people interested in startups.", tags: ["Startups", "Business"], people: "31 students going" },
            { name: "Design Thinking Workshop", meta: "Today · 4:00 PM · Design Studio", description: "Work through a practical design challenge and collaborate with other students.", tags: ["Design", "Workshop"], people: "18 students going" },
            { name: "Campus Football Meetup", meta: "Today · 7:00 PM · Sports Field", description: "A casual football meetup for students looking to play and meet new people.", tags: ["Sports", "Social"], people: "27 students going" },
            { name: "Photography Walk", meta: "Today · 6:00 PM · Main Gate", description: "Explore campus with other students interested in photography and creative projects.", tags: ["Photography", "Creative"], people: "14 students going" },
            { name: "International Students Social", meta: "Today · 7:30 PM · Student Lounge", description: "Meet students from different backgrounds in a relaxed campus social.", tags: ["Social", "Community"], people: "42 students going" }
        ];
    } else if (type === "study") {
        label.textContent = "Study with people";
        title.textContent = "More study groups";
        subtitle.textContent = "Find study groups that match your courses, time and study style.";
        items = [
            { name: "Database Systems", meta: "Wednesday · 5:30 PM · Library Level 2", description: "Exam preparation group focused on past papers, key concepts and problem solving.", tags: ["Database Systems", "Exam preparation"], people: "96% match" },
            { name: "Data Analytics Revision", meta: "Thursday · 6:00 PM · Study Hall", description: "Collaborative revision for students working through analytics concepts and practice questions.", tags: ["Data", "Revision"], people: "93% match" },
            { name: "AI & Machine Learning", meta: "Friday · 4:30 PM · Innovation Hub", description: "Work together through machine learning topics, exercises and project ideas.", tags: ["AI", "Machine Learning"], people: "91% match" },
            { name: "UX Design Project Team", meta: "Saturday · 2:00 PM · Design Studio", description: "A collaborative group for students looking to work on UX and interface design projects.", tags: ["UX", "Projects"], people: "88% match" },
            { name: "Casual Revision Crew", meta: "Sunday · 3:00 PM · Campus Café", description: "Low-pressure revision session for students who prefer studying socially.", tags: ["Casual", "Social"], people: "86% match" }
        ];
    }
    list.innerHTML = items.map(item => `
        <div class="explore-item">
            <div class="explore-item-top">
                <div>
                    <h3>${item.name}</h3>
                    <div class="explore-item-meta">${item.meta}</div>
                </div>
            </div>
            <p class="explore-item-description">${item.description}</p>
            <div class="tags">
                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="explore-item-footer">
                <span>${item.people}</span>
                <button onclick="exploreAction(this, '${item.name.replace(/'/g, "\\'")}')">
                    ${type === "events" ? "I'm interested" : "Join group →"}
                </button>
            </div>
        </div>
    `).join("");
}
function closeExploreModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById("exploreModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";
}
function exploreAction(button, itemName) {
    button.textContent = "✓ Added";
    button.style.background = "var(--mint)";
    showToast(`${itemName} added to your profile`);
}
function showToast(message) {
    const toast =
        document.getElementById("toast");
    toast.textContent =
        message;
    toast.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer =
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
}
function resetDemo() {
    if (!confirm("Reset all demo data? This can't be undone.")) {
        return;
    }
    selectedGoals.clear();
    selectedCourses.clear();
    selectedAvailability.clear();
    studyPreference =
        "Exam preparation";
    currentStep = 1;
    showPage("landing");
}
let revealObserver;
function setupRevealObserver() {
    if (revealObserver) {
        revealObserver.disconnect();
    }
    const revealElements =
        document.querySelectorAll(".scroll-reveal");
    revealObserver =
        new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "visible"
                        );
                    }
                });
            },
            {
                root: null,
                rootMargin:
                    "0px 0px -100px 0px",
                threshold: 0.01
            }
        );
    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}
function refreshRevealAnimations() {
    const activePage =
        document.querySelector(".page.active");
    if (!activePage) {
        return;
    }
    activePage
        .querySelectorAll(".scroll-reveal")
        .forEach(element => {
            element.classList.remove("visible");
        });
    setTimeout(() => {
        setupRevealObserver();
        activePage
            .querySelectorAll(".scroll-reveal")
            .forEach(element => {
                const rect =
                    element.getBoundingClientRect();
                if (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                ) {
                    element.classList.add(
                        "visible"
                    );
                }
            });
    }, 50);
}
document.addEventListener(
    "DOMContentLoaded",
    () => {
        showPage("landing");
        setupRevealObserver();
        refreshRevealAnimations();
        renderPeopleGrid();
    }
);