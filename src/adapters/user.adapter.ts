import { UserResponse } from '../models/user.model';

export const userAdapter = (user: UserResponse) => ({
  id: user._id,
  name: user.name,
  username: user.username,
  role: user.role,
});
