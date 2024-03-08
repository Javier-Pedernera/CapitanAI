import { useEffect, useState } from 'react';
import '../../scss/components/projectRun.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { getStagesById, getStagesbyProjectId } from '../../Redux/Actions/StagesGet';
import { useParams } from 'react-router-dom';
import CreateStage from '../../components/Models/CreateStage';
import { getProjectActual } from '../../Redux/Actions/ProjectsGet';
import ProjectModel from '../../components/Models/Project';
import Chat from '../../components/Chat/Chat';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IoIosArrowDown } from "react-icons/io";
// import User from '../../components/Models/User';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

const ProjectRun = () => {

  // const userActive: User = useAppSelector((state: any) => state.user);
  const stagesProject: CreateStage[] = useAppSelector((state: any) => state.stages.stagesProyect);
  const actualProject: ProjectModel = useAppSelector((state: any) => state.projects.projectActual);
  const stageSelected: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [selectStage, setselectStage] = useState<Stage | null>(null);
  const [isStageListVisible, setIsStageListVisible] = useState(true);


  // console.log("actualProyect", actualProject);
  // console.log("stages del proyecto actual", stagesProject);
  // console.log("stage seleccionada", stageSelected);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);



  const dispatch = useAppDispatch()
  const { projectId } = useParams();
  console.log(stagesProject);
  console.log(actualProject);

  // useEffect(() => {
  //   if (stageSelected.)
  // }, []);


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

  const handleToggleStageList = () => {
    setIsStageListVisible(!isStageListVisible);
  };

  // const handleDeleteStage = (stageID: string) => {
  //   Swal.fire({
  //     heightAuto: false,
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log("dentro del delete", projectId, stageID);

  //       dispatch(stageDeleted(projectId ? projectId : "", stageID ? stageID : ""))

  //         .then((result: any) => {
  //           // console.log("result de delete", result)
  //           if (result == "Stage deleted") {
  //             dispatch(getStagesbyProjectId(projectId ? projectId : ""))

  //             Swal.fire({
  //               heightAuto: false,
  //               title: "Deleted!",
  //               text: "Your stage has been deleted.",
  //               icon: "success"
  //             });
  //           } else {
  //             Swal.fire({
  //               heightAuto: false,
  //               icon: "error",
  //               title: "Oops...",
  //               text: "Something went wrong!",
  //               footer: '<a href="#">Try again...</a>'
  //             });
  //           }

  //         })
  //     }
  //   });
  // };
  // const handleEditStage = (stageID: string, stageName: string, stageDescription: string) => {
  //   // console.log(stageName, stageDescription);
  //   Swal.fire({
  //     heightAuto: false,
  //     title: 'Edit Stage',
  //     html: `<input placeholder="${stageName}" id="swal-input1" class="swal2-input">
  //       <textarea placeholder="${stageDescription}" id="swal-text" class="swal2-textarea"></textarea>`,
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       const name = (document.getElementById('swal-input1') as HTMLInputElement)?.value.length ? (document.getElementById('swal-input1') as HTMLInputElement)?.value : stageName;
  //       const description = (document.getElementById('swal-text') as HTMLInputElement)?.value.length ? (document.getElementById('swal-text') as HTMLInputElement)?.value : stageDescription;
  //       return { name, description };
  //     }
  //   }).then((result: any) => {
  //     if (result.isConfirmed && result.value) {
  //       console.log(result);

  //       const { name, description } = result.value;
  //       dispatch(editStage(stageID ? stageID : "", { name: name, description: description }))
  //         .then((resultRes) => {
  //           console.log("resultRes . status", resultRes?.status);
  //           if (resultRes?.status == 200) {
  //             dispatch(getStagesbyProjectId(projectId ? projectId : ""))
  //             Toast.fire({
  //               title: `Stage ${name} edited successfully!`,
  //               icon: 'success'
  //             });
  //           }
  //           // let name = resultRes?.data.name
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             heightAuto: false,
  //             title: 'Error',
  //             text: 'Failed to create stage!',
  //             icon: 'error'
  //           });
  //           console.error('Error Editing stage:', error);
  //         });
  //     }
  //   });
  // };


  console.log(expandedIndex);


  return (
    <div className="project-container">
      {isStageListVisible ? <>
        <div className='cards-stage'>
          <div className='titleProject'>
            <h2>{actualProject.name}</h2>
            <h5 >Created: {actualProject.date}</h5>

          </div>
          <hr className='stage-divider' />
          {/* {
            userRole == "Admin" ?
              <div className='div_btn'><button className='create-stage-button' onClick={handleCreateStage}>+ Add</button> </div> : <div className='div_btn'></div>} */}
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
                  {/* <div className='delete_edit'>
                    <MdEditSquare title='edit' onClick={() => handleEditStage(stage.stage_id, stage.name, stage.description)} className="edit-button"></MdEditSquare>
                    <MdDeleteForever title='delete' onClick={() => handleDeleteStage(stage.stage_id)} className="delete-button"></MdDeleteForever>
                  </div> */}
                  <div>
                    <h5>Description:</h5>
                    <p className='description'>{stage.description}</p>
                    <h6 className='assId'>AssistantID</h6>
                    <h6>{stage.assistant_id}</h6>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

        </div><div className='arrow_div' onClick={handleToggleStageList}> <FaCircleArrowLeft className='arrow_stages' /></div> </> : <div className='arrow_div2' onClick={handleToggleStageList}> <FaCircleArrowRight className='arrow_stages' /></div>}
      <div className='connection-stage'>
        <Chat stage={stageSelected} />
      </div>

    </div >
  );
};

export default ProjectRun;

