import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Form, Image, InputGroup, ListGroup, Row} from "react-bootstrap";
import {Button, Card, Typography} from "@mui/material";
import {blue} from "@mui/material/colors";
import Footer from "./Footer";
import {Link} from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from '@mui/icons-material/Search';

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
            return <Link className="mr-3" key={id} to={`/movies/${id}`} style={{textDecoration: 'none'}}>
            <ListGroup.Item key={id} action href={`${id}`} style={{borderRadius: 15, border: '1px solid'}} className="mt-3">
                <Row>
                    <Typography className="ml-2" variant="h7" sx={{fontWeight:500}}>{title}</Typography>
                </Row>
                <Row>
                    <Typography variant="h8" className="ml-2">{`${year} | ${genres.join(', ')}`}</Typography>
                </Row>
            </ListGroup.Item>
            </Link>
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
                <Form.Control val={str} id="form" placeholder={'Введите название фильма'} style={{borderRadius: 10}}/>
                <Button className="ml-3" variant="contained" style={{borderRadius:10}} endIcon={<SearchIcon/>} onClick={() => setStr(document.getElementById('form').value)}>Искать</Button>
            </InputGroup>
            <ListGroup style={{overflowY: "scroll", maxHeight: "80vh"}}>
                {getMovies()}
            </ListGroup>
            <Footer length={movies.length}/>
        </Container>

    );
};

export default Search;
