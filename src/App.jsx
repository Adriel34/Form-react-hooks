import React from 'react';
import axios from 'axios';
import './App.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import Formlogo from './assets/imagem-logo.png';

const schema = yup.object({
  name: yup.string().required('O nome é obrigatorio'),
  email: yup.string().email().required('O email é obrigatorio'),
  password: yup.string().min(6, 'a senha precisa ter 6 digitos').required('a senha é obrigatorio'),
  confirmPassword: yup.string().required('confirmação de senha é obrigatorio').oneOf([yup.ref('password')]),
}).required();

function App() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log(watch('name'));

  function onSubmit(userData) {
    axios.post('https://jsonplaceholder.typicode.com/posts', userData)
      .then(() => {
        console.log('deu certo');
      }).catch(() => {
        console.log('deu errado');
      });
  }

  // eslint-disable-next-line no-console
  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img src={Formlogo} alt="imagem-logo" />
      <label>
        Nome
        <input type="text" {...register('name', { required: true })} />
        <span>{errors.name?.message}</span>
      </label>

      <label>
        Email
        <input type="text" {...register('email')} />
        <span>{errors.email?.message}</span>
      </label>

      <label>
        Senha
        <input type="password" {...register('password')} />
        <span>{errors.password?.message}</span>
      </label>

      <label>
        Repetir senha
        <input type="password" {...register('confirmPassword')} />
        <span>{errors.confirmPassword?.message}</span>
      </label>

      <button type="submit">Cadastre-se</button>
    </form>
  );
}

export default App;
