import styled from 'styled-components';
import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper className='section'>
      <div className='main'>
        <div className='wrapper'>
          <p>
            This site does not host any files. All content is provided by third
            parties.
          </p>
          {/* <p>All contents are provided by non-affiliated third parties.</p> */}
          {/* <p>
            If you want to say something then <Link to='/contact'>Contact</Link>
          </p> */}
          <p>Copyright © {currentYear} Tv2day</p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    min-height: 16vh;
    margin-top: 4rem;
    background-color: #000000;
    color: #7a7a7a;
    padding: 12px 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    min-height: 16vh;
    text-align: center;
    p {
      padding-bottom: 4px;
    }
  }

  @media screen and (max-width: 800px) {
    .wrapper {
      margin-bottom: 5px;
      font-size: 0.9rem;
    }
  }
`;

export default Footer;
