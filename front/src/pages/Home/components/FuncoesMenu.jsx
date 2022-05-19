import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

export default function FuncoesMenu(props) {

  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSubPage = (subView,subTitle) => {
    props.changeSubTitle(subTitle)
    navigate(`/home/${localStorage.getItem('petdiniz-token').split('.')[1]}/${subView}`,{ replace: true })
  }
  const serviceMenuShow = true
  
  const serviceMenu = () => {
    return (
      <div>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={()=>openSubPage('addaccesscams','Liberar Acesso Câmeras')}>Liberar Acesso Câmeras</MenuItem>
          <MenuItem onClick={()=>openSubPage('cams','Listar Câmeras')}>Listar Câmeras</MenuItem>
          <MenuItem onClick={()=>openSubPage(`mycams`,'Minhas Câmeras')}>Minhas Câmeras</MenuItem>
          <Divider />
          <MenuItem onClick={()=>openSubPage('user','Cadastrar Usuário')}>Cadastrar Usuário</MenuItem>
          <MenuItem onClick={()=>openSubPage('users','Listar Usuários')}>Listar Usuários</MenuItem>
        </Menu>
      </div>

    )
  }
  return (
    <div>
      {serviceMenuShow ? serviceMenu() : ""}
    </div>
  );
}