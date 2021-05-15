import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
return (
    <Svg
        width={15}
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
        d="M14.909 14.025L10.55 9.667a5.907 5.907 0 001.324-3.73A5.944 5.944 0 005.938 0 5.944 5.944 0 000 5.938a5.944 5.944 0 005.938 5.937c1.412 0 2.709-.497 3.73-1.324l4.357 4.357c.122.123.32.123.442 0l.441-.441a.312.312 0 000-.442zm-8.971-3.4A4.693 4.693 0 011.25 5.938 4.693 4.693 0 015.938 1.25a4.693 4.693 0 014.687 4.688 4.693 4.693 0 01-4.687 4.687z"
        fill="#505056"
        />
    </Svg>
    )
}

export default SvgComponent
