import React, { useState, useContext, useEffect } from 'react';

import { createBrowserHistory } from 'history';
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon';

import ProjectContext from '../../context/projects/projectContext';

import { projectStatus } from '../../ContractData/Project/ProjectStatus';

import './ProjectDetail.css';

const ProjectDetail = ({ match, drizzle, account }) => {
  let projectId = null;
  try {
    projectId = match.params.id;
  } catch (error) {
    // unable to process input argument
  }

  const goBack = () => {
    // go back to the previous page
    const history = createBrowserHistory();
    history.goBack();
  };

  if (projectId === null) {
    goBack();
  }

  const [project, setProject] = useState({
    id: null,
    title: '',
    description: '',
    price: 0
  });

  console.log('Before get project');
  const projectContext = useContext(ProjectContext);
  const { getProject, current } = projectContext;

  useEffect(() => {
    getProject(drizzle, account, projectId);
  }, []);

  useEffect(() => {
    if (current !== null) {
      // get the status
      const statusNames = Object.keys(projectStatus);

      // apply the current project with its status in plain english
      setProject({
        ...current,
        status: statusNames[current.status]
      });
    } else {
      setProject({
        title: '',
        description: '',
        price: 0
      });
    }
  }, [current]);

  return (
    <div>
      <div>
        <div className='col s12 m12'>
          <div className='single__header'>
            <a
              className='btn-flat waves-effect waves-light no-uppercase back-button'
              style={{ width: '150px' }}
              onClick={() => goBack()}
            >
              <i class='material-icons'>arrow_back</i>
              <span>Back</span>
            </a>
            <div className='row'>
              <div className='col s2'>
                <div className='single__meta'>
                  <span className='single__metaTitle'>Price</span>
                  <span className='single__metaValue'>{project.price} ETH</span>
                </div>
              </div>
              <div className='col s10'>
                <h1
                  style={{
                    fontSize: '24px',
                    margin: '0',
                    fontWeight: 'bold',
                    marginBottom: '10px'
                  }}
                >
                  <a href='#' style={{ color: '#676767' }}>
                    {project.title}
                  </a>
                </h1>
                <div>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                  <span
                    className='new badge'
                    style={{ float: 'inherit', margin: '0 5px 0 0' }}
                  >
                    text
                  </span>
                </div>
                <code className=' language-markup'>{project.status}</code>
              </div>
              {project && project.issuer && (
                <div>
                  <div className='col s5'>
                    <div style={{ marginTop: '20px' }} className='avatar'>
                      <span className='single__metaAddress'>Issuer</span>
                      <JazzIcon
                        diameter={40}
                        seed={jsNumberForAddress(project.issuer)}
                      />
                      <p
                        className='truncate'
                        style={{
                          position: 'relative',
                          top: '7px',
                          width: '130px',
                          paddingLeft: '10px'
                        }}
                      >
                        {project.issuer}
                      </p>
                    </div>
                  </div>
                  {project &&
                    drizzle.web3.utils.toBN(project.fulfiller).toString() !==
                      '0' && (
                      <div className='col s5'>
                        <div style={{ marginTop: '20px' }} className='avatar'>
                          <span className='single__metaAddress'>Fulfiller</span>
                          <JazzIcon
                            diameter={40}
                            seed={jsNumberForAddress(project.fulfiller)}
                          />
                          <p
                            className='truncate'
                            style={{
                              position: 'relative',
                              top: '7px',
                              width: '130px',
                              paddingLeft: '10px'
                            }}
                          >
                            {project.fulfiller}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='col s12 m12'>
          <div className='card card-custom'>
            <div className='card-content'>
              <div className='row'>
                <div className='single'>
                  <div className='single__content'>
                    <div className='row'>
                      <div className='col s9'>
                        <div>
                          <p>{project.description}</p>
                        </div>
                      </div>
                      <div className='col s3'>
                        <div className='project-additional'>
                          <ul style={{ margin: '-10px 0 0 0' }}>
                            <li style={{ fontWeight: '600' }}>
                              <i className='material-icons'>
                                perm_data_setting
                              </i>
                              Beginner <span>difficulty</span>
                            </li>
                            <li style={{ fontWeight: '600' }}>
                              <i className='material-icons'>history</i>5{' '}
                              <span>days remaining</span>
                            </li>
                            <li style={{ fontWeight: '600' }}>
                              <i className='material-icons'>thumb_up</i>0{' '}
                              <span>submissions</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
