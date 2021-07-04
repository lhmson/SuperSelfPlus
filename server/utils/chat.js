const users = [];

// Join user to chat
export function userJoinGroup(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
export function getCurrentUserDetails(id) {
  return users.find((user) => user.id === id);
}

// User leaves group chat
export function userLeaveGroup(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
