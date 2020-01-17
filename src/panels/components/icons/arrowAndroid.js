import React from "react";

export class IconArrowAndroid extends React.Component {
    static defaultProps = {
        width: 24,
        height: 24,
        fill: '#FFF'
    };

    render() {
        return (
            <svg className="Icon" width={this.props.width} height={this.props.height} fill={this.props.fill} viewBox='0 0 24 24' style={{display: "block"}}>
                <path d="m4.5,13.5l0,3l3,0l0,3l3,0l0,3l3,0l0,-9l9,0l0,-3l-9,0l0,-9l-3,0l0,3l-3,0l0,3l-3,0l0,3l-3,0l0,3l3,0zm0,0"/>
            </svg>
        )
    }
}

export default IconArrowAndroid;