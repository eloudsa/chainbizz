const chainBizzContract = artifacts.require('ChainBizz');

// test suite
contract('ChainBizz', async accounts => {
  let contractInstance;
  const idProject1 = 1;
  const titleProject1 = 'Project 1';
  const descriptionProject1 = 'Description for Project 1';
  const priceProject1 = 10000000000000000000;
  const newTitleProject1 = 'Project 1 - updated';
  const newDescriptionProject1 = 'Description for Project 1 - updated';
  const newPriceProject1 = 15000000000000000000;
  const idProject2 = 2;
  const titleProject2 = 'Project 2';
  const descriptionProject2 = 'Description for Project 2';
  const priceProject2 = 20000000000000000000;
  const ProjectStatus = {
    Draft: 0,
    Published: 1,
    OnGoing: 2,
    Completed: 3,
    Canceled: 4,
    Unknown: 5
  };
  const errorPublished = 'Cannot be published';

  before('setup contract for each test', async () => {
    contractInstance = await chainBizzContract.deployed();
  });

  it('should let us add a project', async () => {
    // add the project
    const receipt = await contractInstance.addProject(
      titleProject1,
      descriptionProject1,
      web3.utils.toBN(priceProject1),
      {
        from: accounts[1]
      }
    );

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'NewProject',
      'event name should be NewProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject1,
      'project id must be 1'
    );
    assert.equal(
      receipt.logs[0].args.owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      titleProject1,
      'project title must be ' + titleProject1
    );
    assert.equal(
      receipt.logs[0].args.price,
      priceProject1,
      'price must be ' + priceProject1
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

    // check that we have properly stored the project
    assert.equal(
      project['owner'],
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['provider']),
      0,
      'provider must be null'
    );
    assert.equal(
      project['title'],
      titleProject1,
      'project title must be ' + titleProject1
    );
    assert.equal(
      project['description'],
      descriptionProject1,
      'description must be ' + descriptionProject1
    );
    assert.equal(
      project['price'],
      priceProject1,
      'price must be ' + priceProject1
    );
    assert.equal(
      project['status'],
      ProjectStatus.Draft,
      'status must be ' + ProjectStatus.Draft
    );
  });

  it('should let us update a project', async () => {
    // update the project
    const receipt = await contractInstance.updateProject(
      idProject1,
      newTitleProject1,
      newDescriptionProject1,
      web3.utils.toBN(newPriceProject1),
      {
        from: accounts[1]
      }
    );

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'UpdateProject',
      'event name should be UpdateProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject1,
      'project id must be ' + idProject1
    );
    assert.equal(
      receipt.logs[0].args.owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      receipt.logs[0].args.price,
      newPriceProject1,
      'price must be ' + newPriceProject1
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

    // check that we have properly stored the project
    assert.equal(
      project['owner'],
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['provider']),
      0,
      'provider must be null'
    );
    assert.equal(
      project['title'],
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      project['description'],
      newDescriptionProject1,
      'description must be ' + newDescriptionProject1
    );
    assert.equal(
      project['price'],
      newPriceProject1,
      'price must be ' + newPriceProject1
    );
    assert.equal(
      project['status'],
      ProjectStatus.Draft,
      'status must be ' + ProjectStatus.Draft
    );
  });

  it('should let us publish a project', async () => {
    // publish the project
    const receipt = await contractInstance.publishProject(idProject1, {
      from: accounts[1]
    });

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'PublishedProject',
      'event name should be PublishedProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject1,
      'project id must be ' + idProject1
    );
    assert.equal(
      receipt.logs[0].args.owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      receipt.logs[0].args.price,
      newPriceProject1,
      'price must be ' + newPriceProject1
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject1);

    // check that we have properly stored the project
    assert.equal(
      project['owner'],
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['provider']),
      0,
      'provider must be null'
    );
    assert.equal(
      project['title'],
      newTitleProject1,
      'project title must be ' + newTitleProject1
    );
    assert.equal(
      project['description'],
      newDescriptionProject1,
      'description must be ' + newDescriptionProject1
    );
    assert.equal(
      project['price'],
      newPriceProject1,
      'price must be ' + newPriceProject1
    );
    assert.equal(
      project['status'],
      ProjectStatus.Published,
      'status must be ' + ProjectStatus.Published
    );
  });

  it('should let us add a second project', async () => {
    // add the second project
    const receipt = await contractInstance.addProject(
      titleProject2,
      descriptionProject2,
      web3.utils.toBN(priceProject2),
      {
        from: accounts[1]
      }
    );

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'NewProject',
      'event name should be NewProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject2,
      'project id must be ' + idProject2
    );
    assert.equal(
      receipt.logs[0].args.owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      titleProject2,
      'project title must be ' + titleProject2
    );
    assert.equal(
      receipt.logs[0].args.price,
      priceProject2,
      'price must be ' + priceProject2
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject2);

    // check that we have properly stored the project
    assert.equal(
      project['owner'],
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      web3.utils.toBN(project['provider']),
      0,
      'provider must be null'
    );
    assert.equal(
      project['title'],
      titleProject2,
      'project title must be ' + titleProject2
    );
    assert.equal(
      project['description'],
      descriptionProject2,
      'description must be ' + descriptionProject2
    );
    assert.equal(
      project['price'],
      priceProject2,
      'price must be ' + priceProject2
    );
    assert.equal(
      project['status'],
      ProjectStatus.Draft,
      'status must be ' + ProjectStatus.Draft
    );
  });

  it('should let us remove the second project', async () => {
    // add the second project
    const receipt = await contractInstance.removeProject(idProject2, {
      from: accounts[1]
    });

    // check that we have received an event
    assert.equal(receipt.logs.length, 1, 'should have received 1 event');
    assert.equal(
      receipt.logs[0].event,
      'RemoveProject',
      'event name should be RemoveProject'
    );
    assert.equal(
      receipt.logs[0].args.id.toNumber(),
      idProject2,
      'project id must be ' + idProject2
    );
    assert.equal(
      receipt.logs[0].args.owner,
      accounts[1],
      'customer must be ' + accounts[1]
    );
    assert.equal(
      receipt.logs[0].args.title,
      titleProject2,
      'project title must be ' + titleProject2
    );

    // retrieve the project from the contract
    const project = await contractInstance.getProject(idProject2);

    // check that the project has been properly removed
    assert.equal(
      web3.utils.toBN(project['owner']),
      0,
      'customer must be null'
    );
  });
});
