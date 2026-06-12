import aluminiData from "../../data/alumini.json";
import AluminiDisplay from "../../components/AluminiDisplay";

export default function TeamPage() {
  return <AluminiDisplay team={aluminiData} />;
}
