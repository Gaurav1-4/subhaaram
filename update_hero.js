const fs = require('fs');
const path = './index.html';

const htmlContent = `
<!-- NEW CUSTOM HERO SECTION -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

:root {
  --cream-bg: linear-gradient(135deg, #FDF8F5 0%, #F5EAE1 100%);
  --gold: #C29B62;
  --dark-brown: #4A3A31;
  --text-gray: #6B6B6B;
}

#rec2074093683, #rec2125002243, #rec2076704873, #rec2075193153, #rec2074093723, #rec2081342413, #rec2125024793 {
    display: none !important;
}

.custom-hero-wrapper {
    font-family: 'Inter', sans-serif;
    background: var(--cream-bg);
    position: relative;
    overflow: hidden;
    padding-bottom: 80px;
}

/* Custom Navbar */
.custom-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 5%;
    max-width: 1400px;
    margin: 0 auto;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}
.custom-nav .logo img {
    height: 35px;
}
.custom-nav-links {
    display: flex;
    gap: 30px;
}
.custom-nav-links a {
    text-decoration: none;
    color: var(--dark-brown);
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s;
}
.custom-nav-links a:hover {
    color: var(--gold);
}
.custom-nav-socials {
    display: flex;
    gap: 15px;
}
.custom-nav-socials a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    color: var(--gold);
    text-decoration: none;
    transition: all 0.3s;
}
.custom-nav-socials a:hover {
    background: var(--gold);
    color: #fff;
}
.custom-nav-socials a svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
}

/* Hero Content */
.custom-hero {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    padding: 60px 5%;
    align-items: center;
    position: relative;
    z-index: 2;
}
.custom-hero-left {
    flex: 1;
    max-width: 600px;
}
.custom-hero-badge {
    display: inline-block;
    color: var(--gold);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.custom-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 72px;
    line-height: 1.1;
    color: var(--dark-brown);
    margin: 0 0 20px 0;
}
.custom-hero-title span {
    background: linear-gradient(90deg, #D4AF37, #AA771C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: normal;
}
.custom-hero-desc {
    color: var(--text-gray);
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 450px;
}
.custom-hero-features {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
}
.custom-feature {
    display: flex;
    align-items: center;
    gap: 12px;
}
.custom-feature-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(194, 155, 98, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
}
.custom-feature-icon svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 1.5;
    fill: none;
}
.custom-feature-text {
    font-size: 14px;
    font-weight: 600;
    color: var(--dark-brown);
    display: flex;
    flex-direction: column;
}
.custom-feature-text span:last-child {
    font-weight: 400;
    color: var(--text-gray);
    font-size: 12px;
}
.custom-hero-buttons {
    display: flex;
    gap: 20px;
}
.custom-btn {
    padding: 15px 30px;
    border-radius: 30px;
    font-weight: 500;
    text-decoration: none;
    transition: transform 0.3s, box-shadow 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.custom-btn-primary {
    background: linear-gradient(90deg, #b88636, #725227);
    color: #fff;
    box-shadow: 0 4px 15px rgba(168, 126, 67, 0.3);
}
.custom-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(168, 126, 67, 0.4);
}
.custom-btn-secondary {
    border: 1px solid rgba(0,0,0,0.1);
    color: var(--dark-brown);
    background: rgba(255,255,255,0.5);
}
.custom-btn-secondary:hover {
    background: rgba(255,255,255,0.8);
}
.custom-hero-right {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.custom-hero-right img {
    max-width: 120%;
    transform: translateX(10%);
    z-index: 2;
}

/* Categories Ribbon */
.custom-ribbon {
    max-width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    padding: 25px 40px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
    position: relative;
    z-index: 3;
    margin-top: -40px;
}
.custom-category {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--text-gray);
    font-size: 13px;
    transition: color 0.3s;
}
.custom-category:hover {
    color: var(--gold);
}
.custom-category svg {
    width: 28px;
    height: 28px;
    fill: none;
    stroke: var(--gold);
    stroke-width: 1.5;
}

@media (max-width: 980px) {
    .custom-hero {
        flex-direction: column;
        text-align: center;
        padding-top: 30px;
    }
    .custom-hero-left {
        margin-bottom: 50px;
    }
    .custom-hero-badge {
        justify-content: center;
    }
    .custom-hero-title {
        font-size: 48px;
    }
    .custom-hero-desc {
        margin-left: auto;
        margin-right: auto;
    }
    .custom-hero-features, .custom-hero-buttons {
        justify-content: center;
        flex-wrap: wrap;
    }
    .custom-nav-links, .custom-nav-socials {
        display: none;
    }
    .custom-ribbon {
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        border-radius: 0;
        margin-top: 0;
    }
}

    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.95);
        min-width: 220px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 999;
        border-radius: 8px;
        top: 100%;
        left: 0;
        padding: 10px 0;
    }
    .dropdown-content a {
        color: #333 !important;
        padding: 12px 20px !important;
        text-decoration: none;
        display: block;
        font-size: 14px !important;
        border-bottom: none !important;
        transition: background-color 0.3s, color 0.3s !important;
    }
    .dropdown-content a:hover {
        background-color: var(--gold) !important;
        color: #fff !important;
    }
    .dropdown:hover .dropdown-content {
        display: block;
    }

    </style>

<div class="custom-hero-wrapper">
    <!-- Navbar -->
    <nav class="custom-nav">
        <div class="logo">
            <img src="subhaaram_text_logo_transparent.png" alt="Subhaaram">
        </div>
        <div class="custom-nav-links">
            <a href="index.html" style="color: var(--gold); border-bottom: 1px solid var(--gold);">Home</a>
            <div class="dropdown">
                <a href="#rec2074093753" class="dropbtn">Collections <span style="font-size: 10px;">▼</span></a>
                <div class="dropdown-content">
                    <a href="thesacredgarden.html">The Sacred Garden</a>
                    <a href="blossomoud.html">Blossom & Oud</a>
                    <a href="template6.html">Dolce Vita</a>
                    <a href="emerald-noir.html">Emerald Noir</a>
                    <a href="garden-romance.html">Garden Romance</a>
                    <a href="ivory-elegance.html">Ivory Elegance</a>
                    <a href="modern-minimal.html">Modern Minimal</a>
                    <a href="rose-gold-blush.html">Rose Gold Blush</a>
                    <a href="royal-elegance.html">Royal Elegance</a>
                </div>
            </div>
            <a href="#rec2074093753">Gallery</a>
            <a href="order.html">Pricing</a>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
        </div>
        <div class="custom-nav-socials">
            <a href="https://www.instagram.com/shubhaaram.in"><svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-4.27.2-6.78 2.71-6.98 6.98C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.27 2.71 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.27-.2 6.78-2.71 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.27-2.71-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12 4 4 0 0 1 12 16zm5.23-11.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg></a>
            <a href="https://wa.me/918168051696?text=Hi%20Teenu!%20I%20absolutely%20love%20your%20digital%20invitations%20and%20I'd%20like%20to%20book%20a%20wedding%20card.%20Could%20you%20please%20share%20the%20details%3F"><svg viewBox="0 0 24 24"><path d="M17.47 16.03c-.27-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.6.14-.18.27-.72.9-.88 1.09-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.42.12-.55.13-.12.27-.32.41-.48.14-.16.19-.27.28-.46.09-.18.05-.34-.02-.48-.07-.14-.6-1.46-.83-1.99-.22-.52-.44-.45-.6-.46h-.5c-.19 0-.5.07-.76.34-.26.27-1.01 1-1.01 2.45 0 1.45 1.04 2.85 1.18 3.04.14.18 2.05 3.19 5.03 4.49 2.52 1.1 3.18 1.17 3.84 1.05.65-.12 2.04-.84 2.33-1.65.29-.8.29-1.49.2-1.64-.08-.13-.27-.2-.55-.33zM12 20.3a8.3 8.3 0 0 1-4.23-1.15l-.3-.18-3.14.83.84-3.07-.2-.31A8.28 8.28 0 0 1 3.7 12a8.3 8.3 0 0 1 8.3-8.3 8.3 8.3 0 0 1 8.3 8.3 8.3 8.3 0 0 1-8.3 8.3zM12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2z"/></svg></a>
            <a href="https://www.tiktok.com/@subhaaram_invitations"><svg viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.06 1.49.56 2.94 1.57 4.02 1.02 1.03 2.18 1.4 3.53 1.53v3.63c-1.37-.05-2.73-.39-3.88-1.07-1.17-.67-2.14-1.64-2.28-3.13-.04-1.1-.01-2.21-.02-3.32-.01-1.02-.01-2.03-.01-3.05-.29.19-.58.38-.88.54-.76.38-1.55.65-2.38.83v2.33c-.94-.09-1.9-.39-2.61-.98-.7-.57-1.15-1.43-1.19-2.37-.03-.89.26-1.76.79-2.48.5-.68 1.21-1.14 2-1.36.72-.2 1.46-.24 2.2-.18.07.72.03 1.44.02 2.17-.89-.3-1.9-.1-2.49.62-.64.76-.71 1.94-.13 2.76.47.66 1.25 1 2.05 1.04v-2.33zM9 14.5c.01 1.76.68 3.44 1.96 4.67 1.29 1.23 3.08 1.83 4.88 1.72 1.45-.1 2.87-.72 3.9-1.78.41-.43.76-.92 1.01-1.44-.02 1.15-.02 2.31-.02 3.46-.77.56-1.63.95-2.54 1.17-1.25.29-2.56.32-3.82.07-1.43-.28-2.77-.94-3.83-1.9-2-1.78-2.88-4.48-2.31-7.05.28-1.27.87-2.44 1.7-3.41.83-.98 1.85-1.73 3-2.16.89-.34 1.83-.5 2.78-.5v3.42c-1.35.03-2.67.64-3.53 1.65-.87 1.01-1.24 2.39-1.18 3.75z"/></svg></a>
        </div>
    </nav>

    <!-- Hero Content -->
    <div class="custom-hero">
        <div class="custom-hero-left">
            <div class="custom-hero-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12l-18 12v-24z"/></svg>
                DIGITAL INVITATIONS
            </div>
            <h1 class="custom-hero-title">
                Make Every Moment<br>
                <span>Unforgettable</span>
            </h1>
            <p class="custom-hero-desc">Beautifully crafted digital invitations for every occasion. Elegant designs, instant delivery, and memories that last forever.</p>
            
            <div class="custom-hero-features">
                <div class="custom-feature">
                    <div class="custom-feature-icon">
                        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <div class="custom-feature-text">
                        <span>1000+</span>
                        <span>Invitations Made</span>
                    </div>
                </div>
                <div class="custom-feature">
                    <div class="custom-feature-icon">
                        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2.1 13a10.1 10.1 0 0019.8 0H2.1zM12 21.9A9.9 9.9 0 014.2 13h15.6a9.9 9.9 0 01-7.8 8.9zM2.1 11h19.8A10.1 10.1 0 0012 2.1 10.1 10.1 0 002.1 11z"/></svg>
                    </div>
                    <div class="custom-feature-text">
                        <span>35+</span>
                        <span>Countries</span>
                    </div>
                </div>
                <div class="custom-feature">
                    <div class="custom-feature-icon">
                        <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </div>
                    <div class="custom-feature-text">
                        <span>24H</span>
                        <span>Express Delivery</span>
                    </div>
                </div>
            </div>

            <div class="custom-hero-buttons">
                <a href="order.html" class="custom-btn custom-btn-primary">Explore Collections →</a>
                <a href="#rec2074093803" class="custom-btn custom-btn-secondary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    See Gallery
                </a>
            </div>
        </div>
        <div class="custom-hero-right">
            <!-- Placeholder for the actual image. -->
            <div style="width: 500px; height: 600px; background: rgba(194, 155, 98, 0.05); border-radius: 250px 250px 20px 20px; border: 1px dashed rgba(194, 155, 98, 0.4); display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; padding: 40px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <p style="color: var(--gold); margin-top: 15px; font-weight: 500;">[ 3D Image Placeholder ]<br><span style="font-size: 12px; opacity: 0.7;">Waiting for transparent PNG asset</span></p>
            </div>
        </div>
    </div>
</div>

<div class="custom-ribbon">
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M9 11a3 3 0 100-6 3 3 0 000 6zM15 11a3 3 0 100-6 3 3 0 000 6zM9 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zM15 13c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v3h8v-3c0-2.66-5.33-4-8-4z"/></svg>
        Weddings
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 014 4v2h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h2V6a4 4 0 014-4zm0 2a2 2 0 00-2 2v2h4V6a2 2 0 00-2-2z"/></svg>
        Birthdays
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3 5H6v13h3V8zm8 0h-3v13h3V8zM8 12H6v3h2v-3zm0 4H6v3h2v-3zm8-4h-2v3h2v-3zm0 4h-2v3h2v-3z"/></svg>
        Baby Showers
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4v-9h5.5l1.5 2h2l1.5-2H20v9z"/></svg>
        Corporate Events
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83l7.07 13.17H4.93L12 5.83z"/></svg>
        Quinceañeras
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        Engagement Parties
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-13h-2v4H7v2h4v4h2v-4h4v-2h-4V7z"/></svg>
        Anniversaries
    </a>
    <a href="#" class="custom-category">
        <svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
        Graduation Parties
    </a>
</div>
<!-- END NEW CUSTOM HERO SECTION -->
`;

const fileContent = fs.readFileSync(path, 'utf8');

// Insert after <div id="allrecords"...>
const insertionPointStr = 'data-tilda-project-country="NL">';
const index = fileContent.indexOf(insertionPointStr);

if (index !== -1) {
    const newContent = fileContent.substring(0, index + insertionPointStr.length) + '\n' + htmlContent + '\n' + fileContent.substring(index + insertionPointStr.length);
    fs.writeFileSync(path, newContent, 'utf8');
    console.log("Successfully updated index.html");
} else {
    console.log("Insertion point not found!");
}
