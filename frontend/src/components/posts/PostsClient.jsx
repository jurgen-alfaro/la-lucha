import { useContext, useEffect, useRef, useState } from "react";
import PostContext from "../../context/posts/PostContext";
import PostPhotosClient from "./PostPhotosClient";
import Spinner from "../shared/Spinner";
import Moment from "react-moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";

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

function FadeInWhenVisible({ children }) {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            delay: 0.6,
          },
        },
        hidden: { opacity: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

const childVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,

    transition: {
      ease: "easeInOut",
      staggerChildren: 2,
    },
  },
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
    if (posts.length === 0) {
      const fetchPosts = async () => await getPosts();

      fetchPosts();
      setFilteredPosts(posts.reverse()); // This will order the array backwards, to display from the earliest to the latest.
    }
  }, [filteredPosts]);

  const filterPosts = (e) => {
    const val = e.target.value;
    let filtered = [];
    switch (val) {
      case "anuncios":
        // filtered = posts.filter((post) => post.post_type === "Anuncios");
        setFilteredPosts(posts.filter((post) => post.post_type === "Anuncios"));
        break;
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

  return (
    <motion.div
      exit='out'
      animate='in'
      initial='out'
      variants={pageVariants}
      transition={pageTransition}
    >
      <section className='mb-20'>
        <div className='text-center pb-16 pt-6 text-3xl lg:text-7xl'>
          <h1 className='border-b pb-5'>Publicaciones</h1>
        </div>
        <div className='posts-section w-full'>
          <div className='bg py-12'>
            <div className='container mx-auto grid place-items-center'>
              <div className='grid grid-cols-1 gap-12'>
                <div className='flex justify-center md:justify-start flex-wrap w-full px-4 gap-3'>
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
                    value='anuncios'
                  >
                    Anuncios
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
                    value='noticias'
                  >
                    Noticias
                  </button>
                  <button
                    className='btn btn-ghost btn-sm text-white focus:outline'
                    onClick={filterPosts}
                    value='financieros'
                  >
                    Financieros
                  </button>
                </div>
                {/* Card */}

                {!isLoading && filteredPosts.length !== 0 ? (
                  filteredPosts.map((post, i) => {
                    return (
                      <AnimatePresence key={i}>
                        <motion.div
                          key={post.idposts}
                          idx={i}
                          className='card md:max-h-[600px] max-h-[600px] grid grid-cols-1 md:grid-cols-2 mx-6 bg-base-100 shadow-xl max-w-screen-xl '
                          initial='hidden'
                          whileInView='visible'
                          exit='hidden'
                          viewport={{ once: true }}
                          transition={{ duration: 5 }}
                          variants={{
                            visible: {
                              opacity: 1,
                              transition: {
                                delay: 0.3,
                              },
                            },
                            hidden: {
                              opacity: 0,
                              transition: { duration: 0.3 },
                            },
                          }}
                        >
                          <div className='photos-container relative'>
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
                          <div className='card-body my-6 px-8 overflow-y-scroll overflow-x-hidden md:overflow-hidden'>
                            <FadeInWhenVisible>
                              <motion.div
                                className='flex flex-col gap-1 justify-between '
                                variants={childVariants}
                                initial='hidden'
                                animate='show'
                              >
                                <motion.div
                                  className='badge badge-primary '
                                  initial='hidden'
                                  whileInView='visible'
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      transition: {
                                        delay: 0.3,
                                      },
                                    },
                                    hidden: { opacity: 0 },
                                  }}
                                >
                                  {post.post_type}
                                </motion.div>
                                <small className='text-xs pl-1w'>
                                  <motion.span>
                                    <Moment format='MMM DD, YYYY'>
                                      {post.created_at}
                                    </Moment>{" "}
                                  </motion.span>
                                  &middot;&nbsp;
                                  <motion.span>
                                    <Moment locale='es' fromNow>
                                      {post.created_at}
                                    </Moment>{" "}
                                  </motion.span>
                                </small>
                              </motion.div>
                              <div className='h-full'>
                                <motion.h2
                                  className='font-medium text-3xl mt-7'
                                  initial='hidden'
                                  whileInView='visible'
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      x: "0",
                                      transition: {
                                        delay: 0.8,
                                        duration: 0.5,
                                      },
                                    },
                                    hidden: { opacity: 0, x: "200px" },
                                  }}
                                >
                                  {post.title}
                                </motion.h2>
                                <motion.p
                                  className='text-sm mt-6 whitespace-pre-line'
                                  initial='hidden'
                                  whileInView='visible'
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8 }}
                                  variants={{
                                    visible: {
                                      opacity: 1,
                                      x: "0",
                                      transition: {
                                        delay: 1.3,
                                        duration: 0.5,
                                      },
                                    },
                                    hidden: { opacity: 0, x: "200px" },
                                  }}
                                >
                                  {post.pdesc}
                                </motion.p>
                              </div>
                            </FadeInWhenVisible>

                            <motion.div
                              className='flex justify-end border-t'
                              initial='hidden'
                              whileInView='visible'
                              viewport={{ once: true }}
                              transition={{ duration: 0.8 }}
                              variants={{
                                visible: {
                                  opacity: 1,
                                  y: "0",
                                  scale: 1,
                                  transition: {
                                    delay: 1.4,
                                    duration: 0.5,
                                  },
                                },
                                hidden: { opacity: 0, y: "100px", scale: 0 },
                              }}
                            >
                              <div className='divider'></div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    );
                  })
                ) : (
                  <motion.div
                    initial='hidden'
                    whileInView='visible'
                    exit='hidden'
                    viewport={{ once: true }}
                    transition={{ duration: 5 }}
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.3,
                        },
                      },
                      hidden: {
                        opacity: 0,
                        transition: { duration: 0.3 },
                      },
                    }}
                  >
                    <h1 className='text-4xl max-w-3xl text-center text-white leading-loose'>
                      <span className=''>Sin publicaciones.</span>
                      <br /> Seleccione el tipo de publicación que desea ver.
                    </h1>
                  </motion.div>
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
