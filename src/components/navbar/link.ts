import { MenuType } from "../../@types/menu.type";

export const menuLink: MenuType[] = [
  {
    menu: "Home",
    route: "/",
  },
  {
    menu: "Test",
    route: "/test",
    subMenu: [
      {
        menu: "test",
        route: "/test/test",
      },
    ],
  },
];
