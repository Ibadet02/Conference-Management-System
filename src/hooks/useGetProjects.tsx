import { useEffect, useState } from "react";
import { ProjectDataType } from "../types/dashboard/Admin/types";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ProjectDataTypeWithIds, ProjectStateType } from "../types/hooks/types";
import { initialProjectStateData } from "../data/hooks/ProjectStateData";

const useGetProjects = () => {
  const [projectState, setProjectState] = useState<ProjectStateType>(
    initialProjectStateData
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsDataWithIds: ProjectDataTypeWithIds[] = [];
      snapshot.forEach((doc) => {
        const project: ProjectDataType = doc.data() as ProjectDataType;
        projectsDataWithIds.push({ id: doc.id, ...project });
      });
      
      setProjectState({ projects: projectsDataWithIds, loading: false });
      setLoading(false)
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return {projects: projectState?.projects, setLoading};
};

export default useGetProjects;
