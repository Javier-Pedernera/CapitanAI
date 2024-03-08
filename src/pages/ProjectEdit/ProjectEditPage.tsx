import { useEffect } from 'react';
import '../../scss/components/projectEdit.scss'; // Estilos CSS para el componente
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { createStage, editStage, getStagesbyProjectId, stageDeleted } from '../../Redux/Actions/StagesGet';
import { useNavigate, useParams } from 'react-router-dom';
import CreateStage from '../../components/Models/CreateStage';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { getProjectActual, updateProject } from '../../Redux/Actions/ProjectsGet';
import ProjectModel from '../../components/Models/Project';
import Project from '../../components/Models/Project';
import User from '../../components/Models/User';;
import ProjectUpdate from '../../components/Models/ProjectUp';
import { PiGearLight } from 'react-icons/pi';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface newStage {
  name: string;
  description: string;
}
interface newProject_Stage {
  projectId: string;
  assistant_id: string;
}



const ProjectEdit = () => {

  // const [userRole, setuserRole] = useState("Admin");
  const navigate = useNavigate();
  const userRole = "Admin"
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
  const userActive: User = useAppSelector((state: any) => state.user);
  const stagesProject: CreateStage[] = useAppSelector((state: any) => state.stages.stagesProyect);
  const actualProject: ProjectModel = useAppSelector((state: any) => state.projects.projectActual);
  // const stageSelected: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [selectStage, setselectStage] = useState<Stage | null>(null);

  const dispatch = useAppDispatch()
  const { projectId } = useParams();
  console.log(stagesProject);
  console.log(actualProject);
  console.log("userActive", userActive);

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
        title: `Create stage in ${actualProject.name}`,
        html: `<input  placeholder ="Stage's name" id="swal-input1" class="swal2-input"><input  placeholder ="AssistantId" id="swal-input2" class="swal2-input"><textarea placeholder ="Stage description..." id="swal-text" class="swal2-textarea"></textarea>`,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById("swal-input1") as HTMLInputElement;
          const assistantId = document.getElementById("swal-input2") as HTMLInputElement;
          const description = document.getElementById("swal-text") as HTMLInputElement;
          if (name && description && assistantId) {
            return [name.value, description.value, assistantId.value];
          }
          return null;
        }
      });
      if (formValues) {
        const dataStage: newStage = {
          name: formValues[0] ? formValues[0] : "",
          description: formValues[1] ? formValues[1] : "",
        }
        const dataP_S: newProject_Stage = {
          projectId: projectId ? projectId : "",
          assistant_id: formValues[2] ? formValues[2] : ""
        }

        const response = await dispatch(createStage(dataP_S, dataStage));
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
            heightAuto: false,
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
        console.log("dentro del delete", projectId, stageID);

        dispatch(stageDeleted(projectId ? projectId : "", stageID ? stageID : ""))

          .then((result: any) => {
            // console.log("result de delete", result)
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
                heightAuto: false,
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
    // console.log(stageName, stageDescription);
    Swal.fire({
      heightAuto: false,
      title: 'Edit Stage',
      html: `<input placeholder="${stageName}" id="swal-input1" class="swal2-input">
        <textarea placeholder="${stageDescription.length ? stageDescription : "write a description.."}" id="swal-text" class="swal2-textarea"></textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement)?.value.length ? (document.getElementById('swal-input1') as HTMLInputElement)?.value : stageName;
        const description = (document.getElementById('swal-text') as HTMLInputElement)?.value.length ? (document.getElementById('swal-text') as HTMLInputElement)?.value : stageDescription;
        return { name, description };
      }
    }).then((result: any) => {
      if (result.isConfirmed && result.value) {
        console.log(result);

        const { name, description } = result.value;
        dispatch(editStage(stageID ? stageID : "", { name: name, description: description }))
          .then((resultRes) => {
            console.log("resultRes . status", resultRes?.status);
            if (resultRes?.status == 200) {
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
              heightAuto: false,
              title: 'Error',
              text: 'Failed to create stage!',
              icon: 'error'
            });
            console.error('Error Editing stage:', error);
          });
      }
    });
  };
  const handleEditProject = (project: Project) => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        heightAuto: false,
        title: "Edit project",
        html: `<input  placeholder ="${project.name}" id="swal-input1" class="swal2-input">
                <textarea placeholder ="${project.description}"  id="swal-text" class="swal2-textarea"></textarea>`,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById("swal-input1") as HTMLInputElement;
          const description = (document.getElementById("swal-text") as HTMLInputElement).value.length ? (document.getElementById("swal-text") as HTMLInputElement).value : project.description;
          if (name && description) {
            return [name.value, description];
          }
          return null;
        }
      });
      console.log(formValues);
      const data: ProjectUpdate = {
        name: formValues.length ? formValues[0] : "",
        description: formValues.length ? formValues[1] : ""
      }
      const response = await dispatch(updateProject(project.id, data));
      // console.log("data al dispatch",data);
      // console.log("respuesta",response);
      if (response?.status == 200) {
        // dispatch(getProjectsUser(userActive.userData && 'id' in userActive.userData ? userActive.userData.id : "User  id"));
        Swal.fire({ heightAuto: false, title: `The ${formValues[0]} project was edited successfully` });
      } else {
        Swal.fire({
          heightAuto: false,
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          // footer: '<a href="#">Try again...</a>'
        });
      }
    })()
  };

  const handleBack = () => {
    navigate(`/dashboard`);
};


  return (
    <div className="project-container">
      <IoMdArrowRoundBack onClick={handleBack} className="backArrow" />
      <div className='cards-stage'>
        <h2>Project configuration</h2>
        <hr className='stage-divider' />
        <div className='titleProject'>
          {/* <RiHomeGearLine className='btn_ico'></RiHomeGearLine> */}
          <div className='section_tit'>Name: <div className='name_p'>{actualProject.name}</div> </div>
          <div className='section_tit'>Created: <div className='name_p'>{actualProject.date}</div> </div>
          <button className='edit-project-button' onClick={() => handleEditProject(actualProject)}>Edit
            {/* <RiHomeGearLine className='btn_ico' /> */}
            <PiGearLight className='btn_ico' />
          </button>
        </div>
        <div className='title_description' >
          Description: <div className='description'>{actualProject.description}</div>
        </div>
        <hr className='stage-divider' />
        <div>
          <div className='stages-title'>Project stages</div>
        </div>
        <hr className='stage-divider' />
        {
          userRole == "Admin" ?
            <div className='div_btn'><button className='create-stage-button' onClick={handleCreateStage}>+ Add stage</button> </div> : <div className='div_btn'></div>}
        <div className="stage-container">
          {/* {stageSelected?.id== stageDeleted.id? "stage-card": "stage-nonselect-card" } */}
          {stagesProject.map((stage, index) => (
            <div key={index} className="stage-nonselect-card" >
              <div className='delete_edit'>
                <h4 >{stage.name}</h4>
                {
                  userRole == "Admin" ? <div className='edit-delete'>
                    <MdEditSquare title='edit' onClick={() => handleEditStage(stage.stage_id
                      , stage.name, stage.description)} className="edit-button"></MdEditSquare>
                    <MdDeleteForever title='delete' onClick={() => handleDeleteStage(stage.stage_id
                    )} className="delete-button"></MdDeleteForever>
                  </div> : <div></div>
                }

              </div>
              <hr className="stage-divider" />
              <div className='card_container'>
                <div>
                  <div className='section_tit'>Description:</div>
                  <p>{stage.description}</p>
                </div>

                <div>
                  <div>AssintantID</div>
                  <p>{stage.assistant_id}</p>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default ProjectEdit;

