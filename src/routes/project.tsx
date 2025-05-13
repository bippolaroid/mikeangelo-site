import ProjectPage from "~/components/ProjectPage";
import * as DB from "../db.json";
import { useSearchParams } from "@solidjs/router";

export default function Project() {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams.id || !Number(searchParams.id)) {
    setSearchParams({ id: 0 });
  }

  return <ProjectPage data={DB.projects[Number(searchParams.id)]} />;
}
