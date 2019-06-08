type Event = {
  created: string;
  start: string;
  end?: string;
  id: number;
  category_id: number;
};

type Category = {
  name: string;
  created: string;
  id: number;
};
