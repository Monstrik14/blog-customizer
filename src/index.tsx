import { createRoot } from 'react-dom/client';
import React, { StrictMode, CSSProperties, useState } from 'react';

import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export const App = () => {
	const [designState, setDesignState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': designState.fontFamilyOption.value,
					'--font-size': designState.fontSizeOption.value,
					'--font-color': designState.fontColor.value,
					'--container-width': designState.contentWidth.value,
					'--bg-color': designState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setDesignState={setDesignState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
