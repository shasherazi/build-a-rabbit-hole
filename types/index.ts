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
  userName: string;
  userId: string;
}

export interface Finding {
  id: string;
  rabbitHoleId: string;
  description: string;
  url?: string;
  userName: string;
  userId: string;
}
