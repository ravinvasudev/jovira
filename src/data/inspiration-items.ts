import type { InspirationItem } from "@/types/inspiration-item";

export const inspirationItems: InspirationItem[] = [
  {
    id: "gabby-dollhouse",
    title: "Gabby’s Dream Dollhouse Celebration",
    description:
      "A Dollhouse Dream Come to Life! Every celebration tells a story, and this one was little special. We had so much fun creating this custom pastel balloon backdrop for Annabelle’s Dollhouse 5th Birthday, featuring adorable bunny ears, soft spring-inspired colors, and playful details that brought the theme to life. Every element was thoughtfully designed to reflect our client’s vision and create a beautiful, picture-perfect backdrop for unforgettable birthday memories.",
    palette: "light Pink, light Purple ,butter yellow ",
    eventType: "Birthday",
    offer: {
      packageLabel: "Signature Color Theme",
      originalPrice: 650,
      discountPct: 5,
    },
    image: "/inspiration/insp1.png",
    imageAlt:
      "A Dollhouse Dream Come to Life featuring adorable bunny ears, soft spring-inspired colors, and playful details",
  },
  {
    id: "wild-one",
    title: "WILD ONE",
    eventType: "Birthday",
    description:
      "Roaring into ONE! This dreamy safari setup was created to celebrate a very special little adventurer. From jungle-inspired balloons to adorable animal friends, every detail brought the Wild One theme to life.",
    palette: "Brown, Yellow  Mustard ,Sage Green, Light Green",
    offer: {
      packageLabel: "Signature Kids Birthday",
      originalPrice: 620,
      discountPct: 20,
    },
    image: "/inspiration/insp6.png",
    imageAlt:
      "Roaring into ONE! A dreamy safari setup",
  },
  {
    id: "one-in-the-sun",
    title: "ONE IN THE SUN",
    eventType: "Birthday",
    description:
      "Celebrating Lane’s very first trip around the sun with this dreamy balloon installation! Soft shades of baby blue, buttery yellow, and crisp white came together to create a fresh, cheerful backdrop that perfectly captured this sweet milestone.From the custom organic balloon garland to the playful sunshine detail, every element was thoughtfully designed to make this special day unforgettable. Watching our clients’ visions come to life is what we love most!",
    palette: "white, butter yellow, baby blue",
    offer: {
      packageLabel: "Signature Color Theme",
      originalPrice: 620,
      discountPct: 20,
    },
    image: "/inspiration/insp5.png",
    imageAlt:
      "One in the Sun!",
  },
  /* {
    id: "evergreen-christmas-corner",
    title: "Evergreen Christmas Gathering",
    description:
      "Celebrating Elias’s First Holy Communion with an elegant custom backdrop installation featuring luxe gold, sage green, and white balloons accented with lush greenery. Designed to create a timeless and meaningful focal point for this special day, this setup brought together faith, family, and beautiful memories in one unforgettable celebration.",
    palette: "Evergreen, champagne, winter white",
    eventType: "Christmas",
    offer: {
      packageLabel: "Bubble Of Love",
      originalPrice: 720,
      discountPct: 10,
    },
    image: "/inspiration/insp2.png",
    imageAlt:
      "Evergreen Christmas garland with champagne baubles above a styled entrance moment",
  }, */
  {
    id: "Boy-or-girl",
    title: "Pink or blue, what will it be?",
    eventType: "Baby Shower",
    description:
      "A dreamy gender reveal setup created with soft pastel balloons, elegant backdrop styling, and sweet baby details to make the moment extra special.",
    palette: "baby pink, baby blue, white",
    offer: {
      packageLabel: "Signature Color Theme",
      originalPrice: 690,
      discountPct: 15,
    },
    image: "/inspiration/insp3.png",
    imageAlt:
      "A dreamy gender reveal setup created with soft pastel balloons",
  },
  {
    id: "one-derful-world",
    title: "One-derful World",
    eventType: "Birthday",
    description:
      "You just found the cutest first birthday setup ever. This One-derful World theme is pure magic; soft pastels, dreamy balloons, and all the little details that make guests say “WOW.”",
    palette: "light colors pink, purple, green, buttery yellow , bubble ballon to give dreamy land existence",
    offer: {
      packageLabel: "Signature Kids Birthday",
      originalPrice: 620,
      discountPct: 20,
    },
    image: "/inspiration/IMG_1659.PNG",
    imageAlt:
      "One-derful World theme is pure magic",
  },


];

export function getInspirationItemById(id: string) {
  return inspirationItems.find((item) => item.id === id) ?? null;
}

export function getInspirationItemFromSource(
  source: string | null | undefined,
) {
  if (!source) {
    return null;
  }

  const match = source.match(/^inspiration-(.+)-claim-offer$/);
  if (!match) {
    return null;
  }

  return getInspirationItemById(match[1]);
}

export function getInspirationOfferPricing(item: InspirationItem) {
  const discount = Number(
    ((item.offer.originalPrice * item.offer.discountPct) / 100).toFixed(2),
  );
  const effectiveCost = Number(
    (item.offer.originalPrice - discount).toFixed(2),
  );

  return {
    packageLabel: item.offer.packageLabel,
    cost: item.offer.originalPrice,
    discountPct: item.offer.discountPct,
    discount,
    effectiveCost,
  };
}
