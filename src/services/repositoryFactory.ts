import WikiRepository from './wikiRepository';

const repositories = {
  wiki: {
    ...WikiRepository
  }
};

export default {
  get: (name: keyof typeof repositories) => {
    return repositories[name];
  }
};
