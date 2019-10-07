import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContractData from '../ContractData/Project/ProjectContractData';

const MyProjects = ({ drizzle, drizzleState }) => {
  const [dataKeys, setDataKeys] = useState(null);

  useEffect(() => {
    const { ChainBizz } = drizzle.contracts;
    setDataKeys(
      ChainBizz.methods.getMyProjects.cacheCall({
        from: drizzleState.accounts[0]
      })
    );

    //eslint-disable-next-line
  }, []);

  // Retrieve all projects IDs linked to the current owner

  // prepare projects cards
  console.log('Data key: ' + dataKeys);
  let allProjects = [];
  let projectIds = null;
  if (dataKeys !== null) {
    if (
      drizzleState.contracts.ChainBizz.getMyProjects[dataKeys] &&
      drizzleState.contracts.ChainBizz.getMyProjects[dataKeys].value
    ) {
      projectIds =
        drizzleState.contracts.ChainBizz.getMyProjects[dataKeys].value;
    }

    // no certifications
    if (projectIds !== null) {
      for (let i = 0; i < projectIds.length; i++) {
        const projectId = projectIds[i];

        console.log('Project Id: ' + projectId);

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

  return (
    <div>
      <div className='row'>{allProjects}</div>
    </div>
  );
};

export default MyProjects;
