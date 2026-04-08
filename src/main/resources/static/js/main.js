// ========== Toast Notification System ==========
const INDIA_DISTRICTS = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Korea", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dangs", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul & Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribag", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Sundargarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhoopalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nagarkurnool", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "RaeBareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};

function initLocationData() {
    let stateList = document.getElementById('state-list');
    if (!stateList) {
        stateList = document.createElement('datalist');
        stateList.id = 'state-list';
        document.body.appendChild(stateList);
    }
    stateList.innerHTML = '';
    for (const state in INDIA_DISTRICTS) {
        const option = document.createElement('option');
        option.value = state;
        stateList.appendChild(option);
    }
}

function populateDistricts(selectedState, districtListId, districtInputId) {
    const dstList = document.getElementById(districtListId);
    const dstInput = document.getElementById(districtInputId);
    if (!dstList) return;
    
    dstList.innerHTML = '';
    if (dstInput) dstInput.value = '';

    if (INDIA_DISTRICTS[selectedState]) {
        INDIA_DISTRICTS[selectedState].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            dstList.appendChild(option);
        });
    }
}

async function uploadMediaList(fileInput) {
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return [];
    const urls = [];
    const fileCount = Math.min(fileInput.files.length, 5);
    for (let i = 0; i < fileCount; i++) {
        const formData = new FormData();
        formData.append('file', fileInput.files[i]);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
                headers: { ...getAuthHeaders() }
            });
            if (response.ok) {
                urls.push(await response.text());
            } else {
                showToast(`Failed to upload ${fileInput.files[i].name}. It might be too large.`, 'error');
            }
        } catch(err) {
            console.error("Upload failed", err);
            showToast(`Upload error for ${fileInput.files[i].name}`, 'error');
        }
    }
    return urls;
}

function getMediaHTML(images, height = '200px', badgeHtml = '') {
    if (!images || images.length === 0) {
        images = ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600'];
    }

    let slidesHtml = '';
    images.forEach((img, idx) => {
        const isActive = idx === 0 ? 'active' : '';
        const isVideo = img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.mov') || img.endsWith('.avi');
        
        if (isVideo) {
            slidesHtml += `<div class="carousel-slide ${isActive}" style="background: #000;"><video src="${img}" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;"></video></div>`;
        } else {
            slidesHtml += `<div class="carousel-slide ${isActive}" style="background-image: url('${img}');"></div>`;
        }
    });

    const hasNav = images.length > 1;
    const arrowsHtml = hasNav ? `
        <button class="carousel-btn carousel-prev" onclick="event.preventDefault(); event.stopPropagation(); changeSlide(this, -1)">&#8249;</button>
        <button class="carousel-btn carousel-next" onclick="event.preventDefault(); event.stopPropagation(); changeSlide(this, 1)">&#8250;</button>
    ` : '';
    
    const dotsContainerHtml = hasNav ? `<div class="carousel-dots"></div>` : '';

    return `
        <div class="carousel-container" data-carousel data-current-slide="0" style="height: ${height}; min-height: 180px; border-radius: 16px 16px 0 0; position: relative; overflow: hidden;" onclick="event.stopPropagation()">
            <div class="carousel-track" style="position: absolute; inset: 0;">
                ${slidesHtml}
            </div>
            ${arrowsHtml}
            ${dotsContainerHtml}
            ${badgeHtml}
        </div>
    `;
}
function showToast(message, type = 'success', duration = 3500) {
    // Create container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };

    const titles = {
        success: 'Success',
        error: 'Error',
        info: 'Info',
        warning: 'Warning'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <div class="toast-body">
            <div class="toast-title">${titles[type] || titles.info}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="dismissToast(this.parentElement)">&times;</button>
        <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;

    container.appendChild(toast);

    // Auto-dismiss
    const timeout = setTimeout(() => dismissToast(toast), duration);
    toast._timeout = timeout;
}

function dismissToast(toast) {
    if (!toast || toast.classList.contains('toast-exit')) return;
    clearTimeout(toast._timeout);
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

// ========== Image Carousel (Multi-Instance) ==========
function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(container => {
        container.dataset.currentSlide = '0';

        const slides = container.querySelectorAll('.carousel-slide');
        const dotsContainer = container.querySelector('.carousel-dots');
        if (!dotsContainer || slides.length === 0) return;

        // Create dots
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.onclick = (e) => {
                e.stopPropagation();
                goToSlide(container, i);
            };
            dotsContainer.appendChild(dot);
        });

        // Touch/Swipe support
        let touchStartX = 0;
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                const dir = diff > 0 ? 1 : -1;
                goToSlide(container, (parseInt(container.dataset.currentSlide) + dir + slides.length) % slides.length);
            }
        }, { passive: true });
    });
}

function changeSlide(btn, direction) {
    const container = btn.closest('[data-carousel]');
    if (!container) return;
    const slides = container.querySelectorAll('.carousel-slide');
    const current = parseInt(container.dataset.currentSlide) || 0;
    const next = (current + direction + slides.length) % slides.length;
    goToSlide(container, next);
}

function goToSlide(container, index) {
    const slides = container.querySelectorAll('.carousel-slide');
    const dots = container.querySelectorAll('.carousel-dot');
    const current = parseInt(container.dataset.currentSlide) || 0;

    if (index < 0 || index >= slides.length) return;

    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    container.dataset.currentSlide = index;

    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function resetCarousel(container) {
    if (!container) return;
    goToSlide(container, 0);
}

// ========== Modal Logic ==========
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reset modal carousel when opening crop details
    if (modalId === 'crop-details-modal') {
        const modalCarousel = document.querySelector('#crop-details-modal [data-carousel]');
        resetCarousel(modalCarousel);
    }
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

function togglePassword(btn) {
    const input = btn.parentElement.querySelector('input');
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay.id);
        }
    });
});

// ========== Role Selector ==========
function selectRole(role) {
    const options = document.querySelectorAll('#register-modal .role-option');
    options.forEach(opt => opt.classList.remove('active', 'role-selected'));
    
    const targetInput = document.querySelector(`#register-modal input[value="${role}"]`);
    if (targetInput) {
        targetInput.checked = true;
        const parent = targetInput.closest('.role-option');
        parent.classList.add('active', 'role-selected');
    }
}

