import React, { useState } from 'react';
import ProjectModel from '../../components/Models/Project';
import { useParams } from 'react-router-dom';
import '../../scss/components/project.scss';
import Swal from 'sweetalert2';

const ProjectPage= () => {
  const { projectId } = useParams<{ projectId: string }>();

  
  
  const [project, setProject] = useState<ProjectModel>({
    id: projectId || "",
    name: '',
    stage: '',
    date: '',
    state: '',
    description: '',
    isFrontend: true,
    technology: '',
    language: '',
    aiResponse: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === 'checkbox') {
      const checkboxValue = (e.target as HTMLInputElement).checked;
      setProject(prevProject => ({
        ...prevProject,
        [name]: checkboxValue,
        technology: checkboxValue ? prevProject.technology : '',
        language: checkboxValue ? prevProject.language : ''
      }));
    } else {
      setProject(prevProject => ({
        ...prevProject,
        [name]: value
      }));
    }
  };

  return (
    <div className="project-page">
      <div className="frontend-section">
        <h2>Frontend</h2>
        <label>
          ¿Proyecto de Frontend?
          <input type="checkbox" name="isFrontend" checked={project.isFrontend} onChange={handleChange} />
        </label>
        {project.isFrontend && (
          <>
            <label>
              Tecnología Frontend:
              <select name="technology" value={project.technology} onChange={handleChange}>
                <option value="">Seleccione una tecnología</option>
                <option value="React">React</option>
                <option value="Angular">Angular</option>
                <option value="Vue">Vue</option>
              </select>
            </label>
            <label>
              Lenguaje Frontend:
              <select name="language" value={project.language} onChange={handleChange}>
                <option value="">Seleccione un lenguaje</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
              </select>
            </label>
          </>
        )}
      </div>
      <div className="backend-section">
        <h2>Backend</h2>
        <label>
          ¿Proyecto de Backend?
          <input type="checkbox" name="isBackend" checked={!project.isFrontend} onChange={handleChange} />
        </label>
        {!project.isFrontend && (
          <>
            <label>
              Tecnología Backend:
              <select name="technology" value={project.technology} onChange={handleChange}>
                <option value="">Seleccione una tecnología</option>
                <option value="Node.js">Node.js</option>
                <option value="Express">Express</option>
                <option value="Django">Django</option>
                <option value="Flask">Flask</option>
                <option value="Spring Boot">Spring Boot</option>
                <option value="Laravel">Laravel</option>
              </select>
            </label>
            <label>
              Lenguaje Backend:
              <select name="language" value={project.language} onChange={handleChange}>
                <option value="">Seleccione un lenguaje</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="PHP">PHP</option>
              </select>
            </label>
          </>
        )}
      </div>
      <div className="description-section">
        <h2>Descripción del Proyecto</h2>
        <textarea name="description" value={project.description} onChange={handleChange} />
      </div>
    </div>
  );
};

export default ProjectPage;