"use client"

import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComp() {
    return(
        <div className="max-w-[1200px] mx-auto">
            <Carousel showArrows={true} showStatus={false} autoPlay={true} infiniteLoop={true} interval={3000}>
                <div>
                    <img src="/banner/1.png"/>
                </div>

                <div>
                    <img src="/banner/shoes.jpg"/>
                </div>

                <div>
                    <img src="/banner/electronic.jpg"/>
                </div>
            </Carousel>

        </div>
    )
}

