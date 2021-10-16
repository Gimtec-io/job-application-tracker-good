// faker is DA BEST
const faker = require('faker');
const fs = require('fs');
const path = require('path');

// Population variables
const applicationsCount = 5;
const commentsCountPerApplication = 5;
const defaultStatuses = ['waiting first response', 'technical call', 'onsite', 'take home project']

const createApplication = (statusId) => ({
  company: faker.company.companyName(),
  position: faker.name.jobTitle(),
  link: faker.internet.url(),
  statusId: statusId,
  description: faker.lorem.paragraph(),
  createdAt: faker.date.recent(),
  id: faker.datatype.uuid(),
});

const createComment = (applicationId) => ({
  content: faker.lorem.paragraph(),
  id: faker.datatype.uuid(),
  applicationId,
  createdAt: faker.date.recent(),
});

const createStatus = (statusName) => ({
  id: faker.datatype.uuid(),
  content: statusName,
});

const createStatuses = () => {
  return defaultStatuses.map(createStatus);
};

const createApplications = (statuses) => {
  // trick to avoid a loop
  return new Array(applicationsCount).fill(0).map(() => {
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
    const randomStatus = statuses[randomStatusIndex];
    return createApplication(randomStatus.id);
  });
};

const createComments = (applications) => {
  return applications.reduce((currentComments, { id }) => {
    let comments = currentComments.concat(new Array(commentsCountPerApplication).fill(0).map(() => createComment(id)));
    return comments;
  }, []);
};

const createData = () => {
  const statuses = createStatuses();
  const applications = createApplications(statuses);
  const comments = createComments(applications);
  return {
    statuses,
    applications,
    comments,
  };
};

const writeFile = (data, filename) => {
  fs.writeFileSync(filename, JSON.stringify(data));
}

// `populate` resets the DB to the populated data only
// removes all current data
const populate = () => {
  const data = createData();
  // The '.' at the beginning is important for `fs.writeFileSync`
  writeFile(data, './src/libraries/db/data.json');
};

populate();
