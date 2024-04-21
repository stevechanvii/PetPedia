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
  OwnerName = "ownerName",
  Age = "ownerAge",
}

export enum SortByPet {
  PetName = "petName",
  Type = "petType",
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
