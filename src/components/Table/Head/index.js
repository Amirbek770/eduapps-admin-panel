import Input from '../../Input';
import Button from '../../Button';
import ProgressBar from '../../ProgressBar';

import cls from './style.module.scss';

const Head = ({
	setGlobalFilter,
	addAction,
	addActionEnabled = true,
	isFetching,
}) => {
	const onChange = ({ target: { value } }) => {
		setGlobalFilter(value?.toLowerCase());
	};

	return (
		<div className={cls.containerRelative}>
			<div className={cls.container}>
				<div className={cls.bar}>
					<div className={cls.searchBar}>
						<Input
							placeholder={'Search...'}
							icon={'Search'}
							onChange={onChange}
						/>

						{/* <Button icon={'Filter2'}> Filter </Button> */}
					</div>

					{addActionEnabled && (
						<Button rightIcon={'Plus'} onClick={addAction}>
							Add
						</Button>
					)}
				</div>
			</div>
			{isFetching && <ProgressBar className={cls.progress} />}
		</div>
	);
};

export default Head;