// ========== Auth Logic & Database API ==========
const getAuthHeaders = () => {
    const token = sessionStorage.getItem('jwt');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

async function registerUser(userData) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        return await response.json();
    } catch (err) {
        showToast(err.message, 'error');
        return null;
    }
}

async function loginUser(phone, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, password })
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        return await response.json();
    } catch (err) {
        showToast(err.message, 'error');
        return null;
    }
}

// ========== Crop Database API ==========
async function getCropsFromDb() {
    try {
        const response = await fetch('/api/crops', {
            headers: { ...getAuthHeaders() }
        });
        if (!response.ok) throw new Error("Unauthorized");
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch crops:", err);
        return [];
    }
}

async function getFarmerCropsFromApi(phone) {
    try {
        const response = await fetch(`/api/crops/farmer/${phone}`, {
            headers: { ...getAuthHeaders() }
        });
        if (!response.ok) throw new Error("Unauthorized");
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch farmer crops:", err);
        return [];
    }
}

async function addCropToDb(crop) {
    try {
        const response = await fetch('/api/crops', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify({
                ...crop,
                farmerName: currentUser.name || 'Anonymous Farmer',
                farmerPhone: currentUser.phone || 'N/A'
            })
        });
        if (!response.ok) throw new Error("Failed to add crop");
        return await response.json();
    } catch (err) {
        showToast("Failed to list crop", "error");
        return null;
    }
}

async function removeCropFromDb(id) {
    try {
        const response = await fetch(`/api/crops/${id}`, { 
            method: 'DELETE',
            headers: { ...getAuthHeaders() }
        });
        if (!response.ok) throw new Error("Failed to delete crop");
        return true;
    } catch (err) {
        showToast("Failed to delete listing", "error");
        return false;
    }
}

