import { UserResponse } from '../types.d';

export const userAdapter = (user: UserResponse) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  role: user.role,
});
