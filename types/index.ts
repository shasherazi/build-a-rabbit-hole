export interface RabbitHole {
  id: string;
  name: string;
  findings?: Finding[];
}

export interface Finding {
  id: string;
  rabbitHoleId: string;
  description: string;
  url?: string;
}
