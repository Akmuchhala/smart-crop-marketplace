// Modal Logic
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

function switchModal(closeId, openId) {
    closeModal(closeId);
    setTimeout(() => {
        openModal(openId);
    }, 300);
}

// Close modal when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay.id);
        }
    });
});

// Role Selector Logic in Registration
function selectRole(role) {
    const options = document.querySelectorAll('.role-option');
    options.forEach(opt => opt.classList.remove('active'));
    
    // Find the clicked option and set it to active
    const targetInput = document.querySelector(`input[value="${role}"]`);
    if (targetInput) {
        targetInput.checked = true;
        targetInput.closest('.role-option').classList.add('active');
    }
}

// Auth Logic functions
function toggleLoginMethod(method) {
    const btnOtp = document.getElementById('btn-otp-login');
    const btnPwd = document.getElementById('btn-pwd-login');
    const formOtp = document.getElementById('otp-login-form');
    const formPwd = document.getElementById('pwd-login-form');
    
    if(!btnOtp || !btnPwd || !formOtp || !formPwd) return;

    // Reset OTP form state if switching back
    document.getElementById('otp-phone-group').style.display = 'block';
    document.getElementById('otp-code-group').style.display = 'none';
    document.getElementById('btn-send-otp').style.display = 'block';
    document.getElementById('btn-verify-otp').style.display = 'none';

    if (method === 'otp') {
        btnOtp.classList.add('active');
        btnPwd.classList.remove('active');
        formOtp.style.display = 'block';
        formPwd.style.display = 'none';
    } else {
        btnPwd.classList.add('active');
        btnOtp.classList.remove('active');
        formPwd.style.display = 'block';
        formOtp.style.display = 'none';
    }
}

function sendOtp(e) {
    if (e) e.preventDefault();
    const phone = document.getElementById('otp-phone').value;
    if (!phone) {
        alert("Please enter a valid phone number.");
        return;
    }
    
    // Mock sending OTP
    alert("OTP sent to " + phone);
    
    // Show OTP input
    document.getElementById('otp-phone-group').style.display = 'none';
    document.getElementById('otp-code-group').style.display = 'block';
    document.getElementById('btn-send-otp').style.display = 'none';
    document.getElementById('btn-verify-otp').style.display = 'block';
}

function sendResetOtp(e) {
    if (e) e.preventDefault();
    const phone = document.getElementById('reset-phone').value;
    if (!phone) {
        alert("Please enter a valid phone number.");
        return;
    }
    
    // Mock sending OTP
    alert("Reset OTP sent to " + phone);
    
    // Show OTP & new password inputs
    document.getElementById('reset-phone-group').style.display = 'none';
    document.getElementById('reset-code-group').style.display = 'block';
    
    // Switch buttons
    document.getElementById('btn-send-reset-otp').style.display = 'none';
    document.getElementById('btn-verify-reset').style.display = 'block';
}

// Form Submission Actions (Mock for now, to be linked to backend)
const pwdForm = document.getElementById('pwd-login-form');
if (pwdForm) {
    pwdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Password Login attempted - Backend integration pending');
    });
}

const otpForm = document.getElementById('otp-login-form');
if (otpForm) {
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codeGroup = document.getElementById('otp-code-group');
        if (codeGroup && codeGroup.style.display === 'none') {
            sendOtp();
            return;
        }
        const code = document.getElementById('otp-code').value;
        if (!code) {
            alert('Please enter the OTP.');
            return;
        }
        alert('OTP Verification attempted - Backend integration pending');
    });
}

const regForm = document.getElementById('register-form');
if (regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.querySelector('input[name="role"]:checked').value;
        alert(`Registration attempted for role: ${role} - Backend integration pending`);
    });
}

const forgotForm = document.getElementById('forgot-password-form');
if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const codeGroup = document.getElementById('reset-code-group');
        if (codeGroup && codeGroup.style.display === 'none') {
            sendResetOtp();
            return;
        }
        
        const code = document.getElementById('reset-code').value;
        const pwd = document.getElementById('reset-new-password').value;
        if(!code || !pwd) {
            alert('Please enter OTP and new password.');
            return;
        }
        alert('Password successfully reset! Backend integration pending');
        switchModal('forgot-password-modal', 'login-modal');
    });
}

// Mock Chatbot toggle
function toggleChatbot() {
    alert("Chatbot UI will open here!");
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'hsla(0, 0%, 100%, 0.95)';
        nav.style.boxShadow = '0 4px 20px hsla(0, 0%, 0%, 0.1)';
    } else {
        nav.style.background = 'var(--bg-card)';
        nav.style.boxShadow = 'none';
    }
});

// Typewriter and Zoom Animation
document.addEventListener("DOMContentLoaded", () => {
    const mainTaglineEl = document.getElementById("main-tagline");
    const subTaglineEl = document.getElementById("tagline-text");
    const farmerImg = document.querySelector(".hero-farmer-image");
    
    function prepareTypeText(element) {
        if (!element) return { chars: [], length: 0 };
        const text = element.textContent.trim();
        element.innerHTML = "";
        
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) === ' ') {
                element.appendChild(document.createTextNode(' '));
            } else {
                const span = document.createElement("span");
                span.textContent = text.charAt(i);
                span.className = "typing-char";
                element.appendChild(span);
            }
        }
        return { 
            chars: element.querySelectorAll(".typing-char"),
            length: text.length
        };
    }

    const mainAnim = prepareTypeText(mainTaglineEl);
    const subAnim = prepareTypeText(subTaglineEl);

    function startTyping(chars, speed, onComplete) {
        if (!chars || chars.length === 0) {
            if (onComplete) onComplete();
            return;
        }
        let currentChar = 0;
        const typingInterval = setInterval(() => {
            if (currentChar < chars.length) {
                chars[currentChar].classList.add("visible");
                currentChar++;
            } else {
                clearInterval(typingInterval);
                if (onComplete) onComplete();
            }
        }, speed);
    }
    
    const typeSpeed = 40; // 40ms per character
    const totalDuration = (mainAnim.length + subAnim.length) * typeSpeed;
    
    // Start zoom immediately matching total duration of text
    if (farmerImg) {
        // Use ease-out for a natural deceleration towards 1.1x scale
        farmerImg.style.transition = `transform ${totalDuration}ms ease-out`;
        
        requestAnimationFrame(() => {
            farmerImg.classList.add("zoom-in-effect");
        });
    }
    
    // Start sequential typing
    startTyping(mainAnim.chars, typeSpeed, () => {
        // Little pause between the quotes makes it feel natural
        setTimeout(() => {
            startTyping(subAnim.chars, typeSpeed, () => {
                if (farmerImg) {
                    // When done, add floating animation
                    farmerImg.classList.add("float-animated");
                }
            });
        }, 300);
    });
});
