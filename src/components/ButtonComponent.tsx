import styled from "styled-components";

interface ButtonProps {
  width?: string;
  height?: string;
  border?: string;
  background?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
}

const ButtonComponent = styled.button<ButtonProps>`
  box-sizing: border-box;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  border: ${(props) => props.border || "1px solid black"};
  background-color: ${(props) => props.background || "transparent"};
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "16px"};
  padding: ${(props) => props.padding || "2px"};
  border-radius: 50px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.background
        ? lightenDarkenColor(props.background, -20)
        : "transparent"};
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
    opacity: 0.5;
    border-color: darkgrey;
  }
`;

const lightenDarkenColor = (col: string, amt: number) => {
  let color = col[0] === "#" ? col.slice(1) : col;
  let num = parseInt(color, 16);
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return "#" + ((0x1000000 + (r << 16)) | (b << 8) | g).toString(16).slice(1);
};

export default ButtonComponent;
