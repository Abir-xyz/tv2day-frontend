import styled from 'styled-components';

const VideoPlayerTv = ({id}) => {
  const videoURL = `https://vidsrc.to/embed/tv/${id}`;

  return (
    <Wrapper className='section'>
      <div className='player'>
        <iframe
          src={videoURL}
          allowFullScreen
          frameBorder='0'
          title='Video Player'
        ></iframe>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .player {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px !important;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
  }
`;

export default VideoPlayerTv;
