import { db, doc, getDoc } from './firebase-config.js';

// Configuration maps for different templates since Tilda uses random generated IDs
const templateMaps = {
    'blossomoud': {
        names: 'tn_text_1779566247730000001', // "Amira<br><br><br>Yusuf"
        date: 'tn_text_1779566247730000003', // "20 Mai 2027"
        time: 'tn_text_1779626065755000001', // "à partir de 16h"
        venue: 'tn_text_1779472210551000005', // "Beldi Country Club"
        welcomeMsg: 'tn_text_1779624381838000001' // Arabic well-wishes
    }
    // Add other templates as we analyze them
};

async function initDynamicTemplate() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteId = urlParams.get('inviteId');
    
    if (!inviteId) {
        console.log("No inviteId provided, showing default template.");
        return;
    }

    try {
        const docRef = doc(db, "invitations", inviteId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            applyDataToTemplate(data);
            injectRSVPForm(inviteId);
        } else {
            console.error("No such invitation found!");
        }
    } catch (error) {
        console.error("Error fetching invitation data:", error);
    }
}

function applyDataToTemplate(data) {
    const templateName = data.template;
    let map;
    let isCustomTemplate = false;

    if (window.templateSpecificMap && window.templateSpecificMap.name === templateName) {
        map = window.templateSpecificMap.map;
        isCustomTemplate = true;
    } else {
        map = templateMaps[templateName];
    }
    
    if (!map) {
        console.warn(`No DOM mapping found for template: ${templateName}`);
        return;
    }

    const updateField = (fieldId, content) => {
        let el;
        if (isCustomTemplate) {
            el = document.getElementById(fieldId);
        } else {
            el = document.querySelector(`[field="${fieldId}"]`);
        }
        
        if (el && content) {
            el.innerHTML = content;
        }
    };

    // Replace Names
    if (isCustomTemplate) {
        updateField(map.names, `${data.brideName} <span>&</span> ${data.groomName}`);
    } else {
        updateField(map.names, `${data.brideName}<br /><br /><br />${data.groomName}`);
    }
    
    // Replace Date
    updateField(map.date, data.weddingDate);
    
    // Replace Time
    updateField(map.time, data.celebrationTime);
    
    // Replace Venue
    updateField(map.venue, data.location);
    
    // Replace Schedule (if supported)
    if (map.schedule) {
        updateField(map.schedule, data.schedule || 'Followed by reception');
    }
    
    // Replace Welcome Message (prioritizing English if multiple, or concatenating)
    let msg = data.messages.en || data.messages.hi || data.messages.ur || data.messages.bn || data.messages.te;
    updateField(map.welcomeMsg, msg);

    // Hero image replacement if provided
    if (data.heroPhotoUrl) {
        if (isCustomTemplate && map.heroBg) {
            const heroBg = document.getElementById(map.heroBg);
            if (heroBg) {
                heroBg.src = data.heroPhotoUrl;
                heroBg.style.opacity = '1';
            }
        } else {
            const heroImg = document.querySelector(`img[imgfield="tn_img_1773847892509"]`); // Blossomoud center image
            if (heroImg) {
                heroImg.src = data.heroPhotoUrl;
                heroImg.setAttribute('data-original', data.heroPhotoUrl);
            }
        }
    }
}

// RSVP Injection Logic
function injectRSVPForm(inviteId) {
    if (document.getElementById('rsvp-section')) return; // Already exists

    const rsvpHTML = `
    <div id="rsvp-section" style="padding: 60px 20px; background: #FDF8F5; font-family: 'Inter', sans-serif; text-align: center; border-top: 1px solid #efe5da;">
        <h2 style="font-family: 'Playfair Display', serif; color: #C29B62; font-size: 32px; margin-bottom: 20px;">RSVP</h2>
        <p style="color: #666; margin-bottom: 30px;">We would love to know if you can make it!</p>
        
        <form id="rsvp-form" style="max-width: 500px; margin: 0 auto; text-align: left;">
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 500; margin-bottom: 8px; color: #4A3A31;">Your Name *</label>
                <input type="text" id="guestName" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 500; margin-bottom: 8px; color: #4A3A31;">Will you attend? *</label>
                <select id="attendance" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
                    <option value="attending">Yes, I will attend</option>
                    <option value="declined">No, I cannot attend</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: 500; margin-bottom: 8px; color: #4A3A31;">Additional Guests (Plus Ones)</label>
                <input type="number" id="plusOnes" min="0" value="0" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;">
            </div>
            
            <div style="margin-bottom: 25px;">
                <label style="display: block; font-weight: 500; margin-bottom: 8px; color: #4A3A31;">Leave a Well Wish!</label>
                <textarea id="guestMessage" rows="3" placeholder="Congratulations to the lovely couple..." style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box;"></textarea>
            </div>
            
            <button type="submit" id="rsvpSubmitBtn" style="background-color: #C29B62; color: white; border: none; padding: 15px 30px; font-size: 16px; font-weight: 600; border-radius: 30px; cursor: pointer; width: 100%; transition: background 0.3s ease;">Send RSVP</button>
        </form>
        
        <div id="rsvp-success" style="display: none; margin-top: 20px; padding: 15px; background: #eef7ee; color: #2b7a2b; border-radius: 8px;">
            Thank you! Your RSVP has been received.
        </div>
    </div>
    `;
    
    // Append to body (or a specific container)
    document.body.insertAdjacentHTML('beforeend', rsvpHTML);
    
    document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('rsvpSubmitBtn');
        btn.textContent = "Sending...";
        btn.disabled = true;

        try {
            // Import dynamically since this is a module
            const { db, collection, addDoc } = await import('./firebase-config.js');
            
            await addDoc(collection(db, "rsvps"), {
                inviteId: inviteId,
                guestName: document.getElementById('guestName').value,
                status: document.getElementById('attendance').value,
                plusOnes: document.getElementById('plusOnes').value,
                message: document.getElementById('guestMessage').value,
                createdAt: new Date().toISOString()
            });

            document.getElementById('rsvp-form').style.display = 'none';
            document.getElementById('rsvp-success').style.display = 'block';
            
        } catch (error) {
            console.error("Error submitting RSVP:", error);
            alert("Error submitting RSVP. Please try again.");
            btn.textContent = "Send RSVP";
            btn.disabled = false;
        }
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', initDynamicTemplate);

