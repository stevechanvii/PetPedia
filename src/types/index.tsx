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
  OwnerName = "Owner Name",
  Age = "Age",
}

export enum SortByPet {
  PetName = "Pet Name",
  Type = "Type",
}
export enum Order {
  Asc = "asc",
  Desc = "desc",
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
