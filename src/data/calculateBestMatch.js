import React, { useState, useEffect } from 'react';

const scoringData = [
    {
        "resultzodiac_slug": "crane",
        "zodiacanimal_slug": "friendly-dog",
        "element_slug": "water",
        "traits_slug": "walk-with-grace",
        "alliance_slug": "chill-pig",
        "riddle_result": true,
        "path_slug": "cascade-waterfall-path",
        "puzzle_result": false,
        "caligraphy_result": false,
        "wishes_slug": "true-love",
        "nonZodiacAnimal_id": 1,
        "resultzodiac_compatible": "[\"koi-fish\", \"panda\"]",
        "resultzodiac_incompatible": "[\"cat\", \"goldfish\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 1,
        "nontZodiacAnimal_name": "Crane",
        "images": "crane"
    },
    {
        "resultzodiac_slug": "red-panda",
        "zodiacanimal_slug": "polite-goat",
        "element_slug": "wood",
        "traits_slug": "curious-soul",
        "alliance_slug": "friendly-dog",
        "riddle_result": false,
        "path_slug": "lush-bamboo-forest-trail",
        "puzzle_result": true,
        "caligraphy_result": true,
        "wishes_slug": "peaceful-life",
        "nonZodiacAnimal_id": 2,
        "resultzodiac_compatible": "[\"duck\",\"dragonfly\", \"cat\"]",
        "resultzodiac_incompatible": "[\"pangolin\",\"milu-deer\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 2,
        "nontZodiacAnimal_name": "Red Panda",
        "images": "red-panda"
    },
    {
        "resultzodiac_slug": "cat",
        "zodiacanimal_slug": "wise-dragon",
        "element_slug": "fire",
        "traits_slug": "persevering-spirit",
        "alliance_slug": "strong-ox",
        "riddle_result": false,
        "path_slug": "misty-mountain-path",
        "puzzle_result": true,
        "caligraphy_result": true,
        "wishes_slug": "career-success",
        "nonZodiacAnimal_id": 3,
        "resultzodiac_compatible": "[\"red-panda\", \"crab\"]",
        "resultzodiac_incompatible": "[\"duck\", \"phoenix\", \"crane\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 3,
        "nontZodiacAnimal_name": "Cat",
        "images": "cat"
    },
    {
        "resultzodiac_slug": "pangolin",
        "zodiacanimal_slug": "determined-rooster",
        "element_slug": "metal",
        "traits_slug": "brave-character",
        "alliance_slug": "clever-rat",
        "riddle_result": true,
        "path_slug": "abandoned-village-trail",
        "puzzle_result": false,
        "caligraphy_result": false,
        "wishes_slug": "health",
        "nonZodiacAnimal_id": 4,
        "resultzodiac_compatible": "[\"cat\", \"crab\"]",
        "resultzodiac_incompatible": "[\"koi-fish\", \"milu-deer\", \"red-panda\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 4,
        "nontZodiacAnimal_name": "Pangolin",
        "images": "pangolin"
    },
    {
        "resultzodiac_slug": "koi-fish",
        "zodiacanimal_slug": "curious-monkey",
        "element_slug": "water",
        "traits_slug": "clever-minded",
        "alliance_slug": "polite-goat",
        "riddle_result": false,
        "path_slug": "cascade-waterfall-path",
        "puzzle_result": true,
        "caligraphy_result": true,
        "wishes_slug": "wealth",
        "nonZodiacAnimal_id": 5,
        "resultzodiac_compatible": "[\"crane\", \"goldfish\"]",
        "resultzodiac_incompatible": "[\"cat\", \"duck\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 5,
        "nontZodiacAnimal_name": "Koi Fish",
        "images": "koi-fish"
    },
    {
        "resultzodiac_slug": "duck",
        "zodiacanimal_slug": "strong-ox",
        "element_slug": "earth",
        "traits_slug": "resilient-character",
        "alliance_slug": "fierce-tiger",
        "riddle_result": false,
        "path_slug": "ancient-shrine-route",
        "puzzle_result": false,
        "caligraphy_result": false,
        "wishes_slug": "true-love",
        "nonZodiacAnimal_id": 6,
        "resultzodiac_compatible": "[\"red-panda\", \"panda\", \"milu-deer\"]",
        "resultzodiac_incompatible": "[\"cat\", \"koi-fish\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 6,
        "nontZodiacAnimal_name": "Duck",
        "images": "duck"
    },
    {
        "resultzodiac_slug": "panda",
        "zodiacanimal_slug": "smart-rabbit",
        "element_slug": "wood",
        "traits_slug": "strong-contender",
        "alliance_slug": "wise-dragon",
        "riddle_result": true,
        "path_slug": "lush-bamboo-forest-trail",
        "puzzle_result": true,
        "caligraphy_result": true,
        "wishes_slug": "peaceful-life",
        "nonZodiacAnimal_id": 7,
        "resultzodiac_compatible": "[\"phoenix\", \"crane\", \"duck\"]\n",
        "resultzodiac_incompatible": "[\"dragonfly\", \"crab\"]\n",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 7,
        "nontZodiacAnimal_name": "Panda",
        "images": "panda"
    },
    {
        "resultzodiac_slug": "crab",
        "zodiacanimal_slug": "chill-pig",
        "element_slug": "metal",
        "traits_slug": "brave-character",
        "alliance_slug": "polite-goat",
        "riddle_result": true,
        "path_slug": "abandoned-village-trail",
        "puzzle_result": false,
        "caligraphy_result": true,
        "wishes_slug": "career-success",
        "nonZodiacAnimal_id": 8,
        "resultzodiac_compatible": "[\"pangolin\", \"phoenix\"]",
        "resultzodiac_incompatible": "[\"panda\", \"goldfish\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 8,
        "nontZodiacAnimal_name": "Crab",
        "images": "crab"
    },
    {
        "resultzodiac_slug": "phoenix",
        "zodiacanimal_slug": "fierce-tiger",
        "element_slug": "fire",
        "traits_slug": "resourceful-nature",
        "alliance_slug": "friendly-dog",
        "riddle_result": false,
        "path_slug": "misty-mountain-path",
        "puzzle_result": false,
        "caligraphy_result": true,
        "wishes_slug": "health",
        "nonZodiacAnimal_id": 9,
        "resultzodiac_compatible": "[\"panda\", \"goldfish\", \"crab\"]",
        "resultzodiac_incompatible": "[\"cat\", \"dragonfly\"]\n",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 9,
        "nontZodiacAnimal_name": "Phoenix",
        "images": "phoenix"
    },
    {
        "resultzodiac_slug": "goldfish",
        "zodiacanimal_slug": "mighty-horse",
        "element_slug": "earth",
        "traits_slug": "walk-with-grace",
        "alliance_slug": "smart-rabbit",
        "riddle_result": true,
        "path_slug": "cascade-waterfall-path",
        "puzzle_result": true,
        "caligraphy_result": true,
        "wishes_slug": "wealth",
        "nonZodiacAnimal_id": 10,
        "resultzodiac_compatible": "[\"phoenix\", \"koi-fish\"]",
        "resultzodiac_incompatible": "[\"crane\", \"crab\"]\n",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 10,
        "nontZodiacAnimal_name": "Goldfish",
        "images": "goldfish"
    },
    {
        "resultzodiac_slug": "dragonfly",
        "zodiacanimal_slug": "clever-rat",
        "element_slug": "fire",
        "traits_slug": "energetic-spirit",
        "alliance_slug": "clever-rat",
        "riddle_result": false,
        "path_slug": "misty-mountain-path",
        "puzzle_result": false,
        "caligraphy_result": false,
        "wishes_slug": "true-love",
        "nonZodiacAnimal_id": 11,
        "resultzodiac_compatible": "[\"red-panda\", \"milu-deer\"]",
        "resultzodiac_incompatible": "[\"panda\", \"phoenix\"]\n",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 11,
        "nontZodiacAnimal_name": "Dragonfly",
        "images": "dragonfly"
    },
    {
        "resultzodiac_slug": "milu-deer",
        "zodiacanimal_slug": "patient-snake",
        "element_slug": "wood",
        "traits_slug": "crafty-nature",
        "alliance_slug": "wise-dragon",
        "riddle_result": true,
        "path_slug": "ancient-shrine-route",
        "puzzle_result": true,
        "caligraphy_result": true,
        "wishes_slug": "peaceful-life",
        "nonZodiacAnimal_id": 12,
        "resultzodiac_compatible": "[\"duck\", \"dragonfly\"]",
        "resultzodiac_incompatible": "[\"pangolin\", \"red-panda\"]",
        "Unnamed: 13": null,
        "Unnamed: 14": null,
        "Unnamed: 15": null,
        "nonZodiacAnimal_id.1": 12,
        "nontZodiacAnimal_name": "Milu Deer",
        "images": "milu-deer"
    }
]

