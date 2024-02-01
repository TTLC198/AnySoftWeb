import React, {memo} from "react";
import MainBanner from "./MainBanner";
import {MediaSwiper} from "./MediaSwiper";
import {useCarousel} from "use-carousel-hook";

export const MainSwiper = memo(function MainSwiper({
                                                       width,
                                                       product
                                                   }) {
        const {ref, previous, next, current, setCurrent} = useCarousel();

        return (
            <>
                <MainBanner
                    width={width}
                    product={product}
                    current={current}
                />
                <MediaSwiper
                    width={width}
                    image_width={346}
                    ref={ref}
                    previous={previous}
                    next={next}
                    current={current}
                    set_current={setCurrent}
                    images={product.images}
                />
            </>
        )
    }, (prevProps, nextProps) =>
    prevProps.width === nextProps.width
    && prevProps.product.id === nextProps.product.id
    && prevProps.product.isInWishlist === nextProps.product.isInWishlist
    && prevProps.product.status === nextProps.product.status
)