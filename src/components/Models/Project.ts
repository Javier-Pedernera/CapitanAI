import CollaboratorsModel from "./CollaboratorsModel";

interface ProjectModel {
  id: string;
  name: string;
  date: string;
  description: string;
  creator: string;
  collaborators: CollaboratorsModel[];
}

export default ProjectModel;