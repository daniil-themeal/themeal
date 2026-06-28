import type { HomePromoBanner } from '../../types/account.types';

type HomePromoCarouselProps = {
  banners: HomePromoBanner[];
};

export function HomePromoCarousel({ banners }: HomePromoCarouselProps) {
  return (
    <div className="account-home-promo" aria-label="Promotions">
      <div className="account-home-promo__track">
        {banners.map((banner) => (
          <article key={banner.id} className="account-home-promo__card">
            <img
              className="account-home-promo__image"
              src={banner.imageSrc}
              alt={banner.imageAlt}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
