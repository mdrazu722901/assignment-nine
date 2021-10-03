import React from 'react';
import './Details.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router';
import { AttachMoney, LocalHotel, Wc } from '@material-ui/icons';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
export default function Details({ allData }) {
    const classes = useStyles();
    const history = useHistory()
    const handleBook = (name) => {
        history.push(`/conform/${name}`);
    }
    const style = {
        margin: "3px",
        padding: "30px"
    }
    return (
        <Card className={classes.root} style={style} onClick={() => handleBook(allData.name)}>
            <CardMedia
                height="600px"
                className={classes.media}
                image={allData.imgUrl}
                title="Paella dish"
            />

            <CardActions disableSpacing>
                <h1>{allData.name}</h1>
            </CardActions>
        </Card>
    );
}