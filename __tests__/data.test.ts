import { type Owner } from "@/types";

// data.test.js
export const sampleOwnerData = [
  {
    name: "Bob",
    gender: "Male",
    age: 23,
    pets: [
      { name: "Garfield", type: "Cat" },
      { name: "Fido", type: "Dog" },
    ],
  },
  {
    name: "Jennifer",
    gender: "Female",
    age: 18,
    pets: [{ name: "Garfield", type: "Cat" }],
  },
  { name: "Steve", gender: "Male", age: 45, pets: null },
  {
    name: "Fred",
    gender: "Male",
    age: 40,
    pets: [
      { name: "Tom", type: "Cat" },
      { name: "Max", type: "Cat" },
      { name: "Sam", type: "Dog" },
      { name: "Jim", type: "Cat" },
    ],
  },
  {
    name: "Samantha",
    gender: "Female",
    age: 40,
    pets: [{ name: "Tabby", type: "Cat" }],
  },
  {
    name: "Alice",
    gender: "Female",
    age: 64,
    pets: [
      { name: "Simba", type: "Cat" },
      { name: "Nemo", type: "Fish" },
    ],
  },
] as Owner[];

describe("Sample Data Tests", () => {
  test("all entries have a name, gender, and age", () => {
    sampleOwnerData.forEach((person) => {
      expect(person).toHaveProperty("name");
      expect(person).toHaveProperty("gender");
      expect(person).toHaveProperty("age");
      expect(typeof person.name).toBe("string");
      expect(["Male", "Female"]).toContain(person.gender);
      expect(typeof person.age).toBe("number");
    });
  });

  test("pets array is correct", () => {
    sampleOwnerData.forEach((person) => {
      if (person.pets) {
        person.pets.forEach((pet) => {
          expect(pet).toHaveProperty("name");
          expect(pet).toHaveProperty("type");
          expect(typeof pet.name).toBe("string");
          expect(["Cat", "Dog", "Fish"]).toContain(pet.type);
        });
      } else {
        expect(person.pets).toBeNull();
      }
    });
  });
});
