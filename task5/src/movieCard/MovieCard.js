import {Button, Card, CardHeader, CardMedia, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Col, Container, Image, ListGroup, Row, Tab} from "react-bootstrap";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {Link, useParams} from "react-router-dom";


const MovieCard = () => {

    const param = useParams();
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

    function getCard(){
            return <Container key={movie.id} fluid className="mt-3" >
                <Row style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography>id: {movie.id}</Typography>
                    <Link to={`/movies/edit/${movie.id}`} style={{textDecoration: 'none'}}>
                    <Button variant="contained" style={{borderRadius:10}} startIcon={<ModeEditOutlinedIcon/>}>Редактировать</Button>
                    </Link>
                </Row>
                <Row className="mt-5" style={{justifyContent: "space-around"}}>
                    <Image src={movie.posterUrl}></Image>
                    <Col>
                        <Typography className="ml-3" variant="h4">{movie.title}</Typography>
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
            </Container>
    }

    return <div>
        {getCard()}
    </div>
}

export default MovieCard;