import React, {useEffect, useState} from "react";
import {Col, Container, Form, Image, InputGroup, ListGroup, Row, Tab} from "react-bootstrap";

import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography} from "@mui/material";


const CreateCard = () => {
    const navigate = useNavigate();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const param = useParams();
    const [genres, setGenres] = useState([]);
    const [pickedGenres, setPickedGenres] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [link, setLink] = useState('')
    const [year, setYear] = useState('')
    const [duration, setDuration] = useState('')
    const [actors, setActors] = useState('')

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPickedGenres(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(pickedGenres)
    };

    useEffect(() => {
        if(param.id){
            fetchMovie()
        }
        fetchGenres()
            .then(data => setGenres(data))
            .catch(err => alert(err));

    }, [param.id || 0])

    async function fetchGenres(){
        let data = [];
        try{
            data = await fetch(`http://localhost:3000/genres`, {
                method: 'GET',
            }).then(res => res.json());
        } catch (e) {
            alert(e);
        }
        return data;
    }

    async function fetchMovie(){
        let data = [];
        try{
            data = await fetch(`http://localhost:3000/movies/${param.id}`, {
                method: 'GET',
            }).then(res => res.json().then(data => {
                setName(data.title);
                setDescription(data.plot);
                setPickedGenres(data.genres);
                setYear(data.year);
                setDuration(data.runtime);
                setDirector(data.director);
                setActors(data.actors);
                setLink(data.posterUrl);
            }));
        } catch (e) {
            alert(e);
        }
        return data;
    }

    async function saveMovie() {
        const movie = {
            title: name,
            plot: description,
            director: director,
            posterUrl: link,
            year: year,
            runtime: duration,
            actors: actors,
            genres: pickedGenres
        }
        await fetch(
            'http://localhost:3000/movies',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(movie)
            }
        )
        navigate('/')
    }

    async function editMovie(){
        const movie = {
            title: name,
            plot: description,
            director: director,
            posterUrl: link,
            year: year,
            runtime: duration,
            actors: actors,
            genres: pickedGenres
        }

        await fetch(
            `http://localhost:3000/movies/${param.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(movie)
            }
        ).then(res => res.json());

        navigate('/')
    }


    return <Container style={{textAlign: "center"}}>
        <Typography align="center" variant="h4" className="mt-3 mb-3">{param.id ? 'Редактирование фильма' : 'Добавление нового фильма'}</Typography>
        <InputGroup className="mb-3">
            <Form.Control value={name} onChange={(name) => setName(name.target.value)} id="form" placeholder={'Введите название фильма'} style={{borderRadius: 10}}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <Form.Control value={link} onChange={(link) => setLink(link.target.value)} id="form" placeholder={'Введите ссылку на постер'} style={{borderRadius: 10}}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <Form.Control value={director} onChange={(director) => setDirector(director.target.value)} id="form" placeholder={'Укажите режиссера'} style={{borderRadius: 10}}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <Form.Control value={description} onChange={(description) => setDescription(description.target.value)} id="form" placeholder={'Введите описание'} style={{borderRadius: 10}}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <Form.Control value={year} onChange={(year) => setYear(year.target.value)} id="form" placeholder={'Укажите год выхода'} style={{borderRadius: 10}}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <Form.Control value={duration} onChange={(duration) => setDuration(duration.target.value)} id="form" placeholder={'Укажите длительность фильма'} style={{borderRadius: 10}}/>
        </InputGroup>
        <InputGroup className="mb-3">
            <Form.Control value={actors} onChange={(actors) => setActors(actors.target.value)} id="form" placeholder={'Укажите список актеров'} style={{borderRadius: 10}}/>
        </InputGroup>
        <FormControl sx={{ m: 1, width: "inherit" }}>
            <InputLabel id="demo-multiple-chip-label">Genres</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={pickedGenres}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {genres.map((genre) => (
                    <MenuItem
                        key={genre}
                        value={genre}
                    >
                        {genre}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        <Button onClick={param.id ? editMovie : saveMovie} className="mt-3" variant="contained" style={{borderRadius: "20px", width: "30vw"}}>Подтвердить</Button>
    </Container>
}

export default CreateCard;