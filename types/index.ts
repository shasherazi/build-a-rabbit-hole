export interface User {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

export interface RabbitHole {
  id: string;
  name: string;
  summary?: string;
  findings?: Finding[];
  user_name: string;
  userId: string;
}

export interface Finding {
  id: string;
  rabbitHoleId: string;
  description: string;
  url?: string;
  user_name: string;
  userId: string;
}
