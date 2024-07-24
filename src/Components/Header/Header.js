import React from 'react';
import { Reorder, SearchOutlined, ExpandMore } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './Header.css';
import Welcome from '../Auth/Welcome';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Authaction } from '../../Store/auth';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LogoutHandler = () =>{
        dispatch(Authaction.Logout())
        navigate('/')
    }
    return (
        <div className='header'>
            <div className='header__left'>
                <IconButton>
                    <Reorder />
                </IconButton>
                <img src='https://tse3.mm.bing.net/th?id=OIP.GEZSG_Zgb71KVwVHxIs5hgHaHa&pid=Api&P=0&h=180' alt='logo' />
            </div>
            <Welcome />
            <div className='header__middle'>
                <div className='search_mail'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <input type='text' placeholder='Search Mails' />
                    <IconButton>
                        <ExpandMore />
                    </IconButton>
                </div>
            </div>
            <div>
                <Button type='button' onClick={LogoutHandler} variant='danger'>Logout</Button>
            </div>
        </div>
    );
};

export default Header;
