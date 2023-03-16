import React from 'react';
import ContentLoader from 'react-content-loader';

const TextSkeleton = () => (
	<ContentLoader viewBox="0 0 400 70">
		<rect x="0" y="32" rx="4" ry="4" width="240" height="20" />
	</ContentLoader>
);

export default TextSkeleton;
