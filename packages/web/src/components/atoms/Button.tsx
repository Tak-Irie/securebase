import { FC } from 'react';

const Button: FC = () => {
  return (
    <button
      className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
      type="button"
      style={{ transition: 'all .15s ease' }}
    >
      Small
    </button>
  );
};

export default Button;
