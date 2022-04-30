import { v4 as uuid } from "uuid";
import BollywoodMusic from "assets/images/bollywood_music.jpg";
import ClassicalMusic from "assets/images/classical_music.jpg";
import IndieMusic from "assets/images/indie_music.jpg";
import PopMusic from "assets/images/pop_music.jpg";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
	{
		_id: uuid(),
		categoryName: "Indian Classical",
		description:
			"The classical music of the Indian subcontinent- it has two major traditions: the North Indian classical music known as Hindustani and the South Indian expression known as Carnatic.",
		categoryImg: ClassicalMusic,
	},
	{
		_id: uuid(),
		categoryName: "Indie India",
		description:
			"Indian Independent music or Indie music is music produced independently by Indian singers from commercial record labels or their subsidiaries.",
		categoryImg: IndieMusic,
	},
	{
		_id: uuid(),
		categoryName: "Bollywood",
		description:
			"Bollywood music is produced part of an album or the Hindi cinema majorly in the Hindi language.",
		categoryImg: BollywoodMusic,
	},
	{
		_id: uuid(),
		categoryName: "English Pop",
		description:
			"English Pop or Popular music is a contemporary form of music in the English language that appeals to a very wide audience. It often includes a danceable tempo, easy to remember lyrics, and simple notation.",
		categoryImg: PopMusic,
	},
];
