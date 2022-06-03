import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CamViewCard from '../../components/CamViewCard';
import ModalCam from '../../components/ModalCam';
import './style.css';


export default function MyCams(props) {
    const reduxData = useSelector(state => state.user)
    const userData = reduxData.user

    const [cams, setCams] = useState([]);
    const [camId, setCamId] = useState(0);
    const [camUrlVideo, setCamUrlVideo] = useState(0);

    const [openModalCam, setOpenModalCam] = useState(false);

    const handleOpenModal = (id, urlVideo) => {
        setCamId(id)
        setCamUrlVideo(urlVideo)
        setOpenModalCam(true)
    }
    const handleCloseModal = () => {
        setCamId(0)
        setOpenModalCam(false)
    }
    useEffect(() => {
        import('../../services/Api').then(api =>{
            api.  getRequest(`cams/mycams/${userData.id}`, localStorage.getItem('petdiniz-token')).then(
                (response) => {
                    if (response.data.data != null) {
                        setCams(response.data.data.map((cam, i) => (
                            <CamViewCard
                                key={i}
                                camAlias={cam.alias}
                                camIcon={cam.icon.sourceimg}
                                camUrlVideo={cam.urlcamstream}
                                handleOpenModal={handleOpenModal}
                            />
                        )))
                    }
                }
            )
        })
      

    }, []);

    return (
        <div className="myCamsArea">
            <div className="listMyCams">
                {cams}
            </div>
            <ModalCam camId={camId}
                urlVideo={camUrlVideo}
                openModalCam={openModalCam}
                handleCloseModal={handleCloseModal} />

        </div>)
}
