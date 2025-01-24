document.addEventListener('DOMContentLoaded', async () => {
    const userSuggestions = document.getElementById('userSuggestions');
    const activityFeed = document.getElementById('activityFeed');
  
    // Fetch and display suggested users to follow
    const suggestedUsers = await fetch('/api/social/suggestions').then((res) => res.json());
    suggestedUsers.forEach((user) => {
      userSuggestions.innerHTML += `
        <li>
          ${user.name} (${user.email})
          <button onclick="followUser(${user.id})">Follow</button>
        </li>
      `;
    });
  
    // Fetch and display activity feed
    const activities = await fetch('/api/social/activities').then((res) => res.json());
    activities.forEach((activity) => {
      activityFeed.innerHTML += `
        <div>
          <p><strong>${activity.userName}</strong> ${activity.action} a recipe</p>
        </div>
      `;
    });
  });
  
  // Follow a user
  async function followUser(userId) {
    await fetch(`/api/social/follow/${userId}`, { method: 'POST' });
    alert('User followed!');
    location.reload();
  }
  