import { MenuType } from "../../@types/menu.type";

export const menuLink: MenuType[] = [
  {
    menu: "Home",
    route: "/",
    iconName: "lni lni-home",
  },
  {
    menu: "Test",
    route: "/test",
    iconName: "fa-solid fa-vial",
    subMenu: [
      {
        menu: "test1",
        route: "/test/test1",
      },
      {
        menu: "test2",
        route: "/test/test2",
      },
    ],
  },
];
