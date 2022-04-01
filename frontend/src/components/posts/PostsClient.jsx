import { useContext, useEffect } from "react";
import PostContext from "../../context/posts/PostContext";
import Spinner from "../shared/Spinner";
import pImg1 from "../../assets/water-card-1.jpg";
import Moment from "react-moment";

function PostsClient() {
  const { posts, getPosts, isLoading } = useContext(PostContext);

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts();
    };

    fetchPosts();
  }, []);

  return (
    <section>
      <div className='text-center pb-16 pt-6 text-3xl lg:text-7xl'>
        <h1 className='border-b pb-5'>Publicaciones</h1>
      </div>
      <div className='posts-section w-full'>
        <div className='bg py-12'>
          <div className='container mx-auto grid place-items-center'>
            <div className='grid grid-cols-1 gap-12'>
              <div className='flex flex-start w-full'>
                <button className='btn btn-ghost btn-sm text-white focus:outline'>
                  Todos
                </button>
                <button className='btn btn-ghost btn-sm text-white focus:outline'>
                  Anuncios
                </button>
                <button className='btn btn-ghost btn-sm text-white focus:outline'>
                  Financieros
                </button>
                <button className='btn btn-ghost btn-sm text-white focus:outline'>
                  Noticias
                </button>
              </div>
              {/* Card */}
              {!isLoading && posts.length !== 0 ? (
                posts.map((post) => {
                  return (
                    <div
                      key={post.idposts}
                      className='card grid grid-cols-1 md:grid-cols-2 mx-6 bg-base-100 shadow-xl max-w-screen-xl'
                    >
                      <figure className='max-h-[480px] min-h-[480px] w-full cursor-pointer'>
                        <img
                          src={`http://localhost:5000/${post.photos[0].photo}`}
                          alt='Album'
                          className='w-full h-full object-cover'
                        />
                      </figure>
                      <div className='card-body pt-6 px-8'>
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
                        <p className='text-sm mt-6'>{post.desc}</p>
                        <div className='flex justify-end border-t'></div>
                      </div>
                    </div>
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
  );
}

export default PostsClient;
