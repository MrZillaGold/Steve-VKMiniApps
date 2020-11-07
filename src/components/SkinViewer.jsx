import React, { useEffect, useRef, useState } from "react";
import * as skinview3d from "skinview3d";

import "./SkinViewer.css";

const animationTemplates = new Map([
    ["walk", skinview3d.WalkingAnimation],
    ["run", skinview3d.RunningAnimation],
    ["fly", skinview3d.FlyingAnimation]
]);

/**
 * @description Рендер модели скина
 * @param {string|null} skin="" - Ссылка на скин
 * @param {string} [isSlim] - Стройный скин
 * @param {string|null} [cape=""] - Ссылка на плащ
 * @param {number} [height=300] - Высота элемента с рендером
 * @param {number} [width=250] - Ширина элемента с рендером
 * @param {Boolean} [zoom=true] - Возможность приближения рендера
 * @param {Boolean} [rotate=true] - Возможность поворота рендера
 * @param {Boolean} [pan=false] - Автоматическое вращения рендера
 * @param {"walk"|"run"|"fly"} [animation=""] - Имя для начальной анимации
 * @param {number} [animationSpeed=0.5] - Скорость анимации
 * @param {boolean} [paused] - Остановка анимации
 * @param {function} onReady - Функция, для выполнения после окончания рендера
 */

export function SkinViewer({ skin = null, isSlim, cape = null, height = 300, width = 250, zoom = true, rotate = true, pan = false, animation = "", animationSpeed = 0.5, paused = false, onReady = () => null, className = "", style = {}, ...rest }) {

    const ref = useRef();

    const [viewer, setViewer] = useState(null);
    const [control, setControl] = useState(null);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        const skinViewer = viewer || new skinview3d.SkinViewer({
            canvas: ref.current,
            width,
            height
        });

        skinViewer.loadSkin(skin, isSlim ? "slim" : "default");
        if (cape) {
            skinViewer.loadCape(cape);
        }

        const viewerControls = control || skinview3d.createOrbitControls(skinViewer);

        if (!isFirstRender) {
            skinViewer.setSize(width, height);

            if (animation) {
                if (!skinViewer.animations.length) {
                    skinViewer.animations.handles.forEach((handle) => {
                        // eslint-disable-next-line
                        handle.paused = paused;

                        handle.animation = animationTemplates.get(animation);
                    });
                } else {
                    addAnimation(animation, skinViewer);
                }
            }

        } else {
            if (animation) {
                addAnimation(animation, skinViewer);
            }

            onReady(skinViewer);

            setIsFirstRender(false);
            setViewer(skinViewer);
            setControl(viewerControls);
        }

        viewerControls.enableRotate = rotate;
        viewerControls.enableZoom = zoom;
        viewerControls.enablePan = pan;

        skinViewer.animations.speed = animationSpeed;
    }, [ skin, cape, height, width, zoom, rotate, animation, animationSpeed, paused ]);

    const addAnimation = (animation, skinViewer) => {
        const animationTemplate = animationTemplates.get(animation);

        animationTemplate.paused = paused;

        skinViewer.animations.add(animationTemplate);
    };

    return (
        <div style={{ width, height, ...style }}
             className={`SkinViewer ${className}`}
             {...rest}
        >
            <canvas ref={ref}/>
        </div>
    )
}
