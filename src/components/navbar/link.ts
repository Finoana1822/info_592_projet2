import { MenuType } from "../../@types/menu.type";

export const menuLink: MenuType[] = [
  {
    menu: "Home",
    route: "/",
    iconName: "lni lni-home",
  },
  {
    menu: "Mes archives",
    route: "/archives",
    iconName: "lni lni-archive",
    // subMenu: [
    //   {
    //     menu: "archive1",
    //     route: "/archive/archive1",
    //   },
    //   {
    //     menu: "archive2",
    //     route: "/archive/archive2",
    //   },
    // ],
  },
];
