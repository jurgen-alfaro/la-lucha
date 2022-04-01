import { useContext } from "react";
import PostContext from "../../context/posts/PostContext";
import Spinner from "../shared/Spinner";

function PostPhotos({ photo, pos, index, setIndex }) {
  return (
    <>
      <div
        className={`carousel-item w-full relative h-full transition duration-150 ease-out ${
          pos === "activeSlide" ? pos : `${pos} opacity-0`
        }`}
      >
        <img
          className='w-full h-full object-cover'
          src={`http://localhost:5000/${photo.photo}`}
        />
        <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
          <button
            type='button'
            className='btn btn-circle prev'
            onClick={() => setIndex(index - 1)}
          >
            ❮
          </button>
          <button
            type='button'
            className='btn btn-circle next'
            onClick={() => setIndex(index + 1)}
          >
            ❯
          </button>
        </div>
      </div>
    </>
  );
}

export default PostPhotos;
