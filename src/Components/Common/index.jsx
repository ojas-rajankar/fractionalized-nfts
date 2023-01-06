import styled from "styled-components";
import { bp, mixins } from "../../themes/global.theme";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  ${mixins.flexCol}
`;
export const FlexRowContent = styled.div`
  width: 100%;
  height: 100%;
  ${mixins.flexRowCenter}
  min-height: 500px;
  gap: 0.5rem;
  @media screen and (max-width: ${bp.mobile}) {
    flex-direction: column;
    min-height: auto;
  }
`;
export const Content = styled.div`
  width: 100%;
  flex: 1;
  ${mixins.flexCol}
  gap:1rem;
`;
