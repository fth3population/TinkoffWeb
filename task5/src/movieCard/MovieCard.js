import {Button, Card, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Col, Container, Image, ListGroup, Row, Tab} from "react-bootstrap";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {Link, useNavigate, useParams} from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const MovieCard = () => {

    const param = useParams();
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState();
    const [movie, setMovie] = useState(
        {
            id: 0,
            title: '',
            year: '',
            runtime: '',
            genres: [],
            director: '',
            actors:'',
            plot: '',
            posterUrl: ''
        })

    useEffect(() => {
        fetchMovie()
            .then(data => setMovie(data))
            .catch(err => alert(err));
        fetсhFavorites()
            .then(data => setFavorite(data.id === param.id ? true: false))
            .catch(err => alert(err))
    }, [param.id])

    async function fetchMovie(){
        let data = [];
        try{
            data = await fetch(`http://localhost:3000/movies/${param.id}`, {
                method: 'GET',
            }).then(res => res.json());
        } catch (e) {
            alert(e);
        }
        return data;
    }

    async function fetсhFavorites(){
        let data = [];
        try{
            data = await fetch(`http://localhost:3000/favorites/${param.id}`, {
                method: 'GET',
            }).then(res => res.json());
        } catch (e) {
            alert(e);
        }
        return data;
    }

    async function deleteMovie(){
        await fetch(`http://localhost:3000/movies/${param.id}`,
            {
                method: 'DELETE',
            });
        navigate('/');
    }

    async function addToFavorite(){
        setFavorite(true);
        await fetch(
            'http://localhost:3000/favorites',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({id: param.id})
            }
        )
    }

    async function deleteFromFavorite(){
        setFavorite(false);
        await fetch(`http://localhost:3000/favorites/${param.id}`,
            {
                method: 'DELETE',
            });
    }

    function getCard(){
            return <Container key={movie.id} fluid className="mt-3" >
                <Row style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <Typography variant="h7" align="center">id: {movie.id}</Typography>
                        <IconButton onClick={() =>  navigator.clipboard.writeText(param.id)}>
                            <ContentCopyIcon sx={{color: "black"}} />
                        </IconButton>
                    </div>
                    <div>
                        <Link to={`/movies/edit/${movie.id}`} style={{textDecoration: 'none'}}>
                            <Button variant="contained" style={{borderRadius:10}} startIcon={<ModeEditOutlinedIcon/>}>Редактировать</Button>
                        </Link>
                        <Button color="error" onClick={deleteMovie} className="ml-3" variant="contained" style={{borderRadius:10}} startIcon={<DeleteOutlineIcon/>}>Удалить</Button>
                    </div>
                </Row>
                <Row className="mt-5" style={{justifyContent: "space-around"}}>
                    <Image width="300px" src={movie.posterUrl}></Image>
                    <Col>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <Typography className="ml-3" variant="h4">{movie.title}</Typography>
                            {favorite === true ?
                                <IconButton onClick={deleteFromFavorite}>
                                    <StarIcon sx={{color: "orange"}} />
                                </IconButton> :
                                <IconButton onClick={addToFavorite}>
                                    <StarOutlineIcon sx={{color: "orange"}} />
                                </IconButton>
                            }
                        </div>
                        <Typography className="ml-3" variant="h8">{movie.director}</Typography>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div className="mt-3 ml-3" style={{display: "flex", flexDirection: "column", minWidth: "15vw"}}>
                                <Typography variant="h6">Параметры:</Typography>
                                <Row className="mt-2 ml-1" style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                }}>
                                    <Typography variant="h8">Год производства:</Typography>
                                    <Typography variant="h8">{movie.year}</Typography>
                                </Row>
                                <Row className="mt-2 ml-1" style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                }}>
                                    <Typography variant="h8">Жанры:</Typography>
                                    <Typography variant="h8">{movie.genres.join(', ')}</Typography>
                                </Row>
                                <Row className="mt-2 ml-1" style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row"
                                }}>
                                    <Typography variant="h8">Длительность:</Typography>
                                    <Typography variant="h8">{movie.runtime} min</Typography>
                                </Row>
                            </div>
                            <div className="mt-3 mr-5" style={{display: "flex", flexDirection: "column"}}>
                                <Typography variant="h6">В главных ролях:</Typography>
                                {movie.actors.split(',').map(name => {
                                    return <Typography variant="h8">{name}</Typography>
                                })}
                            </div>
                        </div>

                    </Col>
                </Row>
                <Typography className="mt-4" variant="h4">Описание</Typography>
                <Typography className="mt-4" variant="h7">{movie.plot}</Typography>
                <Typography className="mt-4" variant="h4">Рейтинг:</Typography>
            </Container>
    }

    return <div>
        {getCard()}
    </div>
}

export default MovieCard;