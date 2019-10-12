import React, { useState, useEffect, useContext } from 'react';

import 'materialize-css/dist/css/materialize.min.css';

import ProjectContext from '../context/projects/projectContext';
import ProjectModal from '../dialog/modal/project/ProjectModal';
import ConfirmModal from '../dialog/modal/confirm/ConfirmModal';

const Project = ({ drizzle, drizzleState }) => {
  const projectContext = useContext(ProjectContext);
  const {
    addProject,
    updateProject,
    removeProject,
    publishProject,
    unpublishProject,
    showEdit,
    showRemove,
    showPublish,
    showUnpublish,
    submitOffer,
    cancelOffer,
    acceptProposal,
    rejectProposal,
    showSubmitOffer,
    showCancelOffer,
    showAcceptProposal,
    showRejectProposal,
    deliverProject,
    cancelServices,
    acceptDelivery,
    rejectDelivery,
    cancelContract,
    showDeliverProject,
    showCancelServices,
    showAcceptDelivery,
    showRejectDelivery,
    showCancelContract,
    clearCurrrentSelection,
    getProject,
    onCancelModal,
    projectId
  } = projectContext;

  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const [modalProjectOpen, setModalProjectOpen] = useState(false);

  const [modalTitle, setModalTitle] = useState(null);
  const [modalDescription, setModalDescription] = useState(null);

  const [action1, setAction1] = useState({
    title: '',
    visible: false,
    handle: null
  });
  const [action2, setAction2] = useState({
    title: '',
    visible: false,
    handle: null
  });
  const [dataID, setDataID] = useState(null);

  const handleNewProject = () => {
    setDataID(null);
    clearCurrrentSelection();
    setModalProjectOpen(true);
    setAction1({
      title: 'Save',
      visible: true,
      add: function(project) {
        setModalProjectOpen(false);
        addProject(drizzle, drizzleState, project);
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
        onCancelModal();
      }
    });
  };

  const handleEditProject = id => {
    setDataID(id);
    clearCurrrentSelection();
    if (id !== null) {
      getProject(drizzle, drizzleState, id);
    } else {
      // todo display error notification message
      return;
    }

    setModalProjectOpen(true);
    setAction1({
      title: 'Save',
      visible: true,
      update: function(project) {
        setModalProjectOpen(false);
        updateProject(drizzle, drizzleState, id, project);
      }
    });

    setAction2({
      title: 'Cancel',
      visible: true,
      handle: function() {
        setModalProjectOpen(false);
        onCancelModal();
      }
    });
  };

  const handleRemove = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Remove Project');
    setModalDescription('Are you sure to remove this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        removeProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handlePublish = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Publish Project');
    setModalDescription('Are you sure to publish this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        publishProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleUnpublish = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Unpublish Project');
    setModalDescription('Are you sure to unpublish this project?');

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        unpublishProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleSubmitOffer = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Offer your services');
    setModalDescription(
      'Are you sure to offer your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        submitOffer(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleCancelOffer = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel your services');
    setModalDescription(
      'Are you sure to cancel the offer of your services for this project?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelOffer(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleAcceptProposal = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Accept the proposal');
    setModalDescription(
      'Are you sure to accept the proposal made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        acceptProposal(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleRejectProposal = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Reject the proposal');
    setModalDescription(
      'Are you sure to reject the proposal made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        rejectProposal(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleDeliverProject = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Deliver the project');
    setModalDescription(
      'Are you sure to delivery the project to the customer?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        deliverProject(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleCancelServices = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel services');
    setModalDescription(
      'Are you sure to cancel the services you offered to the customer?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelServices(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleAcceptDelivery = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Accept Delivery');
    setModalDescription(
      'Are you sure to accept the delivery from the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        acceptDelivery(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleRejectDelivery = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Reject Delivery');
    setModalDescription(
      'Are you sure to reject the delivery made by the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        rejectDelivery(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  const handleCancelContract = id => {
    setDataID(id);
    setModalConfirmationOpen(true);

    setModalTitle('Cancel contract');
    setModalDescription(
      'Are you sure to cancel the contract with the provider?'
    );

    setAction1({
      title: 'Yes',
      visible: true,
      handle: function(id) {
        setModalConfirmationOpen(false);
        cancelContract(drizzle, drizzleState, id);
      }
    });

    setAction2({
      title: 'No',
      visible: true,
      handle: function() {
        setModalConfirmationOpen(false);
        onCancelModal();
      }
    });
  };

  useEffect(() => {
    if (projectId !== null) {
      if (showEdit === true) {
        handleEditProject(projectId);
      } else if (showRemove === true) {
        handleRemove(projectId);
      } else if (showPublish === true) {
        handlePublish(projectId);
      } else if (showUnpublish === true) {
        handleUnpublish(projectId);
      } else if (showSubmitOffer === true) {
        handleSubmitOffer(projectId);
      } else if (showCancelOffer === true) {
        handleCancelOffer(projectId);
      } else if (showAcceptProposal === true) {
        handleAcceptProposal(projectId);
      } else if (showRejectProposal === true) {
        handleRejectProposal(projectId);
      } else if (showDeliverProject === true) {
        handleDeliverProject(projectId);
      } else if (showCancelServices === true) {
        handleCancelServices(projectId);
      } else if (showAcceptDelivery === true) {
        handleAcceptDelivery(projectId);
      } else if (showRejectDelivery === true) {
        handleRejectDelivery(projectId);
      } else if (showCancelContract === true) {
        handleCancelContract(projectId);
      }
    }
    //eslint-disable-next-line
  }, [
    projectId,
    showEdit,
    showRemove,
    showPublish,
    showUnpublish,
    showSubmitOffer,
    showCancelOffer,
    showAcceptProposal,
    showRejectProposal,
    showDeliveryProject,
    showCancelServices,
    showAcceptDelivery,
    showRejectDelivery,
    showCancelContract
  ]);

  return (
    <div>
      <div className='row container'>
        <div className='col s12 m4'>
          <a
            className='waves-effect waves-light btn blue-grey lighten-1'
            onClick={() => handleNewProject()}
          >
            <i className='material-icons left'>add</i>New
          </a>
        </div>
      </div>

      {modalConfirmationOpen && (
        <ConfirmModal
          title={modalTitle}
          content={modalDescription}
          dataID={dataID}
          onClose={() => setModalConfirmationOpen(false)}
          action1={action1}
          action2={action2}
        />
      )}

      {modalProjectOpen && (
        <ProjectModal
          dataID={dataID}
          onClose={() => setModalProjectOpen(false)}
          action1={action1}
          action2={action2}
        />
      )}
    </div>
  );
};

export default Project;
