import { useEffect, useState } from 'react';
import '../../scss/components/project.scss'; // Estilos CSS para el componente
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { createStage, editStage, getStagesById, getStagesbyProjectId, stageDeleted } from '../../Redux/Actions/StagesGet';
import { useParams } from 'react-router-dom';
import CreateStage from '../../components/Models/CreateStage';
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { getProjectActual } from '../../Redux/Actions/ProjectsGet';
import ProjectModel from '../../components/Models/Project';
// import Stage from '../../components/Models/CreateStage';
import Chat from '../../components/Chat/Chat';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IoIosArrowDown } from "react-icons/io";

interface newStage {
  name: string;
  description: string;
}
interface newProject_Stage {
  projectId: string;
  assistant_id: string;
}



const Project = () => {

  const [userRole, setuserRole] = useState("Admin");

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
  const stageSelected: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [selectStage, setselectStage] = useState<Stage | null>(null);


  // console.log("actualProyect", actualProject);
  // console.log("stages del proyecto actual", stagesProject);
  // console.log("stage seleccionada", stageSelected);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  

  const dispatch = useAppDispatch()
  const { projectId } = useParams();
  console.log(stagesProject);
  console.log(actualProject);

const handleSelectStage = (index: number, stageId: string) => {
    setExpandedIndex(index === expandedIndex ? null : index);
    dispatch(getStagesById(stageId))
  };
  // useEffect(() => {
  //   dispatch()
  // }, [selectStage]);

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

  // const handleSelectStage = (stage: any) => {
  //   console.log(stage);

  //   setselectStage(stage)
  // }

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
        <textarea placeholder="${stageDescription}" id="swal-text" class="swal2-textarea"></textarea>`,
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


  console.log(expandedIndex);


  return (
    <div className="project-container">
      <div className='cards-stage'>
        <div className='titleProject'>
          <h2>{actualProject.name}</h2>
          <h5 >Created: {actualProject.date}</h5>

        </div>
        <hr className='stage-divider' />
        {
          userRole == "Admin" ?
            <div className='div_btn'><button className='create-stage-button' onClick={handleCreateStage}>+ Add</button> </div> : <div className='div_btn'></div>}
        <p>Project stages</p>
        <hr className='stage-divider' />
        <div className="stage-container">
          {/* {stageSelected?.id== stageDeleted.id? "stage-card": "stage-nonselect-card" } */}
          {stagesProject.map((stage, index) => (
            <Accordion
              key={index}
              expanded={index === expandedIndex}
              onChange={() => handleSelectStage(index, stage.stage_id)}
              className="stage-card"
            >
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <Typography>{stage.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className='delete_edit'>
                  <MdEditSquare title='edit' onClick={() => handleEditStage(stage.stage_id, stage.name, stage.description)} className="edit-button"></MdEditSquare>
                  <MdDeleteForever title='delete' onClick={() => handleDeleteStage(stage.stage_id)} className="delete-button"></MdDeleteForever>
                </div>
                <div>
                  <h5>Description:</h5>
                  <p className='description'>{stage.description}</p>
                  <h6 className='assId'>AssistantID</h6>
                  <h6>{stage.assistant_id}</h6>
                </div>
              </AccordionDetails>
            </Accordion>
            // <div key={index} className={selectStage && stage.stage_id == selectStage.stage_id ? "stage-card" : "stage-nonselect-card"}>
            //   <div onClick={() => handleSelectStage(stage)} className='delete_edit'>
            //     <h4 >{stage.name}</h4>
            //     {
            //       userRole == "Admin" ? <div className='edit-delete'>
            //         <MdEditSquare title='edit' onClick={() => handleEditStage(stage.stage_id
            //           , stage.name, stage.description)} className="edit-button"></MdEditSquare>
            //         <MdDeleteForever title='delete' onClick={() => handleDeleteStage(stage.stage_id
            //         )} className="delete-button"></MdDeleteForever>
            //       </div> : <div></div>
            //     }

            //   </div>
            //   {/* <button >Edit</button>
            // <button >Delete</button> */}
            //   <hr className="stage-divider" />
            //   <h5>Description:</h5>
            //   <p>{stage.description}</p>
            //   <h6>AssintantID</h6>
            //   <p>{stage.assistant_id}</p>
            // </div>
          ))}
        </div>

      </div>
      <div className='connection-stage'>
        <Chat stage={stageSelected}/>
      </div>

    </div >
  );
};

export default Project;

