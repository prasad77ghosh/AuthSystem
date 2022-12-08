const sessionizeUser = (user) => {
  return { userId: user.id, username: user.username };
};

export default sessionizeUser;