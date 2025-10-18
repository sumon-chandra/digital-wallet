interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  profilePic: string;

  phone?: string;
  address?: string;
  password?: string;
  is_verified?: boolean;
  createdAt?: string | number | Date;
  avatarUrl?: string;

  // add other user fields here
}

export interface ProfileResponse {
  data: {
    data: User;
  };
}