let activeFarmerCrops = [];
async function renderFarmerCrops() {
    const container = document.getElementById('farmer-crops');
    if (!container) return;

    const myCrops = await getFarmerCropsFromApi(currentUser.phone || '9876543210');
    activeFarmerCrops = myCrops;

    container.innerHTML = myCrops.length ? '' : '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No active listings. Add your first crop!</p>';
    
    myCrops.forEach(crop => {
        const imagesData = (crop.images && crop.images.length > 0) ? crop.images : (crop.image ? [crop.image] : []);
        const mediaHtml = getMediaHTML(imagesData, '180px', '');
        container.innerHTML += `
            <div class="crop-card glass" id="card-${crop.id}" style="border-radius: 16px; overflow: hidden; transition: var(--transition);">
                ${mediaHtml}
                <div class="crop-details" style="padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <h3 style="font-size: 1.25rem;">${crop.name}</h3>
                        <span class="badge" style="margin: 0; padding: 4px 10px; font-size: 0.8rem;">Active</span>
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">${crop.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--primary); font-weight: 700; font-size: 1.2rem;">₹${crop.price.toLocaleString()} <small style="font-weight: 400; font-size: 0.8rem; color: var(--text-muted);">/ qtl</small></span>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.85rem;" onclick="editCrop('${crop.id}')">Edit</button>
                            <button class="delete-chat-btn" onclick="deleteCrop('${crop.id}')">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    initCarousels();
    updateListingCount();
}

async function renderMarketplaceCrops() {
    const container = document.getElementById('marketplace-crops');
    if (!container) return;

    const crops = await getCropsFromDb();
    container.innerHTML = '';

    crops.forEach(crop => {
        const badgeHtml = `<span class="badge" style="position: absolute; top: 15px; left: 15px; background: var(--primary); color: white; z-index: 10;">Best Price</span>`;
        const imagesData = (crop.images && crop.images.length > 0) ? crop.images : (crop.image ? [crop.image] : []);
        const mediaHtml = getMediaHTML(imagesData, '200px', badgeHtml);
        container.innerHTML += `
            <div class="crop-card glass" style="border-radius: 16px; overflow: hidden; transition: var(--transition);">
                ${mediaHtml}
                <div class="crop-details" style="padding: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                        <div>
                            <h3 style="font-size: 1.25rem;">${crop.name}</h3>
                            <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-top: 4px;">
                                📍 ${crop.location}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <span style="display: block; font-weight: 700; color: var(--primary); font-size: 1.4rem;">₹${crop.price.toLocaleString()}</span>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">per quintal</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding: 10px; background: hsla(0, 0%, 0%, 0.03); border-radius: 10px;">
                        <div style="width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">👤</div>
                        <div style="font-size: 0.85rem;">
                            <div style="font-weight: 600;">Farmer: ${crop.farmerName}</div>
                            <div style="color: var(--text-muted); font-size: 0.75rem;">Verified Seller</div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px;">
                        <button class="btn btn-secondary" style="flex: 1;" onclick="viewCropDetails('${crop.id}', '${crop.name}', '${crop.location}', ${crop.price}, '${crop.farmerName}', '${crop.farmerPhone}', '${crop.image || ''}', '${encodeURIComponent(JSON.stringify(crop.images || []))}')">View Details</button>
                        <button class="btn btn-primary" style="flex: 1;" onclick="addToCart('${crop.id}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
    initCarousels();
}

function viewCropDetails(id, name, location, price, farmer, farmerPhone, image, imagesStr) {
    const modal = document.getElementById('crop-details-modal');
    if (!modal) return;

    let imagesData = [];
    try { imagesData = imagesStr ? JSON.parse(decodeURIComponent(imagesStr)) : []; } catch(e) {}
    
    if (imagesData.length === 0 && image) {
        imagesData = [image];
    } else if (imagesData.length === 0 && !image) {
        imagesData = ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600'];
    }

    // Set slides
    const container = modal.querySelector('.carousel-container');
    const track = modal.querySelector('.carousel-track');
    const dotsContainer = modal.querySelector('.carousel-dots');
    
    if (container && track && dotsContainer) {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        imagesData.forEach((img, idx) => {
            const isActive = idx === 0 ? 'active' : '';
            const isVideo = img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.mov') || img.endsWith('.avi');
            
            if (isVideo) {
                track.innerHTML += `<div class="carousel-slide ${isActive}" style="background: #000;"><video src="${img}" autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover;"></video></div>`;
            } else {
                track.innerHTML += `<div class="carousel-slide ${isActive}" style="background-image: url('${img}');"></div>`;
            }
            
            dotsContainer.innerHTML += `<div class="carousel-dot ${isActive}" onclick="goToSlide(this.parentElement.parentElement, ${idx})"></div>`;
        });
        
        container.dataset.currentSlide = 0;
        
        // hide arrows if only 1 media
        const prev = container.querySelector('.carousel-prev');
        const next = container.querySelector('.carousel-next');
        if (prev) prev.style.display = imagesData.length > 1 ? 'flex' : 'none';
        if (next) next.style.display = imagesData.length > 1 ? 'flex' : 'none';
    }

    // Update modal content
    modal.querySelector('h2').textContent = name;
    modal.querySelector('p').textContent = `📍 ${location}`;
    modal.querySelector('span[style*="font-size: 1.6rem"]').textContent = `₹${price.toLocaleString()}`;
    modal.querySelector('div[style*="font-weight: 600"]').innerHTML = `👨‍🌾 ${farmer} <span style="background: rgba(52, 211, 153, 0.2); color: #34d399; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">VERIFIED</span>`;
    
    // Set data attributes for contactFarmer
    modal.dataset.cropId = id;
    modal.dataset.cropName = name;
    modal.dataset.farmerName = farmer;
    modal.dataset.farmerPhone = farmerPhone;
    modal.dataset.farmerRole = 'FARMER'; // All sellers are Farmers

    openModal('crop-details-modal');
}


function toggleLoginMethod(method) {
    const btnOtp = document.getElementById('btn-otp-login');
    const btnPwd = document.getElementById('btn-pwd-login');
    const formOtp = document.getElementById('otp-login-form');
    const formPwd = document.getElementById('pwd-login-form');
    if (!btnOtp || !btnPwd || !formOtp || !formPwd) return;

    // Reset OTP form state
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
        showToast('Please enter a valid phone number.', 'error');
        return;
    }

    showToast(`OTP sent to ${phone}`, 'success');

    document.getElementById('otp-phone-group').style.display = 'none';
    document.getElementById('otp-code-group').style.display = 'block';
    document.getElementById('btn-send-otp').style.display = 'none';
    document.getElementById('btn-verify-otp').style.display = 'block';
}

function sendResetOtp(e) {
    if (e) e.preventDefault();
    const phone = document.getElementById('reset-phone').value;
    if (!phone) {
        showToast('Please enter a valid phone number.', 'error');
        return;
    }

    showToast(`Reset OTP sent to ${phone}`, 'success');

    document.getElementById('reset-phone-group').style.display = 'none';
    document.getElementById('reset-code-group').style.display = 'block';
    document.getElementById('btn-send-reset-otp').style.display = 'none';
    document.getElementById('btn-verify-reset').style.display = 'block';
}
// ========== Auth State & Account Menu ==========
// Initialize from sessionStorage to maintain independent sessions per tab
const savedUser = JSON.parse(sessionStorage.getItem('currentUser'));
let currentUser = savedUser || {
    isLoggedIn: false,
    role: null
};

function renderAccountMenu() {
    const container = document.getElementById('account-dropdown-menu');
    if (!container) return;

    const isFarmerDashboard = window.location.pathname.includes('farmer-dashboard.html');
    
    // If we're on the Farmer Dashboard, we MUST be a logged-in Farmer
    if (isFarmerDashboard) {
        currentUser.isLoggedIn = true;
        currentUser.role = 'FARMER';
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    if (currentUser.isLoggedIn) {
        // Update Index Page Navbar if present
        const indexActions = document.getElementById('index-nav-actions');
        if (indexActions) {
            const dashboardLink = currentUser.role === 'FARMER' ? 'farmer-dashboard.html' : 'buyer-dashboard.html';
            indexActions.innerHTML = `
                <a href="${dashboardLink}" class="btn btn-primary" style="text-decoration: none; padding: 12px 24px; display: inline-flex; align-items: center; gap: 8px;">
                    Go to Dashboard <span class="icon" style="font-size: 1.1rem;">⚡</span>
                </a>
                <button class="btn btn-ghost" onclick="logout()">Logout</button>
            `;
        }

        let menuHtml = `
            <h4 style="margin-bottom: 8px;">My Account</h4>
            <a href="#" onclick="openModal('personal-detail-modal')"><span class="icon" style="font-size: 1.2rem; padding: 6px;">📋</span><div><strong>Personal Details</strong></div></a>
            <a href="#" onclick="openModal('change-password-modal')"><span class="icon" style="font-size: 1.2rem; padding: 6px;">🔐</span><div><strong>Change Password</strong></div></a>
        `;
        
        if (currentUser.role === 'FARMER') {
            if (isFarmerDashboard) {
                menuHtml += `<a href="buyer-dashboard.html"><span class="icon" style="font-size: 1.2rem; padding: 6px;">🛒</span><div><strong>Buy Crops</strong></div></a>`;
            } else {
                menuHtml += `<a href="farmer-dashboard.html"><span class="icon" style="font-size: 1.2rem; padding: 6px;">🚜</span><div><strong>Sell Crops</strong></div></a>`;
            }
        }

        menuHtml += `<a href="#" onclick="logout()"><span class="icon" style="font-size: 1.2rem; padding: 6px;">🚪</span><div><strong>Logout</strong></div></a>`;
        
        container.innerHTML = menuHtml;

        // Update Personal Details Display
        const nameEl = document.getElementById('personal-full-name');
        const phoneEl = document.getElementById('personal-phone');
        const roleEl = document.getElementById('personal-account-type');

        if (nameEl) nameEl.textContent = currentUser.name || 'User';
        if (phoneEl) phoneEl.textContent = currentUser.phone || 'N/A';
        
        if (roleEl) {
            if (currentUser.role === 'FARMER') {
                roleEl.innerHTML = '🚜 Farmer <span style="background: rgba(52, 211, 153, 0.2); color: #34d399; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">ACTIVE</span>';
            } else {
                roleEl.innerHTML = '🛒 Buyer <span style="background: rgba(52, 211, 153, 0.2); color: #34d399; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; font-weight: 700;">ACTIVE</span>';
            }
        }
    } else {
        container.innerHTML = `
            <h4 style="margin-bottom: 8px;">Welcome Guest</h4>
            <a href="#" onclick="openModal('login-modal')"><span class="icon" style="font-size: 1.2rem; padding: 6px;">🔑</span><div><strong>Log In</strong></div></a>
            <a href="#" onclick="openModal('register-modal')"><span class="icon" style="font-size: 1.2rem; padding: 6px;">📝</span><div><strong>Sign Up</strong></div></a>
        `;
    }
}

function login(data) {
    if (!data || !data.jwt || !data.user) {
        console.error("Invalid login/registration response:", data);
        showToast("Session failed: Missing server response.", "error");
        return;
    }

    const { jwt, user } = data;
    currentUser.isLoggedIn = true;
    currentUser.role = user.role || 'BUYER';
    currentUser.name = user.name || 'User';
    currentUser.phone = user.phone || 'N/A';
    
    sessionStorage.setItem('jwt', jwt);
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '';

    if (isIndexPage) {
        // Redirect to appropriate dashboard from the landing page
        if (currentUser.role === 'FARMER') {
            window.location.href = 'farmer-dashboard.html';
        } else {
            window.location.href = 'buyer-dashboard.html';
        }
    } else {
        renderAccountMenu();
        startConversationPolling(); // Start chat notifications immediately
        showToast(`Successfully logged in as ${user.role === 'FARMER' ? 'Farmer' : 'Buyer'}!`, 'success');
    }
}

function logout() {
    const isFarmerDashboard = window.location.pathname.includes('farmer-dashboard.html');
    
    currentUser.isLoggedIn = false;
    currentUser.role = null;
    currentUser.name = null;
    currentUser.phone = null;
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('jwt');
    
    if (isFarmerDashboard) {
        // Redirect to home if logging out from a restricted area
        window.location.href = 'index.html';
    } else {
        renderAccountMenu();
        showToast('You have been logged out.', 'info');
    }
}

// ========== Form Submissions (Listeners now attached in DOMContentLoaded) ==========


// ========== Change Password Logic ==========
function toggleChangePwdMethod(method) {
    const btnOld = document.getElementById('btn-changepwd-old');
    const btnOtp = document.getElementById('btn-changepwd-otp');
    const formOld = document.getElementById('changepwd-old-form');
    const formOtp = document.getElementById('changepwd-otp-form');
    
    if (!btnOld || !btnOtp || !formOld || !formOtp) return;

    // Reset OTP form state
    document.getElementById('changepwd-phone-group').style.display = 'block';
    document.getElementById('changepwd-code-group').style.display = 'none';
    document.getElementById('btn-send-changepwd-otp').style.display = 'block';
    document.getElementById('btn-verify-changepwd-otp').style.display = 'none';

    if (method === 'old') {
        btnOld.classList.add('active');
        btnOtp.classList.remove('active');
        formOld.style.display = 'block';
        formOtp.style.display = 'none';
    } else {
        btnOtp.classList.add('active');
        btnOld.classList.remove('active');
        formOtp.style.display = 'block';
        formOld.style.display = 'none';
    }
}

function sendChangePwdOtp(e) {
    if (e) e.preventDefault();
    const phone = document.getElementById('changepwd-phone').value;
    if (!phone) {
        showToast('Please enter a valid phone number.', 'error');
        return;
    }

    showToast(`OTP sent to ${phone}`, 'success');

    document.getElementById('changepwd-phone-group').style.display = 'none';
    document.getElementById('changepwd-code-group').style.display = 'block';
    document.getElementById('btn-send-changepwd-otp').style.display = 'none';
    document.getElementById('btn-verify-changepwd-otp').style.display = 'block';
}

const changePwdOldForm = document.getElementById('changepwd-old-form');
if (changePwdOldForm) {
    changePwdOldForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Password updated successfully.', 'success');
        closeModal('change-password-modal');
    });
}

