import { useContext, useEffect } from "react";
import peopleImg from "../../assets/about-us_junta-directiva-img.jpg";
import JuntaDirectivaContext from "../../context/juntaDirectiva/JuntaDirectivaContext";
import Moment from "react-moment";

function AboutUsJuntaDirectiva() {
  const { members, getMembers, isLoading } = useContext(JuntaDirectivaContext);

  useEffect(() => {
    const fetchMembers = async () => {
      await getMembers();
    };
    fetchMembers();
  }, []);

  return (
    <section
      id='junta-directiva'
      className='about-us-junta-directiva flex justify-center px-2'
    >
      <div className='container my-12'>
        <div className='junta-directiva-title my-12 px-12 justify-center'>
          <h1 className='xl:text-7xl lg:text-6xl md:text-5xl sm:text-6xl text-4xl border-b pb-5 w-50 flex justify-center'>
            Junta Directiva
          </h1>
        </div>
        <div className='junta-directiva-members flex flex-wrap justify-around'>
          {members.length !== 0 &&
            members.map((member) => {
              const { name, last_name, position, vigency, photo } = member;

              return (
                <div
                  className='card lg:card-side bg-base-100 shadow-xl mt-5'
                  key={member.idmember}
                >
                  <figure className='w-100 h-100'>
                    <img
                      src={`http://localhost:5000/junta/${photo}`}
                      alt='Album'
                      className='w-full h-full object-fill'
                    />
                  </figure>
                  <div className='card-body '>
                    <h2 className='card-title text-2xl'>
                      {name + " " + last_name}&nbsp;{}
                    </h2>
                    <article>
                      <p>
                        <strong>Cargo:</strong>&nbsp;{position} <br />
                      </p>
                      <p>
                        <strong>Vigencia:</strong>&nbsp;
                        <Moment format='MMMM, YYYY '>{vigency}</Moment>
                      </p>
                    </article>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default AboutUsJuntaDirectiva;
