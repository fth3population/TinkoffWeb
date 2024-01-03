import {Button, Card, CardHeader, CardMedia, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Col, Container, Image, ListGroup, Row, Tab} from "react-bootstrap";
import {AddCircleOutlineOutlined} from "@mui/icons-material";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';


const MovieCard = () => {

    const [movies, setMovies] = useState([])

    async function fetchMovies(){
        let data = [];
        try{
            data = await fetch('http://localhost:3000/movies', {
                method: 'GET',
            }).then(res => res.json());
        } catch (e) {
            alert(e);
        }
        console.log(data)
        return data;
    }

    function getCards(){
        return movies.map(({id, title, year, runtime, genres, director, actors, plot, posterUrl}) => {
            return <Tab.Pane eventKey={`${id}`}>
                <Container fluid className="mt-3" >
                    <Row style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography>id: {id}</Typography>
                        <Button variant="contained" style={{borderRadius:10}} startIcon={<ModeEditOutlinedIcon/>}>Редактировать</Button>
                    </Row>
                    <Row className="mt-5" style={{justifyContent: "space-around"}}>
                        <Image src={posterUrl}></Image>
                        <Col>
                            <Typography className="ml-3" variant="h4">{title}</Typography>
                            <Typography className="ml-3" variant="h8">{director}</Typography>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <div className="mt-3 ml-3" style={{display: "flex", flexDirection: "column", minWidth: "15vw"}}>
                                    <Typography variant="h6">Параметры:</Typography>
                                    <Row className="mt-2 ml-1" style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row"
                                    }}>
                                        <Typography variant="h8">Год производства:</Typography>
                                        <Typography variant="h8">{year}</Typography>
                                    </Row>
                                    <Row className="mt-2 ml-1" style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row"
                                    }}>
                                        <Typography variant="h8">Жанры:</Typography>
                                        <Typography variant="h8">{genres.join(', ')}</Typography>
                                    </Row>
                                    <Row className="mt-2 ml-1" style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "row"
                                    }}>
                                        <Typography variant="h8">Длительность:</Typography>
                                        <Typography variant="h8">{runtime} min</Typography>
                                    </Row>
                                </div>
                                <div className="mt-3 mr-5" style={{display: "flex", flexDirection: "column"}}>
                                    <Typography variant="h6">В главных ролях:</Typography>
                                    {actors.split(',').map(name => {
                                        return <Typography variant="h8">{name}</Typography>
                                    })}
                                </div>
                            </div>

                        </Col>
                    </Row>
                    <Typography className="mt-4" variant="h4">Описание</Typography>
                    <Typography className="mt-4" variant="h7">{plot}</Typography>
                </Container>
            </Tab.Pane>
        })
    }

    useEffect(() => {
        fetchMovies()
            .then(data => setMovies(data))
            .catch(err => alert(err));
    }, [])

    return <Tab.Content>
        {getCards()}
    </Tab.Content>
}

export default MovieCard;