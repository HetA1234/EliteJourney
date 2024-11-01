/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const ImageCard = ({ name, imageUrl, onPopularDestincationCardClick }) => {
	return (
		<div className='p-4 border hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer ' onClick={() => onPopularDestincationCardClick(name)} data-testid='image-card'>
			<img src={imageUrl} className='rounded w-[150px] h-[90px]' alt={name} />
			<h4 className='text-center'>{name}</h4>
		</div>
	);
};

export default ImageCard;
