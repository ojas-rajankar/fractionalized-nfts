import * as styled from "styled-components";
import assets from "../assets";

export const bp = {
  mobile: "55em",
  smallDesk: "78em",
};

//mixins
const maxCtrSize = styled.css`
  max-width: var(--max-app-width);
  width: 100%;
  margin: 0 auto;
`;
const flexCol = styled.css`
  display: flex;
  flex-direction: column;
`;
const flexColCenter = styled.css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const flexRowCenter = styled.css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const gridCenter = styled.css`
  display: grid;
  place-items: center;
`;
export const mixins = {
  maxCtrSize,
  flexCol,
  flexColCenter,
  flexRowCenter,
  gridCenter,
};
export const GlobalStyles = styled.createGlobalStyle`
  /*Font Imports*/
  @font-face {
    font-family: contentFont;
    font-weight: 400;
    src: url(${assets.fonts.contentFontRg});
  }
  @font-face {
    font-family: contentFontMd;
    font-weight: 500;
    src: url(${assets.fonts.contentFontMd});
  }
  @font-face {
    font-family: titleFont;
    font-weight: 500;
    src: url(${assets.fonts.titleFont});
  }

  :root {
    //dimension
    --nav-height: 4rem;
    --icon-size: clamp(24px, 3vw, 28px);
    --task-icon-size: clamp(55px, 8vw, 70px);
    --max-app-width: 720px;
    --max-ctr-width: 450px;

    //fonts
    --ff-content: contentFont, sans-serif;
    --ff-subtitle: contentFontMd, sans-serif;
    --ff-title: titleFont, sans-serif;
    --fs-s: clamp(0.8rem, 1vw, 0.9rem);
    --fs-r: clamp(1rem, 2vw, 1.25rem);
    --fs-m: clamp(1.25rem, 2vw, 1.5rem);
    --fs-l: clamp(1.5rem, 2vw, 1.75rem);
    --fs-xl: clamp(2.625rem, 3vw, 2.875rem);

    //colors
    --color-primary: #fff;
    --color-secondary: #000;
    --color-bg: #000;
    --color-imp: #46dc00;
  }
  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default margin */
  * {
    margin: 0;
    padding: 0;
    font: inherit;
  }

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  /* Set core root defaults */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.25;
    font-family: var(--ff-content);
    font-size: var(--fs-r);
    background: var(--color-bg);
    color: var(--color-primary);
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }
  input,
  button {
    background: var(--color-bg);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    border-radius: 2rem;
    font-size: clamp(0.9rem, 2vw, 1rem);
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  .appTitle {
    font-family: var(--ff-title);
    font-size: clamp(7.5rem, 15vw, 13rem);
    text-align: center;
    line-height: 90%;
  }
  .title,
  .ques {
    font-family: var(--ff-title);
    font-size: var(--fs-l);
  }
  .ques {
    font-size: var(--fs-xl);
  }
  .imp {
    color: var(--color-imp);
    cursor: pointer;
    text-decoration: underline;
  }
`;
