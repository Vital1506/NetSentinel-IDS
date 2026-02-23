(() => {
    "use strict";

    /* =========================================
       GLOBAL STATE
    ========================================= */

    const state = {
        scanning: false,
        controller: null,
        alertCount: 0
    };

    const DOM = {};

    /* =========================================
       INITIALIZATION
    ========================================= */

    document.addEventListener("DOMContentLoaded", () => {
        cacheDOM();
        initScanModule();
        initDashboardModule();
        initSocketModule();
        initThemeToggle();
        log("NetSentinel SOC Frontend Initialized");
    });

    function cacheDOM() {
        DOM.form = document.getElementById("scan-form");
        DOM.urlInput = document.getElementById("url-input");
        DOM.loader = document.getElementById("loader");
        DOM.resultContainer = document.getElementById("result-container");
        DOM.resultUrl = document.getElementById("result-url");
        DOM.threatBadge = document.getElementById("threat-badge");
        DOM.riskBar = document.getElementById("risk-bar");
        DOM.riskDetails = document.getElementById("risk-details");
        DOM.errorMessage = document.getElementById("error-message");
        DOM.themeToggle = document.getElementById("theme-toggle");
        DOM.liveFeed = document.getElementById("live-feed");
        DOM.navbar = document.querySelector(".navbar");
        DOM.alertModal = document.getElementById("alert-modal");
        DOM.alertMessage = document.getElementById("alert-message");
        DOM.alertSound = document.getElementById("alert-sound");
    }

    /* =========================================
       SCAN MODULE
    ========================================= */

    function initScanModule() {
        if (!DOM.form) return;
        DOM.form.addEventListener("submit", handleScan);
    }

    async function handleScan(e) {
        e.preventDefault();
        if (state.scanning) return;

        const url = DOM.urlInput.value.trim();
        if (!validateUrl(url)) {
            return showError("Invalid URL format.");
        }

        state.scanning = true;
        hideError();
        resetResult();
        showLoader();

        state.controller = new AbortController();

        try {
            const response = await fetch("/api/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
                signal: state.controller.signal
            });

            if (!response.ok) throw new Error("Server error");

            const data = await response.json();
            renderResult(url, data);

        } catch (err) {
            showError("Scan failed. System unavailable.");
            log(err.message, "error");
        } finally {
            hideLoader();
            state.scanning = false;
        }
    }

    function renderResult(url, data) {
        DOM.resultContainer?.classList.remove("hidden");
        DOM.resultUrl.textContent = url;

        updateThreatBadge(data.threat_level);
        animateRiskBar(Number(data.risk_score));
        renderDetails(data);
    }

    function validateUrl(url) {
        const regex = /^(http|https):\/\/[^\s]+$/;
        return regex.test(url);
    }

    /* =========================================
       DASHBOARD MODULE
    ========================================= */

    function initDashboardModule() {
        initCounters();
        if (typeof statsData !== "undefined") {
            renderRiskChart(statsData);
            renderTrendChart();
        }
    }

    function initCounters() {
        const counters = document.querySelectorAll(".counter");
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let current = 0;
            const step = target / 100;

            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                counter.innerText = Math.floor(current);
            }, 20);
        });
    }

    /* =========================================
       CHARTS
    ========================================= */

    function renderRiskChart(data) {
        const ctx = document.getElementById("riskChart");
        if (!ctx) return;

        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: ["High", "Medium", "Low"],
                datasets: [{
                    data: [data.high, data.medium, data.low],
                    backgroundColor: ["#ef4444", "#facc15", "#22c55e"]
                }]
            }
        });
    }

    function renderTrendChart() {
        const ctx = document.getElementById("trendChart");
        if (!ctx) return;

        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    label: "Scans",
                    data: [5, 8, 12, 7, 10, 15, 9],
                    borderColor: "#38bdf8",
                    tension: 0.4
                }]
            }
        });
    }

    /* =========================================
       LIVE SOCKET MODULE
    ========================================= */

    function initSocketModule() {
        if (typeof io === "undefined") return;
        const socket = io();

        socket.on("new_scan", data => {
            addLiveItem(data);
        });
    }

    function addLiveItem(data) {
        if (!DOM.liveFeed) return;

        const severity = data.threat_level.toLowerCase();

        const item = document.createElement("div");
        item.className = `live-item ${severity}`;

        item.innerHTML = `
            <strong>${data.url}</strong>
            <span>${data.risk_score}%</span>
            <span>${data.threat_level}</span>
        `;

        DOM.liveFeed.prepend(item);

        updateAlertCounter(severity);

        if (severity === "critical") {
            triggerCriticalAlert(data);
        }
    }

    /* =========================================
       ALERT ENGINE
    ========================================= */

    function updateAlertCounter(severity) {
        if (severity !== "high" && severity !== "critical") return;

        state.alertCount++;

        let badge = document.getElementById("alert-counter");

        if (!badge) {
            badge = document.createElement("span");
            badge.id = "alert-counter";
            badge.className = "alert-counter";
            DOM.navbar?.appendChild(badge);
        }

        badge.textContent = state.alertCount;
    }

    function triggerCriticalAlert(data) {
        if (!DOM.alertModal) return;

        DOM.alertMessage.innerHTML = `
            🚨 CRITICAL PHISHING THREAT DETECTED<br><br>
            <strong>URL:</strong> ${data.url}<br>
            <strong>Risk Score:</strong> ${data.risk_score}%<br>
            Immediate investigation required.
        `;

        DOM.alertModal.classList.remove("hidden");

        if (DOM.alertSound) {
            DOM.alertSound.currentTime = 0;
            DOM.alertSound.play();
        }

        setTimeout(() => {
            DOM.alertModal.classList.add("hidden");
        }, 8000);

        log("CRITICAL ALERT TRIGGERED", "error");
    }

    window.closeAlert = function() {
        DOM.alertModal?.classList.add("hidden");
    };

    /* =========================================
       UI HELPERS
    ========================================= */

    function updateThreatBadge(level) {
        if (!DOM.threatBadge) return;
        DOM.threatBadge.textContent = `Threat Level: ${level}`;
        DOM.threatBadge.className = `threat-level ${level.toLowerCase()}`;
    }

    function animateRiskBar(target) {
        if (!DOM.riskBar) return;

        let current = 0;
        const step = target / 80;

        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            const value = Math.floor(current);
            DOM.riskBar.style.width = value + "%";
            DOM.riskBar.textContent = value + "%";

        }, 10);
    }

    function renderDetails(data) {
        if (!DOM.riskDetails) return;

        DOM.riskDetails.innerHTML = `
            <div><strong>Prediction:</strong> ${data.prediction === 1 ? "Safe" : "Phishing"}</div>
            <div><strong>Confidence:</strong> ${data.risk_score}%</div>
        `;
    }

    function showLoader() { DOM.loader?.classList.remove("hidden"); }
    function hideLoader() { DOM.loader?.classList.add("hidden"); }

    function showError(msg) {
        if (!DOM.errorMessage) return;
        DOM.errorMessage.textContent = msg;
        DOM.errorMessage.classList.remove("hidden");
    }

    function hideError() {
        DOM.errorMessage?.classList.add("hidden");
    }

    function resetResult() {
        DOM.resultContainer?.classList.add("hidden");
        if (DOM.riskBar) {
            DOM.riskBar.style.width = "0%";
            DOM.riskBar.textContent = "0%";
        }
    }

    function initThemeToggle() {
        DOM.themeToggle?.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
        });
    }

    function log(message, level = "info") {
        const ts = new Date().toISOString();
        console[level](`[NetSentinel SOC] ${ts} - ${message}`);
    }

})();