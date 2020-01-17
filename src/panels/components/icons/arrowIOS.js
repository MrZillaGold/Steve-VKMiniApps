import React from "react";

class IconArrowIOS extends React.Component {
    static defaultProps = {
        width: 30,
        height: 30,
        fill: '#FFF'
    };

    render() {
        return (
            <svg className="Icon" width={this.props.width} height={this.props.height} fill={this.props.fill} viewBox='0 0 16 16'>
                <g id="arrow_down" data-name="arrow down" transform="rotate(90,7,7)">
                    <rect id="Rectangle" x="7" y="10" width="2" height="2"/>
                    <rect id="Rectangle-2" data-name="Rectangle" x="9" y="8" width="2" height="2" />
                    <rect id="Rectangle-3" data-name="Rectangle" x="5" y="8" width="2" height="2"/>
                    <rect id="Rectangle-4" data-name="Rectangle" x="11" y="6" width="2" height="2"/>
                    <rect id="Rectangle-5" data-name="Rectangle" x="13" y="4" width="2" height="2"/>
                    <rect id="Rectangle-6" data-name="Rectangle" x="3" y="6" width="2" height="2"/>
                    <rect id="Rectangle-7" data-name="Rectangle" x="1" y="4" width="2" height="2"/>
                </g>
            </svg>
        )
    }
}

export default IconArrowIOS;