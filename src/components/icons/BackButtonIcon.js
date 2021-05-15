import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackButtonIcon(props) {
return (
    <Svg
    width={24}
    height={24}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    >
    <Path
        d="M4.774 10.808l-.076.065.076-.065-1.832-2.161h9.493a.647.647 0 100-1.294H2.942l1.832-2.161-.076-.065.076.065a.647.647 0 00-.987-.837L1.053 7.582s0 0 0 0a.65.65 0 000 .836l2.734 3.227c.23.272.639.306.912.075h0a.647.647 0 00.075-.912zM14.454.9H9.7a.647.647 0 100 1.294h4.106v11.612H9.7a.647.647 0 100 1.294h4.753c.357 0 .647-.29.647-.647V1.547A.647.647 0 0014.453.9z"
        fill="#E5C77A"
        stroke="#E5C77A"
        strokeWidth={0.2}
    />
    </Svg>
)
}

export default BackButtonIcon
