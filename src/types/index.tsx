export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum PetType {
  Cat = "Cat",
  Dog = "Dog",
  Fish = "Fish",
}

export enum SortByOwner {
  Name = "Name",
  Age = "Age",
}

export enum SortByPet {
  Name = "Name",
  Type = "Type",
}
export enum Order {
  Asc = "Asc",
  Desc = "Desc",
}

export interface Owner {
  name: string;
  gender: Gender;
  age: number;
  pets: Pet[];
}
export interface Pet {
  name: string;
  type: PetType;
}
