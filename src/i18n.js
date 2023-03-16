import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Signup Page": "Signup Page",
        "password mismach": "password mismach",
        UserName: "UserName",
        "Display Name": "Display Name",
        Password: "Password",
        "Password Repeat": "Password Repeat",
        Login: "Login",
        Send: "Send",
        Logout: "Cikis Yap",
        Users: "Users",
        Next: "Next",
        Previous: "Previous",
        "User Not Found": "User Not Found",
        Edit: "Edit",
        Save: "Save",
        Cancel: "Cancel",
      },
    },
    tr: {
      translations: {
        "Signup Page": "Kayit ol",
        "password mismach": "Ayni sifreyi giriniz",
        UserName: "Kullanıcı adı",
        "Display Name": "Tercih edilen isim",
        Password: "Sifre",
        "Password Repeat": "Sifreyi tekrarla",
        Login: "Giris",
        Send: "Gonder",
        Logout: "Logout",
        Users: "Kullanicilar",
        Next: "Ileri",
        Previous: "Geri",
        "User Not Found": "Kullanici bulunamadi",
        Edit: "Duzenle",
        Save: "Kayd et",
        Cancel: "Iptal",
      },
    },
  },
  fallbackLng: "tr",
  ns: ["trsanlations"],
  defaultNS: "translations",
  keySeperator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: "",
  },
  react: {
    wait: true,
  },
});

const timeAgoTR = (number, index) => {
  return [
    ["az önce", "şimdi"],
    ["%s saniye önce", "%s saniye içinde"],
    ["1 dakika önce", "1 dakika içinde"],
    ["%s dakika önce", "%s dakika içinde"],
    ["1 saat önce", "1 saat içinde"],
    ["%s saat önce", "%s saat içinde"],
    ["1 gün önce", "1 gün içinde"],
    ["%s gün önce", "%s gün içinde"],
    ["1 hafta önce", "1 hafta içinde"],
    ["%s hafta önce", "%s hafta içinde"],
    ["1 ay önce", "1 ay içinde"],
    ["%s ay önce", "%s ay içinde"],
    ["1 yıl önce", "1 yıl içinde"],
    ["%s yıl önce", "%s yıl içinde"],
  ][index];
};
register("tr", timeAgoTR);
export default i18n;
