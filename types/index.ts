export interface User {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

export interface RabbitHole {
  id: string;
  name: string;
  findings?: Finding[];
  userId: string;
}

export interface Finding {
  id: string;
  rabbitHoleId: string;
  description: string;
  url?: string;
  userId: string;
}
