import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';
import foto from '../../assets/images/images.jpg'

type FormData = {
  cep: string;
};

type Address = {
  avatar_url: string;
  html_url: string;
  followers: string;
  location: string;
  name: string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();
  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://api.github.com/users/${formData.cep}`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  
  return (
    <div>
    <div className="before-content">
      
      <h1 className="title-search">Encontre um perfil Github</h1>
      
        <form onSubmit={handleSubmit}>
          
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <div>

            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
            </div>
    
        </form>
        </div>
      
      
      {address && (
          <>
            <div className="information-result">
            <div className="photo-container">
            <img src={address.avatar_url} alt="Foto" width="247" height="247"/>
            </div>
            <div className="information-card">
            <h6>Informações</h6>
            <ResultCard title="Perfil: " description={address.html_url} />
            <ResultCard title="Seguidores: " description={address.followers} />
            <ResultCard title="Localidade: " description={address.location} />
            <ResultCard title="Nome: " description={address.name} />
            </div>
            </div>
          </>
        )}
      </div>

 
  );
};

export default CepSearch;
