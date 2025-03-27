export class Auth {
  static {
    if (!localStorage.getItem("isAdmin"))
      localStorage.setItem("isAdmin", false ? "1" : "0");
  }

  static setIsAdmin(value: boolean) {
    localStorage.setItem("isAdmin", value ? "1" : "0");
  }

  static getIsAdmin(): boolean {
    // todo:
    const isAdmin = localStorage.getItem("isAdmin");
    return isAdmin ? (isAdmin === "1" ? true : false) : false;
  }
}
