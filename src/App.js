import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {

      title: `super duper project2 ${Date.now()}`,
      techs: ['this tech', 'that tech'],
      url: 'https://github.com/lucianoluz/desafio_node_js',
    };
    const response = await api.post('/repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);
    const pos = repositories.findIndex((repo) => repo.id === id);
    repositories.splice(pos, 1);
    setRepositories([...repositories]);
    console.log(repositories);
  }

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>

      <ul data-testid="repository-list">

        {
  repositories.map((repo) => (

    <li key={repo.id}>
      {repo.title}
      <button key={repo.id} type="button" onClick={() => handleRemoveRepository(repo.id)}>
        Remover
      </button>
    </li>


  ))
}

      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>

    </>
  );
}

export default App;
