import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Form, Image, InputGroup, ListGroup, Row} from "react-bootstrap";
import {Button, Card, Typography} from "@mui/material";
import {blue} from "@mui/material/colors";
import Footer from "./Footer";

const Search = () => {
    let [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState();
    const [str, setStr] = useState('');

    async function fetchMovies(){
        let data = [];
        try{
            data = await fetch('http://localhost:3000/movies', {
                method: 'GET',
            }).then(res => res.json());
        } catch (e) {
            alert(e);
        }
        return data;
    }

    function getMovies(){
        if(str !== ''){
            movies = movies.filter(el => el.title.includes(str))
        }
        return movies.map(({id, title, year, runtime, genres, director, actors, plot, posterUrl}) => {
            return <ListGroup.Item href={`${id}`} style={{borderRadius: 15, border: '1px solid'}} className="mt-3">
                <Row>
                    <Typography sx={{fontWeight:500}}>{title}</Typography>
                </Row>
                <Row>
                    <Typography>{`${year} | ${genres.join(', ')}`}</Typography>
                </Row>
            </ListGroup.Item>
        })
    }


    useEffect(() => {
        fetchMovies()
            .then(data => setMovies(data))
            .catch(err => alert(err));
    }, [])

    return (
        <Container>
            <InputGroup className="mb-3 mt-3">
                <Form.Control id="form" placeholder={'Введите название фильма'} style={{borderRadius: 10}}/>
                <Button className="ml-3" variant="contained" style={{borderRadius:10}} onClick={() => setStr(document.getElementById('form').value)}>Искать</Button>
            </InputGroup>
            <ListGroup style={{overflowY: "scroll", maxHeight: "80vh"}}>
                {getMovies()}
            </ListGroup>
            <Footer length={movies.length}/>
        </Container>

    );
};

export default Search;
