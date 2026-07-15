import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from './firebase-config.js';

document.getElementById('editor-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Generating... Please wait';
    submitBtn.disabled = true;

    try {
        // Gather data
        const templateName = document.getElementById('templateName').value;
        const configData = {
            template: templateName,
            brideName: document.getElementById('brideName').value,
            groomName: document.getElementById('groomName').value,
            weddingDate: document.getElementById('weddingDate').value,
            celebrationTime: document.getElementById('celebrationTime').value,
            location: document.getElementById('location').value,
            schedule: document.getElementById('schedule').value,
            messages: {
                en: document.getElementById('msgEn').value,
                hi: document.getElementById('msgHi').value,
                bn: document.getElementById('msgBn').value,
                te: document.getElementById('msgTe').value,
                ur: document.getElementById('msgUr').value
            },
            createdAt: new Date().toISOString()
        };

        // Handle Photo Uploads
        const heroPhoto = document.getElementById('heroPhoto').files[0];
        if (heroPhoto) {
            const heroRef = ref(storage, `invitations/hero_${Date.now()}_${heroPhoto.name}`);
            await uploadBytes(heroRef, heroPhoto);
            configData.heroPhotoUrl = await getDownloadURL(heroRef);
        }

        const secondaryPhoto = document.getElementById('secondaryPhoto').files[0];
        if (secondaryPhoto) {
            const secondaryRef = ref(storage, `invitations/secondary_${Date.now()}_${secondaryPhoto.name}`);
            await uploadBytes(secondaryRef, secondaryPhoto);
            configData.secondaryPhotoUrl = await getDownloadURL(secondaryRef);
        }

        // Save to Firestore
        const docRef = await addDoc(collection(db, "invitations"), configData);
        
        // Show Success
        const inviteUrl = `${window.location.origin}/${templateName}.html?inviteId=${docRef.id}`;
        const rsvpUrl = `${window.location.origin}/rsvp-dashboard.html?inviteId=${docRef.id}`;
        
        const resultContainer = document.getElementById('result-container');
        const resultLink = document.getElementById('result-link');
        const rsvpLink = document.getElementById('rsvp-link');
        
        resultLink.href = inviteUrl;
        resultLink.textContent = inviteUrl;
        
        rsvpLink.href = rsvpUrl;
        rsvpLink.textContent = rsvpUrl;
        
        resultContainer.style.display = 'block';
        document.getElementById('editor-form').style.display = 'none';

    } catch (error) {
        console.error("Error generating invitation: ", error);
        alert("There was an error saving your invitation. Check console for details.");
    } finally {
        submitBtn.textContent = 'Generate Invitation';
        submitBtn.disabled = false;
    }
});
