export interface TTabs {
  id: number;
  name: string;
  link: string;
}

export type TSubcategories = {
  name: string;
  prompt: string;
};

export type TPromtsCategory = {
  category: string;
  subcategories: TSubcategories[];
};

export type TShowModal = {
  showModal: () => void;
}

export interface IFaq {
  id: string,
  question: string,
  answer: string
}


export interface IPrompt {
  id: string;
  name: string;
  description: string;
}

export type Inputs = {
  name: string;
  description: string;
};