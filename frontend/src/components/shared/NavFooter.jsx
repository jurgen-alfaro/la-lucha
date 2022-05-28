import { Link } from "react-router-dom";

function NavFooter({ to, text }) {
  return (
    <div className='container mx-auto grid place-items-center '>
      <div className='flex flex-col md:flex-row gap-1 py-2'>
        <Link to='/' className='btn btn-secondary btn-outline'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
          &nbsp;Volver al inicio
        </Link>

        <Link to={`/${to}`} className='btn btn-secondary btn-outline'>
          Ver&nbsp;
          {text}&nbsp;
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default NavFooter;
