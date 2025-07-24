document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const careerHistory = document.getElementById('careerHistory').value;
    const skills = document.getElementById('skills').value;
    const jobType = document.getElementById('jobType').value;

    fetch('/functions/api/handler.ts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            careerHistory,
            skills,
            jobType
        })
    })
    .then(response => response.json())
    .then(data => {
        const templateSuggestions = document.getElementById('templateSuggestions');
        templateSuggestions.classList.remove('hidden');
        const templatesContainer = templateSuggestions.querySelector('.grid');
        templatesContainer.innerHTML = '';
        data.templates.forEach(template => {
            const templateDiv = document.createElement('div');
            templateDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');
            templateDiv.innerHTML = `
                <h4 class='font-semibold text-gray-800'>${template.name}</h4>
                <p class='text-gray-600'>${template.description}</p>
                <button class='mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'>Select Template</button>
            `;
            templatesContainer.appendChild(templateDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});