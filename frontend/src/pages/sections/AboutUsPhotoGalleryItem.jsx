import React from "react";
import { FaPlusSquare } from "react-icons/fa";

function AboutUsPhotoGalleryItem({ image }) {
  return (
    <div className='portfolio-box cursor-pointer'>
      <img
        src={image.file_src}
        alt={image.file_src}
        title='portfolio 1 picture'
      />
      <div className='portfolio-info'>
        <div className='caption'>
          <FaPlusSquare />
        </div>
      </div>
    </div>
  );
}

export default AboutUsPhotoGalleryItem;
