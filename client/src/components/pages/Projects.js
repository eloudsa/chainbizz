import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../Project/Modal/ProjectModal';
import ProjectContractData from '../ContractData/Project/ProjectContractData';

const Projects = ({ drizzle, drizzleState, initialized }) => {
  const projectContect = useContext(ProjectContext);
  const { addProject } = projectContect;

  const [account, setAccount] = useState('');
  const [dataKeys, setDataKeys] = useState(null);

  const [modalProjectOpen, setModalProjectOpen] = useState(false);
  const [actionProject1, setActionProject1] = useState({
    title: '',
    visible: false,
    handle: null
  });
  const [actionProject2, setActionProject2] = useState({
    title: '',
    visible: false,
    handle: null
  });

  useEffect(() => {
    if (initialized) {
      const { ChainBizz } = drizzle.contracts;
      console.log('222');
      console.log('contact; ' + drizzleState.accounts[0]);
      setDataKeys(
        ChainBizz.methods.getAllProjects.cacheCall({
          from: drizzleState.accounts[0]
        })
      );
      console.log('Data keys: ' + dataKeys);
    }

    //eslint-disable-next-line
  }, [initialized]);

  const handleNewProject = id => {
    setModalProjectOpen(true);
    setActionProject1({
      title: 'Save',
      visible: true,
      add: function(project) {
        console.log('Add ');
        console.log(project);

        setModalProjectOpen(false);
        console.log(drizzle);
        console.log(drizzleState);

        addProject(drizzle, drizzleState, project);
      },
      update: function(project) {
        console.log('Update ' + id);
        setModalProjectOpen(false);
        //updateProject(project);
      }
    });

    setActionProject2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
      }
    });
  };

  // Retrieve all projects IDs linked to the current owner

  // prepare projects cards
  let allProjects = [];
  let projectIds = null;
  console.log('111');
  if (initialized === true && dataKeys !== null) {
    console.log(drizzleState);
    console.log('Data keys: ' + dataKeys);

    if (initialized === true) {
      console.log('444');
      console.log(drizzleState.contracts.ChainBizz);
      if (
        drizzleState.contracts.ChainBizz.getAllProjects[dataKeys] &&
        drizzleState.contracts.ChainBizz.getAllProjects[dataKeys].value
      ) {
        projectIds =
          drizzleState.contracts.ChainBizz.getAllProjects[dataKeys].value;
        console.log('ProjectId: ' + projectIds);
      }

      // no certifications
      if (projectIds !== null) {
        for (let i = 0; i < projectIds.length; i++) {
          const projectId = projectIds[i];
          console.log('Id: ' + projectId);

          const projectDetail = (
            <ProjectContractData
              drizzle={drizzle}
              drizzleState={drizzleState}
              projectId={projectId}
              key={projectId}
            />
          );

          allProjects.push(projectDetail);
        }
      }
    }
  }

  console.log(allProjects);

  return (
    <div className='container'>
      <div className='right-align new-project'>
        <a
          className='waves-effect waves-light btn blue-grey'
          onClick={() => handleNewProject(null)}
        >
          <i className='material-icons left'>add</i>New
        </a>
      </div>

      {modalProjectOpen && (
        <ProjectModal
          dataID={1}
          onClose={() => setModalProjectOpen(false)}
          action1={actionProject1}
          action2={actionProject2}
        />
      )}

      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default Projects;
