import {Button, Typography} from "@mui/material";
import {Row} from "react-bootstrap";
import React from "react";
import {AddCircleOutlineOutlined} from "@mui/icons-material";


const Footer = ({length}) => {
    return <Row className="mt-3" style={{display: "flex", justifyContent: "space-between"}}>
        <Typography>Найдено {length} элементов</Typography>
        <Button className="ml-4" variant="contained" style={{borderRadius:10}} startIcon={<AddCircleOutlineOutlined/>}>Добавить</Button>
    </Row>
}

export default Footer;