import { useEffect } from 'react';
import '../../scss/components/project.scss'; // Estilos CSS para el componente
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { createStage, editStage, getStagesbyProjectId, stageDeleted } from '../../Redux/Actions/StagesGet';
import { useParams } from 'react-router-dom';
import CreateStage from '../../components/Models/CreateStage';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { getProjectActual } from '../../Redux/Actions/ProjectsGet';
import ProjectModel from '../../components/Models/Project';
interface newStage {
  name: string;
  description: string;
}



const Project = () => {

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  // const navigate = useNavigate();
  // const userActive: UserState = useAppSelector((state: any) => state.user);
  const stagesProject: CreateStage[] = useAppSelector((state: any) => state.stages.stagesProyect);
  const actualProject: ProjectModel = useAppSelector((state: any) => state.projects.projectActual);
  console.log("actualProyect", actualProject);
  console.log("stages del proyecto actual", stagesProject);
  const dispatch = useAppDispatch()
  const { projectId } = useParams();
  console.log(stagesProject);
  console.log(actualProject);


  useEffect(() => {
    if (projectId) {
      dispatch(getProjectActual(projectId))
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      dispatch(getStagesbyProjectId(projectId))
    }
  }, [dispatch, projectId]);

  const handleCreateStage = () => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        heightAuto: false,
        title: "Create project",
        html: `<input  placeholder ="Stage's name" id="swal-input1" class="swal2-input"><textarea placeholder ="Stage description..." id="swal-text" class="swal2-textarea"></textarea>`,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById("swal-input1") as HTMLInputElement;
          const description = document.getElementById("swal-text") as HTMLInputElement;
          if (name && description) {
            return [name.value, description.value];
          }
          return null;
        }
      });
      if (formValues) {
        const data: newStage = {
          name: formValues[0] ? formValues[0] : "",
          description: formValues[1] ? formValues[1] : ""
        }
        const response = await dispatch(createStage(projectId ? projectId : "", data));
        // console.log("data al dispatch",data);
        // console.log("respuesta",response);
        if (response?.status == 200) {
          dispatch(getStagesbyProjectId(projectId ? projectId : ""))
          Toast.fire({
            title: `Stage ${formValues[0]} created successfully!`,
            icon: 'success'
          });
          // Swal.fire({ heightAuto: false, text: `The ${formValues[0]} project was created successfully` });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            // footer: '<a href="#">Try again...</a>'
          });
        }
      }
    })()
  };

  const handleDeleteStage = (stageID: string) => {
    Swal.fire({
      heightAuto: false,
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(stageDeleted(projectId ? projectId : "", stageID ? stageID : ""))

          .then((result: any) => {
            console.log("result de delete", result)
            if (result == "Stage deleted") {
              dispatch(getStagesbyProjectId(projectId ? projectId : ""))

              Swal.fire({
                heightAuto: false,
                title: "Deleted!",
                text: "Your stage has been deleted.",
                icon: "success"
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Try again...</a>'
              });
            }

          })
      }
    });


  };
  const handleEditStage = (stageID: string, stageName: string, stageDescription: string) => {
    console.log(stageName, stageDescription);
    Swal.fire({
      heightAuto: false,
      title: 'Edit Stage',
      html: `
        <input placeholder="${stageName}" id="swal-input1" class="swal2-input">
        <textarea placeholder="${stageDescription}" id="swal-text" class="swal2-textarea"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement)?.value.length?(document.getElementById('swal-input1') as HTMLInputElement)?.value.length:stageName;
        const description = (document.getElementById('swal-text') as HTMLInputElement)?.value.length?(document.getElementById('swal-text') as HTMLInputElement)?.value:stageDescription;
        return { name, description };
      }
    }).then((result: any) => {
      if (result.isConfirmed && result.value) {
        const { name, description } = result.value;
        dispatch(editStage(stageID ? stageID : "", { name: name, description: description }))
          .then((resultRes) => {
            console.log("resultRes . status",resultRes?.status);
            if(resultRes?.status == 200){
              dispatch(getStagesbyProjectId(projectId ? projectId : "")) 
              Toast.fire({
                            title: `Stage ${name} edited successfully!`,
                            icon: 'success'
                          });
            }
            // let name = resultRes?.data.name
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to create stage!',
              icon: 'error'
            });
            console.error('Error creating stage:', error);
          });
      }
    });
  };

  return (
    <div className="project-container">
      <div className='titleProject'>
        <h2>{actualProject.name}</h2>
        <p>Created: {actualProject.date}</p>

      </div>
      <hr className='stage-divider' />
      <button className='create-stage-button' onClick={handleCreateStage}>+ Add stage</button>

      <h3>Project stages</h3>
      <div className="stage-container">
        {stagesProject.map((stage, index) => (
          <div key={index} className="stage-card">
            <div className='delete_edit'>
              <h4>{stage.name}</h4>
              <div className='edit-delete'>
                <MdEditSquare title='edit' onClick={() => handleEditStage(stage.id, stage.name, stage.description)} className="edit-button"></MdEditSquare>
                <MdDeleteForever title='delete' onClick={() => handleDeleteStage(stage.id)} className="delete-button"></MdDeleteForever>
              </div>

            </div>

            {/* <button >Edit</button>
            <button >Delete</button> */}
            <hr className="stage-divider" />
            <h5>Description:</h5>
            <p>{stage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;

