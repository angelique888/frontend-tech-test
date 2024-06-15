import React from 'react';
import slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface SliderProps {
  data: any;
}
const Slider: React.FC<SliderProps> = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };
return (
    <div className="slider-component">
      <slider {...settings}>
        {data.items.map((item: any) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </slider>
    </div>
  );
};

export default slider;
