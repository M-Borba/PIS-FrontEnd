import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { axiosInstance } from "../../config/axios";
import InfoProyecto from "../InfoProyecto";
import CommentsSection from "../../components/CommentsSection";
import { useStyles } from "./styles";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState();
  const classes = useStyles();

  const getProject = async (projectId) => {
    axiosInstance.get(`/projects/${projectId}`).then((response) => {
      setProject(response.data.project);
    });
  };

  useEffect(() => {
    getProject(id);
  }, []);

  return (
    <div className={classes.gridContainer}>
      {project && (
        <InfoProyecto
          onClose={() => {}}
          updateProjectState={() => {}}
          projectData={project}
          type={project.project_type
            ?.replaceAll("_", " ")
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
        />
      )}
      {project && (
        <CommentsSection
          notes={[
            //TODO: delete hardcoded notes
            {
              user: "csanchez@effectussoftware.com",
              date: "2021-12-12",
              id: 1,
              comment: "Esta es una nota de prueba",
            },
            {
              user: "csanchez@effectussoftware.com",
              date: "2021-12-12",
              id: 2,
              comment:
                "Esta es otra nota de prueba pero mucho mas larga. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            },
          ]}
        />
      )}
    </div>
  );
}
