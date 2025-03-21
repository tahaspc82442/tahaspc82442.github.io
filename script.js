// script.js
document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scroll (from previous example - keep this) ---
    const topButton = document.createElement('a');
    topButton.href = '#top';
    topButton.textContent = 'Back to Top';
    topButton.style.display = 'none';
    topButton.style.position = 'fixed';
    topButton.style.bottom = '20px';
    topButton.style.right = '20px';
    topButton.style.padding = '10px';
    topButton.style.backgroundColor = '#4CAF50';
    topButton.style.color = 'white';
    topButton.style.textDecoration = 'none';
    topButton.style.borderRadius = '5px';
    topButton.style.zIndex = '1000';

    document.body.appendChild(topButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });

    topButton.addEventListener('click', function(event) {
        event.preventDefault();
        scrollToTop(500);
    });

    function scrollToTop(duration) {
        const startingY = window.pageYOffset;
        const diff = -startingY;
        let start;

        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const time = timestamp - start;
            const percent = Math.min(time / duration, 1);

            window.scrollTo(0, startingY + diff * percent);

            if (time < duration) {
                window.requestAnimationFrame(step);
            }
        });
    }
    // --- End Smooth Scroll ---



    // --- Fetch GitHub Repositories ---
    const repoContainer = document.getElementById('repo-container');
    const githubUsername = 'tahaspc82442'; // REPLACE WITH YOUR GITHUB USERNAME

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`) // Fetch repos, sorted by updated date, limit to 6
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            repos.forEach(repo => {
                // Create elements for each repository
                const repoItem = document.createElement('div');
                repoItem.classList.add('repo-item');

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;
                repoLink.target = '_blank';
                repoLink.rel = 'noopener noreferrer';

                const repoTitle = document.createElement('h3');
                repoTitle.appendChild(repoLink);

                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'No description provided.'; // Handle missing descriptions

                const repoLanguage = document.createElement('p');
                repoLanguage.classList.add('tech-stack'); // Use the existing tech-stack class
                repoLanguage.textContent = repo.language || 'Unknown'; // Display the primary language

                // Add elements to the repo item
                repoItem.appendChild(repoTitle);
                repoItem.appendChild(repoDescription);
                repoItem.appendChild(repoLanguage);

                // Add the repo item to the container
                repoContainer.appendChild(repoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repoContainer.textContent = 'Failed to load repositories.  Please check your GitHub username and network connection.';
        });
});