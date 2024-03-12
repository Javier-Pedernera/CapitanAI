import { useEffect, useState } from 'react';
import '../../scss/components/projectRun.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/Store/hooks';
import { getStagesById, getStagesbyProjectId, selectProyect_StageByIds } from '../../Redux/Actions/StagesGet';
import { useNavigate, useParams } from 'react-router-dom';
import CreateStage from '../../Models/CreateStage';
import { getProjectActual } from '../../Redux/Actions/ProjectsGet';
import ProjectModel from '../../Models/Project';
import Chat from '../../components/Chat/Chat';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IoIosArrowDown, IoMdArrowRoundBack } from "react-icons/io";
import User from '../../Models/User';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import { cleanChat, createNewThread, getThreadInfo } from '../../Redux/Actions/MessageGet';

const ProjectRun = () => {

  const userActive: User = useAppSelector((state: any) => state.user).userData;
  const stagesProject: CreateStage[] = useAppSelector((state: any) => state.stages.stagesProyect);
  const actualProject: ProjectModel = useAppSelector((state: any) => state.projects.projectActual);
  // const stageSelected: any = useAppSelector((state: any) => state.stages.stageSelected);
  // const [selectStage, setselectStage] = useState<Stage | null>(null);
  const [isStageListVisible, setIsStageListVisible] = useState(true);
  // console.log("userActive", userActive);
  // console.log("actualProyect", actualProject);
  // console.log("stages del proyecto actual", stagesProject);
  // console.log("stage seleccionada", stageSelected);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(cleanChat())
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

  const handleSelectStage = async (index: number, stageId: string) => {
    setExpandedIndex(index === expandedIndex ? null : index);
    dispatch(getStagesById(stageId))
    if (projectId) {
      const response_thread = await dispatch(getThreadInfo(projectId, stageId))
      if (response_thread?.data == "The project stage combination does not have an associated thread") {
        const datathread = {
          "stage_id": stageId,
          "project_id": projectId,
          "user_public_id": userActive.id
        }
        return dispatch(createNewThread(datathread))
      }
      dispatch(selectProyect_StageByIds(projectId, stageId))
    }

  };
  const handleToggleStageList = () => {
    setIsStageListVisible(!isStageListVisible);
  };
  const handleBack = () => {
    navigate(`/dashboard`);
  };

  return (
    <div className="project-container">
      <div className='containerArrow_stages'>
        <div className="backArrowRun" >
          <IoMdArrowRoundBack onClick={handleBack} />
          <h6>back</h6>
        </div>
        {isStageListVisible ? <div className='cardsStage_arrowClose'>
          <div className='cards-stage'>

            <div className='titleProject'>
              <h2>{actualProject.name}</h2>
              <h5 >Created: {actualProject.date}</h5>

            </div>
            <hr className='stage-divider' />
            <p>Project stages</p>
            <hr className='stage-divider' />
            <div className="stage-container">
              {/* {stageSelected?.id== stageDeleted.id? "stage-card": "stage-nonselect-card" } */}
              {stagesProject?.map((stage, index) => (
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
          </div><div className='arrow_div' onClick={handleToggleStageList}> <FaCircleArrowLeft className='arrow_stages' /></div> </div> : <div className='arrow_div2' onClick={handleToggleStageList}> <FaCircleArrowRight className='arrow_stages' /></div>}
      </div>

      <div className= {isStageListVisible? 'connection_stage' : 'connection_stage_full'}>
        <Chat />
      </div>

    </div >
  );
};

export default ProjectRun;

