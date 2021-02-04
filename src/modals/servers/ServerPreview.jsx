import React, { useState, useEffect } from "react";
import { NameMC } from "namemcwrapper";
import { ModalPage, Spinner, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";

import { HeightAnimation } from "../../animation";
import { FavoriteList, ModalHeader } from "../../components";
import { Info } from "../../panels/server/Info";

import "./ServerPreview.css";

const nameMc = new NameMC({
    proxy: "https://stevecors.herokuapp.com"
});

export function ServerPreview({ id }) {

    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    const [server, setServer] = useState(useParams().server);
    const [{ items, add }, setFavorite] = useState({});
    const [spinner, setSpinner] = useState(true);
    const [mount, setMount] = useState(true);

    useEffect(() => {
        getServer(server.ip);

        return () => setMount(false);
    }, []);

    const getServer = async (ip) => {
        await nameMc.getServer(ip)
            .then(({ version, uptime }) => {
                if (mount) {
                    setServer({
                        ...server,
                        version,
                        uptime
                    });
                }
            })
            .catch((error) => {
                console.log(error);

                if (mount) {
                    setServer({
                        ...server,
                        version: null,
                        uptime: null
                    });
                }
            });

        if (mount) {
            setSpinner(false);
        }
    };

    const info = (
        <>
            <Info className="ServerPreview-Info"
                  server={server}
                  favorite={items}
                  showIpCopy={true}
                  add={add}
            />
            {
                spinner &&
                <Spinner size="small"
                         style={{ padding: "90px 0", height: "auto" }}
                />
            }
        </>
    );

    return (
        <ModalPage id={id}
                   header={
                       <ModalHeader>
                           Просмотр сервера
                       </ModalHeader>
                   }
                   onClose={back}
                   dynamicContentHeight
        >
            {
                viewWidth > ViewWidth.MOBILE ?
                    <HeightAnimation>
                        {
                            info
                        }
                    </HeightAnimation>
                    :
                    <div>
                        {
                            info
                        }
                    </div>
            }
            <FavoriteList bridgeKey="steveFavoriteList"
                          getState={setFavorite}
                          style={{ display: "none" }}
            />
        </ModalPage>
    );
}
