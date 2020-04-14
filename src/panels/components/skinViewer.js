import React, { Component } from "react";
import PropTypes from "prop-types";

import * as skinview3d from "skinview3d";

export default class SkinViewer extends Component {

    constructor(props) {
        super(props);
        this.skinviewRef = React.createRef();
        this.state = {
            viewer: null
        };
    }

    componentDidMount() {
        this.setState({
            viewer: new skinview3d.SkinViewer({
                domElement: this.skinviewRef.current,
                width: this.props.width,
                height: this.props.height,
                skinUrl: this.props.skinUrl,
                capeUrl: this.props.capeUrl
            })
        }, () => {
            const { viewer } = this.state;
            const { run, walk, slim, paused } = this.props;

            let control = skinview3d.createOrbitControls(this.state.viewer);
            control.enableRotate = true;
            control.enableZoom = false;
            control.enablePan = false;

            // animation
            if (run || walk) {
                viewer.animation = new skinview3d.CompositeAnimation();
                if (run) {
                    this.createAnimation(viewer.animation, true);
                }
                if (walk) {
                    this.createAnimation(viewer.animation, false);
                }
            }

            if (paused) {
                viewer.animationPaused = paused;
                this.setState({viewer});
            }

            viewer.detectModel = !slim;
            viewer.playerObject.skin.slim = slim;

            // let's call ready here
            this.props.onReady(this.state.viewer);
        });
    }

    componentWillUnmount() {
        this.setState({
            viewer: null,
            walk: null,
            run: null,
        });
    }

    componentDidUpdate(prevProps) {
        const { viewer, run, walk } = this.state;
        const { skinUrl, capeUrl, width, height, runSpeed, walkSpeed, runPaused, walkPaused, paused, slim } = this.props;

        if (prevProps.skinUrl !== skinUrl) {
            viewer.skinUrl = skinUrl;
        }

        if (prevProps.capeUrl !== capeUrl) {
            viewer.capeUrl = capeUrl;
        }

        if (prevProps.width !== width || prevProps.height !== height) {
            viewer.setSize(width, height);
        }

        // animation
        if (prevProps.run !== this.props.run) {
            if (this.props.run) {
                viewer.animation = new skinview3d.CompositeAnimation();
                return this.createAnimation(viewer.animation, true);
            } else {
                if (run) run.remove();
            }
        }
        if (prevProps.walk !== this.props.walk) {
            if (this.props.walk) {
                viewer.animation = new skinview3d.CompositeAnimation();
                return this.createAnimation(viewer.animation, false);
            } else {
                if (walk) walk.remove();
            }
        }

        if (prevProps.runSpeed !== runSpeed) {
            if (run) {
                run.speed = runSpeed;
                this.setState({run});
            }
        }
        if (prevProps.walkSpeed !== walkSpeed) {
            if (walk) {
                walk.speed = walkSpeed;
                this.setState({walk});
            }
        }

        if (prevProps.runPaused !== runPaused) {
            if (run) {
                run.paused = runPaused;
                this.setState({run});
            }
        }
        if (prevProps.walkPaused !== walkPaused) {
            if (walk) {
                walk.paused = walkPaused;
                this.setState({walk});
            }
        }

        if (prevProps.paused !== paused) {
            viewer.animationPaused = paused;
            this.setState({viewer});
        }

        if (prevProps.slim !== slim) {
            viewer.detectModel = !slim;
            viewer.playerObject.skin.slim = slim;
        }
    }

    createAnimation(viewerAnimation, isRun) {
        if (isRun) {
            let run = viewerAnimation.add(skinview3d.RunningAnimation);
            run.speed = this.props.runSpeed;
            this.setState({run});
        } else {
            let walk = viewerAnimation.add(skinview3d.WalkingAnimation);
            walk.speed = this.props.walkSpeed;
            this.setState({walk});
        }
    }

    render() {
        return (
            <div className={this.props.className} ref={this.skinviewRef} style={{imageRendering: 'pixelated'}}/>
        )
    }
}

SkinViewer.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    skinUrl: PropTypes.string.isRequired,
    capeUrl: PropTypes.string,
    run: PropTypes.bool,
    runSpeed: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    runPaused: PropTypes.bool,
    walk: PropTypes.bool,
    walkSpeed: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    walkPaused: PropTypes.bool,
    slim: PropTypes.bool,
    paused: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
};

// Specifies the default values for props:
SkinViewer.defaultProps = {
    width: 600,
    height: 600,
    walk: false,
    walkSpeed: 1,
    run: false,
    runSpeed: 1,
    onReady: () => {}
};