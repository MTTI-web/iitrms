import CarsDisplay from "../../components/CarsDisplay";
import carsData from "../../data/cars.json";

export const metadata = {
  title: "Our Cars | IIT Roorkee Motorsports",
  description:
    "Explore the fleet and engineering evolution of IIT Roorkee Motorsports.",
};

export default function CarsPage() {
  return (
    <main>
      <CarsDisplay cars={carsData} />
    </main>
  );
}