const changePwdOtpForm = document.getElementById('changepwd-otp-form');
if (changePwdOtpForm) {
    changePwdOtpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const codeGroup = document.getElementById('changepwd-code-group');
        if (codeGroup && codeGroup.style.display === 'none') {
            sendChangePwdOtp();
            return;
        }
        showToast('Password updated successfully.', 'success');
        closeModal('change-password-modal');
    });
}

// ========== Chatbot Toggle ==========
function toggleChatbot() {
    showToast('Chatbot UI coming soon!', 'info', 2500);
}

// ========== Navbar Scroll Effect ==========
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.style.background = 'hsla(0, 0%, 100%, 0.95)';
        nav.style.boxShadow = '0 4px 20px hsla(0, 0%, 0%, 0.1)';
    } else {
        nav.style.background = 'var(--bg-card)';
        nav.style.boxShadow = 'none';
    }
});

// ========== Typewriter and Zoom Animation ==========
document.addEventListener("DOMContentLoaded", () => {
    initLocationData();
    // Initialize components
    if (typeof initCarousels === 'function') initCarousels();
    renderAccountMenu();
    updateListingCount();
    renderFarmerCrops();
    renderMarketplaceCrops();
    startConversationPolling();
    loadCartFromBackend();

    // Attach Form Submissions after DOM is ready
    const addCropForm = document.getElementById('add-crop-form');
    if (addCropForm) {
        addCropForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = addCropForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = "Uploading...";
            btn.disabled = true;

            const name = addCropForm.querySelector('[name="crop-name"]').value;
            const price = parseFloat(addCropForm.querySelector('[name="crop-price"]').value);
            const quantity = parseFloat(addCropForm.querySelector('[name="crop-quantity"]').value);
            const state = document.getElementById('add-crop-state').value;
            const district = document.getElementById('add-crop-district').value;
            const location = `${district}, ${state}`;
            const description = addCropForm.querySelector('[name="crop-description"]').value;

            // Upload media
            const fileInput = document.getElementById('add-crop-media');
            const mediaUrls = await uploadMediaList(fileInput);

            if (mediaUrls.length === 0) {
                btn.textContent = originalText;
                btn.disabled = false;
                showToast("Please upload at least one valid media file.", "error");
                return;
            }

            const newCrop = await addCropToDb({
                name,
                price,
                quantity,
                location,
                description,
                image: mediaUrls.length > 0 ? mediaUrls[0] : null,
                images: mediaUrls
            });

            btn.textContent = originalText;
            btn.disabled = false;

            if (newCrop) {
                showToast(`"${name}" has been listed successfully!`, 'success');
                closeModal('add-crop-modal');
                addCropForm.reset();
                renderFarmerCrops(); // Refresh the grid
            }
        });
    }

    const pwdForm = document.getElementById('pwd-login-form');
    if (pwdForm) {
        pwdForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const phoneInput = pwdForm.querySelector('input[name="username"]');
            const pwdInput = pwdForm.querySelector('input[name="password"]'); // Selected by name, not type
            
            if (!phoneInput || !pwdInput) {
                showToast("Please fill all fields.", "error");
                return;
            }

            const user = await loginUser(phoneInput.value, pwdInput.value);
            if (user) {
                login(user);
                closeModal('login-modal');
            }
        });
    }

    const otpForm = document.getElementById('otp-login-form');
    if (otpForm) {
        otpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const codeGroup = document.getElementById('otp-code-group');
            if (codeGroup && codeGroup.style.display === 'none') {
                sendOtp();
                return;
            }
            const phoneInput = otpForm.querySelector('input[name="phone"]');
            if (!phoneInput) return;
            
            // For now OTP is mock, but we fetch user data from Backend
            const user = await loginUser(phoneInput.value, '1234'); // Mock password for OTP login
            if (user) {
                login(user);
                closeModal('login-modal');
            }
        });
    }

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nameInput = signupForm.querySelector('input[name="name"]');
            const phoneInput = signupForm.querySelector('input[name="phone"]');
            const pwdInput = signupForm.querySelector('input[name="password"]');

            if (!nameInput || !phoneInput || !pwdInput) {
                showToast("Please fill all fields.", "error");
                return;
            }

            const name = nameInput.value;
            const phone = phoneInput.value;
            const password = pwdInput.value;

            // Using the user's preferred .role-selected selector
            const role = document.querySelector(".role-selected")?.innerText.toUpperCase().trim() || "FARMER";

            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, phone, password, role })
                });

                const data = await response.json(); // Handling response as JSON since our backend returns {jwt, user}
                
                if (response.ok) {
                    showToast("Signup successful!", "success");
                    login(data); // Auto-login using the standardized data structure
                    closeModal('register-modal');
                } else {
                    showToast(data || "Signup failed", "error");
                }
            } catch (error) {
                showToast("Connection failed", "error");
            }
        });
    }

    const editCropForm = document.getElementById('edit-crop-form');
    if (editCropForm) {
        editCropForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = editCropForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = "Updating...";
            btn.disabled = true;

            const id = document.getElementById('edit-crop-id').value;
            const existingCrop = activeFarmerCrops.find(c => c.id === id);
            
            const fileInput = document.getElementById('edit-crop-media');
            let mediaUrls = existingCrop ? (existingCrop.images || []) : [];
            let mainImage = existingCrop ? existingCrop.image : null;
            if (fileInput && fileInput.files.length > 0) {
                mediaUrls = await uploadMediaList(fileInput);
                mainImage = mediaUrls.length > 0 ? mediaUrls[0] : null;
            }

            const updatedData = {
                name: document.getElementById('edit-crop-name').value,
                price: parseFloat(document.getElementById('edit-crop-price').value),
                quantity: parseFloat(document.getElementById('edit-crop-quantity').value),
                location: `${document.getElementById('edit-crop-district').value}, ${document.getElementById('edit-crop-state').value}`,
                description: document.getElementById('edit-crop-description').value,
                image: mainImage,
                images: mediaUrls
            };

            try {
                const response = await fetch(`/api/crops/${id}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
                    },
                    body: JSON.stringify(updatedData)
                });

                if (response.ok) {
                    showToast("Listing updated successfully!", "success");
                    closeModal('edit-crop-modal');
                    renderFarmerCrops(); // Refresh the grid
                } else {
                    const data = await response.text();
                    showToast(data || "Failed to update listing.", "error");
                }
            } catch (err) {
                showToast("Error updating listing.", "error");
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
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
            if (!code || !pwd) {
                showToast('Please enter OTP and new password.', 'error');
                return;
            }
            showToast('Password successfully reset!', 'success');
            switchModal('forgot-password-modal', 'login-modal');
        });
    }

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

    const typeSpeed = 40;
    const totalDuration = (mainAnim.length + subAnim.length) * typeSpeed;

    if (farmerImg) {
        farmerImg.style.transition = `transform ${totalDuration}ms ease-out`;
        requestAnimationFrame(() => {
            farmerImg.classList.add("zoom-in-effect");
        });
    }

    startTyping(mainAnim.chars, typeSpeed, () => {
        setTimeout(() => {
            startTyping(subAnim.chars, typeSpeed, () => {
                if (farmerImg) {
                    farmerImg.classList.add("float-animated");
                }
            });
        }, 300);
    });
});

// ========== Buyer Dashboard Search ==========
function handleBuyerSearch() {
    const container = document.getElementById('marketplace-crops');
    if (!container) return; // Make sure we're on the dashboard
    
    const queryInput = document.getElementById('buyer-search-input');
    const stateInput = document.getElementById('buyer-state-filter');
    const districtInput = document.getElementById('buyer-district-filter');
    const sortInput = document.getElementById('buyer-sort-filter');
    
    const query = queryInput ? queryInput.value.toLowerCase().trim() : '';
    const stateFilter = stateInput ? stateInput.value.toLowerCase().trim() : '';
    const distFilter = districtInput ? districtInput.value.toLowerCase().trim() : '';
    const sortFilter = sortInput ? sortInput.value : 'newest';

    const cropCards = Array.from(document.querySelectorAll('#marketplace-crops .crop-card'));
    
    let found = false;
    cropCards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        
        let matchQuery = true;
        if (query) {
            matchQuery = cardText.includes(query);
        }
        
        let matchLoc = true;
        if (stateFilter) {
            matchLoc = matchLoc && cardText.includes(stateFilter);
        }
        if (distFilter) {
            matchLoc = matchLoc && cardText.includes(distFilter);
        }
        
        if (matchQuery && matchLoc) {
            card.style.display = '';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (query !== '') {
        showToast(found ? `Showing results for "${query}"` : `No results found for "${query}"`, found ? 'success' : 'info', 2000);
    }

    // Sorting logic using CSS flex/grid order
    if (sortFilter === 'newest') {
        cropCards.forEach((card, index) => { card.style.order = index; });
    } else {
        let sorted = [...cropCards].sort((a, b) => {
            // Extract the price value using regex from the text (e.g. ₹1,500)
            let matchA = a.innerText.match(/₹([\d,]+)/);
            let matchB = b.innerText.match(/₹([\d,]+)/);
            let numA = matchA ? parseInt(matchA[1].replace(/,/g, '')) : 0;
            let numB = matchB ? parseInt(matchB[1].replace(/,/g, '')) : 0;
            
            if (sortFilter === 'price-low') {
                return numA - numB;
            } else if (sortFilter === 'price-high') {
                return numB - numA;
            }
            return 0;
        });

        sorted.forEach((card, orderIndex) => {
            card.style.order = orderIndex;
        });
    }
}

// ========== Cart Logic (Backend API) ==========
let cartData = null;

/**
 * Get JWT token from sessionStorage
 */
function getAuthToken() {
    return sessionStorage.getItem('jwt');
}

/**
 * Load cart from backend
 */
async function loadCartFromBackend() {
    try {
        const token = getAuthToken();
        if (!token) {
            cartData = null;
            return;
        }

        const response = await fetch('/api/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                // User not authenticated
                cartData = null;
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        cartData = await response.json();
        updateCartUI();
    } catch (error) {
        console.error('Error loading cart:', error);
        showToast('Error loading cart', 'error');
    }
}

/**
 * Add item to cart
 */
async function addToCart(cropId) {
    try {
        const token = getAuthToken();
        if (!token) {
            showToast('Please log in to add items to cart', 'warning');
            return;
        }

        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cropId: cropId,
                quantity: 1
            })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg);
        }

        cartData = await response.json();
        updateCartUI();

        // Get crop name for toast
        const crop = document.querySelector(`button[onclick="addToCart('${cropId}')"]`)
            ?.closest('.crop-card')
            ?.querySelector('h3')?.textContent || 'Item';
        showToast(`Added ${crop} to your cart.`, 'success');
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Error adding item to cart: ' + error.message, 'error');
    }
}

/**
 * Remove item from cart
 */
async function removeFromCart(cropId) {
    try {
        const token = getAuthToken();
        if (!token) return;

        const response = await fetch(`/api/cart/remove/${cropId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        cartData = await response.json();
        updateCartUI();
        showToast('Item removed from cart', 'info');
    } catch (error) {
        console.error('Error removing from cart:', error);
        showToast('Error removing item from cart', 'error');
    }
}

/**
 * Update cart item quantity
 */
async function updateCartItemQuantity(cropId, newQuantity) {
    try {
        const token = getAuthToken();
        if (!token) return;

        if (newQuantity <= 0) {
            await removeFromCart(cropId);
            return;
        }

        const response = await fetch(`/api/cart/update/${cropId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantity: newQuantity
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        cartData = await response.json();
        updateCartUI();
    } catch (error) {
        console.error('Error updating cart:', error);
        showToast('Error updating cart', 'error');
    }
}

/**
 * View crop details from cart - fetch full crop data and open details modal
 */
async function viewCropDetailsFromCart(cropId) {
    try {
        // Fetch crop details
        const response = await fetch('/api/crops');
        if (!response.ok) throw new Error('Failed to fetch crops');

        const crops = await response.json();
        const crop = crops.find(c => c.id === cropId);

        if (!crop) {
            showToast('Crop details not found', 'error');
            return;
        }

        // Call existing viewCropDetails function with fetched data
        const imagesStr = crop.images && crop.images.length > 0
            ? encodeURIComponent(JSON.stringify(crop.images))
            : encodeURIComponent(JSON.stringify(crop.image ? [crop.image] : []));

        viewCropDetails(
            crop.id,
            crop.name,
            crop.location,
            crop.price,
            crop.farmerName,
            crop.farmerPhone,
            crop.image || '',
            imagesStr
        );
    } catch (error) {
        console.error('Error fetching crop details:', error);
        showToast('Error loading crop details', 'error');
    }
}

/**
 * Update cart UI from cartData
 */
function updateCartUI() {
    // Update badge
    const badge = document.getElementById('cart-badge');
    const totalQuantity = cartData && cartData.items ?
        cartData.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    if (badge) {
        badge.textContent = totalQuantity;
        badge.style.display = totalQuantity > 0 ? 'flex' : 'none';
        badge.parentElement.style.animation = 'none';
        void badge.parentElement.offsetWidth; // trigger reflow
        if (totalQuantity > 0) {
            badge.parentElement.style.animation = 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite';
        }
    }

    // Update Sidebar
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    container.innerHTML = '';

    if (!cartData || !cartData.items || cartData.items.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">Your cart is empty.</p>';
        const countEl = document.getElementById('cart-total-items-count');
        if (countEl) countEl.textContent = '0';
        return;
    }

    let cartTotal = 0;
    cartData.items.forEach((item) => {
        const itemSubtotal = (item.price || 0) * (item.quantity || 0);
        cartTotal += itemSubtotal;

        container.innerHTML += `
            <div class="cart-item fade-in" style="display: flex; gap: 12px; padding: 12px; margin-bottom: 8px; background: var(--bg-card); border-radius: 8px; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background='var(--bg-card)'">
                <div style="width: 90px; height: 90px; flex-shrink: 0; border-radius: 8px; overflow: hidden; background: var(--bg-hover);">
                    <img src="${item.image || '/images/placeholder.jpg'}" alt="${item.cropName}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="closeCart(); viewCropDetailsFromCart('${item.cropId}')">
                </div>
                <div class="cart-item-info" style="flex: 1;">
                    <h4 style="margin: 0 0 6px 0; font-size: 0.95rem; cursor: pointer; color: var(--primary);" onclick="closeCart(); viewCropDetailsFromCart('${item.cropId}')">${item.cropName}</h4>
                    <p style="margin: 4px 0; font-size: 0.85rem; color: var(--text-muted);">₹${(item.price || 0).toLocaleString()}/quintal</p>
                    <div style="display: flex; align-items: center; gap: 6px; margin-top: 8px;">
                        <button style="background: var(--primary); color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; font-size: 0.8rem; font-weight: 600;" onclick="updateCartItemQuantity('${item.cropId}', ${item.quantity - 1})">−</button>
                        <span style="min-width: 28px; text-align: center; font-weight: 600; font-size: 0.9rem;">${parseInt(item.quantity)}</span>
                        <button style="background: var(--primary); color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; font-size: 0.8rem; font-weight: 600;" onclick="updateCartItemQuantity('${item.cropId}', ${item.quantity + 1})">+</button>
                        <button onclick="removeFromCart('${item.cropId}'); event.stopPropagation();" style="background: none; border: none; color: #ef4444; cursor: pointer; opacity: 0.8; transition: opacity 0.2s; font-size: 0.75rem; padding: 0; margin-left: auto; text-decoration: underline; font-weight: 500;">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Update total items count
    const countEl = document.getElementById('cart-total-items-count');
    if (countEl) countEl.textContent = cartData.items.length;

    // Add total at bottom
    const footer = document.querySelector('.cart-footer');
    if (footer) {
        const cartTotalDisplay = footer.querySelector('#cart-item-count-display');
        if (cartTotalDisplay) {
            cartTotalDisplay.innerHTML = `
                <div style="text-align: center; padding: 12px 0;">
                    <span style="font-size: 0.9rem; color: var(--text-muted);">Items in cart: </span>
                    <span style="font-weight: 700; font-size: 1.1rem; color: var(--primary);">${cartData.items.length}</span>
                </div>
            `;
        }
    }
}

function viewCartItem(cropName) {
    closeCart();
}



function openCart() {
    const overlay = document.getElementById('cart-sidebar-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reload cart from backend when opening
        loadCartFromBackend();
    }
}

function closeCart(e) {
    if (e && e.target !== e.currentTarget) return;
    const overlay = document.getElementById('cart-sidebar-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== Farmer Crop Management ==========
function editCrop(id) {
    const crop = activeFarmerCrops.find(c => c.id === id);
    if (!crop) {
        showToast("Crop details not found.", "error");
        return;
    }

    // Populate modal fields
    document.getElementById('edit-crop-id').value = id;
    document.getElementById('edit-crop-name').value = crop.name;
    document.getElementById('edit-crop-price').value = crop.price;
    document.getElementById('edit-crop-quantity').value = crop.quantity;

    // Handle Split Location
    const locationParts = crop.location.split(', ');
    const district = locationParts[0] || '';
    const state = locationParts[1] || '';

    const stateInput = document.getElementById('edit-crop-state');
    stateInput.value = state;
    populateDistricts(state, 'edit-district-list', 'edit-crop-district');

    const districtInput = document.getElementById('edit-crop-district');
    districtInput.value = district;

    document.getElementById('edit-crop-description').value = crop.description;

    openModal('edit-crop-modal');
}

async function deleteCrop(id) {
    if (confirm("Are you sure you want to delete this listing?")) {
        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(async () => {
                // Wait for the deletion to complete before re-rendering
                const deleted = await removeCropFromDb(id);
                if (deleted) {
                    // Remove from local activeFarmerCrops array for instant update
                    activeFarmerCrops = activeFarmerCrops.filter(crop => crop.id !== id);
                    renderFarmerCrops(); // This also calls updateListingCount()
                    showToast("Listing deleted successfully.", "success");
                } else {
                    showToast("Failed to delete listing.", "error");
                    // Revert animation if deletion failed
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }
            }, 300);
        }
    }
}

function updateListingCount() {
    const container = document.getElementById('farmer-crops');
    const counter = document.getElementById('total-listings-count');
    if (container && counter) {
        const count = container.querySelectorAll('.crop-card').length;
        counter.textContent = count;
    }
}

function contactFarmer() {
    const modal = document.getElementById('crop-details-modal');
    const cropId = modal.dataset.cropId;
    const cropName = modal.dataset.cropName;
    const farmerName = modal.dataset.farmerName;
    const farmerPhone = modal.dataset.farmerPhone;
    const farmerRole = modal.dataset.farmerRole;

    if (!currentUser.isLoggedIn) {
        showToast("Please log in to contact a farmer.", "info");
        switchModal("crop-details-modal", "login-modal");
        return;
    }

    openChatPopup(farmerPhone, cropId, cropName, farmerName, farmerRole);
    closeModal("crop-details-modal");

    // Pre-fill inquiry message
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = `Hi, I'm interested in your "${cropName}" listing. Could you please provide more details?`;
        chatInput.focus();
    }
}

// ========== Persistent Chat & Conversation Management Logic ==========
let activeChatPartner = null;
let activeChatPartnerName = null;
let activeChatPartnerRole = null;
let activeChatCropId = null;
let activeChatCropName = null;
let chatPollingInterval = null;
let conversationPollingInterval = null;

function toggleChatSidebar(e) {
    if (e && e.target !== e.currentTarget) return;
    const overlay = document.getElementById('chat-sidebar-overlay');
    if (!overlay) return;

    const isActive = overlay.classList.contains('active');
    if (!isActive) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        fetchConversations();
        startConversationPolling();
    } else {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        stopConversationPolling();
    }
}

async function fetchConversations() {
    if (!currentUser.isLoggedIn) return;
    try {
        const response = await fetch(`/api/chat/conversations?phone=${currentUser.phone}`, {
            headers: { ...getAuthHeaders() }
        });
        if (response.ok) {
            const data = await response.json();
            renderConversations(data);
            updateChatBadge(data.length);
        }
    } catch (err) {
        console.error("Failed to fetch conversations:", err);
    }
}

async function deleteConversation(e, partnerPhone, cropId) {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to delete this entire chat conversation? This cannot be undone.")) return;

    try {
        const response = await fetch(`/api/chat/conversation?phone=${currentUser.phone}&partnerPhone=${partnerPhone}&cropId=${cropId}`, {
            method: 'DELETE',
            headers: { ...getAuthHeaders() }
        });

        if (response.ok) {
            showToast("Conversation deleted.", "success");
            
            // If the deleted chat was currently open, close the popup
            if (activeChatPartner === partnerPhone && activeChatCropId === cropId) {
                const chatContainer = document.getElementById('farmer-chat-container');
                if (chatContainer) chatContainer.classList.remove('active');
                activeChatPartner = null;
            }
            
            // Refresh conversation list
            fetchConversations();
        } else {
            showToast("Failed to delete conversation.", "error");
        }
    } catch (err) {
        console.error("Failed to delete conversation:", err);
        showToast("Error deleting conversation.", "error");
    }
}

function renderConversations(conversations) {
    const list = document.getElementById('conversations-list');
    if (!list) return;

    list.innerHTML = '';
    conversations.forEach(conv => {
        const item = document.createElement('div');
        item.className = 'conversation-item';
        item.onclick = () => openChatPopup(conv.partnerPhone, conv.cropId, conv.cropName, conv.partnerName, conv.partnerRole);
        
        const partnerDisplay = `${conv.partnerName} (${conv.partnerRole})`;
        
        item.innerHTML = `
            <div class="conv-avatar">${conv.partnerName.charAt(0)}</div>
            <div class="conv-info">
                <div class="conv-header">
                    <span class="conv-name">${partnerDisplay}</span>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <span class="conv-time">${new Date(conv.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <button class="delete-chat-btn" onclick="deleteConversation(event, '${conv.partnerPhone}', '${conv.cropId}')" title="Delete conversation">
                            <span>🗑️</span>
                            <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px;">DELETE</span>
                        </button>
                    </div>
                </div>
                <div class="conv-crop">${conv.cropName}</div>
                <div class="conv-preview">${conv.lastMessage}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

function updateChatBadge(count) {
    const badge = document.getElementById('chat-badge');
    if (!badge) return;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

async function openChatPopup(partnerPhone, cropId, cropName, partnerName, partnerRole) {
    activeChatPartner = partnerPhone;
    activeChatPartnerName = partnerName;
    activeChatPartnerRole = partnerRole;
    activeChatCropId = cropId;
    activeChatCropName = cropName;

    const chatContainer = document.getElementById('farmer-chat-container');
    const headerName = document.getElementById('chat-farmer-name');
    const messagesBox = document.getElementById('chat-messages');

    if (chatContainer && headerName) {
        chatContainer.classList.add('active');
        const displayRole = partnerRole ? partnerRole.charAt(0).toUpperCase() + partnerRole.slice(1).toLowerCase() : 'User';
        headerName.innerHTML = `<span class="status-indicator"></span> ${partnerName || partnerPhone} (${displayRole})`;
        messagesBox.innerHTML = `<div class="msg msg-system">Conversation started regarding ${cropName}</div>`;
        await fetchChatHistory();
        startChatPolling();
    }
    
    // Close sidebar if open
    const overlay = document.getElementById('chat-sidebar-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

async function fetchChatHistory() {
    if (!activeChatPartner || !activeChatCropId) return;
    try {
        const response = await fetch(`/api/chat/history?cropId=${activeChatCropId}&user1=${currentUser.phone}&user2=${activeChatPartner}`, {
            headers: { ...getAuthHeaders() }
        });
        if (response.ok) {
            const data = await response.json();
            updateChatUI(data);
        }
    } catch (err) {
        console.error("Failed to fetch chat history:", err);
    }
}

function updateChatUI(messages) {
    const box = document.getElementById('chat-messages');
    if (!box) return;

    // Store scroll position
    const isAtBottom = box.scrollHeight - box.scrollTop <= box.clientHeight + 50;

    // Clear and build chat
    box.innerHTML = '';

    // Add Product Context Card
    if (activeChatCropName) {
        const contextCard = document.createElement('div');
        contextCard.className = 'chat-product-context';
        contextCard.innerHTML = `
            <div class="product-context-label">CHATTING ABOUT</div>
            <div class="product-context-main">
                <span class="product-context-icon">📦</span>
                <span class="product-context-name">${activeChatCropName}</span>
            </div>
        `;
        box.appendChild(contextCard);
    }
    
    messages.forEach(msg => {
        const type = msg.senderPhone === currentUser.phone ? 'sent' : 'received';
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg msg-${type}`;
        msgDiv.textContent = msg.content;
        box.appendChild(msgDiv);
    });

    if (isAtBottom) {
        box.scrollTop = box.scrollHeight;
    }
}

function closeChatPopup() {
    activeChatPartner = null;
    activeChatCropId = null;
    document.getElementById('farmer-chat-container').classList.remove('active');
    stopChatPolling();
}

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const content = input.value.trim();
    if (!content || !activeChatPartner) return;

    const payload = {
        senderPhone: currentUser.phone,
        senderName: currentUser.name,
        senderRole: currentUser.role,
        receiverPhone: activeChatPartner,
        receiverName: activeChatPartnerName,
        receiverRole: activeChatPartnerRole,
        cropId: activeChatCropId,
        cropName: activeChatCropName,
        content: content,
        timestamp: Date.now()
    };

    input.value = '';
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            await fetchChatHistory();
            fetchConversations(); // Update sidebar in background
        }
    } catch (err) {
        console.error("Failed to send message:", err);
    }
}

// Polling intervals
function startChatPolling() {
    stopChatPolling();
    chatPollingInterval = setInterval(fetchChatHistory, 3000);
}

function stopChatPolling() {
    if (chatPollingInterval) clearInterval(chatPollingInterval);
}

function startConversationPolling() {
    stopConversationPolling();
    conversationPollingInterval = setInterval(fetchConversations, 5000);
}

function stopConversationPolling() {
    if (conversationPollingInterval) clearInterval(conversationPollingInterval);
}
