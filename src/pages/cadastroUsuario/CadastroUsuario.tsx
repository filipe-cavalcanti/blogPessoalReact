import React, { ChangeEvent, useEffect, useState } from 'react'
import './CadastroUsuario.css'
import { Box } from '@mui/material'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { cadastroUsuario } from '../../services/Service'
import User from '../../models/User'
import { toast } from 'react-toastify'

function CadastroUsuario() {

  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<String>('')
  const [user, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [userResult, setUserResult] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (userResult.id !== 0) {
      navigate('/login')
    }
  }, [userResult])


  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }


  function updatedModel(e: ChangeEvent<HTMLInputElement>) {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmarSenha == user.senha && user.senha.length >= 8) {
      cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
      toast.success('Usuário cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        progress: undefined
      })
    } else {
      alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
      toast.error('Erro ao cadastrar, verifique as informações de cadastro!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
        progress: undefined
    })
      setUser({ ...user, senha: '' })
      setConfirmarSenha('')
    }
  }

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={6} className='imagemCadastroUsuario'></Grid>
      <Grid item xs={6} alignItems='center'>
        <Box>
          <form onSubmit={onSubmit}>
            <Typography variant='h3' gutterBottom color={'textPrimary'} component='h3' align='center' className='textosCadastroUsuario'>Cadastrar</Typography>
            <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='nome' variant='outlined' name='nome' margin='normal' fullWidth />
            <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='e-mail' variant='outlined' name='usuario' margin='normal' fullWidth type='email' />
            <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' fullWidth type='password' />
            <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='confirmarSenha' variant='outlined' name='confirmarSenha' margin='normal' fullWidth type='password' />
            <TextField value={user.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='foto' label='url da foto' variant='outlined' name='foto' margin='normal' fullWidth type='url' />
            <Box marginTop={2} textAlign='center'>
              <Link to='/login' className='text-decorator-none'>
                <Button variant='contained' className='botaoCancelar'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' variant='contained' className='text-decorator-none'>
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CadastroUsuario