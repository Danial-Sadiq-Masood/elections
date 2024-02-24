import styled from 'styled-components';

const Container = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 2;
`;

function Sticky({children}) {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Sticky;