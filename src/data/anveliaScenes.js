import auditoriumHero from "../../anvelia-auditorium-hero-v2-optimized.jpg";
import cabinHero from "../../anvelia-cabin-hero-optimized.jpg";
import farmHero from "../../anvelia-farm-to-table-hero-optimized.jpg";
import heroBanner from "../../anvelia-hero-banner-optimized.jpg";
import mistHero from "../../anvelia-mist-forest-transition-optimized.jpg";
import openingHero from "../../anvelia-opening-logo-hero.png";
import logoImage from "../../anvelia-logo-emblem.png";
import riverWalkImage from "../../anvelia-ritual-river-walk-v1-optimized.jpg";
import nutritionCoachingImage from "../../anvelia-ritual-nutrition-coaching-v1-optimized.jpg";
import hotSpringTherapyImage from "../../anvelia-ritual-hot-spring-therapy-v1-optimized.jpg";
import sharingCircleImage from "../../anvelia-ritual-sharing-circle-v1-optimized.jpg";
import liverProgramImage from "../../anvelia-ritual-liver-program-v1-optimized.jpg";

export const heroImages = {
  logo: logoImage,
  opening: openingHero,
  mist: mistHero,
  sanctuary: heroBanner,
  cabin: cabinHero,
  cultivation: farmHero,
  gathering: auditoriumHero
};

export const placeSlides = [
  {
    id: "cabins",
    image: heroImages.cabin,
    label: "Stay",
    title: "Forest Cabins",
    body: "26 quiet cabins with mountain terraces and private ritual baths.",
    note: "A softer way to stay close to mist, trees, and clean ridge air."
  },
  {
    id: "pavilion",
    image: heroImages.gathering,
    label: "Gather",
    title: "Healing Pavilion",
    body: "A 4,000 sq ft open pavilion for retreat circles, breath, and quiet gatherings.",
    note: "An airy shared space between forest, sky, and community."
  },
  {
    id: "farm",
    image: heroImages.cultivation,
    label: "Nourish",
    title: "Organic Farm",
    body: "Farm-to-table meals begin in the terraces and arrive simply at the table.",
    note: "Food, herbs, and seasonal harvests become part of the healing rhythm."
  }
];

export const ritualMoments = [
  {
    time: "06:30",
    title: "River Walk",
    body: "Water, stone, forest air, and first light.",
    image: riverWalkImage,
    alt: "Stone path beside a misty mountain stream at dawn"
  },
  {
    time: "09:00",
    title: "Nutrition Coaching",
    body: "Farm-grown food and simple daily guidance.",
    image: nutritionCoachingImage,
    alt: "Farm-grown nutrition table on a mountain veranda"
  },
  {
    time: "15:30",
    title: "Hot Spring Therapy",
    body: "Warmth, minerals, rest, and breath.",
    image: hotSpringTherapyImage,
    alt: "Natural hot spring pool with steam and forest views"
  },
  {
    time: "18:40",
    title: "Sharing Circle",
    body: "Meditation, reflection, and quiet connection.",
    image: sharingCircleImage,
    alt: "Lantern-lit circle of cushions in an open healing pavilion"
  },
  {
    time: "Program",
    title: "Liver Program",
    body: "A deeper detox path when the stay calls for it.",
    image: liverProgramImage,
    alt: "Herbal detox nourishment table with forest view"
  }
];

export const detoxPrograms = [
  {
    days: "2",
    label: "Experience",
    tone: "A light first step into the detox method, with enough structure to begin feeling clearer.",
    bestFor: "First reset, short stay, gentle start",
    pace: "Intake, prepare, begin"
  },
  {
    days: "3",
    label: "Cleanse",
    tone: "A short cleanse focused on digestive rest, hydration, lighter meals, and early recovery.",
    bestFor: "Digestive rest, clearer routine",
    pace: "Cleanse, hydrate, rest"
  },
  {
    days: "5",
    label: "Restore",
    tone: "A steadier reset with more time for detox support, nourishment, and recovery rhythm.",
    bestFor: "Fatigue, stress, renewed energy",
    pace: "Release, replenish, restore"
  },
  {
    days: "7",
    label: "Reset",
    tone: "A fuller wellness program for deeper detox structure and a more complete lifestyle reset.",
    bestFor: "Lifestyle reset, deeper repair",
    pace: "Assess, reset, integrate"
  },
  {
    days: "14",
    label: "Deep Retreat",
    tone: "A slower immersion for guests who want deeper support, observation, and spacious integration.",
    bestFor: "Deep renewal, long-stay retreat",
    pace: "Unwind, transform, return"
  }
];
