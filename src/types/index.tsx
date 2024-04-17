export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum PetType {
  Cat = "Cat",
  Dog = "Dog",
  Fish = "Fish",
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
