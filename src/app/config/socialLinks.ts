/** Official TheMeal social & messenger URLs (from themeal.menu footer). */
export const socialLinks = {
  whatsapp: 'https://wa.me/971544595462?text=',
  telegram: 'https://t.me/themealmenu_bot',
  facebook: 'https://www.facebook.com/themeal.menu/',
  instagram: 'https://www.instagram.com/themeal.menu_uae/',
  tiktok: 'https://www.tiktok.com/@themeal_uae',
  youtube: 'https://www.youtube.com/@TheMeal_menu',
} as const;

export const landingFooterSocials = [
  ['facebook', socialLinks.facebook],
  ['instagram', socialLinks.instagram],
  ['tiktok', socialLinks.tiktok],
  ['youtube', socialLinks.youtube],
  ['whatsapp', socialLinks.whatsapp],
  ['telegram', socialLinks.telegram],
] as const;

export const landingFollowSocials = [
  ['facebook', socialLinks.facebook],
  ['instagram', socialLinks.instagram],
  ['tiktok', socialLinks.tiktok],
  ['youtube', socialLinks.youtube],
] as const;
