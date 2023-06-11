
import React from 'react';
import '../Sass/Loading.sass'

const Loading:React.FC = () => {

  return (
    <div className="loading">
        <img className='loading_img' src="https://media1.tenor.com/images/ab83b50f9b40dc0089bb5e154a0c3886/tenor.gif?itemid=7189638" />
    </div>
  );
};

export default Loading;