const calculateBestMatch = (userChoices, scoringData) => {
    const scores = scoringData.map(entry => {
        let score = 0;
        // Increase score based on matching user choices with scoring data entries
        if (entry.element_slug === userChoices.element) score += 10;
        if (entry.traits_slug === userChoices.trait) score += 10;
        if (entry.alliance_slug === userChoices.alliance) score += 10;
        if (entry.path_slug === userChoices.path) score += 10;

        // Adjust score based on riddle, puzzle, and calligraphy results
        score += entry.riddle_result === userChoices.riddle ? 5 : -5;
        score += entry.puzzle_result === userChoices.puzzle ? 5 : -5;
        score += entry.caligraphy_result === userChoices.calligraphy ? 5 : -5;

        // Consider wishes in the scoring
        if (entry.wishes_slug === userChoices.wishes) score += 5;

        return { animal: entry.resultzodiac_slug, score };
    });

    // Sort scores to find the best match
    scores.sort((a, b) => b.score - a.score);
    return scores[0]; // Returns the entry with the highest score
};

const slugify = (s) => {
    return s.toLowerCase().replace(/\W/g, '');
}

const getBestMatch = (userChoices) => {
    const bestMatch = calculateBestMatch(userChoices, scoringData);
    return {animal: slugify(bestMatch.animal), score: bestMatch.score};
}

export default getBestMatch;