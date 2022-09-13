import React, { useEffect, useState } from 'react'
import './ListaTema.css'
import { Box } from '@mui/material'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import Tema from '../../../models/Tema'
import { busca } from '../../../services/Service'
import { useSelector } from 'react-redux'
import { TokenState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'

function ListaTema() {

    let navigate = useNavigate()
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    )

    useEffect(() => {
        if (token === '') {
            toast.error('Você precisa estar logado!', {
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
    }, [token])

    async function getTema() {
        await busca('/temas', setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getTema()
    }, [temas.length])

    return (
        <>
            {
                temas.map(tema => (
                    <Box m={2} key={tema.id}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>
                                    Tema
                                </Typography>
                                <Typography variant='h5' component='h2'>
                                    {tema.descricao}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display='flex' justifyContent='center' mb={1.5} >

                                    <Link to={`/formularioTema/${tema.id}`} className='text-decorator-none'>
                                        <Box mx={1}>
                                            <Button variant='contained' className='marginLeft' size='small' color='primary' >
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to={`/deletarTema/${tema.id}`} className='text-decorator-none'>
                                        <Box mx={1}>
                                            <Button variant='contained' size='small' color='secondary'>
                                                deletar
                                            </Button>
                                        </Box>
                                    </Link>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))
            }
        </>
    );
}

export default ListaTema