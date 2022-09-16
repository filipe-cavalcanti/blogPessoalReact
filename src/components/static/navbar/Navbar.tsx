import React from 'react'
import './Navbar.css'
import { Box } from '@mui/material'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { addToken } from '../../../store/tokens/actions'
import { toast } from 'react-toastify'

function Navbar() {

    let navigate = useNavigate()
    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    )
    const dispatch = useDispatch()

    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuário deslogado!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
            progress: undefined
        })
        navigate('/login')
    }

    let navbarComponet
    if (token !== '') {
        navbarComponet = <AppBar position='static' className='box'>
            <Toolbar variant='dense'>
                <Box className='cursor' >
                    <Typography variant='h5' color='inherit'>
                        BlogPessoal
                    </Typography>
                </Box>

                <Box display='flex' justifyContent='start'>
                    <Link to='/home' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                home
                            </Typography>
                        </Box>
                    </Link>
                    <Link to='/postagens' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                postagens
                            </Typography>
                        </Box>
                    </Link>
                    <Link to='/temas' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                temas
                            </Typography>
                        </Box>
                    </Link>
                    <Link to='/formularioTema' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                cadastrar tema
                            </Typography>
                        </Box>
                    </Link>
                    <Box mx={1} className='cursor' onClick={goLogout} >
                        <Typography variant='h6' color='inherit'>
                            logout
                        </Typography>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>
    }

    return (
        <>
            {navbarComponet}
        </>
    )
}

export default Navbar