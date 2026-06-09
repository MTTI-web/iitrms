import teamData from "../../data/members.json";
import TeamDisplay from "../../components/TeamDisplay";

export default function TeamPage() {
  return <TeamDisplay team={teamData} />;
}
