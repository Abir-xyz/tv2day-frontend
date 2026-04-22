import { Link } from 'react-router';
import { Navbar, LoginPageBanner } from '../components';
import styled from 'styled-components';

const Login = () => {
  return (
    <Wrapper className='section'>
      <div className='login-container'>
        <div className='banner-wrapper'>
          <div className='navbar'>
            <Link to='/' className='brand-login'>
              TV2DAY
            </Link>
          </div>
          <div className='banner'>
            <LoginPageBanner />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .login-container {
    min-height: 100vh;
    position: relative;
  }
  .banner-wrapper {
    background-image: url('/assets/gallery/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100%;
    height: 100vh;
    width: 100%;
  }
  .brand-login {
    font-size: 1.5rem;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .navbar {
    padding: 1rem;
  }
`;

export default Login;
