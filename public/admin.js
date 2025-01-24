// Fetch users and recipes for admin dashboard
document.addEventListener('DOMContentLoaded', async () => {
    const userList = document.getElementById('userList');
    const recipeList = document.getElementById('recipeList');
  
    // Fetch and display users
    const users = await fetch('/api/admin/users').then((res) => res.json());
    users.forEach((user) => {
      userList.innerHTML += `
        <tr>
          <td>${user.id}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  
    // Fetch and display recipes
    const recipes = await fetch('/api/admin/recipes').then((res) => res.json());
    recipes.forEach((recipe) => {
      recipeList.innerHTML += `
        <tr>
          <td>${recipe.id}</td>
          <td>${recipe.title}</td>
          <td>${recipe.userEmail}</td>
          <td>
            <button onclick="deleteRecipe(${recipe.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  });
  
  // Delete user
  async function deleteUser(userId) {
    await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    alert('User deleted!');
    location.reload();
  }
  
  // Delete recipe
  async function deleteRecipe(recipeId) {
    await fetch(`/api/admin/recipes/${recipeId}`, { method: 'DELETE' });
    alert('Recipe deleted!');
    location.reload();
  }
  