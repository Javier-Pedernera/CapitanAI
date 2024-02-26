import { useEffect } from 'react';
import '../../scss/components/project.scss'; // Estilos CSS para el componente
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { createStage, getStagesbyProjectId, stageDeleted } from '../../Redux/Actions/StagesGet';
import { useParams } from 'react-router-dom';
import CreateStage from '../../components/Models/CreateStage';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { getProjectActual } from '../../Redux/Actions/ProjectsGet';
// interface Stage {
//   name: string;
//   description: string;
// }



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
  const actualProject: any = useAppSelector((state: any) => state.projects.projectActual);
  console.log("actualProyect", actualProject);
  console.log("stages del proyecto actual", stagesProject);
  const dispatch = useAppDispatch()
  const { projectId } = useParams();

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
    Swal.fire({
      title: 'Create Stage',
      html: `
        <input placeholder="Stage name" id="swal-input1" class="swal2-input">
        <textarea placeholder="Stage description..." id="swal-text" class="swal2-textarea"></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement)?.value;
        const description = (document.getElementById('swal-text') as HTMLInputElement)?.value;
        return { name, description };
      }
    }).then((result: any) => {
      if (result.isConfirmed && result.value) {
        const { name, description } = result.value;
        dispatch(createStage(projectId ? projectId : "", { name: name, description: description }))
          .then((resultRes) => {
            // console.log(resultRes);
            let name = resultRes?.response.data.name
            Toast.fire({
              title: `Stage ${name} created successfully!`,
              icon: 'success'
            });
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

  // const handleNewStageDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewStageDescription(event.target.value);
  // };

  const handleDeleteStage = (stageID: string) => {
    Swal.fire({
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
            console.log(result)
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
      }
    });


  };
  const handleEditStage = (stageID: string) => {
    console.log(stageID);
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
                <MdEditSquare title='edit' onClick={() => handleEditStage(stage.id)} className="edit-button"></MdEditSquare>
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

