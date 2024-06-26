import styled from "styled-components";

export const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
`;

export const BodyContainer = styled.div`
  height: 5.625rem;
  min-width: 8.125rem;
  padding: 0 1.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;

  h2 {
    font-weight: bold;
    margin: 0 0.375rem 0;
    font-size: 1.375rem;
    color: #4a4a4a;
    text-transform: capitalize;
  }

  p {
    font-weight: lighter;
    font-size: 1rem;
  }
`;

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  min-height: 15rem;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem 1rem;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    ${BodyContainer} {
      opacity: 0.9;
    }
  }

  &.large {
    height: 23.75rem;
  }

  &:first-child {
    margin-right: 0.5rem;
  }

  &:last-child {
    margin-left: 0.5rem;
  }
`;
