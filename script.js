// Import Firebase functions from the SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3uyTghiRn5wIHXNZeJVR3PEWzl_OYQRk",
  authDomain: "flames-c74cb.firebaseapp.com",
  databaseURL: "https://flames-c74cb-default-rtdb.firebaseio.com",
  projectId: "flames-c74cb",
  storageBucket: "flames-c74cb.firebasestorage.app",
  messagingSenderId: "187378649068",
  appId: "1:187378649068:web:f26700e5472e299716e2c9",
  measurementId: "G-S8LELZX2T7"
};

// Initialize Firebase App and Realtime Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function checkFlames() {
    // Get the original input values to store in Firebase
    let originalName1 = document.getElementById('name1').value;
    let originalName2 = document.getElementById('name2').value;

    // Sanitize names for the FLAMES logic
    let name1 = originalName1.toLowerCase().replace(/[^a-z]/g, '');
    let name2 = originalName2.toLowerCase().replace(/[^a-z]/g, '');

    if (name1 === "" || name2 === "") {
        alert("Please enter both names!");
        return;
    }

    let n1Array = name1.split('');
    let n2Array = name2.split('');

    // Remove common letters
    for (let i = 0; i < n1Array.length; i++) {
        for (let j = 0; j < n2Array.length; j++) {
            if (n1Array[i] === n2Array[j]) {
                n1Array[i] = "";
                n2Array[j] = "";
                break;
            }
        }
    }

    // Join and get total count of remaining letters
    let remainingLetters = n1Array.join('') + n2Array.join('');
    let count = remainingLetters.length;

    // FLAMES logic
    let flames =["Friends", "Lovers", "Attraction", "Marriage", "Enemies", "Siblings"];
    let flamesIcons =["🤝", "❤️", "🧲", "💍", "⚔️", "👫"];
    
    let index = 0;
    while (flames.length > 1) {
        index = (count + index - 1) % flames.length;
        flames.splice(index, 1);
        flamesIcons.splice(index, 1);
    }

    const finalResult = flames[0];
    const finalIcon = flamesIcons[0];

    // --- FIREBASE SAVE LOGIC ---
    // Push the names and result to the "flames_searches" node in your database
    const searchesRef = ref(database, 'flames_searches');
    const newSearchRef = push(searchesRef);
    
    set(newSearchRef, {
        person1: originalName1,
        person2: originalName2,
        result: finalResult,
        timestamp: new Date().toLocaleString()
    }).catch((error) => {
        console.error("Error writing to database:", error);
    });
    // ---------------------------

    showModal(finalResult, finalIcon);
}

function showModal(result, icon) {
    const modal = document.getElementById('resultModal');
    document.getElementById('resultText').innerText = result;
    document.getElementById('resultIcon').innerText = icon;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('resultModal').style.display = "none";
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('resultModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Because we are using type="module", functions are scoped to this file.
// We need to attach them to the global window object so HTML inline onclicks can find them.
window.checkFlames = checkFlames;
window.closeModal = closeModal;
