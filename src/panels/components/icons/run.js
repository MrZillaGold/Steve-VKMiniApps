import React from "react";

export class IconRun extends React.Component {
    static defaultProps = {
        width: 16,
        height: 16,
        fill: "#FFF"
    };

    render() {
        return (
            <svg className="Icon" width={this.props.width} height={this.props.height} fill={this.props.fill} viewBox="0 0 458.667 458.667" style={{display: "block"}}>
                <g>
                    <path d="M283.733,85.333c23.467,0,42.667-19.2,42.667-42.667C326.4,19.2,307.2,0,283.733,0s-42.667,19.2-42.667,42.667S260.267,85.333,283.733,85.333z"/>
                    <path d="M401.067,245.333v-42.667c-39.467,0-73.6-21.333-92.8-52.267L288,116.267C280.533,103.467,266.667,96,251.733,96c-5.333,0-10.667,1.067-16,3.2l-112,45.867v100.267H166.4v-71.467l37.333-14.933l-33.067,171.733L66.133,310.4L57.6,352c0,0,149.333,28.8,149.333,29.867L227.2,288l45.867,42.667v128h42.667V297.6L272,253.867l12.8-64C312.533,224,354.133,245.333,401.067,245.333z"/>
                </g>
            </svg>
        )
    }
}

export default IconRun;