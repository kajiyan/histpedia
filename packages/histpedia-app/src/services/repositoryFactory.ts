import WikiRepository from './wikiRepository';

const repositories = {
  wiki: {
    ...WikiRepository,
  },
};

export default {
  get: (name: keyof typeof repositories): typeof repositories.wiki => {
    return repositories[name];
  },
};
