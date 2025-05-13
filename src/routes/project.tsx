import ProjectContainer from "~/components/ProjectContainer";
import * as DB from "../db.json";
import { useSearchParams } from "@solidjs/router";

export default function Project() {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams.id) {
    setSearchParams({ id: 0 });
  }

  return <ProjectContainer data={DB.projects[Number(searchParams.id)]} />;
}
