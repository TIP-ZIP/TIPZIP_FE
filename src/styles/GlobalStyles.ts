import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}

    *{
        box-sizing: border-box;
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
    }

    html {
        font-size: 16px; 
        @media (min-width: 450px) and (max-width: 600px) {
            font-size: 13px;
        }
        @media (max-width: 450px) {
            font-size: 10px;
        }
    }

    body{
        font-family: 'Pretendard';
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex; 
        flex-direction: column;
        justify-content: center; 
    }

    body::-webkit-scrollbar {
        display: none; /* 웹 브라우저에서 스크롤 바 숨기기 */
    }

    ol, ul{
        list-style: none;
    }
    
    a{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    button {
        border: 0;
        background: transparent;
        cursor: pointer;

        &:disabled {
            pointer-events: none;
        }
    }
`;

export default GlobalStyles;
