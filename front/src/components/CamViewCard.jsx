import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { getStaticFilesUrl } from '../services/Api';
import './CamViewCard.css';

export default function CamViewCard(props) {

  const camId = props.camId
  const camAlias = props.camAlias
  const camIcon = props.camIcon
  const camUrlVideo = props.camUrlVideo
  function handleOpenModalCam (){
    props.handleOpenModal(camId,camUrlVideo)
  }
  return (
    <Card sx={{ width: 250 }} onClick={handleOpenModalCam}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${getStaticFilesUrl()}img/${camIcon}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {camAlias}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}