        function checkFlames() {
    let name1 = document.getElementById('name1').value.toLowerCase().replace(/[^a-z]/g, '');
    let name2 = document.getElementById('name2').value.toLowerCase().replace(/[^a-z]/g, '');

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
    let flames = ["Friends", "Lovers", "Attraction", "Marriage", "Enemies", "Siblings"];
    let flamesIcons = ["🤝", "❤️", "🧲", "💍", "⚔️", "👫"];
    
    let index = 0;
    while (flames.length > 1) {
        index = (count + index - 1) % flames.length;
        flames.splice(index, 1);
        flamesIcons.splice(index, 1);
    }

    showModal(flames[0], flamesIcons[0]);
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