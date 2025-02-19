import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

export const ArticleParamsForm: React.FC<{
	setDesignState: (state: ArticleStateType) => void;
}> = ({ setDesignState }) => {
	const [isMenuOpen, setMenuIsOpen] = useState(false);

	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);

	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);

	const [font, setFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);

	const sideBar = useRef<HTMLDivElement>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDesignState({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	const handleReset = () => {
		setDesignState(defaultArticleState);
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		if (!isMenuOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sideBar.current &&
				!sideBar.current.contains(event.target as HTMLElement)
			) {
				setMenuIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={() => setMenuIsOpen(!isMenuOpen)} />
			<aside
				ref={sideBar}
				className={styles.container}
				style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={font}
						onChange={setFont}
					/>
					<RadioGroup
						title='размер шрифта'
						name=''
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
