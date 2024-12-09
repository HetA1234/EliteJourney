/* eslint-disable react/prop-types */
const Pagination = ({ page, pages, onPageChange }) => {
	const pageNumbers = [];
	for (let i = 1; i <= pages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='flex justify-center '>
			<ul className='flex border border-slate-300  '>
				{pageNumbers.map((number) => (
					<li key={number} className={`px-2 py-1 dark:bg-slate-700 dark:text-gray-300 ${page === number ? 'bg-gray-200 dark:bg-gray-950' : ''}`}>
						<button className='' onClick={() => onPageChange(number)}>
							{number}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Pagination;
