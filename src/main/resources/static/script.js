function previewImage() {
    const input = document.getElementById('imageInput');
    const preview = document.getElementById('preview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block'; // Display the preview image
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadImage() {
    const input = document.getElementById('imageInput');
    if (input.files.length === 0) {
        alert('Please select an image file');
        return;
    }

    const formData = new FormData();
    formData.append('image', input.files[0]);

    fetch('http://localhost/analyze', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())  // Change from text() to json()
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<h3>Analysis Results:</h3>';
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'result-item';
            itemDiv.innerHTML = `<span class="result-class">${item.className}</span>: ${Math.round(item.probability * 100)}%`;
            resultDiv.appendChild(itemDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to analyze the image');
    });
}
