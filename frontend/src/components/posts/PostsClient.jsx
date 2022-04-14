import { useContext, useEffect, useRef, useState } from "react";
import PostContext from "../../context/posts/PostContext";
import PostPhotosClient from "./PostPhotosClient";
import Spinner from "../shared/Spinner";
import Moment from "react-moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        right: "25px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        transform: "scale(2)",
        left: "25px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

// Framer motion variants
const pageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
const pageTransition = {
  duration: 0.5,
};

function PostsClient() {
  const { posts, getPosts, isLoading, post } = useContext(PostContext);

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const todo = useRef();

  // Options for the carouse Slider
  const settings = {
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    const fetchPosts = async () => await getPosts();
    const btnClick = () => todo.current.focus();
    fetchPosts();
    setFilteredPosts(posts);
    todo.current.focus();
  }, []);

  const filterPosts = (e) => {
    const val = e.target.value;
    let filtered = [];
    switch (val) {
      case "eventos":
        // filtered = posts.filter((post) => post.post_type === "Anuncios");
        setFilteredPosts(posts.filter((post) => post.post_type === "Eventos"));
        break;
      case "noticias":
        // filtered = posts.filter((post) => post.post_type === "Noticias");
        setFilteredPosts(posts.filter((post) => post.post_type === "Noticias"));
        break;
      case "financieros":
        // filtered = posts.filter((post) => post.post_type === "Financieros");
        setFilteredPosts(
          posts.filter((post) => post.post_type === "Financieros")
        );
        break;
      default:
        filtered = posts;
        setFilteredPosts(filtered);
        break;
    }
  };

  const variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section>
        <div className='text-center pb-16 pt-6 text-3xl lg:text-7xl'>
          <h1 className='border-b pb-5'>Publicaciones</h1>
        </div>
        <div className='posts-section w-full'>
          <div className='bg py-12'>
            <div className='container mx-auto grid place-items-center'>
              <div className='grid grid-cols-1 gap-12'>
                <div className='flex flex-start w-full'>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterPosts}
                    value='todos'
                    ref={todo}
                  >
                    Todos
                  </button>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterPosts}
                    value='eventos'
                  >
                    Eventos
                  </button>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterPosts}
                    value='financieros'
                  >
                    Financieros
                  </button>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterPosts}
                    value='noticias'
                  >
                    Noticias
                  </button>
                </div>
                {/* Card */}
                {!isLoading && filteredPosts.length !== 0 ? (
                  filteredPosts.map((post) => {
                    return (
                      <motion.div
                        key={post.idposts}
                        idx={post.idposts}
                        className='card md:max-h-[600px] max-h-screen overflow-y grid grid-cols-1 md:grid-cols-2 mx-6 bg-base-100 shadow-xl max-w-screen-xl'
                        initial='offscreen'
                        whileInView='onscreen'
                        viewport={{ once: true, amount: 0.8 }}
                        variants={variants}
                      >
                        {/*   <figure className='max-h-[480px] min-h-[480px] w-full cursor-pointer'>
                        <img
                          src={`http://localhost:5000/${post.photos[0].photo}`}
                          alt='Album'
                          className='w-full h-full object-cover'
                        />
                      </figure> */}
                        <div className='photos-container  relative'>
                          <div
                            className={`w-full h-full transition duration-150 ease-out`}
                          >
                            <Slider {...settings}>
                              {!isLoading && post.photos ? (
                                post.photos.map((photo, i) => {
                                  return (
                                    <PostPhotosClient
                                      photo={photo}
                                      key={i}
                                      idphoto={photo.idphotos}
                                    />
                                  );
                                })
                              ) : (
                                <Spinner />
                              )}
                            </Slider>
                          </div>
                        </div>
                        <div className='card-body pt-6 px-8 '>
                          <div className='flex flex-col gap-1 justify-between'>
                            <div className='badge badge-primary '>
                              {post.post_type}
                            </div>
                            <small className='text-xs pl-1w'>
                              <Moment format='MMM DD, YYYY'>
                                {post.created_at}
                              </Moment>{" "}
                              &middot;&nbsp;
                              <Moment locale='es' fromNow>
                                {post.created_at}
                              </Moment>{" "}
                            </small>
                          </div>
                          <h2 className='font-medium text-3xl mt-7'>
                            {post.title}
                          </h2>
                          <p className='text-sm mt-6'>{post.pdesc}</p>
                          <div className='flex justify-end border-t'></div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default PostsClient;
