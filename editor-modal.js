import { db, collection, addDoc } from './firebase-config.js';

// Expose open/close functions to global scope
window.openEditor = function(templateId) {
    document.getElementById('template').value = templateId;
    document.getElementById('editorModal').style.display = 'block';
    
    // Reset form states
    document.getElementById('editor-form').style.display = 'block';
    document.getElementById('successBox').style.display = 'none';
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Generate My Invitation Link';
    btn.disabled = false;
};

window.closeEditor = function() {
    document.getElementById('editorModal').style.display = 'none';
};

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('editorModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let compressedImageBase64 = null;

// Image compression
document.getElementById('heroPhoto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            compressedImageBase64 = canvas.toDataURL('image/jpeg', 0.7);
            
            const preview = document.getElementById('imagePreview');
            preview.src = compressedImageBase64;
            preview.style.display = 'block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Form submission
document.getElementById('editor-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Generating...';
    btn.disabled = true;

    const templateName = document.getElementById('template').value;
    
    const data = {
        template: templateName,
        brideName: document.getElementById('brideName').value,
        groomName: document.getElementById('groomName').value,
        weddingDate: document.getElementById('weddingDate').value,
        celebrationTime: document.getElementById('celebrationTime').value,
        location: document.getElementById('location').value,
        schedule: document.getElementById('schedule').value,
        messages: {
            en: document.getElementById('msg-en').value,
            hi: document.getElementById('msg-hi').value,
            ur: document.getElementById('msg-ur').value,
            bn: document.getElementById('msg-bn').value,
            te: document.getElementById('msg-te').value
        },
        heroPhotoUrl: compressedImageBase64,
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await addDoc(collection(db, "invitations"), data);
        
        document.getElementById('editor-form').style.display = 'none';
        
        const inviteUrl = `${templateName}.html?inviteId=${docRef.id}`;
        const dashboardUrl = `rsvp-dashboard.html?inviteId=${docRef.id}`;
        
        document.getElementById('inviteLink').href = inviteUrl;
        document.getElementById('dashboardLink').href = dashboardUrl;
        document.getElementById('successBox').style.display = 'block';

    } catch (error) {
        console.error("Error generating invitation:", error);
        alert("Error generating invitation. Please check console.");
        btn.textContent = 'Generate My Invitation Link';
        btn.disabled = false;
    }
});
