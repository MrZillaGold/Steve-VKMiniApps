import { createNavigator } from "@vkontakte/router";

const config = {
    defaultRoute: "home",
    subRouteKey: "modal"
};

const routes = [
    { name: "home" },
    { name: "user" },
    { name: "server" },
    {
        name: "gallery",
        children: [
            {
                name: "gallery-preview",
                modal: true
            }
        ]
    },
    { name: "hypixel" },
    { name: "generator" },
    { name: "calculator" },
    { name: "status" }
];

export const router = createNavigator(routes, config);

router.start();
