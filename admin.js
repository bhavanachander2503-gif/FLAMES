import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Same Firebase configuration as your main app
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Check Passcode logic
window.checkCode = function() {
    const codeInput = document.getElementById("passcode").value;
    
    if (codeInput === "1234") {
        // Hide login, show dashboard
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("dashboardSection").style.display = "block";
        
        // Start loading the database info
        loadDashboardData();
    } else {
        // Show error message
        document.getElementById("errorMsg").style.display = "block";
    }
};

// Fetch data from Firebase Realtime Database
function loadDashboardData() {
    const searchesRef = ref(database, 'flames_searches');
    
    // onValue listens for real-time updates! 
    // If someone uses the calculator while you have the admin page open, it updates automatically.
    onValue(searchesRef, (snapshot) => {
        const data = snapshot.val();
        const tableBody = document.getElementById("tableBody");
        
        // Clear out the table before putting new data in
        tableBody.innerHTML = ""; 

        if (data) {
            // Convert the object from Firebase into an Array and reverse it 
            // (so the newest records show up at the very top of the table)
            const records = Object.values(data).reverse();
            
            records.forEach(record => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${record.person1 || "N/A"}</td>
                    <td>${record.person2 || "N/A"}</td>
                    <td><strong>${record.result || "N/A"}</strong></td>
                    <td>${record.timestamp || "N/A"}</td>
                `;
                tableBody.appendChild(tr);
            });
        } else {
            // If database is completely empty
            tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>No FLAMES records found yet. Go test some names!</td></tr>";
        }
    });
}

// Allow user to hit "Enter" on keyboard to login
document.getElementById('passcode').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        window.checkCode();
    }
});