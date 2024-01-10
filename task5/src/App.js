import logo from './logo.svg';
import './App.css';
import Header from "./header/Header";
import Search from "./search/Search";
import {Col, Container, Form, InputGroup, ListGroup, Row, Tab} from "react-bootstrap";
import {Button, Card} from "@mui/material";
import React from "react";
import MovieCard from "./movieCard/MovieCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCard from "./editCard/CreateCard";

function App() {
  return (
      <BrowserRouter>
          <Header/>
          <Container fluid>
              <Row>
                  <Col md={4}>
                      <Search/>
                  </Col>
                  <Col md={8}>
                      <Routes>
                          <Route path="/movies/:id" element={<MovieCard/>}/>
                          <Route path="/movies/add" element={<CreateCard/>}/>
                          <Route path="/movies/edit/:id" element={<CreateCard/>}/>
                          <Route path="/" element={<></>}/>
                      </Routes>
                  </Col>
              </Row>
          </Container>
      </BrowserRouter>
  );
}

export default App;
