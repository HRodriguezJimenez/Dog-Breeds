import Card from "../Card/Card";

import style from "./cardsContainer.module.css";

const CardsContainer = () => {
  const dogs = [
    {
      id: 1,
      name: "Affenpinscher",
      image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
      minHeight: 23,
      maxHeight: 29,
      minWeight: 3,
      maxWeight: 6,
      minLifeSpan: 10,
      maxLifeSpan: 12,
      Temperaments: [
        "Stubborn",
        "Curious",
        "Playful",
        "Adventurous",
        "Active",
        "Fun-loving",
      ],
      created: false,
    },
    {
      id: 2,
      name: "Afghan Hound",
      image: "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
      minHeight: 64,
      maxHeight: 69,
      minWeight: 23,
      maxWeight: 27,
      minLifeSpan: 10,
      maxLifeSpan: 13,
      Temperaments: ["Aloof", "Clownish", "Dignified", "Independent", "Happy"],
      created: false,
    },
    {
      id: 3,
      name: "African Hunting Dog",
      image: "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
      minHeight: 76,
      maxHeight: null,
      minWeight: 20,
      maxWeight: 30,
      minLifeSpan: 11,
      maxLifeSpan: null,
      Temperaments: ["Wild", "Hardworking", "Dutiful"],
      created: false,
    },
    {
      id: 4,
      name: "Airedale Terrier",
      image: "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
      minHeight: 53,
      maxHeight: 58,
      minWeight: 18,
      maxWeight: 29,
      minLifeSpan: 10,
      maxLifeSpan: 13,
      Temperaments: [
        "Outgoing",
        "Friendly",
        "Alert",
        "Confident",
        "Intelligent",
        "Courageous",
      ],
      created: false,
    },
    {
      id: 5,
      name: "Akbash Dog",
      image: "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
      minHeight: 71,
      maxHeight: 86,
      minWeight: 41,
      maxWeight: 54,
      minLifeSpan: 10,
      maxLifeSpan: 12,
      Temperaments: ["Loyal", "Independent", "Intelligent", "Brave"],
      created: false,
    },
    {
      id: 6,
      name: "Akita",
      image: "https://cdn2.thedogapi.com/images/BFRYBufpm.jpg",
      minHeight: 61,
      maxHeight: 71,
      minWeight: 29,
      maxWeight: 52,
      minLifeSpan: 10,
      maxLifeSpan: 14,
      Temperaments: [
        "Docile",
        "Alert",
        "Responsive",
        "Dignified",
        "Composed",
        "Friendly",
        "Receptive",
        "Faithful",
        "Courageous",
      ],
      created: false,
    },
    {
      id: 7,
      name: "Alapaha Blue Blood Bulldog",
      image: "https://cdn2.thedogapi.com/images/33mJ-V3RX.jpg",
      minHeight: 46,
      maxHeight: 61,
      minWeight: 25,
      maxWeight: 41,
      minLifeSpan: 12,
      maxLifeSpan: 13,
      Temperaments: [
        "Loving",
        "Protective",
        "Trainable",
        "Dutiful",
        "Responsible",
      ],
      created: false,
    },
    {
      id: 8,
      name: "Alaskan Husky",
      image: "https://cdn2.thedogapi.com/images/-HgpNnGXl.jpg",
      minHeight: 58,
      maxHeight: 66,
      minWeight: 17,
      maxWeight: 23,
      minLifeSpan: 10,
      maxLifeSpan: 13,
      Temperaments: ["Friendly", "Energetic", "Loyal", "Gentle", "Confident"],
      created: false,
    },
  ];

  return (
    <div className={style.CardsContainer}>
      {dogs.map((dog) => {
        return (
          <Card
            key={dog.id}
            id={dog.id}
            name={dog.name}
            image={dog.image}
            minHeight={dog.minHeight}
            maxHeight={dog.maxHeight}
            minWeight={dog.minWeight}
            maxWeight={dog.maxWeight}
            minLifeSpan={dog.minLifeSpan}
            maxLifeSpan={dog.maxLifeSpan}
            Temperaments={dog.Temperaments}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
