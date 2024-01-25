const determineZodiacAnimalAndElement = (birthdate) => {
    console.log("Determining zodiac animal and element for birthdate:", birthdate);
    const zodiacAnimals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
    const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];

    try {
        const year = parseYear(birthdate);
        const animalIndex = (year - 4) % 12;
        const zodiacAnimal = zodiacAnimals[animalIndex];

        const elementIndex = Math.floor((year - 4) % 10 / 2);
        const zodiacElement = elements[elementIndex];

        console.log("Zodiac animal:", zodiacAnimal, "Zodiac element:", zodiacElement);

        return { animal: zodiacAnimal, element: zodiacElement };
    } catch (error) {
        console.error("Error determining zodiac animal and element:", error);
        return null;
    }
};

const parseYear = (birthdate) => {
    const [year, month, day] = birthdate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date)) {
        throw new Error("Invalid date format");
    }
    return date.getFullYear();
};

export { determineZodiacAnimalAndElement };