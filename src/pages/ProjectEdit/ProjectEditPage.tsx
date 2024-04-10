import { useEffect } from 'react';
import '../../scss/components/projectEdit.scss'; // Estilos CSS para el componente
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { createStage, editStage, getStagesbyProjectId, stageDeleted } from '../../Redux/Actions/StagesGet';
import { useNavigate, useParams } from 'react-router-dom';
import CreateStage from '../../Models/CreateStage';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { addCollaborator, getProjectActual, updateProject } from '../../Redux/Actions/ProjectsGet';
import ProjectModel from '../../Models/Project';
import Project from '../../Models/Project';
// import User from '../../components/Models/User';;
import ProjectUpdate from '../../Models/ProjectUp';
import { PiGearLight } from 'react-icons/pi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { getAssistants } from '../../Redux/Actions/AssistantsGet';
import AssistantModel from '../../Models/AssistantModel';

interface newStage {
  name: string;
  description: string;
}
interface newProject_Stage {
  projectId: string;
  assistant_id: string;
}
const ProjectEdit = () => {
  const dispatch = useAppDispatch()
  const { projectId } = useParams();
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
  const userActive: any = useAppSelector((state: any) => state.user);
  const stagesProject: CreateStage[] = useAppSelector((state: any) => state.stages.stagesProyect);
  const actualProject: ProjectModel = useAppSelector((state: any) => state.projects.projectActual);
  const actualAssistants: AssistantModel[] = useAppSelector((state: any) => state.assistants.assistantsOpenai);
  // const stageSelected: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [selectStage, setselectStage] = useState<Stage | null>(null);

  const user = userActive.userData
  // console.log("stagesProjects", stagesProject);
  // console.log("Project en edit ", actualProject);
  // console.log("userActive Id", user);
  // console.log("asistentes actuales en projectedit", actualAssistants);
  // console.log("asistentes .LENGTH actuales en projectedit", actualAssistants.length);
  useEffect(() => {
    if (!actualAssistants.length) {
      dispatch(getAssistants())
    } else {
      console.log("asistentes cargados");
    }
  }, []);

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

  const handleAddCollaborator = () => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        heightAuto: false,
        title: `Add collaborator in ${actualProject.name}`,
        html: `<input  placeholder ="user_id" id="swal-input1" class="swal2-input">`,
        focusConfirm: false,
        preConfirm: () => {
          const user_id = document.getElementById("swal-input1") as HTMLInputElement;
          if (user_id) {
            return [user_id.value];
          }
          return null;
        }
      });
      if (formValues) {
        const collaborator: any = {
          user_id: formValues[0] ? formValues[0] : null
        }
        const response = await dispatch(addCollaborator(projectId ? projectId : "", collaborator));
        console.log("respuesta", response);
        if (response?.status == 200) {
          dispatch(getProjectActual(projectId ? projectId : ""))
          Toast.fire({
            title: `Collaborator ${formValues[0]} added successfully!`,
            icon: 'success'
          });
        } else {
          Swal.fire({
            heightAuto: false,
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    })()
  };
  const handleCreateStage = () => {
    (async () => {
      const { value: formValues } = await Swal.fire({
        heightAuto: false,
        title: `Create stage in ${actualProject.name}`,
        html: `
        <input placeholder="Stage's name" id="swal-input1" class="swal2-input">
        <textarea placeholder="Stage description..." id="swal-text" class="swal2-textarea"></textarea>
        <select id="swal-select" class="swal2-select">
        <option value="" disabled selected>Select Assistant</option>
          ${actualAssistants.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
        </select>
        <div id="model-info"></div>
        <div id="created-at-info"></div>
        <div id="instructions-info"></div>
      `,
        focusConfirm: false,
        customClass: {
          popup: 'custom-popup-class'
        },
        didOpen: () => {
          const select = document.getElementById("swal-select") as HTMLSelectElement;
          const modelInfo = document.getElementById("model-info");
          const createdAtInfo = document.getElementById("created-at-info");
          const instructionsInfo = document.getElementById("instructions-info");
          select.addEventListener("change", () => {
            const selectedAssistantId = select.value;
            const selectedAssistant = actualAssistants.find(assistant => assistant.id === selectedAssistantId);
            if (selectedAssistant) {
              if (modelInfo) {
                modelInfo.innerHTML = ` <div id="info_title">Model:</div> ${selectedAssistant.model}`;
              }
              if (createdAtInfo) {
                const createdAt = new Date(parseInt(selectedAssistant.created_at) * 1000);
                const formattedDate = createdAt.toLocaleDateString('en-US');
                createdAtInfo.innerHTML = `<div id="info_title">Created At:</div> ${formattedDate}`;
              }
              if (instructionsInfo) {
                instructionsInfo.innerHTML = `<div id="info_title">Instructions:</div> <div id="instrucc_content">${selectedAssistant.instructions}</div>`;
              }
            }
          });
        },
        preConfirm: () => {
          const name = document.getElementById("swal-input1") as HTMLInputElement;
          const assistantId = (document.getElementById("swal-select") as HTMLSelectElement)?.value;
          const description = document.getElementById("swal-text") as HTMLInputElement;
          if (name && description && assistantId) {
            return [name.value, description.value, assistantId];
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
        } else {
          Swal.fire({
            heightAuto: false,
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
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
        // console.log("dentro del delete", projectId, stageID);
        dispatch(stageDeleted(projectId ? projectId : "", stageID ? stageID : ""))
          .then((result: any) => {
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
      const data: ProjectUpdate = {
        name: formValues.length ? formValues[0] : "",
        description: formValues.length ? formValues[1] : ""
      }
      const response = await dispatch(updateProject(project.id, data));
      if (response?.status == 200) {
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
    <div className="project_container_edit">
      <div className="backArrow">
        <IoMdArrowRoundBack onClick={handleBack} />
        <h6>back</h6>
      </div>

      <div className='cards_edit'>
        <h2>Project configuration</h2>
        <hr className='stage_divider_edit' />
        <div className='titleProjectEdit'>
          {/* <RiHomeGearLine className='btn_ico'></RiHomeGearLine> */}
          <div className='section_tit_edit'>Name: <div className='name_p_e'>{actualProject.name}</div> </div>
          <div className='section_tit_edit'>Created: <div className='name_p_e'>{actualProject.date}</div> </div>
          <button className='edit_project_button' onClick={() => handleEditProject(actualProject)}>Edit
            {/* <RiHomeGearLine className='btn_ico' /> */}
            <PiGearLight className='btn_ico_edit' />
          </button>
        </div>
        <div className='title_description_edit' >
          Description: <div className='description'>{actualProject.description}</div>
        </div>
        <hr className='stage_divider_edit' />
        <div className="collaborators_container">
          <h5>Collaborators:</h5>
          <ul className='lista_colab'>
            <button className='create_stage_button' onClick={handleAddCollaborator}>+</button>
            {actualProject?.collaborators?.length > 1 ? actualProject.collaborators.map((collaborator, index) => (
              <li key={index}>
                {collaborator?.public_id !== user.id ?
                  <div className='colab_card'>
                    <h6>userId:</h6> <div> {collaborator.public_id} </div>
                    <h6>email:</h6> <div>{collaborator.username}</div>
                  </div> : null
                }
              </li>
            )) : <div className='colab_card_null'>Add collaborators here...</div>}
          </ul>
        </div>
        <hr className='stage_divider_edit' />
        <div>
          <div className='stages-title_edit'>Project stages</div>
        </div>
        <hr className='stage_divider_edit' />
        {
          userRole == "Admin" ?
            <div className='div_btn_edit'><button className='create_stage_button' onClick={handleCreateStage}>+ Add stage</button> </div> : <div className='div_btn_edit'></div>}
        <div className="stage_container_edit">
          {/* {stageSelected?.id== stageDeleted.id? "stage-card": "stage-nonselect-card" } */}
          {stagesProject.map((stage, index) => (
            <div key={index} className="stage_card_edit" >
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
              <hr className="stage_divider_edit" />
              <div className='card_container_edit'>
                <div>
                  <div className='section_tit_edit'>Description:</div>
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

