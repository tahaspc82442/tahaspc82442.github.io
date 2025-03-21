document.addEventListener('DOMContentLoaded', function () {
    // --- Smooth Scroll ---
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

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 200) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });

    topButton.addEventListener('click', function (event) {
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
    if (!repoContainer) {
        console.error('Could not find element with ID "repo-container"');
        return;
    }

    const githubUsername = 'tahaspc82442'; //  Make sure this is correct!
    console.log('Fetching repositories for:', githubUsername);

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(`HTTP error! status: ${response.status}`);  // Use reject
            }
            return response.json();
        })
        .then(repos => {
            console.log('Repositories fetched:', repos.length);
            if (repos.length === 0) {
                repoContainer.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            repoContainer.innerHTML = ''; // Clear existing content

            repos.forEach(repo => {
                console.log('Processing repo:', repo.name);

                const repoItem = document.createElement('div');
                repoItem.classList.add('repo-item');

                const repoTitle = document.createElement('h3');
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = repo.name;
                repoLink.target = '_blank';
                repoLink.rel = 'noopener noreferrer';  // Security best practice
                repoTitle.appendChild(repoLink);

                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'No description provided.';

                const repoLanguage = document.createElement('p');
                repoLanguage.classList.add('tech-stack');
                repoLanguage.textContent = `Language: ${repo.language || 'Unknown'}`;

                repoItem.appendChild(repoTitle);
                repoItem.appendChild(repoDescription);
                repoItem.appendChild(repoLanguage);

                repoContainer.appendChild(repoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repoContainer.innerHTML = `<p>Failed to load repositories: ${error}</p>`; // Simpler error display
        });
    // --- End Fetch GitHub Repositories ---
});