import React from 'react';
import './style.css';
import logo from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

// Esse componente Link servirá para aplicar os conceitos de SPA (Single Pages Aplications)
import { Link } from 'react-router-dom';
/**
 * o Link equivale a tag a e o to equivale a href
 * <Link to="/create-point" />
 */
const Home = () => {
    return(
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    
                    <Link to="/create-point">
                        <span> <FiLogIn /> </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
};

export default Home;